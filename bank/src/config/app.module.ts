import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {ConfigModule} from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { Ledger } from 'src/modules/ledgers/entities/ledger.entity';
import { Transaction } from 'typeorm';
import { Customer } from 'src/modules/customers/entities/customer.entity';
import { Account } from 'src/modules/accounts/entities/account.entity';




@Module({
  imports: [
    ConfigModule.forRoot({

      isGlobal:true,
      envFilePath:__dirname + '/../../.env'
    }
  ),
  TypeOrmModule.forRootAsync({
    imports:[ConfigModule],
    inject:[ConfigService],
    useFactory:(configService:ConfigService) => {
      console.log(configService.get<string>('DB_USER'))
      return{
        type: 'postgres',
        host: configService.get<string>('DB_'),
        port: parseInt(configService.get<string>('DB_PORT') ?? '5432', 10),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        synchronize:true,
        entities:[
          Ledger,
          Transaction,
          Customer,
          Account
        ]
      }
    }
  })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
