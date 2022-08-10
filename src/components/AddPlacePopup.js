import React, {useState} from 'react';
import PopupWithForm from './PopupWithForm';

const AddPlacePopup = ({isOpen, onClose, onAddPlace, isLoading}) => {

    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    const onSubmit = () => {
        onAddPlace({
            name: name,
            link: link,
        });
    }

    return (
        <PopupWithForm
            name='add-place'
            title='Новое место'
            submitText='Создать'
            loadingSubmitText='Создаю...'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={onSubmit}
            isLoading={isLoading}
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
                    value={name}
                    onChange={e => setName(e.target.value)}
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
                    value={link}
                    onChange={e => setLink(e.target.value)}
                />
                <span className="form__error" id="add-card-form-link-error"></span>
            </label>
        </PopupWithForm>
    );
};

export default AddPlacePopup;
