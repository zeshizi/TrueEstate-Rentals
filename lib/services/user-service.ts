import { getDatabase } from "@/lib/mongodb"
import type { User, SavedSearch } from "@/lib/models/user"

export class UserService {
  private async getCollection() {
    const db = await getDatabase()
    return db.collection<User>("users")
  }

  async createUser(
    userData: Omit<User, "_id" | "createdAt" | "updatedAt" | "searchCount" | "viewCount">,
  ): Promise<User> {
    const collection = await this.getCollection()

    const newUser: User = {
      ...userData,
      searchCount: 0,
      viewCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await collection.insertOne(newUser)
    return { ...newUser, _id: result.insertedId }
  }

  async getUserById(id: string): Promise<User | null> {
    const collection = await this.getCollection()
    return await collection.findOne({ id })
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const collection = await this.getCollection()
    return await collection.findOne({ email })
  }

  async updateUser(id: string, updates: Partial<User>): Promise<boolean> {
    const collection = await this.getCollection()
    const result = await collection.updateOne(
      { id },
      {
        $set: {
          ...updates,
          updatedAt: new Date(),
        },
      },
    )
    return result.modifiedCount > 0
  }

  async incrementSearchCount(userId: string): Promise<void> {
    const collection = await this.getCollection()
    await collection.updateOne(
      { id: userId },
      {
        $inc: { searchCount: 1 },
        $set: { updatedAt: new Date() },
      },
    )
  }

  async incrementViewCount(userId: string): Promise<void> {
    const collection = await this.getCollection()
    await collection.updateOne(
      { id: userId },
      {
        $inc: { viewCount: 1 },
        $set: { updatedAt: new Date() },
      },
    )
  }

  async addSavedSearch(userId: string, search: SavedSearch): Promise<boolean> {
    const collection = await this.getCollection()
    const result = await collection.updateOne(
      { id: userId },
      {
        $push: { "preferences.savedSearches": search },
        $set: { updatedAt: new Date() },
      },
    )
    return result.modifiedCount > 0
  }

  async removeSavedSearch(userId: string, searchId: string): Promise<boolean> {
    const collection = await this.getCollection()
    const result = await collection.updateOne(
      { id: userId },
      {
        $pull: { "preferences.savedSearches": { id: searchId } },
        $set: { updatedAt: new Date() },
      },
    )
    return result.modifiedCount > 0
  }

  async bookmarkProperty(userId: string, propertyId: string): Promise<boolean> {
    const collection = await this.getCollection()
    const result = await collection.updateOne(
      { id: userId },
      {
        $addToSet: { "preferences.bookmarkedProperties": propertyId },
        $set: { updatedAt: new Date() },
      },
    )
    return result.modifiedCount > 0
  }

  async unbookmarkProperty(userId: string, propertyId: string): Promise<boolean> {
    const collection = await this.getCollection()
    const result = await collection.updateOne(
      { id: userId },
      {
        $pull: { "preferences.bookmarkedProperties": propertyId },
        $set: { updatedAt: new Date() },
      },
    )
    return result.modifiedCount > 0
  }

  async updateLastLogin(userId: string): Promise<void> {
    const collection = await this.getCollection()
    await collection.updateOne(
      { id: userId },
      {
        $set: {
          lastLogin: new Date(),
          updatedAt: new Date(),
        },
      },
    )
  }
}
