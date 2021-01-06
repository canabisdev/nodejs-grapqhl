import "reflect-metadata";
import {getRepository} from "typeorm";
import {TypeTechnologies} from "../entity/TypeTechnologies";
import {Technologies} from "../entity/Technologies";





// GetAll
export const getTypeTech = async () => {
    let response = await getRepository(TypeTechnologies).find({ relations:["technologies"]  })
    if (response.length <= 0 ) {
        throw new Error("il n' y a pas de Type Technologies");
    }
    return response
}

// export const getTypeTech = async () => {
//     let response = await 
//                    getRepository(TypeTechnologies)
//                   .createQueryBuilder("typeTech")
//                   .leftJoinAndSelect("typeTech.technologies","technologie")
//                   .getMany();
//     if (response.length <= 0 ) {
//         throw new Error("il n' y a pas de Type Technologies");
//     }
//     return response
// }

// Ajouter
export const addTypeTech = async ({ nameTypeTechno},context) => {
    
    if (!context.isAuth){
        throw new Error ("Vous n' avez  pas d'autorisation")
    }
    if (context.isAdmin === 'n'){
        throw new Error ("Vous n'etes pas Admin")
    }

    const typetech = new TypeTechnologies()
    typetech.nameTypeTechno = nameTypeTechno
    
    let response = await getRepository(TypeTechnologies).save(typetech)
    return response

}

//Put
export const putTypeTech = async ({idTypeTechno, nameTypeTechno, idTechnologies},context) => {
    
    if (!context.isAuth){
        throw new Error ("Vous n' avez  pas d'autorisation")
    }
    if (context.isAdmin === 'n'){
        throw new Error ("Vous n'etes pas Admin")
    }

    const technologies = await Promise.all( JSON.parse(idTechnologies).map(id=> {
        return  getRepository(Technologies).findOne({idTechnologies: id });
    }));
    

   // console.log(nameTypeTechno,idTechnologies ,technologies);

    if(!(idTypeTechno && nameTypeTechno &&  idTechnologies)) {
        throw new Error('modification imposible')
    }

    let typetech = await getRepository(TypeTechnologies).findOne({idTypeTechno},{ relations: ["technologies"] });
    console.log(typetech)
    typetech.nameTypeTechno =  nameTypeTechno
    typetech.idTechnologies =  technologies
   
   
    
    let response = await  getRepository(TypeTechnologies).save(typetech)
    return response

}

// find one
export const findOneTypeTech = async ({ idTypeTechno}) => {
    
    let response = await getRepository(TypeTechnologies).findOne({idTypeTechno})
    return response
}



export const deleteTech = async ({ idTypeTechno},context) => {

    if (!context.isAuth){
        throw new Error ("Vous n' avez  pas d'autorisation")
    }
    if (context.isAdmin === 'n'){
        throw new Error ("Vous n'etes pas Admin")
    }

    try {
        const technologies = await getRepository(TypeTechnologies).findOne({idTypeTechno})
        await getRepository(TypeTechnologies).remove(technologies)
        return { action: true }
    } catch (error) {
        console.log(error)
        return { action: false }
    }
}