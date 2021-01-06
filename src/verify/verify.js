const jwt = require('jsonwebtoken');
import {findOneMembres} from 'src/controler/Membres';
import { Membres } from '../entity/Membres';

export const Verify = async (req, res, next) => {
     const authHeader = req.get('Authorization');
     //console.log({authHeader});
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        if (!token || token === '') {
            req.isAuth = false;
            req.isAdmin = "n";
            next();
        } else {
            let decodedToken;
            try {
                decodedToken = jwt.verify(token, process.env.JWT_SECRET);
                if (!token || !decodedToken.isAdmin) {
                    return response.status(401).json({ error: 'token manquant ou invalide' })
                }
                let membre = await Membres.findOne(decodedToken.idMember );
                console.log({membre});
                   
            } catch (err) {
                req.isAuth = false;
                req.isAdmin = "n";
                next();
            }
        }
    }
        
    
    //         if (!decodedToken) {
    //             req.isAdmin = false;
    //             req.isAuth = false;
    //             next();
    //         } else {
    //             req.isAuth = true;
    //             req.isAdmin = "y";
    //             req.userId = decodedToken.userId;
    //             next();
    //         }
    //     }
    //
    // } else {
       
        req.isAuth = false;
        req.isAdmin = "n";
       // console.log(req);
        next();
    // }
}
