import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ledger } from './entity/ledger.entity';
import { LedgerController } from './ledger.controller';
import { LedgerService } from './ledger.service';

@Module({
    imports:[TypeOrmModule.forFeature([Ledger])],
    controllers:[LedgerController],
    providers:[LedgerService]
})
export class LedgerModule {}
