import './view-order-items.css'
import Popup from '../popup';
import { useEffect, useState } from 'react';
import { ambrosialAxiosAPI } from '../../../api/api';
import UpdateAndDeleteDistinctOrderButton from '../commonComponents/update-Delete-DistinctOrder-Button';
import ConfirmationPopupContents from '../commonComponents/confirmationPopupContents';


function ViewOrderItems(props){

    //To show or hide the view orders
    function toggleViewOrderPopup(){
        props.setViewOrder(false);
        setOrderedItemsData([]);
        setOrderedItemsDataStatus(false);
    }

    //submit popup and confirmation popup
const [createOrderPopupOpen, setCreateOrderPopupOpen] = useState(false);
const [confirmationOrderPopupOpen, setConfirmationOrderPopupOpen] = useState(false);

function togglePopupCreateOrder() {
    setCreateOrderPopupOpen(!createOrderPopupOpen);
    setSubmitStatusMessageStatus(false);
    setModalVisible(!modalVisible);
}

//State to see empty string and status message
const [submitStatusMessageStatus, setSubmitStatusMessageStatus] = useState(false);
const [submitStatusMessage, setSubmitStatusMessage] = useState('');

//validation on submit
function onSubmitValidateInput(event){
    event.preventDefault();
    if(!orderNoIdValue || !menuItemIDValue || !quantityValue || !totalItemPriceValue || !tableNoValue || !orderStatusValue){
        setSubmitStatusMessageStatus(true);
        setSubmitStatusMessage('***Please Fill Up Your Blank Input Fields***');
        return;
    }

    togglePopupCreateOrderConfirmation();
}


function togglePopupCreateOrderConfirmation() {
    // event.preventDefault();
    setConfirmationOrderPopupOpen(!confirmationOrderPopupOpen);
    togglePopupCreateOrder();
    setSubmitStatusMessageStatus(false);
}

function closePopupCreateOrderConfirmation(){
    console.log('in closePopupCreateOrderConfirmation here');
    //resetInputsToDefaultValue();
    //togglePopupCreateOrderConfirmation();
    setOrderNoIdValue(0);
    setMenuItemIDValue(0);
    setQuantityValue(0);
    setTotalItemPriceValue(0);
    setTableNoValue(0);
    setOrderStatusValue('');

    setPostDataClicked(false);
    setPostStatusMessage(false);
    setPostDataClicked(false);
    setSubmitStatusMessageStatus(false);
    setCreateOrderPopupOpen(true);
    setConfirmationOrderPopupOpen(false);

}

//final close
function handleClosePopups(event){
    //event.preventDefault();
    setOrderNoIdValue(0);
    setMenuItemIDValue(0);
    setQuantityValue(0);
    setTotalItemPriceValue(0);
    setTableNoValue(0);
    setOrderStatusValue('');
    setPostDataClicked(false);
    setPostStatusMessage(false);
    setPostDataClicked(false);
    setSubmitStatusMessageStatus(false);
    setCreateOrderPopupOpen(false);
    setConfirmationOrderPopupOpen(false);
    
}

//For the inputs to create order
const [orderNoIdValue, setOrderNoIdValue] = useState(0);
const [menuItemIDValue, setMenuItemIDValue] = useState(0);
const [quantityValue, setQuantityValue] = useState(0);
const [totalItemPriceValue, setTotalItemPriceValue] = useState(0);
const [tableNoValue, setTableNoValue] = useState(0);
const [orderStatusValue, setOrderStatusValue] = useState('');

//For the result of the post
const [postStatus, setPostStatus] = useState(false);
const [postStatusMessage, setPostStatusMessage] = useState(false);
//For showing the result message
const [postDataClicked, setPostDataClicked] = useState(false);

async function createOrder(event){
    console.log('called create distinct order');
    //event.preventDefault();

    await ambrosialAxiosAPI.post('/createorder', {
        orderNoId:orderNoIdValue,
        menuItemID:menuItemIDValue,
        quantity:quantityValue,
        totalItemPrice:totalItemPriceValue,
        tableNo:tableNoValue,
        orderStatus:orderStatusValue

        /**prisma syntax
         * orderNoId:orderNoIdValue,
    //     menuItemId:menuItemIDValue,
    //     quantity:quantityValue,
    //     totalItemPrice:totalItemPriceValue,
    //     tableNo:tableNoValue,
    //     orderStatus:orderStatusValue, */
    })
    .then((response) => {
         console.log(`${response.config.method} method`, `for route:, ${response.config.url}`);
         console.log(`response Status: ${response.data.status}`);
         console.log(`response Message: ${response.data.message}`);
         console.log("response Data: ", response.data.data);
         setPostStatus(response.data.status);
         setPostStatusMessage(response.data.message);
      })
    .catch((error) => {
        console.log(`${error.response.config.method} method`,`for route:, ${error.response.config.url}`);
        console.log(`Error Status: ${error.response.data.status}`);
        console.log(`Error Message: ${error.response.data.message}`);
        setPostStatus(error.response.data.status);
        setPostStatusMessage(error.response.data.message);
      });

    
      setPostDataClicked(true);
}

    //order data status and ordereditems data
    const [orderedItemsDataStatus, setOrderedItemsDataStatus] = useState(false);
    const [orderedItemsData, setOrderedItemsData] = useState([]);
    //api code to call orders table and get the value
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
        togglePopupCreateOrder();
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

    //modal Code for popups
    const [modalVisible, setModalVisible] = useState(false);
    //UseEffect to track the different popups
    useEffect(async () => {

        if((createOrderPopupOpen===true)){
            setModalVisible(true);
        }

        if((confirmationOrderPopupOpen===true) ){
            setModalVisible(true);
        }

        // if((viewOrder===true)){
        //     setModalVisible(true);
        // }

        // if((viewUpdate===true)){
        //     setModalVisible(true);
        // }

        // if((viewConfirmationUpdatePopupOpen=== true)){
        //     setModalVisible(true);
        // }

        // if((viewDelete===true)){
        //     setModalVisible(true);
        // }

        // if((viewConfirmationDeletePopupOpen===true)){
        //     setModalVisible(true);
        // }

        if((createOrderPopupOpen===false) && (confirmationOrderPopupOpen===false) ){
            setModalVisible(false);
        }else{
            console.log('not all popup states are false');
        }
        
    }, [createOrderPopupOpen, confirmationOrderPopupOpen,]);
//}, [createOrderPopupOpen, confirmationOrderPopupOpen, viewOrder, viewUpdate, viewConfirmationUpdatePopupOpen, viewDelete, viewConfirmationDeletePopupOpen]);
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
                                {/* <td className='actionButtons'><UpdateAndDeleteDistinctOrderButton setOrderNoId={props.setOrderNoId} orderNoId={orderedItemsData.orderNoId} setOrderNo={props.setOrderNo} orderNo={props.orderNo} setView={setViewUpdate} buttonText={"Update Order Item"}/></td> */}
                                <td className='updateAndDeleteButtonsContainer'><button className='updateAndDeleteButtons' onClick={deleteOrderItem}>Delete Item</button></td>
                                
                                {/* <td className='actionButtons'><UpdateAndDeleteDistinctOrderButton setOrderNoId={setOrderNoId} orderNoId={distinctOrder.orderNoId} setOrderNo={setViewOrderItemsOrderNo} orderNo={distinctOrder.orderNo} setView={setViewDelete} buttonText={"Delete Distinct Order"}/></td> */}
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

        
        {modalVisible ? <div className='modalViewOrderContainer'></div>:null}
        {createOrderPopupOpen && <Popup
        popupType='createOrderItemPopup'
        handleClose={togglePopupCreateOrder}
        content={
            <form onSubmit={onSubmitValidateInput}>
                <label className='formHeaderCreateOrderItem'>Create New Order Item</label>
                <br></br>
                <br></br>

                <label className='formLabelTextCreateOrder'>Order No.:</label>
                <input type="number" className='createInputOrderNoId' onChange={(e) => setOrderNoIdValue(e.target.value)}></input>
                <br></br>

                <label className='formLabelTextCreateOrderMenuItemId'>Menu Item Id:</label>
                <input type="number" className='createInputMenuItemId' onChange={(e) => setMenuItemIDValue(e.target.value)}></input>
                <br></br>

                <label className='formLabelTextCreateOrderQuantity'>Quantity:</label>
                <input type="number" className='createInputQuantity' onChange={(e) => setQuantityValue(e.target.value)}></input>
                <br></br>

                <label className='formLabelTextCreateOrderTotalItemPrice'>Total Item Price:</label>
                <input pattern="^\d*(\.\d{0,2})?$" type="number" step="0.01" className='createInputTotalItemPrice' onChange={(e) => setTotalItemPriceValue(e.target.value)} ></input>
                <br></br>

                <label className='formLabelTextCreateOrderTableNo'>Table No:</label>
                <input type="number" className='createInputTableNo' onChange={(e) => setTableNoValue(e.target.value)}></input>
                <br></br>

                <label className='formLabelTextCreateOrderOrderStatus'>Order Status:</label>
                <input type="text" className='createInputOrderStatus' onChange={(e) => setOrderStatusValue(e.target.value)}></input>
                <br></br>

                <button className='createOrderItemsButton'>Submit</button>
                <br></br>
                <br></br>

                {submitStatusMessageStatus ? <label className='formLabelTextStatus'>{<label className='formLabelText'>{submitStatusMessage}</label>}</label>:null}
            </form> 
        }/>}

            
        {confirmationOrderPopupOpen && <Popup
        popupType='createOrderItemConfirmationPopup'
        handleClose={togglePopupCreateOrderConfirmation}
        content={
             <ConfirmationPopupContents invokeAction={createOrder} invokeRefresh={getAllOrderedItems} xButtonClose={closePopupCreateOrderConfirmation} closeButton={handleClosePopups} clickStatus={postDataClicked} statusMessage={postStatusMessage}/>
        }/>}  


        </>
    )
}

export default ViewOrderItems;