import { buildASTSchema } from 'graphql'
import gql from "graphql-tag"

export const schema = buildASTSchema(gql`
   
    type Membres {
        idMember: ID
        firstNameMember: String
        lastNameMember: String
        emailMember: String
        passwordMember: String
        imgMember: String!
        isAdmin: String!
        technologies:[Technologies!]!

    }

    type Technologies {
        idTechnologies: ID
        imgTechnologies: String!
        contentsTechnologies: String
        nameTechnologies: String
        urlTechnologies: String
        typeTechno: [TypeTechnologies!]!

        
    }


    type Projets {
        idProjets: ID
        imgProjets: String
        titleProjets: String
        contentProjets: String
        updateAt: String
        aimeProjets: Int
        technologies:[Technologies!]!

    }

    type TypeTechnologies {
        idTypeTechno: ID
        nameTypeTechno: String
        technologies: [Technologies!]!
    }

    type Token {
        token: String!
    }


    type Query {
    
        getMembres: [Membres!]!
        findOneMembres(idMember: ID!): Membres
        login(emailMember:String passwordMember:String): Token

        getTechnologies: [Technologies!]!
        findOneTechnologies(idTechnologies: ID!):Technologies!

        getProjets: [Projets!]!
        findOneProjet(idProjets: ID!): Projets!

        getTypeTech : [TypeTechnologies!]!
        findOneTypeTech(idTypeTechno: ID!):TypeTechnologies!

    }


    type Mutation {
      
        
        addMembres(firstNameMember: String, 
                    lastNameMember: String, 
                    emailMember: String, 
                    passwordMember: String,
                    imgMember: String, 
                    isAdmin: String,
                    idTechnologies:String!): Token!
        deleteMembres(idMember: Int!): Membres !
        putMembres (idMember: Int!,
            firstNameMember: String, 
            lastNameMember: String, 
            emailMember: String, 
            passwordMember: String,
            imgMember: String, 
            isAdmin: String,
            idTechnologies:String!): Token!


        addTechnologies( imgTechnologies: String, 
                    nameTechnologies: String,
                    contentsTechnologies: String, 
                    urlTechnologies: String,
                    idMember:String!,
                    idProjets:String!): Technologies!
        deleteTechnologies(idTechnologies: Int!): Technologies !
        putTechnologies(
            idTechnologies: Int!,
            imgTechnologies: String, 
            nameTechnologies: String,
            contentsTechnologies: String, 
            urlTechnologies: String,
            idMember:String!,
            idProjets:String!): Technologies!

        addProjets(imgProjets: String, 
                    titleProjets: String, 
                    contentProjets: String, 
                    updateAt: String,
                    aimeProjets: Int,
                    idTechnologies:String!): Projets!
        deleteProjets(idProjets: Int!): Projets !
        putProjets(
            idProjets:Int !,
            imgProjets: String, 
            titleProjets: String, 
            contentProjets: String, 
            updateAt: String,
            aimeProjets: Int,
            idTechnologies:String!): Projets!

        
         addTypeTech (
            nameTypeTechno: String
            ):TypeTechnologies !

        putTypeTech (
            idTypeTechno: Int!,
            nameTypeTechno: String,
            idTechnologies:String!
            ):TypeTechnologies !

    }
`)
