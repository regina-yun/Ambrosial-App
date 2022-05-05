import { useEffect, useState } from 'react';
import './Orders.css';
import Popup from '../components/popup/popup';
import { ambrosialAxiosAPI } from '../api/api';
import ViewOrderItems from '../components/buttons/view-order-items';
import ViewOrderItemsButton from '../components/buttons/view-order-items-button';

export default function Orders() {

    //submit popup and confirmation popup
    const [createOrderPopupOpen, setCreateOrderPopupOpen] = useState(false);
    const [confirmationOrderPopupOpen, setConfirmationOrderPopupOpen] = useState(false);

    function togglePopupCreateOrder() {
        setCreateOrderPopupOpen(!createOrderPopupOpen);
        setSubmitStatusMessageStatus(false);
    }

    //State to see empty string and status message
    const [submitStatusMessageStatus, setSubmitStatusMessageStatus] = useState(false);
    const [submitStatusMessage, setSubmitStatusMessage] = useState('');

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

    //modal Code for popups
    const [modalVisibleCreateOrder, setModalVisibleCreateOrder] = useState(false);
    const [modalVisibleConfirmationOrder, setModalVisibleConfirmationOrder] = useState(false);
    const [modalVisibleViewOrder, setModalVisibleViewOrder] = useState(false);
    
    
    useEffect(async () => {

        if((createOrderPopupOpen===true)){
            setModalVisibleCreateOrder(true);
        }

        if((createOrderPopupOpen===false) ){
            setModalVisibleCreateOrder(false);
        }
        
    }, [createOrderPopupOpen]);

    useEffect(async () => {
          
        if((confirmationOrderPopupOpen===true) ){
            setModalVisibleConfirmationOrder(true);
        }

        if((confirmationOrderPopupOpen===false)){
            setModalVisibleConfirmationOrder(false);
        }
        
    }, [confirmationOrderPopupOpen]);

    useEffect(async () => {
          
        if((viewOrder===true) ){
            setModalVisibleViewOrder(true);
        }

        if((viewOrder===false)){
            setModalVisibleViewOrder(false);
        }
        
    }, [viewOrder]);

    return (
        <>
        
        <div className='createAndRefresh'>
            <button  className='createOrder' onClick={getAllDistinctOrders}>Refresh List</button>
            <button className='refreshList' onClick={togglePopupCreateOrder}>Create New Order</button> 
        </div>
            
            {modalVisibleCreateOrder ? <div className='modal'></div>:null}
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

            {modalVisibleConfirmationOrder ? <div className='modal'></div>:null}
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
                            <td className='actionButtons'><button className='trialOrderContainerUpdateButton' onClick={togglePopupCreateOrderConfirmation}>Update Order No.</button></td>
                            <td className='actionButtons'><button className='trialOrderContainerDeleteButton' onClick={togglePopupCreateOrderConfirmation}>Delete Order</button></td>
                            </tr>
                        )
                    )}
                    
                    

                </table>

                {modalVisibleViewOrder ? <div className='modal'></div>:null}
                <ViewOrderItems orderNo={viewOrderItemsOrderNo} viewOrder={viewOrder} setViewOrder={setViewOrder}/>

            </div>
        </>
    )
}