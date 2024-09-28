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
    // Add the logout mutation in the apiSlice
    logout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
        credentials: 'include',  // Ensure that httpOnly cookies are sent
      }),
      async onQueryStarted(arg, { dispatch }) {
        // Clear the cached data for all queries and mutations
        dispatch(apiSlice.util.resetApiState()); 

        // Optionally, clear the auth state
        dispatch(logOut());  // This should be your logOut action from authSlice
      },
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
      invalidatesTags: (result, error, { id, journal }) => [
        { type: 'Entry', id: journal },
        { type: 'Entry', id: id },  // Ensure the specific entry is refetched
      ],
    }),
    deleteEntry: builder.mutation({
      query: ({ id }) => ({
        url: `/entries/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { id, journal }) => [
        { type: 'Entry', id: journal },
        { type: 'Entry', id: id },  // Invalidate the deleted entry
      ],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
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
