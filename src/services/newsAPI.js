import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const NewsHeaders={
        'x-bingapis-sdk': 'true',
        'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
        'x-rapidapi-key': '2dc2a95318msh7da88e45ee4e740p152cccjsn91528ee15440'
}

const baseUrl = 'https://bing-news-search1.p.rapidapi.com'
const createRequest = (url) => ({
    url,
    headers: NewsHeaders
})
export const NewsApi = createApi({
    reducerPath: 'NewsApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder) => ({
        getNews: builder.query({
            query: ({newsCategory,count})=> createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`)
        })
    })
})

export const {
    useGetNewsQuery,
} = NewsApi;