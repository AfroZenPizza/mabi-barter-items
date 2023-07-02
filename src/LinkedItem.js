import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LinkedItems from "./data/linkeditems.json";
import {useState} from "react";
import { faCheck, faRefresh } from "@fortawesome/free-solid-svg-icons";

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
        <button className="flex-none pr-2 text-gray-400 hover:text-black" onClick={handleClick}><FontAwesomeIcon icon={completedItems[item] ? faRefresh : faCheck}/></button>
        <a className="flex-1 hover:text-blue-700" href={LinkedItems[item]} target="_blank" >{item}</a>
        {/* <div className="flex-none pr-2 w-5">{requirement}</div> */}
        <div className="flex-none pr-2 w-9">{weeklyCap}</div>
    </div>
  );
}

export default LinkedItem;