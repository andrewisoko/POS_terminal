import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Transaction } from "./entity/transaction.entity";
import { Repository } from "typeorm";


export interface dataPayload {
    token: string;
    amount:number;
    currency: string;
    merchant: string;
    timestamp?: Date;
    customerID?: number;
    accountType?: string /*enum* only one account type for purpose of the project */ 
    // location?

}

@Injectable()
export class TransactionService{
    constructor(
        @InjectRepository(Transaction) private readonly transactionRepository:Repository<Transaction>
    ){}

    async tokenCall(){
        const count: number = 0
    }

    async panToken(transaction:Transaction){ /*temporary */
        return  transaction.panToken
    }

    async validateDataPayload(
        transaction:Transaction,
    ){
        return{
            token: transaction.panToken,
            // anount: transaction.amount,
            // currency: transaction.currency,
            // merchant:transaction.merchant
        }
    }

}