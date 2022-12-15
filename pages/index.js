import { dehydrate, useQuery } from 'react-query'
import Head from 'next/head'
import { getDogs, queryClient } from '../src/api'

export async function getServerSideProps() {
    await queryClient.prefetchQuery("dogs", () => getDogs())
    
    return {
        props: {
            dehydratedState: dehydrate(queryClient)
        }
    }
}


export default function Home() {
    const { data } = useQuery(["dogs"], () => getDogs())

    return (
        <div>
            {JSON.stringify(data)}
        </div>
    )
}
