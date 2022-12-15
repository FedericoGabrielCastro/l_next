import { GraphQLClient } from "graphql-request";
import { QueryClient } from "react-query";
import { getSdk } from "./generated/graphql"; 

// graphql client url
const gqlClient = new GraphQLClient("http://localhost:3000/api/graphql")
export const { getDogs } = getSdk(gqlClient)

// react query client.
export const queryClient= new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false
        }
    }
})