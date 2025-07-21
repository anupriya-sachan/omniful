import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';

const initialState = [];

const auditSlice = createSlice({
  name: 'audit',
  initialState,
  reducers: {
    addLog(state, action) {
      const { actionType, performedBy, details } = action.payload;
      state.push({
        id: uuid(),
        timestamp: new Date().toISOString(),
        action: actionType,
        performedBy,
        details,
      });
    },
    clearLogs() {
      return [];
    }
  }
});

export const { addLog, clearLogs } = auditSlice.actions;
export const auditReducer = auditSlice.reducer;
