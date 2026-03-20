import { Controller,Post,Body } from '@nestjs/common';
import { LedgerRecord, LedgerService } from './ledger.service';

@Controller('ledger')
export class LedgerController {
    constructor(
        private readonly ledgerService: LedgerService
    ){}

    @Post("double-entry")
    async saveDoubleEntry(
        @Body() ledgerdataDto: {
            account_id:string,
            transaction_id:string,
            amount:number,
            currency:string,
            eventTimestamp:Date,
            maskedPan:string,
        }
    ){
        return this.ledgerService.saveDoubleEntry(ledgerdataDto)
    }
}
