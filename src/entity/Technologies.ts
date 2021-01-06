import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne} from "typeorm";
import {Membres} from "./Membres";
import {Projets} from "./Projet";
import {TypeTechnologies} from "./TypeTechnologies";

@Entity()
export class Technologies {

    @PrimaryGeneratedColumn()
    idTechnologies: number;

    @Column({
        type: 'text',
        nullable: false,
    })
    imgTechnologies: string;

    @Column()
    nameTechnologies: string;

    @Column({
        type: 'text'
    })
    contentsTechnologies: string;

    
    @Column()
    urlTechnologies: string;

    @ManyToMany(type=>Membres, membre=> membre.technologies, { cascade: true })
    @JoinTable()
    membres: Membres[];

    @ManyToMany(type=>Projets, projet=> projet.technologies, { cascade: true })
    @JoinTable()
    projets: Projets[];

    @ManyToMany(type=>TypeTechnologies,  typeTech=> typeTech.technologies,{ cascade: true })
    @JoinTable()
    typeTechno: TypeTechnologies;
  

   

}
