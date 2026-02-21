import { Injectable, NotFoundException,ConflictException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository} from "typeorm";
import { Transaction } from "../orchestrator/entity/transaction.entity";


@Injectable()
export class TokenisationService {

    constructor(@InjectRepository(Transaction) private readonly transactionRepository: Repository<Transaction>){}

    /* PCI compliance to add  */
    async tokenisePan(pan:number){
        
        const crypto = require('crypto');
        try {
            if(!pan) throw new NotFoundException("pan not found")
                // console.log(pan)
             const token  = crypto.createHash('sha256').update(pan.toString()).digest('hex');
             const findExistingtoken = await this.transactionRepository.findOne({where:{panToken:token}}) 
    
            if (findExistingtoken) {
             throw new ConflictException('pan already generated');
            }   
            await this.transactionRepository.save({panToken:token})
            return "Pan token saved";
            
        } catch (error) {
            console.log(`error ${error}`)
        }
    }
}