import React from "react";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
import High from './high'
import Low from './low'
import './footer.scss';
import { useSelector } from "react-redux";

const FooterComponent = (props) => {
  const radioValue = useSelector((state) => state.radioValue);

  return (
    <div id="footer">
         {radioValue === 'low' ? (<Low {...props} />) : 
            (<High/>)}
    </div>
  );

}

export default FooterComponent;