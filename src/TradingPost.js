import {useState} from "react";
import BarterItem from "./BarterItem";


const TradingPost = (props) => {
    const {name, items} = props;
    const weeklyLimits = [25,15,10,8,3];
    let itemList = [];
    
    for (const item in items){
        itemList.push(item);
    }
  return (
    <>
    <ul>
      {items.map((item, index) => {return <BarterItem item={item} limit={weeklyLimits[index]}/>})}
    </ul>
    </>
  );
}

export default TradingPost;