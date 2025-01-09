import { createSlice } from "@reduxjs/toolkit"
import { ApiPathKeys } from "../../../components/common/apiPath"
import { RootState } from "../../store"

interface IInitialState {
    paramsRef?:{params: object, urlKey: ApiPathKeys } | null
}

const initialState:IInitialState = {
    paramsRef: null
}

export const instantSlice = createSlice({
    name:'caching',
    initialState,
    reducers: {
        cacheAction: (state,action) =>{
            state.paramsRef = {...action.payload}
        }
    }
})

export const { cacheAction } = instantSlice.actions

export const selectCache = (state:RootState) => state?.cache?.paramsRef

export default instantSlice.reducer