console.log("✅ API Key:", import.meta.env.VITE_RAPIDAPI_KEY);
console.log("✅ Base URL:", import.meta.env.VITE_BASE_URL);

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define API headers
const cryptoApiHeaders = {
  "X-RapidAPI-Key": import.meta.env.VITE_RAPIDAPI_KEY,
  "X-RapidAPI-Host": import.meta.env.VITE_RAPIDAPI_HOST,
};

// Function to create API requests
const createRequest = (url) => ({
  url,
  headers: cryptoApiHeaders,
});

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  endpoints: (builder) => ({
    // ✅ Get the list of cryptocurrencies
    getCryptos: builder.query({
      query: (count) => createRequest(`/coins?limit=${count}`),
    }),

    // ✅ Get global market stats
    getCryptoStats: builder.query({
      query: () => createRequest(`/stats`),
    }),

    // ✅ Get details of a specific cryptocurrency
    getCryptoDetails: builder.query({
      query: (coinId) => createRequest(`/coin/${coinId}`),
    }),

    // ✅ Get historical price data for a cryptocurrency
    getCryptoHistory: builder.query({
      query: ({ coinId, timePeriod }) =>
        createRequest(`/coin/${coinId}/history?timePeriod=${timePeriod}`),
    }),
  }),
});

export const {
  useGetCryptosQuery,
  useGetCryptoStatsQuery,
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} = cryptoApi;
