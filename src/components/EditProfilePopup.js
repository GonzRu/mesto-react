import React, {useEffect, useState} from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';
import {useInput} from '../hooks/useInput';

const EditProfilePopup = ({isOpen, onClose, onUpdateUser, isLoading}) => {

    const currentUser = React.useContext(CurrentUserContext);

    const name = useInput('', true);
    const description = useInput('', true);
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        if (currentUser) {
            name.setValue(currentUser.name);
            description.setValue(currentUser.about);
        }
    }, [currentUser, isOpen]);

    useEffect(() => {
        if (!currentUser) {
            setIsValid(false)
        } else {
            setIsValid(name.isValid &&
                description.isValid &&
                (name.value !== currentUser.name ||
                description.value !== currentUser.about)
            )
        }
    }, [name, description, currentUser])

    const onSubmit = () => {
        onUpdateUser({
            name: name.value,
            about: description.value
        });
    }

    return (
        <PopupWithForm
            name='profile'
            title='Редактировать профиль'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={onSubmit}
            isLoading={isLoading}
            isValid={isValid}
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
                    value={name.value}
                    onChange={name.onChange}
                />
                <span className="form__error" id="edit-profile-form-name-error">{name.error}</span>
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
                    value={description.value}
                    onChange={description.onChange}
                />
                <span className="form__error" id="edit-profile-form-description-error">{description.error}</span>
            </label>
        </PopupWithForm>
    );
};

export default EditProfilePopup;
