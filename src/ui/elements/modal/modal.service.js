import jquery from 'jquery';

class ModalService {
    constructor($document){
        this.$document = $document;
    }

    openModal(name){
        jquery(`#${name}`, this.$document).modal('open');
    }

    closeModal(name){
        jquery(`#${name}`, this.$document).modal('close');
    }
}

export default ModalService;