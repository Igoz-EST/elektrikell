import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import HeaderComponent from "./header";
import BodyComponent from "./body";
import FooterComponent from "./footer";

//import SComponent from './Component'; 
//import TimerComponent from './timerComponent';
function App() {
  const [radioValue, setRadioValue] = useState("low");
  const [hourValue, setHourValue] = useState(1);
  return (
    <Container>
      <HeaderComponent setRadioValue={setRadioValue} radioValue={radioValue}/>
      <BodyComponent radioValue={radioValue} hourValue={hourValue}/>
      <FooterComponent radioValue={radioValue} hourValue={hourValue} setHourValue={setHourValue}/>
    </Container>
  );
}

export default App;
