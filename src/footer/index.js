import React from "react";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
import High from './high'
import Low from './low'

const FooterComponent = ({ radioValue, hourValue, setHourValue }) => {

  return (
    <>
      {radioValue === 'low' ? (<Low {...{hourValue, setHourValue}}/>) : (<High />)}
    </>
  );

}

export default FooterComponent;