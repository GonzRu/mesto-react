import React, {useState} from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';

const EditProfilePopup = ({isOpen, onClose, onUpdateUser}) => {

    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    React.useEffect(() => {
        if (currentUser) {
            setName(currentUser.name);
            setDescription(currentUser.about);
        }
    }, [currentUser]);

    const onSubmit = (e) => {
        e.preventDefault();

        onUpdateUser({
            name: name,
            about: description
        });
    }

    return (
        <PopupWithForm
            name='profile'
            title='Редактировать профиль'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={onSubmit}
        >
            <label className="form__field">
                <input
                    type="text"
                    className="form__textbox"
                    name="name"
                    id="edit-profile-form-name"
                    placeholder="Имя"
                    required minLength="2"
                    maxLength="40"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <span className="form__error" id="edit-profile-form-name-error"></span>
            </label>
            <label className="form__field">
                <input
                    type="text"
                    className="form__textbox"
                    name="description"
                    id="edit-profile-form-description"
                    placeholder="Профессия"
                    required minLength="2"
                    maxLength="200"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
                <span className="form__error" id="edit-profile-form-description-error"></span>
            </label>
        </PopupWithForm>
    );
};

export default EditProfilePopup;
