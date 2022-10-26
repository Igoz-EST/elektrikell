import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Container from "react-bootstrap/Container";
import HeaderComponent from "./header";
import BodyComponent from "./body";
import FooterComponent from "./footer";

function App() {

  return (
    <Container>
      <HeaderComponent 
      />
      <BodyComponent 
        />
      <FooterComponent/>
    </Container>
  );
}

export default App;