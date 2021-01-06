import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, UpdateDateColumn, JoinTable} from "typeorm";
import { Technologies } from "./Technologies";


@Entity()
export class Projets {

    @PrimaryGeneratedColumn()
    idProjets: number;

    @Column({
        type: 'text',
    })
    imgProjets: string;

    @Column()
    titleProjets: string;

    @Column()
    contentProjets: string;

    @UpdateDateColumn()
    updateAt:Date;

    @Column()
    aimeProjets: number;


    @ManyToMany(type=>Technologies, technologie=>technologie.projets)
    technologies:Technologies[]


 
   

}
