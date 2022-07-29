import React from 'react';

const Card = ({card, onCardClick}) => {
    return (
        <li className="card"
            onClick={() => onCardClick(card)}
        >
            <div className="card__trash btn-icon"></div>
            <img src={card.link} alt="#" className="card__image"/>
            <div className="card__body">
                <h2 className="card__caption">{card.name}</h2>
                <div className="card__like-group">
                    <button type="button" className="card__like btn-icon"></button>
                    <span className="card__like-count">{card.likes?.length}</span>
                </div>
            </div>
        </li>
    );
};

export default Card;
