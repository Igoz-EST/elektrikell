import React from "react";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
import High from './high'
import Low from './low'
import './footer.scss';
// библюатека, которая нам помогает показывать те компоненты, которые были запрошенны через URL.
import { Route, Routes } from "react-router-dom";

const FooterComponent = (props) => {
  // Routes это wrapper наших маршрутов
  // Route это маршрут в который передаём компонент через props
  // path совподает с нашим URl и route рендерит его полученный компонент
  // в path через: мы можем передать компоненты параметра URL  
  return (
    <div id="footer">
      <Routes>
        <Route path="/" element={<Low {...props} />}/>
        <Route path="/low/:hours" element={<Low {...props} />}/>
        <Route path="/low" element={<Low {...props} />}/>
        <Route path="/high" element={<High/>}/>
      </Routes>
    </div>
  );

}

export default FooterComponent;