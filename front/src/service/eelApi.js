

class EelApi {
    async getChannelInfo(video_id) {
        return eel.get_channel_info(video_id)()
    }

    async searchVideo(data){
        return await eel.search_video({
            query: data.title,
            limit: data.limit
        })()
    }

    async getWaiting() {
        return await eel.waiting_video()()
    }

    async mpvPlay(id){
        return await eel.init_mpv(id)()
    }

    async getSubs() {
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
}

export default new EelApi()