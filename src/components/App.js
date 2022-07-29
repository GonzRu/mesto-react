import './App.css';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import {useState} from 'react';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {

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

    return (
        <div className='page'>
            <Header/>
            <Main onEditAvatar={onEditAvatar}
                  onEditProfile={onEditProfile}
                  onAddPlace={onAddPlace}
                  onCardClick={onCardClick}
            />
            <Footer/>
            <PopupWithForm name='profile'
                           title='Редактировать профиль'
                           isOpen={isEditProfilePopupOpen}
                           onClose={onCloseAll}
            >
                <label className="form__field">
                    <input type="text" className="form__textbox" name="name" id="edit-profile-form-name"
                           placeholder="Имя"
                           required minLength="2" maxLength="40"/>
                    <span className="form__error" id="edit-profile-form-name-error"></span>
                </label>
                <label className="form__field">
                    <input type="text" className="form__textbox" name="description" id="edit-profile-form-description"
                           placeholder="Профессия"
                           required minLength="2" maxLength="200"/>
                    <span className="form__error" id="edit-profile-form-description-error"></span>
                </label>
            </PopupWithForm>
            <PopupWithForm name='card'
                           title='Новое место'
                           isOpen={isAddPlacePopupOpen}
                           onClose={onCloseAll}
            >
                <label className="form__field">
                    <input type="text" className="form__textbox" name="name" id="add-card-form-name"
                           placeholder="Название"
                           required minLength="2" maxLength="30"/>
                    <span className="form__error" id="add-card-form-name-error"></span>
                </label>
                <label className="form__field">
                    <input type="url" className="form__textbox" name="link" id="add-card-form-link"
                           placeholder="Ссылка на картинку" required/>
                    <span className="form__error" id="add-card-form-link-error"></span>
                </label>
            </PopupWithForm>
            <PopupWithForm name='edit-avatar'
                           title='Обновить аватар'
                           isOpen={isEditAvatarPopupOpen}
                           onClose={onCloseAll}
            >
                <label className="form__field">
                    <input type="text" className="form__textbox" name="name" id="add-card-form-name"
                           placeholder="Название"
                           required minLength="2" maxLength="30"/>
                    <span className="form__error" id="add-card-form-name-error"></span>
                </label>
                <label className="form__field">
                    <input type="url" className="form__textbox" name="link" id="add-card-form-link"
                           placeholder="Ссылка на картинку" required/>
                    <span className="form__error" id="add-card-form-link-error"></span>
                </label>
            </PopupWithForm>
            <ImagePopup card={selectedCard} onClose={onCloseAll}/>
            <div className="popup popup_type_card-remove">
                <div className="popup__container">
                    <button type="button" className="popup__close-btn btn-icon"></button>
                    <form className="form" name="remove-card-form" noValidate>
                        <h2 className="form__header">Вы уверены?</h2>
                        <button type="submit" className="form__save-btn">Да</button>
                    </form>
                </div>
            </div>

        </div>
    );
}

export default App;
