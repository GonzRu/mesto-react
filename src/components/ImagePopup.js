import React from 'react';

const ImagePopup = ({card, onClose}) => {

    if (!card) return ('');

    return (
        <div className="popup popup_type_card-details popup_opened">
            <div className="popup__container">
                <button type="button"
                        className="popup__close-btn btn-icon"
                        onClick={onClose}
                ></button>
                <div className="card-details">
                    <img src={card.link}
                         alt="#"
                         className="card-details__image"
                    />
                    <p className="card-details__description">
                        {card.name}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ImagePopup;
