import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity()
export class Customer {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column("varchar")
    firstName!: string;

    @Column("varchar")
    lastName!: string;

    @Column("varchar", { nullable: true })
    phone?: string;

    @Column("varchar", { nullable: true })
    email?: string;

    @Column("int", { default: 0 })
    points!: number;

    @OneToMany("PointHistory", (history: any) => history.customer)
    history!: any[];
}
