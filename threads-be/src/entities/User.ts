import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Thread } from "./Thread";


@Entity({name: "users"})
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    full_name: string;

    @Column()
    email: string;

    @Column({select: false})
    password: string;

    @Column()
    picture: string;
    
    @Column()
    description: string;

    @OneToMany(() => Thread, (thread) => thread.user, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    })
    threads: Thread[]
}