
export const apiPath = {
    GetChatHistory:'/api/TrackerWeb/GetChatHistory',
    GetPost:'posts',
    GetUsers:'users'
} as const

export type ApiPathKeys = keyof typeof apiPath