import "reflect-metadata";
import {getRepository} from "typeorm";
import {Projets} from "../entity/Projet"
import {Technologies} from "../entity/Technologies";



// GetAll
export const getProjets = async (req, context) => {

    
    let response = await getRepository(Projets).find({ relations:["technologies"]  })
    if (response.length <= 0 ) {
        throw new Error("il n' y a pas de Projets");
    }
    return response
}

// Ajouter
export const addProjets = async ({ imgProjets, titleProjets, contentProjets, updateAt, aimeProjets, idTechnologies }, context) => {
   
    if (!context.isAuth){
        throw new Error ("Vous n' avez  pas d'autorisation")
    }
    if (context.isAdmin === 'n'){
        throw new Error ("Vous n'etes pas Admin")
    }

  const technologies = Promise.all ( JSON.parse(idTechnologies).map(idTechnologie=> {
    return  getRepository(Technologies).findOne({idTechnologie });
  }) );

  const project = new Projets()
  project.imgProjets = imgProjets
  project.titleProjets = titleProjets
  project.contentProjets = contentProjets
  project.aimeProjets = aimeProjets
  project.updateAt = updateAt
  project.technologies = technologies
  

  let response = await getRepository(Projets).save(project)
  
  return response

}

// PUT
export const putProjets = async ({idProjets, imgProjets, titleProjets, contentProjets, updateAt, aimeProjets, idTechnologies }, context) => {
    
    if (!context.isAuth){
        throw new Error ("Vous n' avez  pas d'autorisation")
    }
    if (context.isAdmin === 'n'){
        throw new Error ("Vous n'etes pas Admin")
    }

    const technologies = Promise.all ( JSON.parse(idTechnologies).map(idTechnologie=> {
        return  getRepository(Technologies).findOne({idTechnologie });
    }) );

    if(!(idProjets && imgProjets && titleProjets && contentProjets && updateAt, aimeProjets, idTechnologies)) {
        throw new Error('modification imposible')
    }
    let projet = await getRepository(Projets).findOne({idProjets});
    projet.imgProjets = imgProjets
    projet.titleProjets = titleProjets
    projet.contentProjets = contentProjets
    projet.updateAt = updateAt
    projet.aimeProjets = aimeProjets
    projet.technologies = technologies

    const response = await getRepository(Projets).save(projet);
    return response


}

// find one
export const findOneProjet = async ({ idProjets }) => {
    
    let response = await getRepository(Projets).findOne({idProjets})
    return response
}



export const deleteProjets = async ({ idProjets}, context) => {
    
    if (!context.isAuth){
        throw new Error ("Vous n' avez pas d'autorisation")
    }
    if (context.isAdmin === 'n'){
        throw new Error ("Vous n'etes pas Admin")
    }

    try {
        const projet = await getRepository(Projets).findOne({idProjets})
        await getRepository(Projets).remove(projet)
        return { action: true }
    } catch (error) {
        console.log(error)
        return { action: false }
    }
}
