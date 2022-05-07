//setting update view
const [viewUpdate, setViewUpdate] = useState(false);
const [viewConfirmationUpdatePopupOpen, setViewConfirmationUpdatePopupOpen] = useState(false);

//setting of orderId for each row
const [orderId, setOrderId] = useState(false);
//const [orderNoUpdate, setOrderNoUpdate] = useState(0);

console.log("orderId is ", orderId);
console.log("orderNoUpdate is ", orderNoUpdate);

//Validating the input tag
const [updateSubmitStatus, setUpdateSubmitStatus] = useState(false);
const [updateSubmitStatusMessage, setUpdateSubmitStatusMessage] = useState('');

//setting of the update distinct order confirmation

//function to toggle the popup update
function toggleUpdateOrderItemsPopup(){
    setViewUpdate(!viewUpdate);
    setUpdateSubmitStatus(false);
    setModalVisible(!modalVisible);
}

//function to validate the input tag for update
function onSubmitValidateinputForUpdate(event){
    event.preventDefault();
    if(!orderNoIdValueUpdate || !menuItemIDValueUpdate || !quantityValueUpdate || !totalItemPriceValueUpdate || !tableNoValueUpdate || !orderStatusValueUpdate){
        setUpdateSubmitStatus(true);
        setUpdateSubmitStatusMessage('***Please Fill Up Your Blank Input Fields***');
        return;
    }

    toggleUpdateOrderItemsConfirmation();
}

function toggleUpdateOrderItemsConfirmation() {
    // event.preventDefault();
    console.log('in toggle here');
    setViewUpdate(!viewUpdate);
    setViewConfirmationUpdatePopupOpen(!viewConfirmationUpdatePopupOpen);
    toggleUpdateOrderItemsPopup();
    setUpdateSubmitStatus(false);
    //setOrderNoUpdate(0);
}

function closePopupUpdateDistinctOrderConfirmation(){
    //setOrderNoUpdate(0);
    setOrderNoIdValueUpdate(0);
    setMenuItemIDValueUpdate(0);
    setQuantityValueUpdate(0);
    setTotalItemPriceValueUpdate(0);
    setTableNoValueUpdate(0);
    setOrderStatusValueUpdate('');

    setUpdateDataClicked(false);
    setUpdateOrderItemStatus(false);
    setUpdateOrderItemsStatusMessage(false);
    setUpdateSubmitStatus(false);
    setUpdateSubmitStatusMessage('');
    setViewUpdate(true);
    setViewConfirmationUpdatePopupOpen(false);
    console.log('in here');
}

//final close
function handleCloseUpdatePopups(event){
    setOrderNoUpdate(0);
    setOrderNoIdValueUpdate(0);
    setMenuItemIDValueUpdate(0);
    setQuantityValueUpdate(0);
    setTotalItemPriceValueUpdate(0);
    setTableNoValueUpdate(0);
    setOrderStatusValueUpdate('');

    setUpdateDataClicked(false);
    setUpdateOrderItemStatus(false);
    setUpdateOrderItemsStatusMessage(false);
    setUpdateSubmitStatus(false);
    setUpdateSubmitStatusMessage('');
    setViewUpdate(false);
    setViewConfirmationUpdatePopupOpen(false);
}

//For the inputs to update order
const [orderNoIdValueUpdate, setOrderNoIdValueUpdate] = useState(0);
const [menuItemIDValueUpdate, setMenuItemIDValueUpdate] = useState(0);
const [quantityValueUpdate, setQuantityValueUpdate] = useState(0);
const [totalItemPriceValueUpdate, setTotalItemPriceValueUpdate] = useState(0);
const [tableNoValueUpdate, setTableNoValueUpdate] = useState(0);
const [orderStatusValueUpdate, setOrderStatusValueUpdate] = useState('');


//setting of update being clicked and updating of order no for distinct order
//For the result of the post
const [updateOrderItemStatus, setUpdateOrderItemStatus] = useState(false);
const [updateOrderItemsStatusMessage, setUpdateOrderItemsStatusMessage] = useState(false);
//For showing the result message
const [updateDataClicked, setUpdateDataClicked] = useState(false);

async function updateOrderItems(){
    console.log('called update order item');

    await ambrosialAxiosAPI.put(`/updateorder/${orderId}`, {    
        orderNoId:orderNoIdValueUpdate,
        menuItemID:menuItemIDValueUpdate,
        quantity:quantityValueUpdate,
        totalItemPrice:totalItemPriceValueUpdate,
        tableNo:tableNoValueUpdate,
        orderStatus:orderStatusValueUpdate
    })
    .then((response) => {
         console.log(`${response.config.method} method for route: ${response.config.url}`);
         console.log(`response Status: ${response.data.status}`);
         console.log(`response Message: ${response.data.message}`);
         console.log("response Data: ", response.data.data);
         setUpdateOrderItemStatus(response.data.status);
         setUpdateOrderItemsStatusMessage(response.data.message);
    })
    .catch((error) => {
        console.log(`${error.response.config.method} method for route: ${error.response.config.url}`);
        console.log(`Error Status: ${error.response.data.status}`);
        console.log(`Error Message: ${error.response.data.message}`);
        setUpdateOrderItemStatus(error.response.data.status);
        setUpdateOrderItemsStatusMessage(error.response.data.message);
    });

    setUpdateDataClicked(true);
}




{/* update Popup */}
{viewUpdate && <Popup
    popupType='updateCurrentDistinctOrderPopup'
    handleClose={toggleUpdateOrderItemsPopup}
    content={
        <form onSubmit={onSubmitValidateinputForUpdate}>
            <label className='formHeaderUpdateOrderItem'>Create New Order Item</label>
                <br></br>
                <br></br>

                <label className='formLabelTextUpdateOrder'>Order No.:</label>
                <input type="number" className='createInputOrderNoId' onChange={(e) => setOrderNoIdValueUpdate(e.target.value)}></input>
                <br></br>

                <label className='formLabelTextUpdateOrderMenuItemId'>Menu Item Id:</label>
                <input type="number" className='createInputMenuItemId' onChange={(e) => setMenuItemIDValueUpdate(e.target.value)}></input>
                <br></br>

                <label className='formLabelTextUpdateOrderQuantity'>Quantity:</label>
                <input type="number" className='createInputQuantity' onChange={(e) => setQuantityValueUpdate(e.target.value)}></input>
                <br></br>

                <label className='formLabelTextUpdateOrderTotalItemPrice'>Total Item Price:</label>
                <input pattern="^\d*(\.\d{0,2})?$" type="number" step="0.01" className='createInputTotalItemPrice' onChange={(e) => setTotalItemPriceValueUpdate(e.target.value)} ></input>
                <br></br>

                <label className='formLabelTextUpdateOrderTableNo'>Table No:</label>
                <input type="number" className='createInputTableNo' onChange={(e) => setTableNoValueUpdate(e.target.value)}></input>
                <br></br>

                <label className='formLabelTextUpdateOrderOrderStatus'>Order Status:</label>
                <input type="text" className='createInputOrderStatus' onChange={(e) => setOrderStatusValueUpdate(e.target.value)}></input>
                <br></br>

            {updateSubmitStatus ? <label className='formLabelTextStatus'>{<label className='formLabelText'>{updateSubmitStatusMessage}</label>}</label>:null}
        </form>
    }/>}
    
    { viewConfirmationUpdatePopupOpen && <Popup
    popupType='updateOrderConfirmationPopup'
    handleClose={toggleUpdateOrderItemsConfirmation}
    content={
        //props needed are: updateOrderItems(), closePopupUpdateDistinctOrderConfirmation(), handleCloseUpdatePopups(), updateDataClicked and updateOrderItemsStatusMessage
        <ConfirmationPopupContents  invokeAction={updateOrderItems} invokeRefresh={getAllOrderedItems} xButtonClose={closePopupUpdateDistinctOrderConfirmation} closeButton={handleCloseUpdatePopups} clickStatus={updateDataClicked} statusMessage={updateOrderItemsStatusMessage}/>
    }/>}