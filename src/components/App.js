import { useEffect, useState } from "react";
import Header from "./Header/Header";
import OverlayColor from "./OverlayColor/OverlayColor";
import ToDoList from "./ToDoList/ToDoList";


function App() {
  const [showContent, setShowContent] = useState(false);
  const [numberOverlayColor, setNumberOverlayColor] = useState('1');

  useEffect(() => {
    const colorId = localStorage.getItem('numberColor');
    if (colorId) {
      setNumberOverlayColor(localStorage.getItem('numberColor'));
    }
  }, [])

  function handleClickShowContent() {
    setShowContent(!showContent);
  }

  function handleChangeColor(numberColor) {
    setNumberOverlayColor(numberColor);
    localStorage.setItem('numberColor', numberColor);
  }

  return (
    <div className="page__container">
      <OverlayColor numberOverlayColor={numberOverlayColor} />
      <Header handleClickShowContent={handleClickShowContent} showContent={showContent} handleChangeColor={handleChangeColor} />
      {showContent && <ToDoList />}
    </div>
  );
}

export default App;
