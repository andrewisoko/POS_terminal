import { Injectable, NotFoundException } from '@nestjs/common';
import { Conversion } from '../iso_val_conversions/conversions';
import { ConfigService } from '@nestjs/config';
import { PartyBankAccount } from '../partyBankAccount';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from 'src/services/orchestrator/entity/transaction.entity';
import { EncryptSecurity } from 'src/services/orchestrator/encryption/encrypt.security';
import { Account } from 'src/services/account_service/entity/account.entity';
import { TRANSACTION_STATUS } from 'src/services/orchestrator/entity/transaction.entity';




@Injectable()
export class IssuerService {

    constructor(
        @InjectRepository(Transaction) private readonly transactionRepository:Repository<Transaction>,
        @InjectRepository(Account) private readonly accountRepository:Repository<Account>,
        private readonly convertToVal: Conversion,
        // private readonly bankParty: PartyBankAccount,
        private readonly encryption: EncryptSecurity,
    ){}

    
    parseIsoMessage(buffer) {

        const Iso8583 = require('iso_8583');

        const message = buffer.slice(2); // remove 2-byte length header

        const iso = new Iso8583();
        const parsed = iso.getIsoJSON(message);

        return parsed;

        };

    decrypPanByFullName(fullNameAcc:string){
        return this.accountRepository
        .findOne({ where: { fullName: fullNameAcc } })
        .then(account => {
            if (!account) {
            throw new NotFoundException('Account not found');
            }

            console.log(account.panEncrypt);
        });
                
    }
    
    findAccountSync(pan:string){
        const panEncrypt = JSON.stringify(this.encryption.encrypt(pan))
        // return this.accountRepository.findOne({ where: {panEncrypt: '{"iv":"4f2619f4d6ffa083b5e582b9","content":"e64d7b0186b5d34ae8f9a5797bf3be03","tag":"25bbf1cafe417e3c81707fa25fa1ed54"}' }})
        return this.accountRepository.findOne({ where: {panEncrypt: panEncrypt }})
        .then( account => {
            if(!account){
                 throw new NotFoundException('Account not found');
            };
            return { 
                "balance": account.balance,
                "expiryDate": account.expiryEncrypt,
                "panEncrypt":account.panEncrypt,
            }
        });
    };

    findTransactionSync(stan:number){
        return this.transactionRepository.findOne({ where:{ stan:stan } })
          .then( transaction => {
            if( ! transaction ){
                 throw new NotFoundException('Transaction not found');
            };
            return {"status": transaction.status }
        });
    }

    IssuerBankService(){

    
        const net = require('net');
        const fs = require('fs');

        const server = net.createServer((socket) => {

        socket.on('data', (data) => {

            console.log("Received ISO message:", data.toString('hex'));

            let responseCode = "51";
            const isoMsg = this.parseIsoMessage(data);
            
            /*Authorisation process */
            // const bank = this.bankParty.getBankParty();
            
            const pan = isoMsg[2]
            const stan = Number( isoMsg[11] )
            const amount = this.convertToVal.reverseIsoAmount(isoMsg[4])
            const expiryDate = this.convertToVal.reverseExpiry(isoMsg[14])
            
            const account = this.findAccountSync(pan)
            
            const transaction = this.findTransactionSync(stan)
            
            const decc = this.decrypPanByFullName('Johnson Handsome')
            console.log("decrpt", decc)
           
            
            //  console.log(` isoAmount: ${amount}`)
            //  console.log(` expiryDate: ${expiryDate}`)
            //  console.log(` pan: ${pan}`)
            //  console.log(` balance: ${bank.BALANCE}`)
            //  console.log(` bank Exp: ${bank.EXPIRY}`)
            //  console.log(` bank pan: ${bank.PAN}`)


            if(amount <= account["balance"] || expiryDate == account["expiryDate"] || pan == account["panEncrypt"]){
                responseCode = "00"

                transaction["status"] = TRANSACTION_STATUS.APPROVED
                
                console.log({
                    "Authorisation_code": "9384FDC",
                    "Response_code": responseCode,
                    "Reason": "All data vaildated."
                })
            
    

            // const json = JSON.stringify(responseApporved, null, 2);  /* not the most elegant of the approaches */

            //     fs.writeFile('approved.json', json, 'utf8', (err) => {
            //         if (err) {
            //             console.error('Error writing file:', err);
            //         }
            //         console.log('JSON file created: approved.json');
            //         });
    
            };
            console.log(`response: ${responseCode}`)


            
            });
            

        });
        server.listen(5000, () => {
        console.log("ISO8583 server running on port 5000");
        });

    };

}
