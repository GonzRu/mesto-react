import React, {useEffect, useState} from 'react';
import {api} from '../utils/Api';

const Main = ({onEditAvatar, onEditProfile, onAddPlace}) => {

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
                    {cards.map(card => (
                        <li className="card" key={card._id}>
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
                    ))}
                </ul>
            </section>
        </main>
    );
};

export default Main;
