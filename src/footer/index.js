import React from "react";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
import High from './high'
import Low from './low'
import './footer.scss';
import { Route, Routes } from "react-router-dom";
import { localUrl } from "../services/apiService";

const FooterComponent = (props) => {

  return (
    <div id="footer">
      <Routes>
        <Route path={`${localUrl}`} element={<Low {...props} />}/>
        <Route path={`${localUrl}/low`} element={<Low {...props} />}/>
        <Route path={`${localUrl}/low/:hours`} element={<Low {...props} />}/>
        <Route path={`${localUrl}/high`} element={<High/>}/>
        <Route path={`${localUrl}/high/:hours`} element={<High/>}/>
      </Routes>
    </div>
  );

}

export default FooterComponent;