import { Controller, Post, Body } from '@nestjs/common';
import { ContractProps, IssuerRuleService } from './issuer.rules.service';


/*********to be done******/


@Controller('issuer-rules')
export class IssuerRulesController {

  constructor ( private readonly issuerRulesService: IssuerRuleService){}
  @Post('graphql')
  async handleGraphQL(

    @Body() payload: {

    sender: string,
    receiver: string[],
    split_agreement: string,
    transactions?: string,
    contractStatus: string,
    sender_percentage?: number[];
    sender_amount?: number[];
    receiver_percentage?: number[];
    receiver_amount?: number[];
    repayment_agreement?:string,
    event_agreement?:string,
    location_agreement?:string,
    time_agreement?:string,
    
    }
) {
    return this.issuerRulesService
  }
}
