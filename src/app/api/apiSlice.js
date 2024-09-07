import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { selectCurrentToken } from '../../features/authSlice';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api',
    prepareHeaders: (headers, { getState }) => {
      const token = selectCurrentToken(getState());
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // Authentication Endpoints
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (newUser) => ({
        url: '/auth/register',
        method: 'POST',
        body: newUser,
      }),
    }),

    // Journals Endpoints
    getJournals: builder.query({
      query: () => '/journals',
    }),
    getJournalById: builder.query({
      query: (id) => `/journals/${id}`,
    }),
    createJournal: builder.mutation({
      query: (newJournal) => ({
        url: '/journals',
        method: 'POST',
        body: newJournal,
      }),
    }),
    updateJournal: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/journals/${id}`,
        method: 'PUT',
        body: patch,
      }),
    }),
    deleteJournal: builder.mutation({
      query: (id) => ({
        url: `/journals/${id}`,
        method: 'DELETE',
      }),
    }),

    // Entries Endpoints
    getEntriesByJournalId: builder.query({
      query: (journalId) => `/entries/journal/${journalId}`,
    }),
    createEntry: builder.mutation({
      query: (newEntry) => ({
        url: '/entries',
        method: 'POST',
        body: newEntry,
      }),
    }),
    updateEntry: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/entries/${id}`,
        method: 'PUT',
        body: patch,
      }),
    }),
    deleteEntry: builder.mutation({
      query: (id) => ({
        url: `/entries/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetJournalsQuery,
  useGetJournalByIdQuery,
  useCreateJournalMutation,
  useUpdateJournalMutation,
  useDeleteJournalMutation,
  useGetEntriesByJournalIdQuery,
  useCreateEntryMutation,
  useUpdateEntryMutation,
  useDeleteEntryMutation,
} = apiSlice;
