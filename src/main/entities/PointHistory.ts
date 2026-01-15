import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";

@Entity()
export class PointHistory {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column("int")
    changeAmount!: number;

    @Column("int")
    newBalance!: number;

    @Column("varchar", { nullable: true })
    reason?: string;

    @CreateDateColumn()
    createdAt!: Date;

    @ManyToOne("Customer", (customer: any) => customer.history)
    customer!: any;
}
