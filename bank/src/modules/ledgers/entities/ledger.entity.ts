import { Column,PrimaryGeneratedColumn,CreateDateColumn} from "typeorm";
import { Entity } from "typeorm";

@Entity('ledger')
export class Ledger{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string; 

  @Column()
  type: 'ASSET' | 'LIABILITY' | 'REVENUE' | 'EXPENSE';

  @CreateDateColumn()
  createdAt: Date;
}

