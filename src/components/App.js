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
import RemovePlacePopup from './RemovePlacePopup';

function App() {

    // isOpen
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isRemovePlacePopupOpen, setIsRemovePlacePopupOpen] = useState(false);

    // isLoading
    const [isEditAvatarLoading, setIsEditAvatarLoading] = useState(false);
    const [isEditProfileLoading, setIsEditProfileLoading] = useState(false);
    const [isAddPlaceLoading, setIsAddPlaceLoading] = useState(false);
    const [isRemovePlaceLoading, setIsRemovePlaceLoading] = useState(false);

    const [currentUser, setCurrentUser] = useState();

    const [cards, setCards] = useState([]);
    const [removedCard, setRemovedCard] = useState(null);
    const [selectedCard, setSelectedCard] = useState(null);

    const onEditAvatar = () => setIsEditAvatarPopupOpen(true);
    const onEditProfile = () => setIsEditProfilePopupOpen(true);
    const onAddPlace = () => setIsAddPlacePopupOpen(true);
    const onCloseAll = () => {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsRemovePlacePopupOpen(false);
        setRemovedCard(null);
        setSelectedCard(null);
    }
    const onCardClick = (card) => setSelectedCard(card);

    const onUpdateUser = (data) => {
        setIsEditProfileLoading(true);
        api.updateMyUser(data)
            .then(user => {
                setCurrentUser(user);
                onCloseAll();
            })
            .catch(error => console.log(error))
            .finally(() => setIsEditProfileLoading(false));
    }

    const onUpdateAvatar = (data) => {
        setIsEditAvatarLoading(true);
        api.updateAvatar(data)
            .then(user => {
                setCurrentUser(user);
                onCloseAll();
            })
            .catch(error => console.log(error))
            .finally(() => setIsEditAvatarLoading(false));
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

    const onCreateCard = (data) => {
        setIsAddPlaceLoading(true);
        api.createCard(data)
            .then(card => {
                setCards([card, ...cards]);
                onCloseAll();
            })
            .catch(error => console.log(error))
            .finally(() => setIsAddPlaceLoading(false));
    }

    const onCardDelete = card => {
        setRemovedCard(card);
        setIsRemovePlacePopupOpen(true);
    }

    const onRemoveCard = () => {
        setIsRemovePlaceLoading(true);
        api.removeCard(removedCard._id)
            .then(res => {
                setCards(cards.filter(c => c._id !== removedCard._id));
                onCloseAll();
            })
            .catch(error => console.log(error))
            .finally(() => setIsRemovePlaceLoading(false));
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



    useEffect(() => {
        const onMouseDown = e => {
            if (e.key === 'Escape') {
                onCloseAll();
            }
        }

        document.addEventListener('keydown', onMouseDown);

        return () => {
            document.removeEventListener('keydown', onMouseDown);
        }
    }, [])

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
                    isLoading={isEditProfileLoading}
                />
                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={onCloseAll}
                    onAddPlace={onCreateCard}
                    isLoading={isAddPlaceLoading}
                />
                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={onCloseAll}
                    onUpdateAvatar={onUpdateAvatar}
                    isLoading={isEditAvatarLoading}
                />
                <ImagePopup
                    card={selectedCard}
                    onClose={onCloseAll}
                />
                <RemovePlacePopup
                    isOpen={isRemovePlacePopupOpen}
                    onRemove={onRemoveCard}
                    onClose={onCloseAll}
                    isLoading={isRemovePlaceLoading}
                />
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
