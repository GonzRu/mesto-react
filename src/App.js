import './App.css';
import logo from './images/logo.svg';

function App() {
  return (
    <div className='page'>
      <header className="header page__header">
        <img src={logo} alt="Логотип" className="header__logo"/>
      </header>
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
      <footer className="footer page__footer">
        <p className="footer__copyright">&copy; 2020 Mesto Russia</p>
      </footer>
      <div className="popup popup_type_profile">
        <div className="popup__container">
          <button type="button" className="popup__close-btn btn-icon"></button>
          <form className="form" name="edit-profile-form" noValidate>
            <h2 className="form__header">Редактировать профиль</h2>
            <label className="form__field">
              <input type="text" className="form__textbox" name="name" id="edit-profile-form-name" placeholder="Имя"
                     required minLength="2" maxLength="40"/>
                <span className="form__error" id="edit-profile-form-name-error"></span>
            </label>
            <label className="form__field">
              <input type="text" className="form__textbox" name="description" id="edit-profile-form-description"
                     placeholder="Профессия"
                     required minLength="2" maxLength="200"/>
                <span className="form__error" id="edit-profile-form-description-error"></span>
            </label>
            <button type="submit" className="form__save-btn">Сохранить</button>
          </form>
        </div>
      </div>
      <div className="popup popup_type_card">
        <div className="popup__container">
          <button type="button" className="popup__close-btn btn-icon"></button>
          <form className="form" name="add-card-form" noValidate>
            <h2 className="form__header">Новое место</h2>
            <label className="form__field">
              <input type="text" className="form__textbox" name="name" id="add-card-form-name" placeholder="Название"
                     required minLength="2" maxLength="30"/>
                <span className="form__error" id="add-card-form-name-error"></span>
            </label>
            <label className="form__field">
              <input type="url" className="form__textbox" name="link" id="add-card-form-link"
                     placeholder="Ссылка на картинку" required/>
                <span className="form__error" id="add-card-form-link-error"></span>
            </label>
            <button type="submit" className="form__save-btn">Создать</button>
          </form>
        </div>
      </div>
      <div className="popup popup_type_card-details">
        <div className="popup__container">
          <button type="button" className="popup__close-btn btn-icon"></button>
          <div className="card-details">
            <img src="#" alt="#" className="card-details__image"/>
              <p className="card-details__description"></p>
          </div>
        </div>
      </div>
      <div className="popup popup_type_card-remove">
        <div className="popup__container">
          <button type="button" className="popup__close-btn btn-icon"></button>
          <form className="form" name="remove-card-form" noValidate>
            <h2 className="form__header">Вы уверены?</h2>
            <button type="submit" className="form__save-btn">Да</button>
          </form>
        </div>
      </div>
      <div className="popup popup_type_edit-avatar">
        <div className="popup__container">
          <button type="button" className="popup__close-btn btn-icon"></button>
          <form className="form" name="edit-avatar-form" noValidate>
            <h2 className="form__header">Обновить аватар</h2>
            <label className="form__field">
              <input type="url" className="form__textbox" name="link" id="edit-avatar-form-link"
                     placeholder="Ссылка на картинку" required/>
                <span className="form__error" id="edit-avatar-form-link-error"></span>
            </label>
            <button type="submit" className="form__save-btn">Да</button>
          </form>
        </div>
      </div>
      <template id="card-template">
        <li className="card">
          <div className="card__trash btn-icon"></div>
          <img src="#" alt="#" className="card__image"/>
            <div className="card__body">
              <h2 className="card__caption"></h2>
              <div className="card__like-group">
                <button type="button" className="card__like btn-icon"></button>
                <span className="card__like-count"></span>
              </div>
            </div>
        </li>
      </template>
    </div>
  );
}

export default App;
