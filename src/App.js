import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import HeaderComponent from "./header";
import BodyComponent from "./body";
import FooterComponent from "./footer";

// App - реакт компонент, написанный через функцию.
// Компоненты всегда начинаются С заглавной буквы.
// Компоненты как и функции принимают аргументы, только называются они тут properties(props)
// Компоненты возвращает(return) react element/JSX
// Реакт элемент должен сожержать только 1 заглавный элемент
function App() {
  const [radioValue, setRadioValue] = useState("low");
  const [hourValue, setHourValue] = useState(1);
  // useState - это реакт хук, позволяющий работать с состоянием компонента
  // useState принимает как аргумент изначальное состояние. radioValue = 'low';
  // useState возвращает массив из двух элементов
  // [1] = изначальное или новое значение состояния/переменной
  // [2] = возвращает функцию, которая может изменить значение состояния/переменной
  // При изменении состояния запускается ререндер компоента
  // Все названия реакт хуков начинается с 'use'; все функции изменения состояния начинаются с 'set' 
  return (
    <Container>
      <HeaderComponent setRadioValue={setRadioValue} radioValue={radioValue}/>
      <BodyComponent radioValue={radioValue} hourValue={hourValue}/>
      <FooterComponent radioValue={radioValue} hourValue={hourValue} setHourValue={setHourValue}/>
    </Container>
  );
}

export default App;
