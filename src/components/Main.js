import React from 'react';

const Main = () => {
    return (
        <main>
            <section className="profile page__profile">
                <div className="profile__avatar-group">
                    <img src="#" alt="Аватар пользователя" className="profile__avatar"/>
                    <button type="button" className="profile__avatar-btn btn-icon"></button>
                </div>
                <div className="profile__info">
                    <div className="profile__name-wrapper">
                        <h1 className="profile__name">Загрузка...</h1>
                        <button type="button" className="profile__edit btn-icon"></button>
                    </div>
                    <p className="profile__description"></p>
                </div>
                <button type="button" className="profile__add-photo btn-icon"></button>
            </section>
            <section className="cards page__cards">
                <ul className="cards__list">
                </ul>
            </section>
        </main>
    );
};

export default Main;
