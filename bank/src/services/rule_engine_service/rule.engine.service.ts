import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { dataPayload } from "../orchestrator/transaction.service";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Transaction } from "../orchestrator/entity/transaction.entity";
import { Terminal } from "../web_terminal/entity/wt.entity";

@Injectable()
export class RuleEngineService{
    @InjectRepository(Transaction) private readonly transactionRepository:Repository<Transaction>
    @InjectRepository(Terminal) private readonly terminalRepository:Repository<Terminal>

    async enginechecks({
        token,
        amount,
        currency,
        merchant,
        // customerID, /*all checks will start from the customer id once I create the virtual shared card*/
        // accountType
    }:dataPayload){
        
        try {
            let approved:boolean= false

            const tokenCheck = await this.transactionRepository.findOne({where:{panToken:token}})
            console.log(`token checked ${tokenCheck}`)

            const merhcant = await this.terminalRepository.findOne({where:{subject:"Merchant Tutorial"}})
            console.log(`merchant ${merhcant}`)

            if (!tokenCheck) throw new NotFoundException("Pan token not found");
            if (! merhcant) throw new NotFoundException("merchant not found");
            
            if(amount >= 150000) throw new UnauthorizedException("Invalid amount");  /*balance check to be added.*/
            if (currency !== "GBP") throw new UnauthorizedException("Invalid currency");

            approved = true
            const action = approved ? "approve": "declined";

            return {"action": action}
             
            
        } catch (error) {
            
        }
    }

}