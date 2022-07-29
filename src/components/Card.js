import React from 'react';

const Card = ({card, userId, onCardClick, onLike}) => {

    const likesCount = card.likes.length;
    const isLiked = card.likes.some(like => like._id === userId);

    const likeClasses = isLiked
        ? 'card__like btn-icon card__like_active'
        : 'card__like btn-icon';

    return (
        <li className="card"
            onClick={() => onCardClick(card)}
        >
            <div className="card__trash btn-icon"></div>
            <img src={card.link} alt="#" className="card__image"/>
            <div className="card__body">
                <h2 className="card__caption">{card.name}</h2>
                <div className="card__like-group">
                    <button type="button"
                            className={likeClasses}
                            onClick={(event) => {
                                event.stopPropagation();
                                onLike(card, !isLiked);
                            }}
                    ></button>
                    <span className="card__like-count">{likesCount}</span>
                </div>
            </div>
        </li>
    );
};

export default Card;
