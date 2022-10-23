import React from "react";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
import High from './high'
import Low from './low'

const FooterComponent = (props) => {

  return (
    <>
         {props.radioValue === 'low' ? (<Low {...props} />) : 
            (<High currentPrice={props.currentPrice} worstTimeRange={props.worstTimeRange}/>)}
    </>
  );

}

export default FooterComponent;