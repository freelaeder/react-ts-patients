import {createSlice, Draft, PayloadAction} from "@reduxjs/toolkit";


export interface ConsultState {
    consult: PartialConsult
}

// 管理问诊信息
export const consultSlice = createSlice<ConsultState, {
    // 记录问诊信息
    saveConsult: (state: Draft<ConsultState>, action: PayloadAction<PartialConsult>) => void;
    // 清除问诊信息
    clearConsult: (state: Draft<ConsultState>) => void;
}, 'consult'>({
    name: 'consult',
    initialState: {
        // 问诊信息
        consult: {}
    },
    reducers: {
        saveConsult: (state, action) => {
            state.consult = {
                ...state.consult,
                ...action.payload
            }
        },
        clearConsult: (state) => {
            state.consult = {}
        }
    }
})


// 导出操作方法
export const {saveConsult,clearConsult} = consultSlice.actions