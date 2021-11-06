import { AddAccountRepository } from '../../../../data/protocols/add-account-repository'
import { AccountModel } from '../../../../domain/models/account'
import { AddAccountModel } from '../../../../domain/usecases/add-account'
import { MongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRepository implements AddAccountRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollecton('accounts')
    const result = await accountCollection.insertOne(accountData)
    const id = result.insertedId
    const returnedAccount = await accountCollection.findOne({ _id: id })

    return MongoHelper.map(returnedAccount)
  }
}
