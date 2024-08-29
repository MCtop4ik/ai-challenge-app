export default class ModalControllerApi {

    constructor() {
        if (ModalControllerApi.instance) {
            return ModalControllerApi.instance;
        }

        this.photo_modal = false;
        this.information_modal = false;
        this.upload_modal = false;
        this.history_modal = false;
        this.file_id = ''

        ModalControllerApi.instance = this;
        return this;
    }

    openInformationModal() {
        this.photo_modal = false;
        this.upload_modal = false;
        this.information_modal = true;
        this.history_modal = false;
    }

    openCameraModal() {
        this.photo_modal = true;
        this.upload_modal = false;
        this.information_modal = false;
        this.history_modal = false;
    }

    openUploadModal() {
        this.photo_modal = false;
        this.upload_modal = true;
        this.information_modal = false;
        this.history_modal = false;
    }

    openHistoryModal() {
        this.photo_modal = false;
        this.upload_modal = false;
        this.information_modal = false;
        this.history_modal = true;
    }

    getCameraModal() {
        return this.photo_modal;
    }

    getUploadModal() {
        return this.upload_modal;
    }

    getInformationModal() {
        return this.information_modal;
    }

    getHistoryModal() {
        return this.history_modal;
    }

    closeAllModals() {
        this.photo_modal = false;
        this.upload_modal = false;
        this.information_modal = false;
        this.history_modal = false;
    }

    setFileID(file_id) {
        this.file_id = file_id
    }

    getFileID() {
        return this.file_id
    }

}