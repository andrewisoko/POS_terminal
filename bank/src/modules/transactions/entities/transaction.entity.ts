import { Column,PrimaryGeneratedColumn,CreateDateColumn} from "typeorm";
import { Entity } from "typeorm";

@Entity("transactions")
export class Transaction {

    @PrimaryGeneratedColumn('uuid')
    id:string
    
    @Column()
    Amount:number

    @CreateDateColumn()
    TransactionDate:Date
}
