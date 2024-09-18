import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { selectCurrentToken } from '../../features/authSlice';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: "https://journee-api-accx.vercel.app/api",
    prepareHeaders: (headers, { getState }) => {
      const token = selectCurrentToken(getState());
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Journal', 'Entry'], // Define the tag for invalidation
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
      providesTags: ['Journal'],
    }),
    getJournalById: builder.query({
      query: (id) => `/journals/${id}`,
      providesTags: ['Journal'],
    }),
    createJournal: builder.mutation({
      query: (newJournal) => ({
        url: '/journals',
        method: 'POST',
        body: newJournal,
      }),
      invalidatesTags: ['Journal'],
    }),
    updateJournal: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/journals/${id}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: ['Journal'],
    }),
    deleteJournal: builder.mutation({
      query: (id) => ({
        url: `/journals/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Journal'],
    }),

    // Entries Endpoints
    getEntriesByJournalId: builder.query({
      query: (journalId) => `/entries/journal/${journalId}`,
      providesTags: (result, error, journalId) => [{ type: 'Entry', id: journalId }],
    }),
    getEntryByEntryId: builder.query({
      query: (entryId) => `/entries/${entryId}`,
      providesTags: (result, error, entryId) => [{ type: 'Entry', id: entryId }],
    }),
    createEntry: builder.mutation({
      query: (newEntry) => ({
        url: '/entries',
        method: 'POST',
        body: newEntry,
      }),
      invalidatesTags: (result, error, { journal }) => [{ type: 'Entry', id: journal }],
    }),
    updateEntry: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/entries/${id}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: (result, error, { journal }) => [{ type: 'Entry', id: journal }],
    }),
    deleteEntry: builder.mutation({
      query: (id) => ({
        url: `/entries/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { journal }) => [{ type: 'Entry', id: journal }],
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
  useGetEntryByEntryIdQuery,
  useCreateEntryMutation,
  useUpdateEntryMutation,
  useDeleteEntryMutation,
} = apiSlice;
