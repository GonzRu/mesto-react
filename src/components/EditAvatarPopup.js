import React, {useRef} from 'react';
import PopupWithForm from './PopupWithForm';

const EditAvatarPopup = ({isOpen, onClose, onUpdateAvatar, isLoading}) => {

    const ref = useRef();

    const onSubmit = (e) => {
        e.preventDefault();
        onUpdateAvatar({
            avatar: ref.current.value
        });
    }

    return (
        <PopupWithForm
            name='edit-avatar'
            title='Обновить аватар'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={onSubmit}
            isLoading={isLoading}
        >
            <label className="form__field">
                <input
                    type="url"
                    className="form__textbox"
                    name="link"
                    id="link"
                    placeholder="Ссылка на картинку"
                    ref={ref}
                    required
                />
                <span className="form__error" id="link-error"></span>
            </label>
        </PopupWithForm>
    );
};

export default EditAvatarPopup;
