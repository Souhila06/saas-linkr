import {createApi ,fetchBaseQuery} from '@reduxjs/toolkit/query/react';

// interface LoginUserMutationBody {
//     username: string;
//     password: string;
//   }
  
export const authApi = createApi({

    
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl:"http://localhost:8080",
    }),
    endpoints : (builder)=>({

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
            query: (body: { username: string; email: string ; password: string; role:'offreur' | 'demandeur' }) => {
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
            query: (body: {}) => {
              return {
                url: "/api/auth/logout",
                method: "POST",
                body,
              };
            },
          }),
          
    }),
   
})

export const {useLoginUserMutation ,useRegisterUserMutation,useForgotPasswordMutation, useLogoutMutation } = authApi;