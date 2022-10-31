import React from "react";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
import High from './high'
import Low from './low'
import './footer.scss';

import { Route, Routes } from "react-router-dom";

const FooterComponent = (props) => {

  return (
    <div id="footer">
      <Routes>
        <Route path="/" element={<Low {...props} />}/>
        <Route path="/low/:hours" element={<Low {...props} />}/>
        <Route path="/low" element={<Low {...props} />}/>
        <Route path="/high" element={<High/>}/>
        <Route path="/high/:hours" element={<High/>}/>
      </Routes>
    </div>
  );

}

export default FooterComponent;