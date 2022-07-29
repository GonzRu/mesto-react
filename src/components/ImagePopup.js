import React from 'react';

const ImagePopup = () => {
    return (
        <div className="popup popup_type_card-details">
            <div className="popup__container">
                <button type="button" className="popup__close-btn btn-icon"></button>
                <div className="card-details">
                    <img src="src/components/App#" alt="#" className="card-details__image"/>
                    <p className="card-details__description"></p>
                </div>
            </div>
        </div>
    );
};

export default ImagePopup;
