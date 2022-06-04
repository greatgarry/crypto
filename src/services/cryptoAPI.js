import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'
const cryptoApiHeaders = {
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
     'x-rapidapi-key': '2dc2a95318msh7da88e45ee4e740p152cccjsn91528ee15440' 
}
const baseUrl = 'https://coinranking1.p.rapidapi.com';

const createRequest = (url) => ({
    url,
    headers: cryptoApiHeaders,
})

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder) => ({
        getCryptos: builder.query({
            query: (count)=> createRequest(`/coins?limit=${count}`)
        }),
        getCryptosDetails: builder.query({
            query: (coinId) => createRequest(`/coin/${coinId}`)
        }),
        getCryptosHistory: builder.query({
            query: ({coinId,timePeriod}) => createRequest(`/coin/${coinId}/history?timePeriod=${timePeriod}`)
        })
    })
})

export const {
    useGetCryptosQuery,
    useGetCryptosDetailsQuery,
    useGetCryptosHistoryQuery
} = cryptoApi;