import { MongoClient } from "mongodb"

// MongoDB connection for legacy compatibility
let client: MongoClient
let clientPromise: Promise<MongoClient>

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your MongoDB URI to .env.local")
}

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>
  }

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(process.env.MONGODB_URI)
    globalWithMongo._mongoClientPromise = client.connect()
  }
  clientPromise = globalWithMongo._mongoClientPromise
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(process.env.MONGODB_URI)
  clientPromise = client.connect()
}

// Prisma-like interface for compatibility
export const prisma = {
  async connect() {
    const client = await clientPromise
    return client.db("trueestate")
  },

  async disconnect() {
    const client = await clientPromise
    await client.close()
  },

  // Property operations
  property: {
    async findMany(options?: any) {
      const client = await clientPromise
      const db = client.db("trueestate")
      const collection = db.collection("properties")

      if (options?.where) {
        return await collection.find(options.where).toArray()
      }
      return await collection.find({}).toArray()
    },

    async findUnique(options: { where: { id: string } }) {
      const client = await clientPromise
      const db = client.db("trueestate")
      const collection = db.collection("properties")
      return await collection.findOne({ id: options.where.id })
    },

    async create(options: { data: any }) {
      const client = await clientPromise
      const db = client.db("trueestate")
      const collection = db.collection("properties")
      const result = await collection.insertOne(options.data)
      return { ...options.data, _id: result.insertedId }
    },
  },

  // User operations
  user: {
    async findMany(options?: any) {
      const client = await clientPromise
      const db = client.db("trueestate")
      const collection = db.collection("users")

      if (options?.where) {
        return await collection.find(options.where).toArray()
      }
      return await collection.find({}).toArray()
    },

    async findUnique(options: { where: { email: string } }) {
      const client = await clientPromise
      const db = client.db("trueestate")
      const collection = db.collection("users")
      return await collection.findOne({ email: options.where.email })
    },

    async create(options: { data: any }) {
      const client = await clientPromise
      const db = client.db("trueestate")
      const collection = db.collection("users")
      const result = await collection.insertOne(options.data)
      return { ...options.data, _id: result.insertedId }
    },
  },
}

// Export the client promise for direct MongoDB operations
export default clientPromise
