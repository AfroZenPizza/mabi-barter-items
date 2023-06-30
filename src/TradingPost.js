import {useState} from "react";
import BarterItem from "./BarterItem";


const TradingPost = (props) => {
    const [expand, setExpanded] = useState(false);
    const {name, items} = props;
    const toggleExpand = () => setExpanded(prevExpanded => !prevExpanded);
    const weeklyLimits = [25,15,10,8,3];
    let itemList = [];
    
    for (const item in items){
        itemList.push(item);
    }
  return (
    <div><span onClick={toggleExpand}>{name}</span>
        {expand && items.map((item, index) => {return <BarterItem item={item} limit={weeklyLimits[index]}/>})}
    </div>
  );
}

export default TradingPost;