import './Custombutton.css';
import './view-order-items.css'
import Popup from '../popup/popup';
import { useEffect, useState } from 'react';
import { ambrosialAxiosAPI } from '../../api/api';

function ViewOrderItems(props){

    //order data status and ordereditems data
    const [orderedItemsDataStatus, setOrderedItemsDataStatus] = useState(false);
    const [orderedItemsData, setOrderedItemsData] = useState([]);

    function toggleViewOrderPopup(){
        props.setViewOrder(false);
        setOrderedItemsData([]);
        setOrderedItemsDataStatus(false);
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
            setOrderedItemsDataStatus(true);
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

    //Create order item
    function createOrderItem(){

    }
    
    //Update order item
    function updateOrderItem(){

    }

    //Update many order item
    function updateManyOrderItem(){

    }

    //delete order item
    function deleteOrderItem(){
        //delete the ordered item

        //get all data and refresh
        //getAllOrderedItems(); 
    }

    return(
        <>
            {props.viewOrder && <Popup
            popupType='viewOrderPopup'
            handleClose={toggleViewOrderPopup}
            content={
                <div>
                    <table>
                    
                    <tr>
                        <td>Order No.:</td>
                        <td>{props.orderNo}</td>
                    </tr>
                    <br></br>  
                    <br></br>  

                    <tr>
                        <th>No.</th>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th colspan="2">Actions</th>
                    </tr>
                    
                    {orderedItemsDataStatus ?orderedItemsData.map((orderedItemsData, index)=>(
                            <tr key={orderedItemsData.orderNo}>
                                <td>{index+1}</td>
                                <td>{orderedItemsData.MenuItem.alt}</td>
                                <td>{orderedItemsData.quantity}</td>
                                <td className='updateAndDeleteButtonsContainer'><button className='updateAndDeleteButtons' onClick={updateOrderItem}>Update Item</button></td>
                                <td className='updateAndDeleteButtonsContainer'><button className='updateAndDeleteButtons' onClick={deleteOrderItem}>Delete Item</button></td>
                            </tr>
                        )
                    ): <tr>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                </tr>}

                    <tr>
                        <td colspan="2"><button onClick={createOrderItem}>Create Order Item</button></td>
                        <td colspan="2"><button onClick={updateManyOrderItem}>Update All Order Item(s)</button></td>
                    </tr>


                </table>
                    
                </div>
            }/>}  
        </>
    )
}

export default ViewOrderItems;