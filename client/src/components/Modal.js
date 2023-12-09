class Modal{
    constructor(){
        this.modal = document.querySelector('#modal');
        this.modalBtn = document.querySelector('#modal-btn');
        this.eventListeners();
    }

    eventListeners = () =>{
        this.modalBtn.addEventListener('click', this.openModal.bind(this));
        window.addEventListener('click', this.outsideClick.bind(this));
        document.addEventListener('closeModal', this.closeModal.bind(this));
    }

    openModal = () =>{
        this.modal.style.display = 'block';
    }

    closeModal = () =>{
        this.modal.style.display = 'none';
    }

    outsideClick = (e) =>{
        if(e.target == this.modal){
            this.closeModal();
        }
    }
}

export default Modal;