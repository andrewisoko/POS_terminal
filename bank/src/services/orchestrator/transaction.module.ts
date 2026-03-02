import { Module } from "@nestjs/common";
import { TransactionController } from "./transaction.controller";
import { TokenisationService } from "../tokenisation_service/tokenisation.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Transaction } from "./entity/transaction.entity";
import { HttpModule } from '@nestjs/axios';
import { TokenisationController } from "../tokenisation_service/tokenisation.controller";
import { TransactionService } from "./transaction.service";
import { EncryptSecurity } from "./encryption/encrypt.security";
import { Party } from "../party_service/entity/party.entity";
import { Account } from "../account_service/entity/account.entity";
import { Terminal } from "../web_terminal/entity/wt.entity";


@Module({
    imports:[
        HttpModule,
        TypeOrmModule.forFeature([
            Transaction,
            Party,
            Account,
            Terminal
        ])
    ],
    controllers:[
        TransactionController,
        TokenisationController
    ],
    providers:[
        TokenisationService,
        TransactionService,
        EncryptSecurity
    ],
})

export class TransactionModule{}