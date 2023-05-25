// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
// Define a service using a base URL and expected endpoints
const base = process.env.NEXT_PUBLIC_BASE_URL
export const projectData = createApi({
    reducerPath: "projectData",
    baseQuery: fetchBaseQuery({
        baseUrl: base,
        // mode: "cors",
        prepareHeaders: (headers, { getState }) => {
            // setting headers
            const token = getState().token
            // headers.set('ngrok-skip-browser-warning',true)
            if (token) {
                headers.set("authorization", token)
            }
            return headers
        },
        credentials: "include"
    }),
    endpoints: (builder) => ({
        GetWorkFlows: builder.query({
            query: (username) => `/project/list?mcn=${username}`
        }),
        GetWorkFlowbyid: builder.query({
            query: (id) => `/project/get/${id}`
        }),
        GetTaskviaProjectID: builder.query({
            query: (id) => `/task/get/project/${id}`
        }),
        GetNotifications: builder.query({
            query: (user) => `/notification/list?mcn_num=${user}`
        }),
        updateNotification: builder.mutation({
            query: (id) => ({
                url: `/notification/update/${id}`,
                method: "PUT"
            })
        }),
        GetUserProfile: builder.query({
            query: (userName) => `/ncr/user/profile/${userName}`
        }),
        PostSiteReadinessAkgmt: builder.mutation({
            query: (id, data) => ({
                url: `/project/update/${id}`,
                method: "PUT",
                body: data
            })
        }),
        // Warning Project reset API should be handled carefully
        projectREsetApi: builder.mutation({
            query: (id) => ({
                url: `/project/reset/${id}`,
                method: "POST",
                body: id
            })
        }),
        UpdateTaskByName: builder.mutation({
            query: (data) => ({
                url: `/task/sitereadiness/update`,
                method: "PUT",
                body: data
            })
        }),
        GetProjectsDetails: builder.query({
            query: (user) => `/project/list?mcn=${user}`
        }),
        GetTaskByTaskName: builder.mutation({
            query: (id, task_name) => ({
                url: `/task/get/custom/${id}`,
                method: "POST",
                body: { task_name: task_name }
            })
        }),
        DocumentUpload: builder.mutation({
            query: (id, task_name) => ({
                url: `/taskviaProjectIDandtaskname/${id}`,
                method: "POST",
                body: { task_name: task_name }
            })
        }),
        Actionsget: builder.query({
            query: (id) => `/task/actions/${id}`
        }),
        DocumentsGet: builder.query({
            query: (id) => `/document/get/project/${id}`
        }),
        Appstatus: builder.query({
            query: () => `/app/status`
        }),
        UpdateData: builder.mutation({
            query: (data) => ({
                url: `/task/update/custom/${data.record_id_quickbase}`,
                method: "POST",
                body: data
            })
        }),
        addDocuments: builder.mutation({
            query: (data) => ({
                url: `/document/create`,
                method: "POST",
                body: data
            })
        }),
        deleteDocuments: builder.mutation({
            query: (id) => ({
                url: `/document/delete/${id}`,
                method: "DELETE"
            })
        })
    })
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
    useUpdateDataMutation,
    useDeleteDocumentsMutation,
    useProjectREsetApiMutation,
    useAppstatusQuery,
    useLazyAppstatusQuery,
    useLazyGetWorkFlowsQuery,
    useLazyGetWorkFlowbyidQuery,
    useLazyDocumentsGetQuery,
    useLazyGetTaskviaProjectIDQuery,
    useLazyGetNotificationsQuery,
    useUpdateNotificationMutation,
    useLazyGetUserProfileQuery,
    usePostSiteReadinessAkgmtMutation,
    useUpdateTaskByNameMutation,
    useLazyGetProjectsDetailsQuery,
    useGetTaskByTaskNameMutation,
    useDocumentUploadMutation,
    useLazyActionsgetQuery,
    useAddDocumentsMutation
} = projectData
