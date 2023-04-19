import {makeAutoObservable} from "mobx";
import {test_data_subs} from "../utils/testData";


class ModalStore {

    isOpen = false
    isLoad = false
    data= process.env.NODE_ENV !== 'production' ? test_data_subs : {}

    constructor() {
        makeAutoObservable(this)
    }

    setData(data) {
        this.data = data
    }

    load() {
        this.isLoad = process.env.NODE_ENV === 'production'
    }

    complete() {
        this.isLoad = false
    }

    open() {
        this.isOpen = true
    }

    close(ev) {
        this.isOpen = false
    }
}

export default new ModalStore()