import crypto from "crypto"

export interface OwnerRecord {
  id?: string
  name: string
  address?: string
  city?: string
  state?: string
  zipCode?: string
  phone?: string
  email?: string
  ssn?: string // Last 4 digits only
  ein?: string // Employer Identification Number
  dateOfBirth?: string
  businessName?: string
  businessType?: "LLC" | "Corporation" | "Trust" | "Individual" | "Partnership"
  properties?: string[]
  dataSource: string
  confidence?: number
  aliases?: string[]
}

export interface MatchResult {
  uniqueId: string
  confidence: number
  matchedFields: string[]
  conflictingFields: string[]
  consolidatedRecord: OwnerRecord
}

export class OwnerIdentificationAlgorithm {
  private readonly CONFIDENCE_THRESHOLDS = {
    EXACT_MATCH: 0.95,
    HIGH_CONFIDENCE: 0.85,
    MEDIUM_CONFIDENCE: 0.7,
    LOW_CONFIDENCE: 0.5,
    NO_MATCH: 0.3,
  }

  private readonly FIELD_WEIGHTS = {
    ssn: 0.4, // Highest weight for SSN
    ein: 0.35, // High weight for business EIN
    email: 0.25, // High weight for email
    phone: 0.2, // Medium-high weight for phone
    name: 0.15, // Medium weight for name
    address: 0.15, // Medium weight for address
    dateOfBirth: 0.3, // High weight for DOB
    businessName: 0.2, // Medium weight for business name
  }

  /**
   * Generate a unique identifier for an owner based on available data
   */
  generateUniqueId(owner: OwnerRecord): string {
    // Priority order for ID generation
    const identifiers = []

    // 1. SSN (highest priority for individuals)
    if (owner.ssn && owner.businessType === "Individual") {
      identifiers.push(`SSN:${owner.ssn}`)
    }

    // 2. EIN (highest priority for businesses)
    if (owner.ein && owner.businessType !== "Individual") {
      identifiers.push(`EIN:${owner.ein}`)
    }

    // 3. Email (high priority)
    if (owner.email) {
      identifiers.push(`EMAIL:${this.normalizeEmail(owner.email)}`)
    }

    // 4. Phone + Name combination
    if (owner.phone && owner.name) {
      identifiers.push(`PHONE_NAME:${this.normalizePhone(owner.phone)}_${this.normalizeName(owner.name)}`)
    }

    // 5. Name + Address combination
    if (owner.name && owner.address && owner.zipCode) {
      identifiers.push(
        `NAME_ADDR:${this.normalizeName(owner.name)}_${this.normalizeAddress(owner.address)}_${owner.zipCode}`,
      )
    }

    // 6. Business name + address (for businesses)
    if (owner.businessName && owner.address && owner.zipCode) {
      identifiers.push(
        `BIZ_ADDR:${this.normalizeName(owner.businessName)}_${this.normalizeAddress(owner.address)}_${owner.zipCode}`,
      )
    }

    // Create hash from the most reliable identifier
    const primaryIdentifier = identifiers[0] || `FALLBACK:${this.normalizeName(owner.name)}_${Date.now()}`

    return crypto.createHash("sha256").update(primaryIdentifier).digest("hex").substring(0, 16) // Use first 16 characters for readability
  }

  /**
   * Match and deduplicate owner records
   */
  matchOwners(newOwner: OwnerRecord, existingOwners: OwnerRecord[]): MatchResult {
    let bestMatch: OwnerRecord | null = null
    let highestConfidence = 0
    let matchedFields: string[] = []
    let conflictingFields: string[] = []

    for (const existing of existingOwners) {
      const matchResult = this.calculateMatchConfidence(newOwner, existing)

      if (matchResult.confidence > highestConfidence) {
        highestConfidence = matchResult.confidence
        bestMatch = existing
        matchedFields = matchResult.matchedFields
        conflictingFields = matchResult.conflictingFields
      }
    }

    // If no good match found, create new unique ID
    if (highestConfidence < this.CONFIDENCE_THRESHOLDS.LOW_CONFIDENCE) {
      return {
        uniqueId: this.generateUniqueId(newOwner),
        confidence: 1.0,
        matchedFields: [],
        conflictingFields: [],
        consolidatedRecord: { ...newOwner, id: this.generateUniqueId(newOwner) },
      }
    }

    // Consolidate records if match found
    const consolidatedRecord = this.consolidateRecords(newOwner, bestMatch!)

    return {
      uniqueId: bestMatch!.id || this.generateUniqueId(bestMatch!),
      confidence: highestConfidence,
      matchedFields,
      conflictingFields,
      consolidatedRecord,
    }
  }

  /**
   * Calculate match confidence between two owner records
   */
  private calculateMatchConfidence(
    owner1: OwnerRecord,
    owner2: OwnerRecord,
  ): {
    confidence: number
    matchedFields: string[]
    conflictingFields: string[]
  } {
    let totalWeight = 0
    let matchedWeight = 0
    const matchedFields: string[] = []
    const conflictingFields: string[] = []

    // Check each field for matches
    const fieldChecks = [
      { field: "ssn", weight: this.FIELD_WEIGHTS.ssn, exact: true },
      { field: "ein", weight: this.FIELD_WEIGHTS.ein, exact: true },
      { field: "email", weight: this.FIELD_WEIGHTS.email, exact: false },
      { field: "phone", weight: this.FIELD_WEIGHTS.phone, exact: false },
      { field: "dateOfBirth", weight: this.FIELD_WEIGHTS.dateOfBirth, exact: true },
      { field: "name", weight: this.FIELD_WEIGHTS.name, exact: false },
      { field: "businessName", weight: this.FIELD_WEIGHTS.businessName, exact: false },
      { field: "address", weight: this.FIELD_WEIGHTS.address, exact: false },
    ]

    for (const check of fieldChecks) {
      const value1 = owner1[check.field as keyof OwnerRecord] as string
      const value2 = owner2[check.field as keyof OwnerRecord] as string

      if (value1 && value2) {
        totalWeight += check.weight

        const similarity = check.exact ? this.exactMatch(value1, value2) : this.fuzzyMatch(value1, value2, check.field)

        if (similarity > 0.8) {
          matchedWeight += check.weight * similarity
          matchedFields.push(check.field)
        } else if (similarity < 0.3) {
          conflictingFields.push(check.field)
        }
      }
    }

    const confidence = totalWeight > 0 ? matchedWeight / totalWeight : 0

    return { confidence, matchedFields, conflictingFields }
  }

  /**
   * Exact match for sensitive fields
   */
  private exactMatch(value1: string, value2: string): number {
    return value1.toLowerCase().trim() === value2.toLowerCase().trim() ? 1.0 : 0.0
  }

  /**
   * Fuzzy matching for names and addresses
   */
  private fuzzyMatch(value1: string, value2: string, field: string): number {
    const normalized1 = this.normalizeForComparison(value1, field)
    const normalized2 = this.normalizeForComparison(value2, field)

    // Levenshtein distance for similarity
    const distance = this.levenshteinDistance(normalized1, normalized2)
    const maxLength = Math.max(normalized1.length, normalized2.length)

    if (maxLength === 0) return 1.0

    const similarity = 1 - distance / maxLength

    // Special handling for names
    if (field === "name" || field === "businessName") {
      return this.nameSpecificMatching(normalized1, normalized2, similarity)
    }

    return similarity
  }

  /**
   * Specialized name matching logic
   */
  private nameSpecificMatching(name1: string, name2: string, baseSimilarity: number): number {
    const words1 = name1.split(" ").filter((w) => w.length > 1)
    const words2 = name2.split(" ").filter((w) => w.length > 1)

    // Check for exact word matches
    let exactWordMatches = 0
    for (const word1 of words1) {
      if (words2.includes(word1)) {
        exactWordMatches++
      }
    }

    const wordMatchRatio = exactWordMatches / Math.max(words1.length, words2.length)

    // Combine base similarity with word matching
    return Math.max(baseSimilarity, wordMatchRatio * 0.8)
  }

  /**
   * Consolidate two owner records into one
   */
  private consolidateRecords(newRecord: OwnerRecord, existingRecord: OwnerRecord): OwnerRecord {
    const consolidated: OwnerRecord = { ...existingRecord }

    // Merge fields, preferring more complete/recent data
    const fieldsToMerge = ["name", "address", "city", "state", "zipCode", "phone", "email", "businessName"]

    for (const field of fieldsToMerge) {
      const newValue = newRecord[field as keyof OwnerRecord] as string
      const existingValue = existingRecord[field as keyof OwnerRecord] as string

      if (newValue && (!existingValue || newValue.length > existingValue.length)) {
        consolidated[field as keyof OwnerRecord] = newValue as any
      }
    }

    // Merge properties arrays
    const allProperties = [...(existingRecord.properties || []), ...(newRecord.properties || [])]
    consolidated.properties = [...new Set(allProperties)]

    // Merge aliases
    const allAliases = [
      ...(existingRecord.aliases || []),
      ...(newRecord.aliases || []),
      existingRecord.name,
      newRecord.name,
    ].filter(Boolean)
    consolidated.aliases = [...new Set(allAliases)]

    // Update confidence based on data sources
    consolidated.confidence = Math.min(1.0, (existingRecord.confidence || 0.5) + 0.1)

    return consolidated
  }

  /**
   * Normalize data for comparison
   */
  private normalizeForComparison(value: string, field: string): string {
    const normalized = value.toLowerCase().trim()

    switch (field) {
      case "name":
      case "businessName":
        return this.normalizeName(normalized)
      case "address":
        return this.normalizeAddress(normalized)
      case "email":
        return this.normalizeEmail(normalized)
      case "phone":
        return this.normalizePhone(normalized)
      default:
        return normalized
    }
  }

  private normalizeName(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^\w\s]/g, "") // Remove punctuation
      .replace(/\b(llc|inc|corp|ltd|co|company|trust|estate)\b/g, "") // Remove business suffixes
      .replace(/\b(jr|sr|ii|iii|iv)\b/g, "") // Remove generational suffixes
      .replace(/\s+/g, " ")
      .trim()
  }

  private normalizeAddress(address: string): string {
    return address
      .toLowerCase()
      .replace(/\b(street|st|avenue|ave|road|rd|drive|dr|lane|ln|boulevard|blvd|court|ct|place|pl)\b/g, "")
      .replace(/[^\w\s]/g, "")
      .replace(/\s+/g, " ")
      .trim()
  }

  private normalizeEmail(email: string): string {
    return email.toLowerCase().trim()
  }

  private normalizePhone(phone: string): string {
    return phone.replace(/[^\d]/g, "").slice(-10) // Keep last 10 digits
  }

  /**
   * Calculate Levenshtein distance between two strings
   */
  private levenshteinDistance(str1: string, str2: string): number {
    const matrix = Array(str2.length + 1)
      .fill(null)
      .map(() => Array(str1.length + 1).fill(null))

    for (let i = 0; i <= str1.length; i++) matrix[0][i] = i
    for (let j = 0; j <= str2.length; j++) matrix[j][0] = j

    for (let j = 1; j <= str2.length; j++) {
      for (let i = 1; i <= str1.length; i++) {
        const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1
        matrix[j][i] = Math.min(
          matrix[j][i - 1] + 1, // deletion
          matrix[j - 1][i] + 1, // insertion
          matrix[j - 1][i - 1] + indicator, // substitution
        )
      }
    }

    return matrix[str2.length][str1.length]
  }

  /**
   * Batch process multiple owner records for deduplication
   */
  async batchDeduplication(owners: OwnerRecord[]): Promise<{
    uniqueOwners: OwnerRecord[]
    duplicatesFound: number
    consolidationReport: any[]
  }> {
    const uniqueOwners: OwnerRecord[] = []
    const consolidationReport: any[] = []
    let duplicatesFound = 0

    for (const owner of owners) {
      const matchResult = this.matchOwners(owner, uniqueOwners)

      if (matchResult.confidence >= this.CONFIDENCE_THRESHOLDS.LOW_CONFIDENCE) {
        // Update existing record
        const existingIndex = uniqueOwners.findIndex((o) => o.id === matchResult.uniqueId)
        if (existingIndex >= 0) {
          uniqueOwners[existingIndex] = matchResult.consolidatedRecord
          duplicatesFound++

          consolidationReport.push({
            action: "merged",
            confidence: matchResult.confidence,
            matchedFields: matchResult.matchedFields,
            conflictingFields: matchResult.conflictingFields,
            originalRecord: owner,
            consolidatedRecord: matchResult.consolidatedRecord,
          })
        }
      } else {
        // Add as new unique owner
        const newOwner = { ...owner, id: matchResult.uniqueId }
        uniqueOwners.push(newOwner)

        consolidationReport.push({
          action: "new",
          confidence: 1.0,
          originalRecord: owner,
          consolidatedRecord: newOwner,
        })
      }
    }

    return {
      uniqueOwners,
      duplicatesFound,
      consolidationReport,
    }
  }
}

// Export singleton instance
export const ownerIdentificationAlgorithm = new OwnerIdentificationAlgorithm()
