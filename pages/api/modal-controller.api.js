export default class ModalControllerApi {

    constructor() {
        if (ModalControllerApi.instance) {
            return ModalControllerApi.instance;
        }

        this.photo_modal = false;
        this.information_modal = false;
        this.upload_modal = false;
        this.file_id = ''

        ModalControllerApi.instance = this;
        return this;
    }

    openInformationModal() {
        this.photo_modal = false;
        this.upload_modal = false;
        this.information_modal = true;
    }

    openCameraModal() {
        this.photo_modal = true;
        this.upload_modal = false;
        this.information_modal = false;
    }

    openUploadModal() {
        this.photo_modal = false;
        this.upload_modal = true;
        this.information_modal = false;
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

    closeAllModals() {
        this.photo_modal = false;
        this.upload_modal = false;
        this.information_modal = false;
    }

    setFileID(file_id) {
        this.file_id = file_id
    }

    getFileID() {
        return this.file_id
    }

}