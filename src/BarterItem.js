import {useState} from "react";
import BarterItems from "./data/barteritems.json";
import LinkedItem from "./LinkedItem"

const BarterItem = (props) => {
    const [expand, setExpanded,] = useState(false);
    const toggleExpand = () => setExpanded(prevExpanded => !prevExpanded);
    const {item, limit, ...p} = props;
    let recipe = [];
    let quantity = [];
    for (const requirement in BarterItems[item]){
        recipe.push(requirement);
        quantity.push(BarterItems[item][requirement])
    }
  return (
    <li className="px-4 pt-2 font-bold"><span onClick={toggleExpand} className="">{item}</span>
        {recipe.map((item, index) => {return <LinkedItem item={item} requirement={quantity[index]} weeklyCap={quantity[index]*limit} {...p}/>})}
    </li>
  );
}

export default BarterItem;