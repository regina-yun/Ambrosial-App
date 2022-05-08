//update///////////////////////////////////////////////////////////////////////////
    //setting update view
    const [viewUpdate, setViewUpdate] = useState(false);
    const [viewConfirmationUpdatePopupOpen, setViewConfirmationUpdatePopupOpen] = useState(false);

    //setting of orderId for each row
    const [orderId, setOrderId] = useState(false);
    //setting of menuitem name for each row
    const [menuItemName, setMenuItemName] = useState(false);
    //const [orderNoUpdate, setOrderNoUpdate] = useState(0);

    console.log("orderId is ", orderId);
    //console.log("orderNoUpdate is ", orderNoUpdate);

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
        console.log(orderNoIdValueUpdate);
        if(!orderNoIdValueUpdate || !menuItemIDValueUpdate || !quantityValueUpdate || !totalItemPriceValueUpdate || !tableNoValueUpdate || !orderStatusValueUpdate){
            setUpdateSubmitStatus(true);
            setUpdateSubmitStatusMessage('***Please Fill Up Your Blank Input Fields***');
            console.log('inhere');
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
/////////////////////////////////////////////////////////////////////////////

///////////////////////////////DELETE//////////////////////////////////////
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