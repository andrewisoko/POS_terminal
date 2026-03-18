import { Controller,Post,Body } from '@nestjs/common';
import { AccountService } from './account.service';

@Controller('account')
export class AccountController {

    constructor(
        private readonly accountService:AccountService,
    ){}

    @Post("account-checks")
    async accountChecks(
        @Body() dataDto: {
            fullName:string,
            amount:number,
            transaction:string,
            expiryDate:string,
            pan:string,
        }
    ){
        return await this.accountService.accountChecks(
            dataDto.fullName,
            dataDto.amount,
            dataDto.transaction,
            dataDto.expiryDate,
            dataDto.pan
        )
    }

}
