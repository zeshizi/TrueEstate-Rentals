# 🔐 Production Authentication Implementation Guide

## Current Setup vs Production Ready

### ✅ What's Already Implemented
- **NextAuth.js** integration with Google OAuth
- **Demo credentials** system for testing
- **Role-based access** (user, agent, admin)
- **MongoDB user management** with UserService
- **Session management** with JWT tokens
- **Protected routes** and middleware

### 🚀 Production Implementation Steps

## 1. Authentication Providers

### Primary Providers (Recommended)
\`\`\`typescript
// lib/auth.ts - Production providers
providers: [
  // Google OAuth (Business accounts)
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    authorization: {
      params: {
        prompt: "consent",
        access_type: "offline",
        response_type: "code",
        hd: "yourdomain.com" // Restrict to company domain
      }
    }
  }),
  
  // Microsoft Azure AD (Enterprise)
  AzureADProvider({
    clientId: process.env.AZURE_AD_CLIENT_ID!,
    clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
    tenantId: process.env.AZURE_AD_TENANT_ID!,
  }),
  
  // LinkedIn (Professional networks)
  LinkedInProvider({
    clientId: process.env.LINKEDIN_CLIENT_ID!,
    clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
  }),
  
  // Email/Password with verification
  CredentialsProvider({
    name: "credentials",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials) {
      // Real password verification with bcrypt
      const user = await UserService.authenticateUser(
        credentials.email, 
        credentials.password
      )
      return user
    }
  })
]
\`\`\`

### Enterprise SSO Integration
\`\`\`typescript
// For enterprise clients
providers: [
  // SAML 2.0 Provider
  {
    id: "saml",
    name: "Enterprise SSO",
    type: "oauth",
    // SAML configuration for enterprise clients
  },
  
  // LDAP/Active Directory
  {
    id: "ldap",
    name: "Active Directory",
    type: "credentials",
    // LDAP authentication
  }
]
\`\`\`

## 2. User Registration & Verification

### Email Verification System
\`\`\`typescript
// lib/services/auth-service.ts
export class AuthService {
  async registerUser(userData: RegisterData) {
    // 1. Validate email domain (business emails only)
    if (!this.isBusinessEmail(userData.email)) {
      throw new Error("Business email required")
    }
    
    // 2. Hash password with bcrypt
    const hashedPassword = await bcrypt.hash(userData.password, 12)
    
    // 3. Create user with pending status
    const user = await UserService.createUser({
      ...userData,
      password: hashedPassword,
      status: "pending_verification",
      emailVerified: false
    })
    
    // 4. Send verification email
    await this.sendVerificationEmail(user.email, user.verificationToken)
    
    return user
  }
  
  async verifyEmail(token: string) {
    const user = await UserService.getUserByVerificationToken(token)
    if (!user) throw new Error("Invalid token")
    
    await UserService.updateUser(user.id, {
      emailVerified: true,
      status: "active",
      verificationToken: null
    })
  }
}
\`\`\`

### Business Email Validation
\`\`\`typescript
// lib/utils/email-validation.ts
export function isBusinessEmail(email: string): boolean {
  const businessDomains = [
    // Add approved business domains
    'company.com',
    'realestate.com',
    'investment.com'
  ]
  
  const freeEmailProviders = [
    'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'
  ]
  
  const domain = email.split('@')[1]
  
  // Block free email providers for premium features
  if (freeEmailProviders.includes(domain)) {
    return false
  }
  
  return true
}
\`\`\`

## 3. Role-Based Access Control (RBAC)

### Enhanced Role System
\`\`\`typescript
// types/auth.ts
export interface UserRole {
  id: string
  name: 'viewer' | 'agent' | 'broker' | 'admin' | 'enterprise'
  permissions: Permission[]
  features: Feature[]
  limits: {
    searchesPerMonth: number
    propertiesPerSearch: number
    exportLimit: number
    apiCalls: number
  }
}

export interface Permission {
  resource: 'properties' | 'wealth_data' | 'admin' | 'api'
  actions: ('read' | 'write' | 'delete' | 'export')[]
}
\`\`\`

### Subscription-Based Access
\`\`\`typescript
// lib/services/subscription-service.ts
export class SubscriptionService {
  async checkAccess(userId: string, feature: string): Promise<boolean> {
    const user = await UserService.getUserById(userId)
    const subscription = user.subscription
    
    // Check if user's plan includes this feature
    return subscription.features.includes(feature)
  }
  
  async upgradeSubscription(userId: string, newPlan: string) {
    // Integrate with Stripe/payment processor
    const paymentResult = await this.processPayment(userId, newPlan)
    
    if (paymentResult.success) {
      await UserService.updateSubscription(userId, newPlan)
    }
  }
}
\`\`\`

## 4. Security Implementation

### Password Security
\`\`\`typescript
// lib/utils/password.ts
import bcrypt from 'bcryptjs'
import zxcvbn from 'zxcvbn'

export class PasswordService {
  static async hash(password: string): Promise<string> {
    // Use high salt rounds for production
    return bcrypt.hash(password, 12)
  }
  
  static async verify(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash)
  }
  
  static validateStrength(password: string): {
    isValid: boolean
    score: number
    feedback: string[]
  } {
    const result = zxcvbn(password)
    return {
      isValid: result.score >= 3,
      score: result.score,
      feedback: result.feedback.suggestions
    }
  }
}
\`\`\`

### Rate Limiting & Security
\`\`\`typescript
// middleware/rate-limit.ts
import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "10 s"), // 10 requests per 10 seconds
})

export async function rateLimitMiddleware(request: Request) {
  const ip = request.headers.get("x-forwarded-for") ?? "127.0.0.1"
  const { success } = await ratelimit.limit(ip)
  
  if (!success) {
    return new Response("Too Many Requests", { status: 429 })
  }
}
\`\`\`

### Two-Factor Authentication (2FA)
\`\`\`typescript
// lib/services/two-factor-service.ts
import speakeasy from 'speakeasy'
import QRCode from 'qrcode'

export class TwoFactorService {
  async generateSecret(userId: string): Promise<{
    secret: string
    qrCode: string
    backupCodes: string[]
  }> {
    const secret = speakeasy.generateSecret({
      name: \`TrueEstate (\${userId})\`,
      issuer: 'TrueEstate'
    })
    
    const qrCode = await QRCode.toDataURL(secret.otpauth_url!)
    const backupCodes = this.generateBackupCodes()
    
    // Store secret in database
    await UserService.updateUser(userId, {
      twoFactorSecret: secret.base32,
      backupCodes: backupCodes.map(code => bcrypt.hash(code, 10))
    })
    
    return { secret: secret.base32, qrCode, backupCodes }
  }
  
  async verifyToken(userId: string, token: string): Promise<boolean> {
    const user = await UserService.getUserById(userId)
    
    return speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: 'base32',
      token,
      window: 2
    })
  }
}
\`\`\`

## 5. Enterprise Features

### Company Management
\`\`\`typescript
// lib/services/company-service.ts
export class CompanyService {
  async registerCompany(companyData: CompanyRegistration) {
    // 1. Verify business registration
    const verification = await this.verifyBusiness(companyData.taxId)
    
    // 2. Create company account
    const company = await this.createCompany({
      ...companyData,
      verified: verification.isValid,
      plan: 'enterprise'
    })
    
    // 3. Setup admin user
    const adminUser = await UserService.createUser({
      ...companyData.adminUser,
      role: 'admin',
      companyId: company.id
    })
    
    return { company, adminUser }
  }
  
  async inviteEmployee(companyId: string, email: string, role: string) {
    // Send invitation email with signup link
    const inviteToken = this.generateInviteToken()
    
    await this.sendInviteEmail(email, {
      companyId,
      role,
      token: inviteToken
    })
  }
}
\`\`\`

### API Key Management
\`\`\`typescript
// lib/services/api-key-service.ts
export class ApiKeyService {
  async generateApiKey(userId: string, permissions: string[]): Promise<string> {
    const apiKey = this.generateSecureKey()
    
    await this.storeApiKey({
      key: await bcrypt.hash(apiKey, 10),
      userId,
      permissions,
      createdAt: new Date(),
      lastUsed: null,
      isActive: true
    })
    
    return apiKey
  }
  
  async validateApiKey(key: string): Promise<ApiKeyData | null> {
    // Validate and return key data with permissions
    return this.getApiKeyData(key)
  }
}
\`\`\`

## 6. Environment Variables (Production)

\`\`\`bash
# .env.production
# Authentication
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=your-super-secure-secret-key

# OAuth Providers
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
AZURE_AD_CLIENT_ID=your-azure-client-id
AZURE_AD_CLIENT_SECRET=your-azure-client-secret
LINKEDIN_CLIENT_ID=your-linkedin-client-id
LINKEDIN_CLIENT_SECRET=your-linkedin-client-secret

# Database
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/trueestate

# Email Service (SendGrid/AWS SES)
EMAIL_FROM=noreply@yourdomain.com
SENDGRID_API_KEY=your-sendgrid-key

# Rate Limiting (Upstash Redis)
UPSTASH_REDIS_REST_URL=your-redis-url
UPSTASH_REDIS_REST_TOKEN=your-redis-token

# Payment Processing (Stripe)
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Security
ENCRYPTION_KEY=your-encryption-key
JWT_SECRET=your-jwt-secret
\`\`\`

## 7. Deployment Checklist

### Pre-Deployment Security
- [ ] Remove all demo/test credentials
- [ ] Enable HTTPS only
- [ ] Configure CORS properly
- [ ] Set up rate limiting
- [ ] Enable audit logging
- [ ] Configure backup systems

### Authentication Setup
- [ ] Configure OAuth providers
- [ ] Set up email verification
- [ ] Implement password policies
- [ ] Enable 2FA for admin accounts
- [ ] Set up session management
- [ ] Configure logout on all devices

### Monitoring & Analytics
- [ ] Set up authentication analytics
- [ ] Monitor failed login attempts
- [ ] Track user registration funnel
- [ ] Set up security alerts
- [ ] Configure user activity logging

## 8. Legal & Compliance

### Data Protection
- [ ] GDPR compliance for EU users
- [ ] CCPA compliance for CA users
- [ ] Data retention policies
- [ ] Right to deletion
- [ ] Data export capabilities

### Terms & Privacy
- [ ] Updated Terms of Service
- [ ] Privacy Policy
- [ ] Cookie Policy
- [ ] Data Processing Agreements (DPA)
- [ ] User consent management

## 9. Testing Strategy

### Authentication Testing
\`\`\`typescript
// tests/auth.test.ts
describe('Authentication Flow', () => {
  test('User registration with email verification', async () => {
    // Test complete registration flow
  })
  
  test('OAuth login with Google', async () => {
    // Test OAuth integration
  })
  
  test('Password reset flow', async () => {
    // Test password reset
  })
  
  test('2FA setup and verification', async () => {
    // Test two-factor authentication
  })
})
\`\`\`

### Load Testing
- Test concurrent user logins
- Verify session handling under load
- Test rate limiting effectiveness
- Monitor database performance

## 🚀 Implementation Timeline

### Phase 1: Core Authentication (Week 1-2)
- Remove demo credentials
- Implement real password hashing
- Set up email verification
- Configure OAuth providers

### Phase 2: Security Features (Week 3-4)
- Add 2FA support
- Implement rate limiting
- Set up audit logging
- Configure session security

### Phase 3: Enterprise Features (Week 5-6)
- Company registration
- Role-based permissions
- API key management
- Subscription integration

### Phase 4: Compliance & Testing (Week 7-8)
- GDPR/CCPA compliance
- Security testing
- Load testing
- Documentation

## 📞 Support & Maintenance

### User Support
- Password reset assistance
- Account verification help
- 2FA recovery process
- Enterprise onboarding

### System Monitoring
- Failed login alerts
- Unusual activity detection
- Performance monitoring
- Security incident response

---

**Ready for Production Deployment! 🎉**

This guide provides everything needed to implement enterprise-grade authentication for TrueEstate when deploying to production.
