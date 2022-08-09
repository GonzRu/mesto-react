import React, {useContext, useEffect, useState} from 'react';
import {api} from '../utils/Api';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';

const Main = ({onEditAvatar, onEditProfile, onAddPlace, onCardClick}) => {

    const currentUser = useContext(CurrentUserContext);
    const [cards, setCards] = useState([]);

    const onLike = (card, like) => {
        const promise = like ? api.likeCard(card._id) : api.unlikeCard(card._id);

        promise
            .then(card => {
                const newCardsList = cards.map(c => c._id === card._id ? card : c);

                setCards(newCardsList);
            })
            .catch(error => console.log(error));
    }

    useEffect(() => {
        api.getInitialCards()
            .then(cards => setCards(cards))
            .catch(error => console.log(error));
    }, []);


    return (
        <main>
            <section className="profile page__profile">
                <div className="profile__avatar-group">
                    <img
                        src={currentUser?.avatar}
                        alt="Аватар пользователя"
                        className="profile__avatar"/>
                    <button
                        type="button"
                        className="profile__avatar-btn btn-icon"
                        onClick={onEditAvatar}
                    ></button>
                </div>
                <div className="profile__info">
                    <div className="profile__name-wrapper">
                        <h1
                            className="profile__name">
                            {currentUser ? currentUser.name : 'Загрузка...'}
                        </h1>
                        <button
                            type="button"
                            className="profile__edit btn-icon"
                            onClick={onEditProfile}
                        ></button>
                    </div>
                    <p className="profile__description">{currentUser?.about}</p>
                </div>
                <button
                    type="button"
                    onClick={onAddPlace}
                    className="profile__add-photo btn-icon"
                ></button>
            </section>
            <section className="cards page__cards">
                <ul className="cards__list">
                    {cards.map(card =>
                        <Card
                            key={card._id}
                            card={card}
                            userId={currentUser._id}
                            onLike={onLike}
                            onCardClick={onCardClick}/>
                    )}
                </ul>
            </section>
        </main>
    );
};

export default Main;
