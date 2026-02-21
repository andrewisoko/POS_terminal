import { Module } from "@nestjs/common";
import { TransactionController } from "./transaction.controller";
import { TokenisationService } from "../tokenisation_service/tokenisation.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Transaction } from "typeorm";


@Module({
    imports:[
        TypeOrmModule.forFeature([Transaction])
    ],
    controllers:[TransactionController],
    providers:[TokenisationService],
})

export class TransactionModule{}