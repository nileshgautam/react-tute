/*
- Keyboard Navigation
- Click outside to close
- Focus restoration
- body scroll prevention
- flexible content
- beautiful aninations
*/

import React, { useEffect, useRef } from "react";
import Portal from "../Portal/Portal";
import './Modal.css';

const Modal = ({
    isOpen,
    onClose,
    title,
    children,
    showCloseButton = true

}) => {

    /*
     * One to referenece the model itselft (for cocusing when it open)
     *  One to remember wht was foused before the modal opended (for restoration);
     * 
     */
    const modalRef = useRef(null)
    const previouseFocusref = useRef(null);

    /*
    - Store the currentaly focused element when modal opens
    - focus the modal for keyboard navigauin
    - prevent body scrolling
    - restore focus adn scrolling when modal close
    
    */

    useEffect(() => {
        if (isOpen) {
            previouseFocusref.current = document.activeElement;
            if (modalRef.current) {
                modalRef.current.focus();
            }

            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.body.style.overflow = 'unset';
            if (previouseFocusref.current) {
                previouseFocusref.current.focus();
            }
        };
    }, [isOpen]);

    /*
    - Handle keydown events for escape key
    - Handle backdrop clicks (but not content clicks)
    - make sure event handle is clearn performat
    */

    const handleKeyDown = (e) => {
        if (e.key == 'Escape') {
            onClose();
        }

    }

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }

    if (!isOpen) return null;

    return (
        <Portal>
            <div className="modal-backdrop" onClick={handleBackdropClick}
                onKeyDown={handleKeyDown}
            >
                <div
                    ref={modalRef}
                    className="modal-content"
                    tabIndex={-1}
                    role='dialog'
                    area-modal="true"
                    aria-labelledby={
                        title ? "model-title" : undefined
                    }
                >

                    {
                        showCloseButton && (
                            <button
                                className="modal-close-button"
                                onClick={onClose}
                                aria-label="close modal"

                            >
                                *

                            </button>
                        )
                    }

                    {title && (
                        <h2
                            id="modal-title"
                            className="modal-title"

                        >
                            {title}

                        </h2>
                    )}

                    <div className="modal-body">
                        {children}
                    </div>



                </div>

            </div>
        </Portal>
    )
}

export default Modal;

