import {apiSlice} from "@store/apiSlice/index";
import {Image} from "../../types/consult";


const uploadApiSlice = apiSlice.injectEndpoints({
    endpoints: build => ({
        // 上传图片
        uploadImg:build.mutation<HealthResponse<Image>,FormData>({
            query:(body) => ({
                url:'/upload',
                method:"POST",
                body
            })

        })
    })
})

export const {useUploadImgMutation} = uploadApiSlice