//update///////////////////////////////////////////////////////////////////////////
//setting update view
const [viewUpdate, setViewUpdate] = useState(false);
const [viewConfirmationUpdatePopupOpen, setViewConfirmationUpdatePopupOpen] = useState(false);

//setting of receiptID for each row
const [receiptID, setReceiptID] = useState(false);
//setting of menuitem name for each row
//const [menuItemName, setMenuItemName] = useState(false);
//const [orderNoUpdate, setOrderNoUpdate] = useState(0);

console.log("receiptID is ", receiptID);
//console.log("orderNoUpdate is ", orderNoUpdate);

//Validating the input tag
const [updateSubmitStatus, setUpdateSubmitStatus] = useState(false);
const [updateSubmitStatusMessage, setUpdateSubmitStatusMessage] = useState('');

//setting of the update distinct order confirmation

//function to toggle the popup update
function toggleUpdateReceiptsPopup(){
    setViewUpdate(!viewUpdate);
    setUpdateSubmitStatus(false);
    setModalVisible(!modalVisible);
}

//function to validate the input tags for update
function onSubmitValidateinputForUpdate(event){
    event.preventDefault();
    console.log(orderNoIdValueUpdate);
    if(!orderNoIdValueUpdate || !totalItemPriceValueUpdate){
        setUpdateSubmitStatus(true);
        setUpdateSubmitStatusMessage('***Please Fill Up Your Blank Input Fields***');
        console.log('in validating inputs for update receipts');
        return;
    }

    toggleUpdateReceiptsConfirmation();
}

function toggleUpdateReceiptsConfirmation() {
    // event.preventDefault();
    console.log('in toggle here');
    setViewUpdate(!viewUpdate);
    setViewConfirmationUpdatePopupOpen(!viewConfirmationUpdatePopupOpen);
    toggleUpdateReceiptsPopup();
    setUpdateSubmitStatus(false);
    //setOrderNoUpdate(0);
}

function closePopupUpdateDistinctOrderConfirmation(){
    //setOrderNoUpdate(0);
    setOrderNoIdValueUpdate(0);
    setTotalItemPriceValueUpdate(0);

    setUpdateDataClicked(false);
    setUpdateReceiptStatus(false);
    setUpdateReceiptsStatusMessage(false);
    setUpdateSubmitStatus(false);
    setUpdateSubmitStatusMessage('');
    setViewUpdate(true);
    setViewConfirmationUpdatePopupOpen(false);
    console.log('in here');
}

//final close
function handleCloseUpdatePopups(event){
    //setOrderNoUpdate(0);
    setOrderNoIdValueUpdate(0);
    setTotalItemPriceValueUpdate(0);


    setUpdateDataClicked(false);
    setUpdateReceiptStatus(false);
    setUpdateReceiptsStatusMessage(false);
    setUpdateSubmitStatus(false);
    setUpdateSubmitStatusMessage('');
    setViewUpdate(false);
    setViewConfirmationUpdatePopupOpen(false);
}

//For the inputs to update order
const [orderNoIdValueUpdate, setOrderNoIdValueUpdate] = useState(0);
const [totalItemPriceValueUpdate, setTotalItemPriceValueUpdate] = useState(0);

//setting of update being clicked and updating of order no for distinct order
//For the result of the post
const [updateOrderItemStatus, setUpdateReceiptStatus] = useState(false);
const [updateOrderItemsStatusMessage, setUpdateReceiptsStatusMessage] = useState(false);
//For showing the result message
const [updateDataClicked, setUpdateDataClicked] = useState(false);

async function updateReceipts(){
    console.log('called update receipts');

    await ambrosialAxiosAPI.put(`/updatereceipt/${receiptID}`, {    
        orderNoId:orderNoIdValueUpdate,
        totalItemPrice:totalItemPriceValueUpdate,
    })
    .then((response) => {
         console.log(`${response.config.method} method for route: ${response.config.url}`);
         console.log(`response Status: ${response.data.status}`);
         console.log(`response Message: ${response.data.message}`);
         console.log("response Data: ", response.data.data);
         setUpdateReceiptStatus(response.data.status);
         setUpdateReceiptsStatusMessage(response.data.message);
    })
    .catch((error) => {
        console.log(`${error.response.config.method} method for route: ${error.response.config.url}`);
        console.log(`Error Status: ${error.response.data.status}`);
        console.log(`Error Message: ${error.response.data.message}`);
        setUpdateReceiptStatus(error.response.data.status);
        setUpdateReceiptsStatusMessage(error.response.data.message);
    });

    setUpdateDataClicked(true);
}
/////////////////////////////////////////////////////////////////////////////
{/* update Popup */}
{viewUpdate && <Popup
    popupType='updateReceiptPopup'
    handleClose={toggleUpdateReceiptsPopup}
    content={
        <form onSubmit={onSubmitValidateinputForUpdate}>
            <label className='formHeaderUpdateOrderItem'>Update Order Item</label>
                <br></br>
                <br></br>

                <label className='formLabelTextUpdateOrder'>Order No. Id:</label>
                <input type="number" className='createInputOrderNoId' onChange={(e) => setOrderNoIdValueUpdate(e.target.value)}></input>
                <br></br>

                <label className='formLabelTextUpdateOrderTotalItemPrice'>Total Item Price:</label>
                <input pattern="^\d*(\.\d{0,2})?$" type="number" step="0.01" className='createInputTotalItemPrice' onChange={(e) => setTotalItemPriceValueUpdate(e.target.value)} ></input>
                <br></br>

                <button className='createOrderItemsButton'>Submit</button>
                <br></br>
                <br></br>

            {updateSubmitStatus ? <label className='formLabelTextStatus'>{<label className='formLabelText'>{updateSubmitStatusMessage}</label>}</label>:null}
        </form>
}/>}

{ viewConfirmationUpdatePopupOpen && <Popup
popupType='updateReceiptConfirmationPopup'
handleClose={toggleUpdateReceiptsConfirmation}
content={
    //props needed are: updateReceipts(), closePopupUpdateDistinctOrderConfirmation(), handleCloseUpdatePopups(), updateDataClicked and updateOrderItemsStatusMessage
    <ConfirmationPopupContents  invokeAction={updateReceipts} invokeRefresh={getReceipts} xButtonClose={closePopupUpdateDistinctOrderConfirmation} closeButton={handleCloseUpdatePopups} clickStatus={updateDataClicked} statusMessage={updateOrderItemsStatusMessage}/>
}/>}