import { useEffect, useState } from 'react';
import './Orders.css';
import Popup from '../adminComponents/popup';
import { ambrosialAxiosAPI } from '../../api/api';
import ViewOrderItems from '../adminComponents/ordersComponents/view-order-items';
import ViewOrderItemsButton from '../adminComponents/ordersComponents/view-order-items-button';
import UpdateAndDeleteDistinctOrderButton from '../adminComponents/ordersComponents/update-Delete-DistinctOrder-Button';

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
        resetInputsToDefaultValue();
        togglePopupCreateOrderConfirmation();
    }

    function resetInputsToDefaultValue(){
        setOrderNoIdValue(0);
        setMenuItemIDValue(0);
        setQuantityValue(0);
        setTotalItemPriceValue(0);
        setTableNoValue(0);
        setOrderStatusValue('');

        setSubmitStatusMessageStatus(false);
    }

    //final close
    function handleClosePopups(event){
        event.preventDefault();
        setCreateOrderPopupOpen(!createOrderPopupOpen);
        setConfirmationOrderPopupOpen(!confirmationOrderPopupOpen);
        //setPostDataClicked(false);
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
        event.preventDefault();

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


    //setting update and delete view
    const [viewUpdate, setViewUpdate] = useState(false);
    const [viewConfirmationUpdatePopupOpen, setViewConfirmationUpdatePopupOpen] = useState(false);
    const [viewDelete, setViewDelete] = useState(false);

    //setting of orderNoId for each row
    const [orderNoId, setOrderNoId] = useState(false);
    const [orderNoUpdate, setOrderNoUpdate] = useState(false);

    //Validating the input tag
    const [updateSubmitStatus, setUpdateSubmitStatus] = useState(false);
    const [updateSubmitStatusMessage, setUpdateSubmitStatusMessage] = useState('');

    //setting of the update distinct order confirmation

    //function to toggle the popup update
    function toggleUpdateDistinctOrderPopup(){
        setViewUpdate(!viewUpdate);
        setUpdateSubmitStatus(false);
        setModalVisible(!modalVisible);
        setUpdateSubmitStatus(false);
        setUpdateSubmitStatusMessage(false);
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
        setViewUpdate(!viewUpdate);
        setViewConfirmationUpdatePopupOpen(!viewConfirmationUpdatePopupOpen);
        toggleUpdateDistinctOrderPopup();
        setUpdateSubmitStatus(false);
    }

    function closePopupUpdateDistinctOrderConfirmation(){
        resetUpdateInputsToDefaultValue();
        toggleUpdateDistinctOrderConfirmation();
    }

    function resetUpdateInputsToDefaultValue(){
        setOrderNoId(false);
        setOrderNoUpdate(false);

        setUpdateSubmitStatus(false);
        setUpdateSubmitStatusMessage('');
    }

    //final close
    function handleCloseUpdatePopups(event){
        event.preventDefault();
        setViewUpdate(false);
        setViewConfirmationUpdatePopupOpen(false);
        // toggleUpdateDistinctOrderPopup();
        // closePopupUpdateDistinctOrderConfirmation();
        setUpdateDataClicked(false);
        setUpdateSubmitStatus(false);
        setUpdateSubmitStatusMessage('');
    }

    //setting of update being clicked and updating of order no for distinct order
    //For the result of the post
    const [updateDistinctOrderStatus, setUpdateDistinctOrderStatus] = useState(false);
    const [updateDistinctOrderStatusMessage, setUpdateDistinctOrderStatusMessage] = useState(false);
    //For showing the result message
    const [updateDataClicked, setUpdateDataClicked] = useState(false);
    
    async function updateDistinctOrder(event){
        console.log('called update order');
        event.preventDefault();

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
    


    //modal Code for popups
    const [modalVisible, setModalVisible] = useState(false);
    console.log("Modal Visible is ", modalVisible);
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
        }
        //, viewDelete && (viewUpdate===false) && (viewDelete===false)
        
    }, [createOrderPopupOpen, confirmationOrderPopupOpen, viewOrder, viewUpdate]);


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
            <div>
                <label className='createOrderConfirmationHeader'>Are You Sure ?</label>
                <br></br>
                {!postDataClicked ?  <div>
                        <button className='createOrderConfirmationYesButton' onClick={createOrder}>Yes</button>
                        <button className='createOrderConfirmationNoButton' onClick={closePopupCreateOrderConfirmation}>No</button>
                    </div>:
                    <button type="button" className='createOrderConfirmationYesButton'  onClick={handleClosePopups} >Close</button>
                    
                }
                <br></br>
                {postDataClicked ? <div className='createOrderConfirmationStatusMessageContainer'><label className='createOrderConfirmationStatusMessage'>{postStatusMessage}</label></div>: null}
                
            </div>
        }/>}

        {/* update Popup */}
        {viewUpdate && <Popup
        popupType='updateCurrentDistinctOrderPopup'
        handleClose={toggleUpdateDistinctOrderPopup}
        content={
            <form onSubmit={onSubmitValidateinputForUpdate}>
                <label className='formHeader'>Update Current Order</label>
                <br></br>
                <br></br>

                <label className='formLabelText'>Order No. Now:</label>
                <label className='formLabelText'>{viewOrderItemsOrderNo}</label>
                <br></br>

                <label className='formLabelText'>Order No. :</label>
                <input type="number" className='updateOrderNo' value={orderNoUpdate} onChange={(e) => setOrderNoUpdate(e.target.value)}></input>
                <br></br>

                <button className='updateCurrentDistinctOrderButton'>Submit</button>
                <br></br>
                <br></br>

                {updateDistinctOrderStatus ? <label className='formLabelTextStatus'>{<label className='formLabelText'>{updateDistinctOrderStatusMessage}</label>}</label>:null}
            </form>
        }/>}

        {viewConfirmationUpdatePopupOpen && <Popup
        popupType='updateOrderConfirmationPopup'
        handleClose={handleCloseUpdatePopups}
        content={
            <div>
                <label className='createOrderConfirmationHeader'>Are You Sure ?</label>
                <br></br>
                {!updateDataClicked ?  <div> 
                        <button className='createOrderConfirmationYesButton' onClick={updateDistinctOrder}>Yes</button>
                        <button className='createOrderConfirmationNoButton' onClick={closePopupUpdateDistinctOrderConfirmation}>No</button>
                    </div>:
                    <button type="button" className='createOrderConfirmationYesButton'  onClick={handleCloseUpdatePopups} >Close</button>
                    
                }
                <br></br>
                {updateDataClicked ? <div className='createOrderConfirmationStatusMessageContainer'><label className='createOrderConfirmationStatusMessage'>{updateDistinctOrderStatusMessage}</label></div>: null}
                
            </div>
        }/>}

        {/* delete Popup */}
        {/* {confirmationOrderPopupOpen && <Popup
        popupType='createOrderConfirmationPopup'
        handleClose={togglePopupCreateOrderConfirmation}
        content={
            <div>
                <label className='createOrderConfirmationHeader'>Are You Sure ?</label>
                <br></br>
                {!postDataClicked ?  <div>
                        <button className='createOrderConfirmationYesButton' onClick={createOrder}>Yes</button>
                        <button className='createOrderConfirmationNoButton' onClick={closePopupCreateOrderConfirmation}>No</button>
                    </div>:
                    <button type="button" className='createOrderConfirmationYesButton'  onClick={handleClosePopups} >Close</button>
                    
                }
                <br></br>
                {postDataClicked ? <div className='createOrderConfirmationStatusMessageContainer'><label className='createOrderConfirmationStatusMessage'>{postStatusMessage}</label></div>: null}
                
            </div>
        }/>}     */}


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