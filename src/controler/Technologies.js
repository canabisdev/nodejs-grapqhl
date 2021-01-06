import "reflect-metadata";
import {getRepository} from "typeorm";
import {Technologies} from "../entity/Technologies";
import {Membres} from "../entity/Membres";
import {Projets} from "../entity/Projet";




// GetAll
export const getTechnologies = async () => {
    let response = await getRepository(Technologies).find({ relations:["membres" ,"projets"]} )
    if (response.length <= 0 ) {
        throw new Error("il n' y a pas de Technologies");
    }
    return response
}

// Ajouter
export const addTechnologies = async ({ imgTechnologies, nameTechnologies, contentsTechnologies, urlTechnologies, idMember,idProjets},context) => {
    if (!context.isAuth){
        throw new Error ("Vous n' avez  pas d'autorisation")
    }
    if (context.isAdmin === 'n'){
        throw new Error ("Vous n'etes pas Admin")
    }

    const membre = Promise.all ( JSON.parse(idMember).map(idMember=> {
        return  getRepository(Membres).findOne({idMember });
      }) );

    const projet = Promise.all ( JSON.parse(idProjets).map(idProjets=> {
        return  getRepository(Projets).findOne({idProjets });
    }) );

    const technologies = new Technologies()
    technologies.imgTechnologies = imgTechnologies
    technologies.nameTechnologies = nameTechnologies
    technologies.contentsTechnologies = contentsTechnologies
    technologies.urlTechnologies = urlTechnologies
    technologies.membre = membre
    technologies.projet = projet
   
    let response = await getRepository(Technologies).save(technologies)
    return response

}

// PUT
export const putTechnologies = async ({ idTechnologies,imgTechnologies, nameTechnologies, contentsTechnologies, urlTechnologies, idMember,idProjets},context) => {
   
    if (!context.isAuth){
        throw new Error ("Vous n' avez  pas d'autorisation")
    }
    if (context.isAdmin === 'n'){
        throw new Error ("Vous n'etes pas Admin")
    }

    const membre = Promise.all ( JSON.parse(idMember).map(idMember=> {
        return  getRepository(Membres).findOne({idMember });
      }));

    const projet = Promise.all ( JSON.parse(idProjets).map(idProjets=> {
        return  getRepository(Projets).findOne({idProjets });
    }));

    if(!(idTechnologies && imgTechnologies && nameTechnologies && contentsTechnologies && urlTechnologies, idMember, idProjets)) {
        throw new Error('modification imposible')
    }

    let technologies = await getRepository(Technologies).findOne({idTechnologies});
    technologies.imgTechnologies = imgTechnologies
    technologies.nameTechnologies = nameTechnologies
    technologies.contentsTechnologies = contentsTechnologies
    technologies.urlTechnologies = urlTechnologies
    technologies.membre = membre
    technologies.projet = projet
   
    let response = await getRepository(Technologies).save(technologies)
    return response



}

// find one
export const findOneTechnologies = async ({ idTechnologies }) => {
    
    let response = await getRepository(Technologies).findOne({idTechnologies})
    return response
}

export const deleteTechnologies = async ({ idTechnologies}, context) => {

    if (!context.isAuth){
        throw new Error ("Vous n' avez  pas d'autorisation")
    }
    if (context.isAdmin === 'n'){
        throw new Error ("Vous n'etes pas Admin")
    }

    try {
        const technologies = await getRepository(Technologies).findOne({idTechnologies})
        await getRepository(Technologies).remove(technologies)
        return { action: true }
    } catch (error) {
        console.log(error)
        return { action: false }
    }
}