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
    getOffreurByID: builder.mutation({
      query: (body: { id: string }) => {
        return {
          url: "/api/offreurs",
          method: "GET",
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
    createOffreur: builder.mutation({
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
          url: "/api/offreurs/create",
          method: "POST",
          body,
        };
      },
    }),
    modifyOffreur: builder.mutation({
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
          url: `/api/offreurs/${body.id}/update`, 
          method: "PUT",  
          body,
        };
      },
    }),
    deleteOffreur: builder.mutation({
      query: (id: number) => ({
        url: `/api/offreurs/${id}/delete`,
        method: 'DELETE',
      }),
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
showOffreur: builder.query({
  query: (id: string) => ({
    url: `/api/offreurs/${id}`,
    method: 'GET',
  }),
}),
showExperience: builder.query({
  query: (id: string) => ({
    url: `/api/offreur/${id}/experiences`,
    method: 'GET',
  }),
}),
showListExperience: builder.query({
  query: (id) => `/api/offreur/${id}/experiences`,
}),

showListEvaluation: builder.query({
  query: () => `/api/offreur/evaluations`,
}),

createDemande: builder.mutation({
  query: ({body,demandeurId}) => ({
    url: `/api/demandeur/${demandeurId}/demandes/send`,
    method: 'POST',
    body
  }),
}),

listDemande: builder.query({
  query: (id: string) => `/api/offreur/${id}/demandes`,
}),
listDemandeDemandeur: builder.query({
  query: (id: string) => `/api/demandeur/${id}/demandes`,
}),
listSkills: builder.query({
  query: () => `/api/skills`, 
}),
useShowListExperienceQuery: builder.query({
  query: () => `/api/skills`,
}),
showDemandeQuery: builder.query({
  query: ({ offreurId, demandeId }) => ({
    url: `/api/offreur/${offreurId}/demandes/${demandeId}`,
    method: 'GET',
  }),
}),
showDemandeDemandeurQuery: builder.query({
  query: ({ demandeurId, demandeId }) => ({
    url: `/api/demandeur/${demandeurId}/demandes/${demandeId}`,
    method: 'GET',
  }),
}),
traiterDemandeMutation: builder.mutation({
  query: ({ body,offreurId, id }) => ({
    url: `/api/offreur/${offreurId}/demandes/${id}/traiter`,
    method: 'PUT',
    body
  }),
  
}),
refuserDemandeMutation: builder.mutation({
  query: ({ body, offreurId, id }) => ({
    url: `/api/offreur/${offreurId}/demandes/${id}/refuser`,
    method: 'PUT',
    body
  }),
}),
accepterDemandeMutation: builder.mutation({
  query: ({ body, offreurId, id }) => ({
    url: `/api/offreur/${offreurId}/demandes/${id}/accepter`,
    method: 'PUT',
    body
  }),
}),

addSkillsMutation: builder.mutation({
  query: ({ body, offreurId  }) => ({
    url: `/api/offreurs/${offreurId}/addSkills`,
    method: 'PUT',
    body
  }),
}),
createExperienceMutation: builder.mutation({
  query: ({ offreurId, body }) => ({
    url: `/api/offreur/${offreurId}/experiences/add`,
    method: 'POST',
    body,
  }),
}),
showSkill: builder.query({
  query: (id) => ({
    url: `/api/skills/${id}`,
    method: 'GET',
  }),
}),
createCheckoutSessionMutation: builder.mutation({
  query: ({ demandeurId, demandeId }) => ({
    url: `/api/demandeur/${demandeurId}/demandes/${demandeId}/create-checkout-session`,
    method: 'PUT',
  }),
}),
  }),



});



export const { useLoginUserMutation, useRegisterUserMutation, useForgotPasswordMutation, useLogoutMutation, useListOffreursQuery, useVerifyEmailQuery,useListDemandeursQuery, useCreateDemandeurMutation ,useModifyDemandeurMutation,useDeleteDemandeurMutation ,useGetOffreurByIDMutation,useShowOffreurQuery,useShowExperienceQuery,useShowListExperienceQuery,useShowListEvaluationQuery,useCreateDemandeMutation, useListDemandeQuery,useTraiterDemandeMutationMutation,useRefuserDemandeMutationMutation,useAccepterDemandeMutationMutation,useShowDemandeQueryQuery,useAddSkillsMutationMutation,useListSkillsQuery,useCreateExperienceMutationMutation,useCreateOffreurMutation,useModifyOffreurMutation,useDeleteOffreurMutation,useShowSkillQuery,useCreateCheckoutSessionMutationMutation,useListDemandeDemandeurQuery,useShowDemandeDemandeurQueryQuery} = authApi;