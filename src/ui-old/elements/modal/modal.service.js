import jquery from 'jquery';

class ModalService {
    constructor($document){
        this.$document = $document;
    }

    openModal(name, elementOwner){
        jquery(`.modal[name=${name}]`, elementOwner || this.$document).modal('open');
    }

    closeModal(name, elementOwner){
        jquery(`.modal[name=${name}]`, elementOwner || this.$document).modal('close');
    }
}

export default ModalService;