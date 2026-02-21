import { Terminal } from "src/services/web_terminal/entity/wt.entity";
import { Party } from "src/services/party_service/entity/party.entity";
import { Entity,PrimaryGeneratedColumn,Column, ManyToOne } from "typeorm";

export enum TRANSACTION_STATUS {
    PENDING = "pending",
    COMPLETED = "completed",
    FAILED = "failed"
}
@Entity("Transaction")
export class Transaction {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    currency:string;

    @Column({
         type: 'numeric',
        precision: 12,
        nullable: false,
        default: 0 
    })
    amount:number

      @Column({
        type:"enum",
        enum:TRANSACTION_STATUS,
        default:TRANSACTION_STATUS.PENDING,
    })
    status: TRANSACTION_STATUS;


    /*Many to one */
    @Column()
    account:string; /*account[]*/

      @Column()
    panToken:string;

    @ManyToOne(()=>Party,party =>party.fullName)
    customer:Party[]

    @ManyToOne(()=>Terminal,terminal =>terminal.signature)
    terminal:Terminal[]
}

