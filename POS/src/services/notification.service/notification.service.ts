import { Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

export interface KafkaMessageData {

        message: string,
        customer:string,
        amount:number,
        currency:string,
        merchant:string,
        timestamp:string
}

@Injectable()
export class NotificationService implements OnModuleInit {

    constructor(private readonly client: ClientKafka) {}

      async onModuleInit() {
            await this.client.connect();
        }

        async sendMessage(data:KafkaMessageData) {
            return this.client.emit('notification-topic', {
                
                message: data.message,
                customer:data.customer,
                amount:data.amount,
                currency:data.currency,
                merchant:data.merchant,
                timestamp:data.timestamp,
            });
        }
    
}
