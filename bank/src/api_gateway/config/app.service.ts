import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { FullRequestDto } from './dto/request.data.dto';

@Injectable()
export class AppService {
  constructor(
    private readonly httpService: HttpService,
  ){}
RedirectTransactionController(
  body:FullRequestDto
){
    return this.httpService.post('http://localhost:3002/api.gateway/transaction/orchestra',{body}) 
}
  }

