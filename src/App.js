import "./App.scss";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import HeaderComponent from "./header";
import BodyComponent from "./body";
import FooterComponent from "./footer";

function App() {
  const [radioValue, setRadioValue] = useState("low");
  const [hourValue, setHourValue] = useState(1);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [bestTimeRange, setBestTimeRange] = useState({
    from: 0,
    until: 0,
    timeStamp: null,
    bestPrice: 0,
  });
  const [worstTimeRange, setWorstTimeRange] = useState({
    from: 0,
    until: 0,
    WorstPrice: 0,
  });
  const [selectedCountry, setSelectedCountry] = useState({ key: "ee", title: "eesti" });
  return (
    <Container>
      <HeaderComponent 
      setRadioValue={setRadioValue} 
      radioValue={radioValue} 
      currentPrice={currentPrice} 
      setCurrentPrice={setCurrentPrice}
      setSelectedCountry={setSelectedCountry}
      selectedCountry={selectedCountry}
      />
      <BodyComponent 
      radioValue={radioValue} 
      hourValue={hourValue} 
      setBestTimeRange={setBestTimeRange}
      setWorstTimeRange={setWorstTimeRange}
      selectedCountry={selectedCountry}
      />
      <FooterComponent 
      radioValue={radioValue} 
      hourValue={hourValue} 
      setHourValue={setHourValue}
      bestTimeRange={bestTimeRange}
      currentPrice={currentPrice}
      worstTimeRange={worstTimeRange}/>
    </Container>
  );  
}

export default App;
