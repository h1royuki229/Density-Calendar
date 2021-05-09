import React from 'react';
import Modal from 'react-modal'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button } from 'react-bootstrap';
import InputBox from './InputBox';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      paddingBottom        : '50px',
      transform             : 'translate(-50%, -50%)'
    }
};

export default function ApplyModal(props) {

    const [modalIsOpen,setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal(){
        setIsOpen(false);
    }

    return (
        <div>
            <Button variant="outline-primary" onClick={openModal}>Apply schedule</Button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div class="modal-header">
                    <h2>Apply Form</h2>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={closeModal}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <InputBox/>
                </div>
            </Modal>
      </div>
    );
}
