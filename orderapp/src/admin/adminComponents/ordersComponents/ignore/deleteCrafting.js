//delete distinct order
    //setting delete view
    const [viewDelete, setViewDelete] = useState(false);
    const [viewConfirmationDeletePopupOpen, setViewConfirmationDeletePopupOpen] = useState(false);

    //Validating the input tag
    const [deleteSubmitStatus, setDeleteSubmitStatus] = useState(false);
    const [deleteSubmitStatusMessage, setDeleteSubmitStatusMessage] = useState('');

    //setting of the update distinct order confirmation

    //function to toggle the popup update
    function toggleDeleteOrderItemPopup(){
        setViewDelete(!viewDelete);
        setDeleteSubmitStatus(false);
        setModalVisible(!modalVisible);
    }

    //function to validate the input tag for update
    function onSubmitValidateinputForDelete(event){
        event.preventDefault();

        toggleDeleteOrderItemConfirmation();
    }

    function toggleDeleteOrderItemConfirmation() {
        
        console.log('in toggleDeleteOrderItemConfirmation');
        setViewDelete(!viewDelete);
        setViewConfirmationDeletePopupOpen(!viewConfirmationDeletePopupOpen);
        toggleDeleteOrderItemPopup();
        setDeleteSubmitStatus(false);
        
    }

    function closePopupDeleteOrderItemConfirmation(){

        setDeleteDataClicked(false);
        setDeleteOrderItemStatus(false);
        setDeleteOrderItemStatusMessage(false);
        setDeleteSubmitStatus(false);
        setDeleteSubmitStatusMessage('');
        setViewDelete(true);
        setViewConfirmationDeletePopupOpen(false);
        console.log('In closePopupDeleteOrderItemConfirmation');
    }

    //final close
    function handleCloseDeletePopups(){
        

        setDeleteDataClicked(false);
        setDeleteOrderItemStatus(false);
        setDeleteOrderItemStatusMessage(false);
        setDeleteSubmitStatus(false);
        setDeleteSubmitStatusMessage('');
        setViewDelete(false);
        setViewConfirmationDeletePopupOpen(false);
    }

    //setting of update being clicked and updating of order no for distinct order
    //For the result of the post
    const [deleteOrderItemStatus, setDeleteOrderItemStatus] = useState(false);
    const [deleteOrderItemStatusMessage, setDeleteOrderItemStatusMessage] = useState(false);
    //For showing the result message
    const [deleteDataClicked, setDeleteDataClicked] = useState(false);

    async function deleteOrderItem(){
        console.log('called delete order item');


        await ambrosialAxiosAPI.delete(`/deleteorder/${orderId}`)
        .then((response) => {
            console.log(`${response.config.method} method for route: ${response.config.url}`);
            console.log(`response Status: ${response.data.status}`);
            console.log(`response Message: ${response.data.message}`);
            console.log("response Data: ", response.data.data);
            setDeleteOrderItemStatus(response.data.status);
            setDeleteOrderItemStatusMessage(response.data.message);
        })
        .catch((error) => {
            console.log(`${error.response.config.method} method for route: ${error.response.config.url}`);
            console.log(`Error Status: ${error.response.data.status}`);
            console.log(`Error Message: ${error.response.data.message}`);
            setDeleteOrderItemStatus(error.response.data.status);
            setDeleteOrderItemStatusMessage(error.response.data.message);
        });

        setDeleteDataClicked(true);
    }



    {/* delete Popup */}
    {viewDelete && <Popup
        popupType='deleteOrderItemPopup'
        handleClose={toggleDeleteDistinctOrderPopup}
        content={
            <form onSubmit={onSubmitValidateinputForDelete}>
                <label className='formHeaderDelete'>Delete Order Record</label>
                <br></br>
                <br></br>

                <label className='formLabelTextDelete'>Order No.:</label>
                <label className='formLabelOrderNo'>{viewOrderItemsOrderNo}</label>
                <br></br>

                {/* <label className='formLabelTextUpdate'>Order No. :</label>
                <input type="number" className='updateOrderNo' value={orderNoUpdate} onChange={(e) => setOrderNoUpdate(e.target.value)}></input>
                <br></br> */}

                <button className='deleteCurrentDistinctOrderButton'>Submit</button>
                <br></br>
                <br></br>

                {deleteSubmitStatus ? <label className='formLabelTextStatus'>{<label className='formLabelText'>{deleteSubmitStatusMessage}</label>}</label>:null}
            </form>
        }/>}

        {viewConfirmationDeletePopupOpen && <Popup
        popupType='deleteOrderItemConfirmationPopup'
        handleClose={toggleDeleteDistinctOrderConfirmation}
        content={
            <ConfirmationPopupContents  invokeAction={deleteOrderItem} invokeRefresh={getAllOrderedItems} xButtonClose={closePopupDeleteOrderItemConfirmation} closeButton={handleCloseDeletePopups} clickStatus={deleteDataClicked} statusMessage={deleteOrderItemStatusMessage}/>
        }/>
        } 









//////////////////////////////////////////////////////////////////////////////////////////////////////
