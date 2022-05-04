import './Custombutton.css';
import Popup from '../popup/popup';
import { useEffect, useState } from 'react';
import { ambrosialAxiosAPI } from '../../api/api';

function ViewOrderItems(props){


    const [orderedItemsData, setOrderedItemsData] = useState([]);

    function toggleViewOrderPopup(){
        props.setViewOrder(false);
        setOrderedItemsData([]);
    }

    
    async function getAllOrderedItems(){
            await ambrosialAxiosAPI.get(`/vieworderitems/${props.orderNo}`)
            .then((response) => {
            console.log(`${response.config.method} method`, `for route:, ${response.config.url}`);
            console.log(`response Status: ${response.data.status}`);
            console.log(`response Message: ${response.data.message}`);
            //Not in template literal as it will only show the type object
            console.log("response Data: ", response.data.data);
            setOrderedItemsData(response.data.data);
            })
            .catch((error) => {
            console.log(`${error.response.config.method} method`,`for route:, ${error.response.config.url}`);
            console.log(`Error Status: ${error.response.data.status}`);
            console.log(`Error Message: ${error.response.data.message}`);
            });
    }


    useEffect(async () => {    
        if(props.viewOrder === true){
            getAllOrderedItems();
        }else{
            setOrderedItemsData([]); 
        }
    }, [props.viewOrder]);

    return(
        <>
            {props.viewOrder && <Popup
            popupType='viewOrderPopup'
            handleClose={toggleViewOrderPopup}
            content={
                <div>
                    <table>
                    
                    <tr>
                        <th>Order No.:</th>
                        <th>{props.orderNo}</th>
                    </tr>       
                    <tr>
                        <th>No.</th>
                        <th>Item</th>
                        <th>Quantity</th>
                    </tr>
                    
                    {orderedItemsData.map((orderedItemsData, index)=>(
                            <tr key={orderedItemsData.orderNo}>
                                <td>{index+1}</td>
                                <td>{orderedItemsData.MenuItem.alt}</td>
                                <td>{orderedItemsData.quantity}</td>
                            </tr>
                        )
                    )}
                </table>
                    
                </div>
            }/>}  
        </>
    )
}

export default ViewOrderItems;