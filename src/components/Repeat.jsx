// This is a React component, called "Repeat"
// This function will create numTimes children of this React component
function Repeat(props){
    let items = [];
    for(let i=0; i<props.numTimes; i++){
      items.push(props.children(i));
    }
    return <div style={{
      display: "flex"
    }}>{items}</div>
  }

  export default Repeat;