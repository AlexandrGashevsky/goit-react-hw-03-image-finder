import React from 'react';
import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import modalStyles from './Modal.module.css';
const modalRoot = document.querySelector('#modal-root');

const Modal = ({ children, onClose }) => { 
 useEffect(() => {
  const handleKeyDown = event => {
    if (event.code === 'Escape') {
      onClose();
    }
  };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });



  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };
 
  return createPortal(
    <div className={modalStyles.overlay} onClick={handleBackdropClick}>
      <div className="Modal">{children}</div>
    </div>,
    modalRoot,
  ); 
};

Modal.defaultProps = {
  children: null,
};

Modal.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
