import {
    addMembres, 
    getMembres,
    putMembres,
    deleteMembres,
    findOneMembres,
    login
} from '../controler/Membres'

import {
    getTechnologies, 
    addTechnologies,
    deleteTechnologies,
    putTechnologies,
    findOneTechnologies 
} from '../controler/Technologies'

import {
    getProjets , 
    addProjets ,
    deleteProjets,
    putProjets,
    findOneProjet
} from '../controler/Projets'

import {
    addTypeTech,
    deleteTech,
    getTypeTech,
    putTypeTech

} from '../controler/TypeTechnologies'


export const root = {
    // Menbres
    getMembres: (req, context) => getMembres(req, context),
    addMembres: (req, context) => addMembres(req, context),
    deleteMembres: (req, context) => deleteMembres(req, context,idMemnber),
    findOneMembres: (req , context) => findOneMembres(req , context),
    putMembres: (req, context) => putMembres(req, context),
    login: (data) => login(data),

    // Technologies
    getTechnologies: () => getTechnologies(),
    findOneTechnologies: ({idTechnologies}) => findOneTechnologies(idTechnologies),
    addTechnologies: (req, context) => addTechnologies(req, context),
    deleteTechnologies: ({req, context}) => deleteTechnologies(req, context,idTechnologies),
    putTechnologies: (req, context) => putTechnologies(req, context),

    //Projets
    getProjets: () => getProjets(),
    findOneProjet:({idProjets}) => findOneProjet(idProjets),
    addProjets: (req, context) => addProjets(req, context),
    deleteProjets: ({req, context}) => deleteProjets(req, context,idProjets),
    putProjets:(req, context) => putProjets(req, context),
   

    //TypeTechnologies
    getTypeTech:() => getTypeTech(),
    findOneTypeTech:({idTypeTechno}) => findOneTypeTech(idTypeTechno),
    addTypeTech:(req, context) => addTypeTech(req, context),
    deleteTech: ({req, context}) => deleteTech(req, context,idTypeTechno),
    putTypeTech: (req, context) => putTypeTech(req, context)


}
