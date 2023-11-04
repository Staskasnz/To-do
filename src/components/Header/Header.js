import './Header.css'
import offButton from '../../images/off.png'


function Header({ handleClickShowContent, handleChangeColor, showContent }) {

    function handleClick() {
        handleClickShowContent();
    }

    function handleClickChangeColor(evt) {
        handleChangeColor(evt.target.className.slice(-1));
    }

    return (
        <header className="header">
            <h1 className={`${showContent ? "header__title_to-top" : "header__title"}`}
                onClick={showContent ? null : handleClick}>To-do</h1>
            {showContent && <img src={offButton} alt="Off button" className="header__off-button" onClick={handleClick} />}
            {showContent && <div className="header__change-color-box">
                <button className="header__change-color-button">
                    <button className="header__change-color-1" onClick={handleClickChangeColor}></button>
                    <button className="header__change-color-2" onClick={handleClickChangeColor}></button>
                    <button className="header__change-color-3" onClick={handleClickChangeColor}></button>
                    <button className="header__change-color-4" onClick={handleClickChangeColor}></button>
                </button></div>}

        </header>
    );
}

export default Header;
