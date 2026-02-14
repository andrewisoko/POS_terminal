import { PrimaryGeneratedColumn,Column } from "typeorm/browser";
import { Entity } from "typeorm/browser";



Entity("terminals")
export class Terminal{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    serialNumber:number;

    @Column()
    signature:string;

    @Column()
    issuer:string;

    @Column()
    subject:string;

}