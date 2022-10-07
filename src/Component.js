import React, { useState } from "react";

// function Fcomponent(){
//      return (
//         <div>Privet ot FComponent</div>
//      )
// }

const SComponent = (props) => {
    const [count, setCount] = useState(0);
    return (
        <div>Privet ot {props.firstName} {props.lastName} {count}
        <button onClick={() => setCount(count + 1)}>+</button>
        <button onClick={() => setCount(0)}>Null</button>
        </div>
     )
}

// class CComponent extends React.Component {
//     render() {
//         return (
//             <div>Privet ot CComponent</div>
//         )
//     }
// }
//export default SComponent;
export default SComponent;