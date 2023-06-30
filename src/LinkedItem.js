import LinkedItems from "./data/linkeditems.json";
import {useState} from "react";

const LinkedItem = (props) => {
    const {item, requirement, weeklyCap} = props;
    
    if (LinkedItems[item]){

    }
    const [expand, setExpanded] = useState(false);
    const collected = () => setExpanded(prevExpanded => !prevExpanded);
    let style = {color: "white", "text-decoration": "none"};
    if (expand){
      style = {...style, ...{"text-decoration": "line-through", "opacity": 0.2}};
    }
  return (
    <div style={{position: "relative", left: "32px"}}>
        <button onClick={collected}>X</button>
        <a href={LinkedItems[item]} target="_blank" style={style}>{item}</a> x {requirement} ({weeklyCap})
    </div>
  );
}

export default LinkedItem;