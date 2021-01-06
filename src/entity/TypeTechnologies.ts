import {
    Entity, 
    PrimaryGeneratedColumn, 
    Column,
    ManyToOne,
    JoinTable,
    OneToOne,
    ManyToMany
} from "typeorm";
import { Technologies } from "./Technologies";


@Entity()
export class TypeTechnologies {
    @PrimaryGeneratedColumn()
    idTypeTechno: number;

    @Column()
    nameTypeTechno: string;


    @ManyToMany(type=>Technologies, technologie=>technologie.typeTechno)
    technologies: Technologies[];
}
