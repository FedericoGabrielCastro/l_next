import "reflect-metadata"
import { ApolloServer } from "apollo-server-micro";
import { buildSchema, Resolver, Query, Arg, ObjectType, Field, ID } from "type-graphql";

import { DogsResolver } from "../../src/schema/dogs.resolver";

// Scheme dogs.
const schema = await buildSchema({
    resolvers: [DogsResolver]
})

// Intialice new apollo server.
const server = new ApolloServer({
    schema
})

// Don´t get the body on request.
export const config = {
    api: {
        bodyParser: false
    }
}

// Initialize server.
const startServer = server.start()

// Handle initialize server.
export default async function handleStartServer(req, res) {
    await startServer
    await server.createHandler({path: "/api/graphql"}) (req, res)
}