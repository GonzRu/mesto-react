import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import {useEffect, useState} from 'react';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import CurrentUserContext from '../contexts/CurrentUserContext';
import {api} from '../utils/Api';
import EditProfilePopup from './EditProfilePopup';
import card from './Card';
import EditAvatarPopup from './EditAvatarPopup';

function App() {

    const [currentUser, setCurrentUser] = useState();
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
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

    useEffect(() => {
        api.getMyUser()
            .then(user => setCurrentUser(user))
            .catch(error => console.log(error));
    }, []);

    return (
        <CurrentUserContext.Provider value={currentUser}>

        <div className='page'>
            <Header/>
            <Main
                onEditAvatar={onEditAvatar}
                onEditProfile={onEditProfile}
                onAddPlace={onAddPlace}
                onCardClick={onCardClick}
            />
            <Footer/>
            <EditProfilePopup
                isOpen={isEditProfilePopupOpen}
                onClose={onCloseAll}
                onUpdateUser={onUpdateUser}
            />
            <PopupWithForm
                name='add-place'
                title='Новое место'
                submitText='Создать'
                isOpen={isAddPlacePopupOpen}
                onClose={onCloseAll}
            >
                <label className="form__field">
                    <input
                        type="text"
                        className="form__textbox"
                        name="name"
                        id="add-card-form-name"
                        placeholder="Название"
                        required
                        minLength="2"
                        maxLength="30"
                    />
                    <span className="form__error" id="add-card-form-name-error"></span>
                </label>
                <label className="form__field">
                    <input
                        type="url"
                        className="form__textbox"
                        name="link"
                        id="add-card-form-link"
                        placeholder="Ссылка на картинку"
                        required
                    />
                    <span className="form__error" id="add-card-form-link-error"></span>
                </label>
            </PopupWithForm>
            <EditAvatarPopup
                isOpen={isEditAvatarPopupOpen}
                onClose={onCloseAll}
                onUpdateAvatar={onUpdateAvatar}
            />
            <ImagePopup card={selectedCard} onClose={onCloseAll}/>
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
