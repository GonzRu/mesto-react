import React from 'react';

const PopupWithForm = ({name, title, children, isOpen, onClose}) => {

    const rootClasses = isOpen
        ? 'popup popup_type_${name} popup_opened'
        : 'popup popup_type_${name}';

    return (
        <div className={rootClasses} onClick={onClose}>
            <div className="popup__container"
                 onClick={(event) => event.stopPropagation()}
            >
                <button type="button"
                        className="popup__close-btn btn-icon"
                        onClick={onClose}
                ></button>
                <form className="form" name={name} noValidate>
                    <h2 className="form__header">{title}</h2>
                    {children}
                    <button type="submit" className="form__save-btn">Сохранить</button>
                </form>
            </div>
        </div>
    );
};

export default PopupWithForm;
