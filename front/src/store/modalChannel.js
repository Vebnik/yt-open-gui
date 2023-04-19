import {makeAutoObservable} from "mobx";
import {test_data_subs} from "../utils/testData";


class ModalStore {

    isOpen = false
    isLoad = false
    data= {}

    constructor() {
        makeAutoObservable(this)
    }

    setData(data) {
        this.data = data
    }

    load() {
        this.isLoad = true
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