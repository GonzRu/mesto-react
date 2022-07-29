import React, {useEffect, useState} from 'react';
import {api} from '../utils/Api';
import Card from './Card';

const Main = ({onEditAvatar, onEditProfile, onAddPlace, onCardClick}) => {

    const [userId, setUserId] = useState('');
    const [userAvatar, setUserAvatar] = useState('');
    const [userName, setUserName] = useState('');
    const [userDescription, setUserDescription] = useState('');
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
        Promise.all([api.getMyUser(), api.getInitialCards()])
            .then(result => {
                const [user, cards] = result;

                setUserId(user._id)
                setUserAvatar(user.avatar);
                setUserName(user.name);
                setUserDescription(user.about);

                setCards(cards);
            })
            .catch(error => console.log(error));
    }, []);


    return (
        <main>
            <section className="profile page__profile">
                <div className="profile__avatar-group">
                    <img
                        src={userAvatar}
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
                            {userName ? userName : 'Загрузка...'}
                        </h1>
                        <button
                            type="button"
                            className="profile__edit btn-icon"
                            onClick={onEditProfile}
                        ></button>
                    </div>
                    <p className="profile__description">{userDescription}</p>
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
                            userId={userId}
                            onLike={onLike}
                            onCardClick={onCardClick}/>
                    )}
                </ul>
            </section>
        </main>
    );
};

export default Main;
