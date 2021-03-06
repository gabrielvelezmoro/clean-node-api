import { MongoClient, Collection } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient,
  async connect (url: string): Promise<void> {
    this.client = await MongoClient.connect(process.env.MONGO_URL)
  },

  async disconnect (): Promise<void> {
    await this.client.close()
  },

  getCollecton (name: string): Collection {
    return this.client.db().collection(name)
  },

  map: (collection: any): any => {
    const account = {
      id: collection._id,
      name: collection.name,
      email: collection.email,
      password: collection.password
    }
    return account
  }

}
