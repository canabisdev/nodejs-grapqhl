import cors from "cors"
import express from "express"
import { createConnection } from "typeorm"
import { graphqlHTTP } from 'express-graphql'
import { root } from './roots/Root'
import { schema } from './roots/Schema'
import {Verify } from './verify/verify'

export class Application {
    app : express.Application
    
    constructor(){
        this.app = express()
        this.app.use(cors())
        this.app.use((req, res, next) => {
            Verify(req, res, next)
        })
       
        this.app.use('/graphql', graphqlHTTP((request, response, next) => {
            return {
                schema,
                rootValue: root,
                graphiql: true,
                context: request
            }
        }))   
    }

    setGraphqlHttp = () => {
    }

    setupDbAndServer = async() =>{
        await createConnection()
        await this._startServer()
    }  
    
    async _startServer() : Promise<boolean> {
        return await new Promise((resolve, reject)=>{
            const port = process.env.PORT || 4000
            this.app.listen(port, () => { //nova
              console.log(`Running a GraphQL API server at localhost:${port}/graphql`);
            })
        })
    }
}

