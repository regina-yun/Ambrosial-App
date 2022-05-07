//setting update view
const [viewUpdate, setViewUpdate] = useState(false);
const [viewConfirmationUpdatePopupOpen, setViewConfirmationUpdatePopupOpen] = useState(false);

//setting of orderNoId for each row
const [orderNoId, setOrderNoId] = useState(false);
const [orderNoUpdate, setOrderNoUpdate] = useState(0);

console.log("orderNoId is ", orderNoId);
console.log("orderNoUpdate is ", orderNoUpdate);

//Validating the input tag
const [updateSubmitStatus, setUpdateSubmitStatus] = useState(false);
const [updateSubmitStatusMessage, setUpdateSubmitStatusMessage] = useState('');

//setting of the update distinct order confirmation

//function to toggle the popup update
function toggleUpdateDistinctOrderPopup(){
    setViewUpdate(!viewUpdate);
    setUpdateSubmitStatus(false);
    setModalVisible(!modalVisible);
}

//function to validate the input tag for update
function onSubmitValidateinputForUpdate(event){
    event.preventDefault();
    if(!orderNoUpdate){
        setUpdateSubmitStatus(true);
        setUpdateSubmitStatusMessage('***Please Fill Up Your Blank Input Fields***');
        return;
    }

    toggleUpdateDistinctOrderConfirmation();
}

function toggleUpdateDistinctOrderConfirmation() {
    // event.preventDefault();
    console.log('in toggle here');
    setViewUpdate(!viewUpdate);
    setViewConfirmationUpdatePopupOpen(!viewConfirmationUpdatePopupOpen);
    toggleUpdateDistinctOrderPopup();
    setUpdateSubmitStatus(false);
    setOrderNoUpdate(0);
}

function closePopupUpdateDistinctOrderConfirmation(){
    setOrderNoUpdate(0);

    setUpdateDataClicked(false);
    setUpdateDistinctOrderStatus(false);
    setUpdateDistinctOrderStatusMessage(false);
    setUpdateSubmitStatus(false);
    setUpdateSubmitStatusMessage('');
    setViewUpdate(true);
    setViewConfirmationUpdatePopupOpen(false);
    console.log('in here');
}

//final close
function handleCloseUpdatePopups(event){
    setOrderNoUpdate(0);

    setUpdateDataClicked(false);
    setUpdateDistinctOrderStatus(false);
    setUpdateDistinctOrderStatusMessage(false);
    setUpdateSubmitStatus(false);
    setUpdateSubmitStatusMessage('');
    setViewUpdate(false);
    setViewConfirmationUpdatePopupOpen(false);
}

//setting of update being clicked and updating of order no for distinct order
//For the result of the post
const [updateDistinctOrderStatus, setUpdateDistinctOrderStatus] = useState(false);
const [updateDistinctOrderStatusMessage, setUpdateDistinctOrderStatusMessage] = useState(false);
//For showing the result message
const [updateDataClicked, setUpdateDataClicked] = useState(false);

async function updateDistinctOrder(event){
    console.log('called update order');
    //event.preventDefault();

    await ambrosialAxiosAPI.put(`/updatedistinctorder/${orderNoId}`, {    
        orderNoOld: viewOrderItemsOrderNo,
        orderNoNew: orderNoUpdate
    })
    .then((response) => {
         console.log(`${response.config.method} method for route: ${response.config.url}`);
         console.log(`response Status: ${response.data.status}`);
         console.log(`response Message: ${response.data.message}`);
         console.log("response Data: ", response.data.data);
         setUpdateDistinctOrderStatus(response.data.status);
         setUpdateDistinctOrderStatusMessage(response.data.message);
    })
    .catch((error) => {
        console.log(`${error.response.config.method} method for route: ${error.response.config.url}`);
        console.log(`Error Status: ${error.response.data.status}`);
        console.log(`Error Message: ${error.response.data.message}`);
        setUpdateDistinctOrderStatus(error.response.data.status);
        setUpdateDistinctOrderStatusMessage(error.response.data.message);
    });

    setUpdateDataClicked(true);
}




{/* update Popup */}
{viewUpdate && <Popup
    popupType='updateCurrentDistinctOrderPopup'
    handleClose={toggleUpdateDistinctOrderPopup}
    content={
        <form onSubmit={onSubmitValidateinputForUpdate}>
            <label className='formHeaderUpdate'>Update Current Order No.</label>
            <br></br>
            <br></br>

            <label className='formLabelTextUpdate'>Order No. Now:</label>
            <label className='formLabelOrderNo'>{viewOrderItemsOrderNo}</label>
            <br></br>

            <label className='formLabelTextUpdate'>Order No. :</label>
            <input type="number" className='updateOrderNo' value={orderNoUpdate} onChange={(e) => setOrderNoUpdate(e.target.value)}></input>
            <br></br>

            <button className='updateCurrentDistinctOrderButton'>Submit</button>
            <br></br>
            <br></br>

            {updateSubmitStatus ? <label className='formLabelTextStatus'>{<label className='formLabelText'>{updateSubmitStatusMessage}</label>}</label>:null}
        </form>
    }/>}
    
    { viewConfirmationUpdatePopupOpen && <Popup
    popupType='updateOrderConfirmationPopup'
    handleClose={toggleUpdateDistinctOrderConfirmation}
    content={
        //props needed are: updateDistinctOrder(), closePopupUpdateDistinctOrderConfirmation(), handleCloseUpdatePopups(), updateDataClicked and updateDistinctOrderStatusMessage
        <ConfirmationPopupContents  invokeAction={updateDistinctOrder} invokeRefresh={getAllDistinctOrders} xButtonClose={closePopupUpdateDistinctOrderConfirmation} closeButton={handleCloseUpdatePopups} clickStatus={updateDataClicked} statusMessage={updateDistinctOrderStatusMessage}/>
    }/>}