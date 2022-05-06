import { useEffect, useState } from 'react';
import './Orders.css';
import Popup from '../adminComponents/popup';
import { ambrosialAxiosAPI } from '../../api/api';
import ViewOrderItems from '../adminComponents/ordersComponents/view-order-items';
import ViewOrderItemsButton from '../adminComponents/ordersComponents/view-order-items-button';
import UpdateAndDeleteDistinctOrderButton from '../adminComponents/ordersComponents/update-Delete-DistinctOrder-Button';
import ConfirmationPopupContents from '../adminComponents/ordersComponents/confirmationPopupContents';

export default function Orders() {

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
        setCreateOrderPopupOpen(!createOrderPopupOpen);
        setConfirmationOrderPopupOpen(!confirmationOrderPopupOpen);
        
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
        console.log('called create order');
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

    useEffect(async () => {    
        //preload the orders
        getAllDistinctOrders(); 
        
    }, []);

    //To get all distinct orders data
    const [distinctOrderData, setDistinctOrderData] = useState([]);
    
    async function getAllDistinctOrders(){
        await ambrosialAxiosAPI.get('/viewdistinctorder')
        .then((response) => {
         console.log(`${response.config.method} method`, `for route:, ${response.config.url}`);
         console.log(`response Status: ${response.data.status}`);
         console.log(`response Message: ${response.data.message}`);
         //Not in template literal as it will only show the type object
         console.log("response Data: ", response.data.data);
         setDistinctOrderData(response.data.data);
       })
       .catch((error) => {
       console.log(`${error.response.config.method} method`,`for route:, ${error.response.config.url}`);
       console.log(`Error Status: ${error.response.data.status}`);
       console.log(`Error Message: ${error.response.data.message}`);
     });
    }

    //This is for viewing the orders for a distinct order
    const [viewOrderItemsOrderNo, setViewOrderItemsOrderNo] = useState(0);
    const [viewOrder, setViewOrder] = useState(false);


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
    
    //delete distinct order
    //setting delete view
    const [viewDelete, setViewDelete] = useState(false);
    const [viewConfirmationDeletePopupOpen, setViewConfirmationDeletePopupOpen] = useState(false);

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
    ///////////////////////////////////////////////////////////////////////////////////////////
    
    //modal Code for popups
    const [modalVisible, setModalVisible] = useState(false);
    console.log('viewUpdate:', viewUpdate);
    console.log('viewConfirmationUpdatePopupOpen:', viewConfirmationUpdatePopupOpen);

    //UseEffect to track the different popups
    useEffect(async () => {

        if((createOrderPopupOpen===true)){
            setModalVisible(true);
        }

        if((confirmationOrderPopupOpen===true) ){
            setModalVisible(true);
        }

        if((viewOrder===true)){
            setModalVisible(true);
        }

        if((viewUpdate===true)){
            setModalVisible(true);
        }

        if((viewConfirmationUpdatePopupOpen=== true)){
            setModalVisible(true);
        }

        if((viewDelete===true)){
            setModalVisible(true);
        }

        if((createOrderPopupOpen===false) && (confirmationOrderPopupOpen===false) && (viewOrder===false) && (viewUpdate===false) && (viewConfirmationUpdatePopupOpen===false)){
            setModalVisible(false);
        }else{
            console.log('not all are false');
        }
        //, viewDelete  && (viewDelete===false)
        
    }, [createOrderPopupOpen, confirmationOrderPopupOpen, viewOrder, viewUpdate, viewConfirmationUpdatePopupOpen]);


    return (
        <>
        <div className='createAndRefresh'>
            <button  className='refreshList' onClick={getAllDistinctOrders}>Refresh List</button>
            <button className='createOrder' onClick={togglePopupCreateOrder}>Create New Order</button> 
        </div>
            
        {modalVisible ? <div className='modalContainer'></div>:null}
        {createOrderPopupOpen && <Popup
        popupType='createOrderPopup'
        handleClose={togglePopupCreateOrder}
        content={
            <form onSubmit={onSubmitValidateInput}>
                <label className='formHeader'>Create New Order</label>
                <br></br>
                <br></br>

                <label className='formLabelText'>Order No. Id:</label>
                <input type="number" className='createInputOrderId' onChange={(e) => setOrderNoIdValue(e.target.value)}></input>
                <br></br>

                <label className='formLabelText'>Menu Item Id:</label>
                <input type="number" className='createInputMenuItemId' onChange={(e) => setMenuItemIDValue(e.target.value)}></input>
                <br></br>

                <label className='formLabelText'>Quantity:</label>
                <input type="number" className='createInputQuantity' onChange={(e) => setQuantityValue(e.target.value)}></input>
                <br></br>

                <label className='formLabelText'>Total Item Price:</label>
                <input pattern="^\d*(\.\d{0,2})?$" type="number" step="0.01" className='createInputTotalItemPrice' onChange={(e) => setTotalItemPriceValue(e.target.value)} ></input>
                <br></br>

                <label className='formLabelText'>Table No:</label>
                <input type="number" className='createInputTableNo' onChange={(e) => setTableNoValue(e.target.value)}></input>
                <br></br>

                <label className='formLabelText'>Order Status:</label>
                <input type="text" className='createInputOrderStatus' onChange={(e) => setOrderStatusValue(e.target.value)}></input>
                <br></br>

                <button className='createOrderButton'>Submit</button>
                <br></br>
                <br></br>

                {submitStatusMessageStatus ? <label className='formLabelTextStatus'>{<label className='formLabelText'>{submitStatusMessage}</label>}</label>:null}
            </form> 
        }/>}

            
        {confirmationOrderPopupOpen && <Popup
        popupType='createOrderConfirmationPopup'
        handleClose={togglePopupCreateOrderConfirmation}
        content={
            // <div>
            //     <label className='createOrderConfirmationHeader'>Are You Sure ?</label>
            //     <br></br>
            //     {!postDataClicked ?  <div>
            //             <button className='createOrderConfirmationYesButton' onClick={createOrder}>Yes</button>
            //             <button className='createOrderConfirmationNoButton' onClick={closePopupCreateOrderConfirmation}>No</button>
            //         </div>:
            //         <button type="button" className='createOrderConfirmationYesButton'  onClick={handleClosePopups} >Close</button>
                    
            //     }
            //     <br></br>
            //     {postDataClicked ? <div className='createOrderConfirmationStatusMessageContainer'><label className='createOrderConfirmationStatusMessage'>{postStatusMessage}</label></div>: null}
                
            // </div>
            
             <ConfirmationPopupContents invokeAction={createOrder} xButtonClose={closePopupCreateOrderConfirmation} closeButton={handleClosePopups} clickStatus={postDataClicked} statusMessage={postStatusMessage}/>
        }/>}

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
            // <div>
            //     <label className='createOrderConfirmationHeader'>Are You Sure ?</label>
            //     <br></br>
            //     {!updateDataClicked ?  <div> 
            //             <button className='createOrderConfirmationYesButton' onClick={updateDistinctOrder}>Yes</button>
            //             <button className='createOrderConfirmationNoButton' onClick={closePopupUpdateDistinctOrderConfirmation}>No</button>
            //         </div>:
            //         <button type="button" className='createOrderConfirmationYesButton'  onClick={handleCloseUpdatePopups} >Close</button>
                    
            //     }
            //     <br></br>
            //     {updateDataClicked ? <div className='createOrderConfirmationStatusMessageContainer'><label className='createOrderConfirmationStatusMessage'>{updateDistinctOrderStatusMessage}</label></div>: null}
                
            // </div>
            //props needed are: updateDistinctOrder(), closePopupUpdateDistinctOrderConfirmation(), handleCloseUpdatePopups(), updateDataClicked and updateDistinctOrderStatusMessage
            <ConfirmationPopupContents  invokeAction={updateDistinctOrder} xButtonClose={closePopupUpdateDistinctOrderConfirmation} closeButton={handleCloseUpdatePopups} clickStatus={updateDataClicked} statusMessage={updateDistinctOrderStatusMessage}/>
        }/>}

        {/* delete Popup */}

        {viewDelete && <Popup
        popupType='deleteCurrentDistinctOrderPopup'
        handleClose={toggleDeleteDistinctOrderPopup}
        content={
            <form onSubmit={onSubmitValidateinputForDelete}>
                <label className='formHeaderUpdate'>Delete Current Order Record</label>
                <br></br>
                <br></br>

                <label className='formLabelTextUpdate'>Order No. Now:</label>
                <label className='formLabelOrderNo'>{viewOrderItemsOrderNo}</label>
                <br></br>

                {/* <label className='formLabelTextUpdate'>Order No. :</label>
                <input type="number" className='updateOrderNo' value={orderNoUpdate} onChange={(e) => setOrderNoUpdate(e.target.value)}></input>
                <br></br> */}

                <button className='updateCurrentDistinctOrderButton'>Submit</button>
                <br></br>
                <br></br>

                {deleteSubmitStatus ? <label className='formLabelTextStatus'>{<label className='formLabelText'>{deleteSubmitStatusMessage}</label>}</label>:null}
            </form>
        }/>}

        {viewConfirmationDeletePopupOpen && <Popup
        popupType='deleteOrderConfirmationPopup'
        handleClose={togglePopupCreateOrderConfirmation}
        content={
            <ConfirmationPopupContents  invokeAction={deleteDistinctOrder} xButtonClose={closePopupDeleteDistinctOrderConfirmation} closeButton={handleCloseDeletePopups} clickStatus={deleteDataClicked} statusMessage={deleteDistinctOrderStatusMessage}/>
        }/>
} 


        <div className="orders">
            This is the orders page

            <table>
                <tr>
                    <th>No.</th>
                    <th>Order No.</th>
                    <th>Actions</th>
                </tr>
                
                {distinctOrderData.map((distinctOrder, index)=>(
                        <tr key={distinctOrder.orderNo}>
                        <td>{index+1}</td>
                        <td>{distinctOrder.orderNo}</td>
                        <td className='actionButtons'><ViewOrderItemsButton setOrderNo={setViewOrderItemsOrderNo} orderNo={distinctOrder.orderNo} setViewOrder={setViewOrder}/></td>
                        {/* <td className='actionButtons'><button className='trialOrderContainerViewButton' onClick={createOrder}>View Order items</button></td> */}
                        <td className='actionButtons'><UpdateAndDeleteDistinctOrderButton setOrderNoId={setOrderNoId} orderNoId={distinctOrder.orderNoId} setOrderNo={setViewOrderItemsOrderNo} orderNo={distinctOrder.orderNo} setView={setViewUpdate} buttonText={"Update Order No."}/></td>

                        {/* <td className='actionButtons'><UpdateAndDeleteDistinctOrderButton setOrderNoId={setOrderNoId} orderNoId={distinctOrder.orderNoId} setView={setViewUpdate} buttonText={"Update Order Items"}/></td> */}
                        {/* <td className='actionButtons'><button className='trialOrderContainerUpdateButton' onClick={togglePopupCreateOrderConfirmation}>Update Order No.</button></td> */}
                        <td className='actionButtons'><button className='trialOrderContainerDeleteButton' onClick={togglePopupCreateOrderConfirmation}>Delete Order</button></td>
                        </tr>
                    )
                )}
        
            </table>

                
            <ViewOrderItems orderNo={viewOrderItemsOrderNo} viewOrder={viewOrder} setViewOrder={setViewOrder}/>

    </div>
    </>
    )
}