import { Column,PrimaryGeneratedColumn,CreateDateColumn} from "typeorm";
import { Entity } from "typeorm";

@Entity("accounts")
export class Account {

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    customer_id:string;

    @Column()
    currency:string;

    @Column()
    createdAt:Date;
}

