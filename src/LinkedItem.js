import LinkedItems from "./data/linkeditems.json";
import {useState} from "react";

const LinkedItem = (props) => {
  const {item, requirement, weeklyCap, completeItem, completedItems} = props;
  
  let style = {color: "black", "text-decoration": "none"};
  if (completedItems[item]){
    style = {...style, ...{"text-decoration": "strikethrough", "opacity": "0.2"}}
  }

  let handleClick = () => {
    completeItem(item);
  }

  return (
    <div className="flex font-normal" style={style}>
        <a className="flex-1 hover:text-blue-700" href={LinkedItems[item]} target="_blank" >{item}</a>
        <div className="flex-none pr-2 w-5">{requirement}</div>
        <div className="flex-none pr-2 w-9">{weeklyCap}</div>
        <button className="flex-none" onClick={handleClick}>X</button>
    </div>
  );
}

export default LinkedItem;