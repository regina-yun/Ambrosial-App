//Validating the input tag
const [deleteSubmitStatus, setDeleteSubmitStatus] = useState(false);
const [deleteSubmitStatusMessage, setDeleteSubmitStatusMessage] = useState('');

//setting of the update distinct order confirmation

//function to toggle the popup update
function toggleDeleteDistinctOrderPopup(){
    setViewDelete(!viewDelete);
    setDeleteSubmitStatus(false);
    setModalVisible(!modalVisible);
}

//function to validate the input tag for update
function onSubmitValidateinputForDelete(event){
    event.preventDefault();
    if(!orderNoUpdate){
        setDeleteSubmitStatus(true);
        setDeleteSubmitStatusMessage('***Please Fill Up Your Blank Input Fields***');
        return;
    }

    toggleDeleteDistinctOrderConfirmation();
}

function toggleDeleteDistinctOrderConfirmation() {
    // event.preventDefault();
    console.log('in toggle here');
    setViewDelete(!viewDelete);
    setViewConfirmationDeletePopupOpen(!viewConfirmationDeletePopupOpen);
    toggleDeleteDistinctOrderPopup();
    setDeleteSubmitStatus(false);
    setOrderNoUpdate(0);
}

function closePopupDeleteDistinctOrderConfirmation(){
    setOrderNoUpdate(0);

    setDeleteDataClicked(false);
    setDeleteDistinctOrderStatus(false);
    setDeleteDistinctOrderStatusMessage(false);
    setDeleteSubmitStatus(false);
    setDeleteSubmitStatusMessage('');
    setViewDelete(true);
    setViewConfirmationDeletePopupOpen(false);
    console.log('in here');
}

//final close
function handleCloseDeletePopups(event){
    setOrderNoUpdate(0);

    setDeleteDataClicked(false);
    setDeleteDistinctOrderStatus(false);
    setDeleteDistinctOrderStatusMessage(false);
    setDeleteSubmitStatus(false);
    setDeleteSubmitStatusMessage('');
    setViewDelete(false);
    setViewConfirmationDeletePopupOpen(false);
}

//setting of update being clicked and updating of order no for distinct order
//For the result of the post
const [deleteDistinctOrderStatus, setDeleteDistinctOrderStatus] = useState(false);
const [deleteDistinctOrderStatusMessage, setDeleteDistinctOrderStatusMessage] = useState(false);
//For showing the result message
const [deleteDataClicked, setDeleteDataClicked] = useState(false);

async function deleteDistinctOrder(event){
    console.log('called delete distinct order');


    await ambrosialAxiosAPI.delete(`/deletedistinctOrder/${orderNoId}`)
    .then((response) => {
         console.log(`${response.config.method} method for route: ${response.config.url}`);
         console.log(`response Status: ${response.data.status}`);
         console.log(`response Message: ${response.data.message}`);
         console.log("response Data: ", response.data.data);
         setDeleteDistinctOrderStatus(response.data.status);
         setDeleteDistinctOrderStatusMessage(response.data.message);
    })
    .catch((error) => {
        console.log(`${error.response.config.method} method for route: ${error.response.config.url}`);
        console.log(`Error Status: ${error.response.data.status}`);
        console.log(`Error Message: ${error.response.data.message}`);
        setDeleteDistinctOrderStatus(error.response.data.status);
        setDeleteDistinctOrderStatusMessage(error.response.data.message);
    });

    setDeleteDataClicked(true);
}













{confirmationOrderPopupOpen && <Popup
        popupType='deleteOrderConfirmationPopup'
        handleClose={togglePopupCreateOrderConfirmation}
        content={
            <ConfirmationPopupContents  invokeAction={deleteDistinctOrder} xButtonClose={closePopupDeleteDistinctOrderConfirmation} closeButton={handleCloseDeletePopups} clickStatus={deleteDataClicked} statusMessage={deleteDistinctOrderStatusMessage}/>
        }/>
}     