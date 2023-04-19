import {
    test_data_subs, test_data_video, test_data_video_info,
    test_data_subs_list,
} from "../utils/testData";


class EelApi {
    async getChannelInfo(video_id) {
        if (process.env.NODE_ENV === 'development')
            return test_data_subs

        return eel.get_channel_info(video_id)()
    }

    async searchVideo(data){
        if (process.env.NODE_ENV === 'development')
            return test_data_video

        return await eel.search_video({query: data.title, limit: data.limit})()
    }

    async getWaiting() {
        return await eel.waiting_video()()
    }

    async mpvPlay(id){
        return await eel.init_mpv(id)()
    }

    async getSubs() {
        if (process.env.NODE_ENV === 'development')
            return test_data_subs_list

        return await eel.get_subs()()
    }

    async addSubs(channel_data) {
        return await eel.add_subs(channel_data)()
    }

    async getChannelVideo(channel_id){
        return await eel.get_channel_video(channel_id)()
    }

    async deleteSubs(channel_id){
        return await eel.delete_subs(channel_id)()
    }

    async getVideoInfo(video_id){
        if (process.env.NODE_ENV === 'development')
            return test_data_video_info

        return await eel.get_video_info(video_id)()
    }
}

export default new EelApi()