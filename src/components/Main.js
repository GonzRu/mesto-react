import React, {useEffect, useState} from 'react';
import {api} from '../utils/Api';
import Card from './Card';

const Main = ({onEditAvatar, onEditProfile, onAddPlace, onCardClick}) => {

    const [userAvatar, setUserAvatar] = useState(null);
    const [userName, setUserName] = useState(null);
    const [userDescription, setUserDescription] = useState(null);
    const [cards, setCards] = useState([]);

    useEffect(() => {
        api.getMyUser()
            .then(user => {
                setUserAvatar(user.avatar);
                setUserName(user.name);
                setUserDescription(user.about);
            })
            .catch(error => console.log(error));
    }, []);

    useEffect(() => {
        api.getInitialCards()
            .then(cards => {
                setCards(cards);
            })
            .catch(error => console.log(error));
    }, []);

    return (
        <main>
            <section className="profile page__profile">
                <div className="profile__avatar-group">
                    <img src={userAvatar}
                         alt="Аватар пользователя"
                         className="profile__avatar"/>
                    <button type="button"
                            className="profile__avatar-btn btn-icon"
                            onClick={onEditAvatar}
                    ></button>
                </div>
                <div className="profile__info">
                    <div className="profile__name-wrapper">
                        <h1 className="profile__name">
                            {userName ? userName : 'Загрузка...'}
                        </h1>
                        <button type="button"
                                className="profile__edit btn-icon"
                                onClick={onEditProfile}
                        ></button>
                    </div>
                    <p className="profile__description">{userDescription}</p>
                </div>
                <button type="button"
                        onClick={onAddPlace}
                        className="profile__add-photo btn-icon"
                ></button>
            </section>
            <section className="cards page__cards">
                <ul className="cards__list">
                    {cards.map(card =>
                        <Card key={card._id}
                              card={card}
                              onCardClick={onCardClick}/>
                    )}
                </ul>
            </section>
        </main>
    );
};

export default Main;
