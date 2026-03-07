import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class PartyBankAccount {
    
  constructor(private readonly configService: ConfigService) {}

  getBankParty() {
    return {
      BALANCE: 2000,
      PAN: this.configService.get<string>('ISSUER_PARTY1_PAN'),
      EXPIRY: this.configService.get<string>('EXPIRY_DATE'),
    };
  }
}