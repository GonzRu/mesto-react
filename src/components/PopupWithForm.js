import React from 'react';

const PopupWithForm = ({name, title, submitText = 'Сохранить', children, isOpen, onClose}) => {

    return (
        <div
            className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`}
            onClick={onClose}
        >
            <div
                className="popup__container"
                onClick={(event) => event.stopPropagation()}
            >
                <button
                    type="button"
                    className="popup__close-btn btn-icon"
                    onClick={onClose}
                ></button>
                <form
                    className="form"
                    name={name}
                    noValidate
                    onSubmit={e => {
                        e.preventDefault();
                        onClose();
                    }}
                >
                    <h2 className="form__header">{title}</h2>
                    {children}
                    <button type="submit" className="form__save-btn">{submitText}</button>
                </form>
            </div>
        </div>
    );
};

export default PopupWithForm;
