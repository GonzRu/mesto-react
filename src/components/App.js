import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import {useEffect, useState} from 'react';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import CurrentUserContext from '../contexts/CurrentUserContext';
import {api} from '../utils/Api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

function App() {

    const [currentUser, setCurrentUser] = useState();
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [cards, setCards] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);

    const onEditAvatar = () => setIsEditAvatarPopupOpen(true);
    const onEditProfile = () => setIsEditProfilePopupOpen(true);
    const onAddPlace = () => setIsAddPlacePopupOpen(true);
    const onCloseAll = () => {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setSelectedCard(null);
    }
    const onCardClick = (card) => setSelectedCard(card);

    const onUpdateUser = (data) => {
        api.updateMyUser(data)
            .then(user => {
                setCurrentUser(user);
                onCloseAll();
            })
            .catch(error => console.log(error));
    }

    const onUpdateAvatar = (data) => {
        api.updateAvatar(data)
            .then(user => {
                setCurrentUser(user);
                onCloseAll();
            })
            .catch(error => console.log(error));
    }

    const onCardLike = (card, like) => {
        const promise = like ? api.likeCard(card._id) : api.unlikeCard(card._id);

        promise
            .then(card => {
                const newCardsList = cards.map(c => c._id === card._id ? card : c);

                setCards(newCardsList);
            })
            .catch(error => console.log(error));
    }

    const onCardDelete = (card) => {
        api.removeCard(card._id)
            .then(res => {
                setCards(cards.filter(c => c._id !== card._id));
            })
            .catch(error => console.log(error));
    }

    const onCreateCard = (data) => {
        api.createCard(data)
            .then(card => {
                setCards([card, ...cards]);
                onCloseAll();
            })
            .catch(error => console.log(error));
    }

    useEffect(() => {
        api.getMyUser()
            .then(user => setCurrentUser(user))
            .catch(error => console.log(error));
    }, []);

    useEffect(() => {
        api.getInitialCards()
            .then(cards => setCards(cards))
            .catch(error => console.log(error));
    }, []);

    return (
        <CurrentUserContext.Provider value={currentUser}>

            <div className='page'>
                <Header/>
                <Main
                    cards={cards}
                    onCardLike={onCardLike}
                    onCardDelete={onCardDelete}
                    onCardClick={onCardClick}
                    onEditAvatar={onEditAvatar}
                    onEditProfile={onEditProfile}
                    onAddPlace={onAddPlace}
                />
                <Footer/>
                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={onCloseAll}
                    onUpdateUser={onUpdateUser}
                />
                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={onCloseAll}
                    onAddPlace={onCreateCard}
                />
                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={onCloseAll}
                    onUpdateAvatar={onUpdateAvatar}
                />
                <ImagePopup
                    card={selectedCard}
                    onClose={onCloseAll}
                />
                <PopupWithForm
                    name='card-remove'
                    title='Вы уверены?'
                    submitText='Да'
                    onClose={onCloseAll}
                    isOpen={false}
                >
                </PopupWithForm>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
