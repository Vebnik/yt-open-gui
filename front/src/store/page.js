import {makeAutoObservable} from "mobx";


class PageStore {

    currentPage = 'general'

    constructor() {
        makeAutoObservable(this)
    }

    setCurrentPage(page) {
        this.currentPage = page
    }
}

export default new PageStore()