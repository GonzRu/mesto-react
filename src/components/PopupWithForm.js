import React from 'react';

const PopupWithForm = ({name, title, submitText, children, isOpen, onClose}) => {

    const rootClasses = isOpen
        ? `popup popup_type_${name} popup_opened`
        : `popup popup_type_${name}`;

    return (
        <div className={rootClasses} onClick={onClose}>
            <div className="popup__container"
                 onClick={(event) => event.stopPropagation()}
            >
                <button type="button"
                        className="popup__close-btn btn-icon"
                        onClick={onClose}
                ></button>
                <form className="form"
                      name={name}
                      noValidate
                      onSubmit={e => {
                          e.preventDefault();
                          onClose();
                      }}
                >
                    <h2 className="form__header">{title}</h2>
                    {children}
                    <button type="submit" className="form__save-btn">{submitText ? submitText : 'Сохранить'}</button>
                </form>
            </div>
        </div>
    );
};

export default PopupWithForm;
