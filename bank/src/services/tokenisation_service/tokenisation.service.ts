import { Injectable, NotFoundException,ConflictException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository} from "typeorm";
import { Transaction } from "../orchestrator/entity/transaction.entity";


@Injectable()
export class TokenisationService {

    constructor(@InjectRepository(Transaction) private readonly transactionRepository: Repository<Transaction>){}

    async tokenisePan(pan:number){
        
        const crypto = require('crypto');

        if(!pan) throw new NotFoundException("pan not found")
            // console.log(pan)
         const token  = crypto.createHash('sha256').update(pan.toString()).digest('hex');
         const findExistingtoken = await this.transactionRepository.findOne({where:{panToken:token}}) 

        if (findExistingtoken) {
         throw new ConflictException('pan already generated');
        }   
        await this.transactionRepository.create({panToken:token})
    
        return {"pan_token": token}

    }
}