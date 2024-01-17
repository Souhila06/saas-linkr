import { Token } from '@mui/icons-material';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// interface LoginUserMutationBody {
//     username: string;
//     password: string;
//   }

export const authApi = createApi({


  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({

    baseUrl: "http://localhost:8080",
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${localStorage.getItem('accessToken')}`)
      return headers
    },
  }),
  endpoints: (builder) => ({

    loginUser: builder.mutation({
      query: (body: { username: string; password: string }) => {
        return {
          url: "/api/auth/login",
          method: "POST",
          body,
        };
      },
    }),
    registerUser: builder.mutation({
      query: (body: { username: string; email: string; password: string; role: 'offreur' | 'demandeur' }) => {
        return {
          url: "/api/auth/register",
          method: "POST",
          body,
        };
      },
    }),

    forgotPassword: builder.mutation({
      query: (body: { email: string }) => {
        return {
          url: "/api/auth/forgot-password",
          method: "POST",
          body,
        };
      },
    }),

    logout: builder.mutation({
      query: () => {
        return {
          url: "/api/auth/logout",
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        };
      },
    }),
    verifyEmail: builder.query({
      query: (token: string) => ({
        url: `/api/auth/verify?token=${token}`,
        method: "GET",
      }),
    }),

    listOffreurs: builder.query({
      query: () => '/api/offreurs',
    }),
    listDemandeurs: builder.query({
      query: () => '/api/demandeurs',
     
    }),
    createDemandeur: builder.mutation({
      query: (body: {
        fname: string;
        lname: string;
        phone: string;
        address: string;
        country: string;
        city: string;
        zip: string;
      }) => {
        return {
          url: "/api/demandeurs/create",
          method: "POST",
          body,
        };
      },
    }),
     modifyDemandeur: builder.mutation({
      query: (body: {
        id: string;
        fname?: string;
        lname?: string;
        phone?: string;
        address?: string;
        country?: string;
        city?: string;
        zip?: string;
      }) => {
        return {
          url: `/api/demandeurs/${body.id}/update`, 
          method: "PUT",  
          body,
        };
      },
    }),

deleteDemandeur: builder.mutation({
  query: (id: number) => ({
    url: `/api/demandeurs/${id}/delete`,
    method: 'DELETE',
  }),
}),

    
  }),
})



export const { useLoginUserMutation, useRegisterUserMutation, useForgotPasswordMutation, useLogoutMutation, useListOffreursQuery, useVerifyEmailQuery,useListDemandeursQuery, useCreateDemandeurMutation ,useModifyDemandeurMutation,useDeleteDemandeurMutation } = authApi;