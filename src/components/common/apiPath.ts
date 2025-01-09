
export const apiPath = {
    GetChatHistory:'/api/TrackerWeb/GetChatHistory',
    GetPost:'posts',
    GetUsers:'users',
    GetDepartments:'/api/UserManager/GetDepartments',
    GetDesignations:'/api/UserManager/GetDesignations',
    AddDepartment:'/api/UserManager/AddDepartment',
    DeleteDepartment:'/api/UserManager/DeleteDepartment'
} as const

export type ApiPathKeys = keyof typeof apiPath