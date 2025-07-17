import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    totalLogs:0,
    lastLog:"",
    loading:false,
    logs:[]
}

const auditSlice = createSlice({
    name:'audits',
    initialState,
    reducers:{
        addAuditEntry: (state,action) => {
            if (state.logs.length > 100) state.logs.pop();
            state.totalLogs+=1;
            state.lastLog = Date.now();
            state.logs.push(action.payload);
        },
        clearAuditLogs: (state,action) => {
            state.logs=[];
        },



    }
})

export const auditReducer = auditSlice.reducer;
export const {addAuditEntry,clearAuditLogs} = auditSlice.actions;