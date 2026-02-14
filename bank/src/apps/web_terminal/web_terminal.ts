import { Injectable } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { Terminal } from "./entity/WT.entity";




Injectable()
export class WebTerminal{
    constructor(
        private readonly jwtService:JwtService,
    ){}

    generateSerialNum(){
        const randomNum = Math.floor(Math.random() * 100000000);
        return randomNum.toString().padStart(13,'0')
    }

    generateSignature(){

        /* cheap imitation of sha256WithRSAEncryption algorithm output*/

        const randomNum = Math.floor(Math.random() * 100000000);
        const randomNumtoNine = Math.floor(Math.random() * 9);

        const  ThreeSeq = randomNum.toString().padStart(3,'0')
        const  SixSeq = randomNum.toString().padStart(6,'0')
        const  twoSeq = randomNum.toString().padStart(2,'0')

        return `${randomNumtoNine}.${randomNumtoNine}.${ThreeSeq}.${SixSeq}.${randomNumtoNine}.${randomNumtoNine}.${twoSeq}`
    }

    generateId(){

    }

    CreateWT(id:Terminal){

            const serialNumber = this.generateSerialNum();
            const signature = this.generateSignature();

        const certTerminal = {
            id: id,
            serialNumber:Number(serialNumber),
            signature: signature,
            issuer: 'Tututorial Bank',
            subject: 'Merchant Tutorial'
        };
        return this.jwtService.sign(certTerminal);

    }

}
