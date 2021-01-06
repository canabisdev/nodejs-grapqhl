import "reflect-metadata";
import {getRepository} from "typeorm";
import {Membres} from "../entity/Membres"
import {Membres, Technologies} from "../entity/Technologies";
const jwt = require('jsonwebtoken');
import bcrypt from "bcrypt";

// GetAll
export const getMembres = async (req, context) => {
    // console.log("test",context);
   
    let response = await getRepository(Membres).find({ relations:["technologies"] })
    if (response.length <= 0 ) {
        throw new Error("il n' y a pas de Membres");
    }
    return response
}


// Add Membres
export const addMembres = async ({ firstNameMember, lastNameMember, emailMember, passwordMember, imgMember,  isAdmin,  idTechnologies }) => {
   

  const technologies = Promise.all ( JSON.parse(idTechnologies).map(idTechnologie=> {
        return  getRepository(Technologies).findOne({idTechnologie });
   }) );

   
    let isEmailExist = await getRepository(Membres).findOne({ emailMember })
    if (isEmailExist) {
        throw new Error('cette email deja existe')
    }
    let passwordMember = "";
    passwordMember = await bcrypt.hash(passwordMember, 10) ;

    let membres = await getRepository(Membres)
        .createQueryBuilder()
        .insert()
        .values({ firstNameMember, 
            lastNameMember, 
            emailMember,
            imgMember, 
            isAdmin, 
            technologies,
            passwordMember })
        .execute()
    if (!membres) {
        throw new Error("Utilisateur n'est pas ajouter");
    }
    const { idMember } = membres.generatedMaps[0]
   let membre = await getRepository(Membres).findOne({ idMember })
   const token = jwt.sign(
       { idMember: membre.idMember, 
       },
       process.env.JWT_SECRET,
       { expiresIn: '1d' }
   )
    return {token}
}

// login
export const login = async ({ emailMember, passwordMember }) => {
    try {
        let membres = await getRepository(Membres).findOne({ emailMember })
        if (!membres) {
            throw new Error('No user with that email')
        }
        const isValid = await bcrypt.compare(passwordMember, membres.passwordMember)
        if (!isValid) {
            throw new Error('Incorrect password')
        }
        // return jwt
        const token = jsonwebtoken.sign(
            { idMember: membres.idMember, emailMember: membres.emailMember, isAdmin: membres.isAdmin},
            process.env.JWT_SECRET,
            { expiresIn: '1d'}
        )
        return { token }
        
    } catch (error) {
        throw new Error(error.message)
    }
}

// find one
export const findOneMembres = async ({ idMember }) => {
    // if (context.isAdmin === 'n'){
    //     throw new Error ("Vous n'etes pas Admin")
    // }
    let response = await getRepository(Membres).findOne({idMember})
    return response
}

// update
export const putMembres = async ({ firstNameMember, lastNameMember, emailMember, passwordMember, imgMember,  isAdmin,  idTechnologies }) => {
   
    if (!context.isAuth){
        throw new Error ("Vous n' avez pas d'autorisation")
    }
    if (context.isAdmin === 'n'){
        throw new Error ("Vous n'etes pas Admin")
    }

    const technologies = Promise.all ( JSON.parse(idTechnologies).map(idTechnologie=> {
        return  getRepository(Technologies).findOne({idTechnologie });
    }) );
    
    if(!(firstNameMember && lastNameMember && emailMember && passwordMember && imgMember & isAdmin & idTechnologies)) {
        throw new Error('modification refuser')
    }
    let membres = await getRepository(Membres).findOne(idMemnber);
        membres.firstNameMember =  firstNameMember 
        membres.lastNameMember = lastNameMember
        membres.emailMember = emailMember
        membres.idMemnber = imgMember
        membres.isAdmin = isAdmin
        membres.technologies = technologies
        if (passwordMember) {
            membres.passwordMember = await bcrypt.hash(passwordMember, 10)
        }
        const membre = await getRepository(Membres).save(membres);
        if (!membre) {
            throw new Error('modification refuser')
        }
        
        const token = jsonwebtoken.sign(
            { idMember: membre.idMember, 
              emailMember: membre.emailMember, 
              isAdmin: membre.isAdmin},
            process.env.JWT_SECRET,
            { expiresIn: '1d'}
        )
        return { token }
    
}

export const deleteMembres = async ({ idMember }, context) => {

    if (!context.isAuth){
        throw new Error ("Vous n' avez pas d'autorisation")
    }
    if (context.isAdmin === 'n'){
        throw new Error ("Vous n'etes pas Admin")
    }

    try {
        const membres = await getRepository(Membres).findOne({ idMember})
        await getRepository(Membres).remove(membres)
        return { action: true }
    } catch (error) {
        console.log(error)
        return { action: false }
    }
}

