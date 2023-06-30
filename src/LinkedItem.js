import LinkedItems from "./data/linkeditems.json";
import {useState} from "react";

const LinkedItem = (props) => {
    const {item, requirement, weeklyCap} = props;
    
    if (LinkedItems[item]){

    }
    const [expand, setExpanded] = useState(false);
    const collected = () => setExpanded(prevExpanded => !prevExpanded);
    let style = {color: "black", "text-decoration": "none"};
    if (expand){
      style = {...style, ...{"text-decoration": "line-through", "opacity": 0.2}};
    }
  return (
    <div className="flex font-normal" style={style}>
        <a className="flex-1" href={LinkedItems[item]} target="_blank" >{item}</a>
        <div className="flex-none pr-2 w-5">{requirement}</div>
        <div className="flex-none pr-2 w-9">{weeklyCap}</div>
        <button className="flex-none" onClick={collected}>X</button>
    </div>
  );
}

export default LinkedItem;