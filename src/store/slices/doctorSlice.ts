import {createEntityAdapter, createSlice, Draft, EntityState, PayloadAction} from "@reduxjs/toolkit";
import {AppState} from "@store/index";

// 创建用于管理医生列表的实体适配器
const doctorEntityAdaptor = createEntityAdapter<Doctor>()
export const doctorSlice = createSlice<
    EntityState<Doctor>,
    {
        // 保存医生列表
        saveDoctors: (state: Draft<EntityState<Doctor>>, action: PayloadAction<Doctor[]>) => void;
        // 根据医生 id 切换其被当前登录用户关注与取消关注的标识
        toggleLikeFlag(
            state: Draft<EntityState<Doctor>>,
            action: PayloadAction<{ id: string; likeFlag: 0 | 1 }>
        ): void;
    },
    'doctorSlice'
>({
    name: 'doctorSlice',
    initialState: doctorEntityAdaptor.getInitialState(),
    reducers: {
        // 保存医生列表
        saveDoctors: doctorEntityAdaptor.addMany,
        toggleLikeFlag(state: Draft<EntityState<Doctor>>, action: PayloadAction<{ id: string; likeFlag: 0 | 1 }>) {
            doctorEntityAdaptor.updateOne(state,{
                id:action.payload.id,
                changes:{
                    likeFlag:action.payload.likeFlag
                }
            })
        }

    }
})
// 导出用于获取医生列表状态的状态选择器
export const doctorSelectors = doctorEntityAdaptor.getSelectors((state: AppState) => state.doctorSlice)
// 导出用于更新医生列表状态的 action creator 函数
export const {saveDoctors,toggleLikeFlag} = doctorSlice.actions