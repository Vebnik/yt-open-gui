import { makeAutoObservable } from "mobx";


class ContentStore {

    currentContent = []

    constructor() {
        makeAutoObservable(this)
    }

    updateContent(data) {
        this.currentContent.push(data)
    }

    newContent(data) {
        console.log(data)
        this.currentContent = data
    }
}

export default new ContentStore()