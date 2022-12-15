import "reflect-metadata"
import { ApolloServer } from "apollo-server-micro";
import { buildSchema, Resolver, Query, Arg, ObjectType, Field, ID } from "type-graphql";

@ObjectType()
export class Dog {
    @Field(() => ID)
    name: string
}

@Resolver(Dog)
export class DogsResolver {
    @Query(() => [Dog])
    dogs(): Dog[] {
        return [
            { name: "dog"},
            { name: "dog_two" }
        ]
    }
}

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