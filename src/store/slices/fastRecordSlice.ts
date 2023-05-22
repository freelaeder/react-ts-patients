import {createEntityAdapter, createSlice, Draft, EntityState, PayloadAction} from "@reduxjs/toolkit";
import {AppState} from "@store/index";


// 初始状态类型(在实体适配器中添加的额外状态)
type ExtraState = {
    current: number;
    pageSize: number;
    hasMore: boolean;
};

// 状态切片对象类型
type FastRecordState = EntityState<ConsultOrder> & ExtraState;

// 额外的初始状态
const initialState: ExtraState = {
    current: 1,
    pageSize: 10,
    hasMore: true,
};

// 创建用于管理极速问诊订单记录的实体适配器
const fastRecordsAdapter = createEntityAdapter<ConsultOrder>()

export const fastRecordSlice = createSlice<FastRecordState,{
    // 保存问诊订单记录
    saveConsultOrder(state:Draft<FastRecordState>,action:PayloadAction<ConsultOrder[]>):void;
    // 更新页码
    updateCurrent(state: Draft<FastRecordState>): void;
    // 更新是否还有更多数据
    updateHasMore(state:Draft<FastRecordState>,action:PayloadAction<boolean>):void;
    // 移除全部
    removeConsultOrder(state:Draft<FastRecordState>):void
},'fastRecord'>({
    name:'fastRecord',
    initialState:fastRecordsAdapter.getInitialState(initialState),
    reducers:{
        // 保存问诊订单记录
        saveConsultOrder: fastRecordsAdapter.addMany,
        // 更新页码
        updateCurrent(state) {
            state.current = state.current + 1;
        },
        // 更新是否还有更多数据
        updateHasMore(state, action) {
            state.hasMore = action.payload;
        },
        // 移除全部
        removeConsultOrder(state){
            state.current = 1
            fastRecordsAdapter.removeAll(state)
        }
    }
})


export const {saveConsultOrder,updateCurrent,updateHasMore,removeConsultOrder} = fastRecordSlice.actions

// 问诊订单记录选择器
export const fastRecordSelectors = fastRecordsAdapter.getSelectors<AppState>(state =>
state.fastRecord)

// 获取订单问诊记录
export const selectFastRecords = fastRecordSelectors.selectAll
// 获取页码
export const selectCurrent = (state: AppState) => state.fastRecord.current;
// 获取每页显示数据条数
export const selectPageSize = (state: AppState) => state.fastRecord.pageSize;
// 获取是否还有更多数据的标识
export const selectHasMore = (state: AppState) => state.fastRecord.hasMore;