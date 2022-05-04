import Menuitemcomponent from "./Menuitemcomponent.js";
import './MenuitemContainer.css';

function MenuitemContainer(props){
    //reference for filter:https://upmostly.com/tutorials/react-filter-filtering-arrays-in-react-with-examples
    return(
        <div className="displaycontainer">
            {props.itemData.filter(item=>item.type === props.type).map((element)=>{
                return <Menuitemcomponent id={element.id} data={element} addtocart={props.addtocart}/>;
            })}
        </div> 
    )
}

export default MenuitemContainer;