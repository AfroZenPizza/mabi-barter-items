import {useState} from "react";
import BarterItems from "./data/barteritems.json";
import LinkedItem from "./LinkedItem"

const BarterItem = (props) => {
    const [expand, setExpanded] = useState(false);
    const toggleExpand = () => setExpanded(prevExpanded => !prevExpanded);
    const {item, limit} = props;
    let recipe = [];
    let quantity = [];
    for (const requirement in BarterItems[item]){
        recipe.push(requirement);
        quantity.push(BarterItems[item][requirement])
    }
    //<div style={{position: "relative", left: "32px"}}>{item} x {quantity[index]} ({quantity[index] * limit})</div>
  return (
    <div style={{position: "relative", left: "32px"}}><span onClick={toggleExpand}>{item}</span>
        {expand && recipe.map((item, index) => {return <LinkedItem item={item} requirement={quantity[index]} weeklyCap={quantity[index]*limit}/>}) }
    </div>
  );
}

export default BarterItem;