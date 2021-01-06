import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable} from "typeorm";
import {Technologies} from "./Technologies";


@Entity()
export class Membres {

    @PrimaryGeneratedColumn()
    idMember: number;

    @Column()
    firstNameMember: string;

    @Column()
    lastNameMember: string;

    @Column()
    emailMember: string;

    @Column()
    passwordMember: string;

    @Column({
        type: 'text',
        nullable: false,
    })
    imgMember: string;

    @Column()
    isAdmin: string;

    @ManyToMany(type=>Technologies, technologie=>technologie.membres)
    technologies:Technologies[]

}
