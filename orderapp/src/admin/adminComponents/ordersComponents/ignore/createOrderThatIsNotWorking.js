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
    setOrderNoValue(0);
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
    setOrderNoValue(0);
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
const [orderNoIdValue, setOrderNoValue] = useState(0);
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

    await ambrosialAxiosAPI.post('/createdistinctorder', {
        orderNo:orderNoIdValue,
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

{modalVisible ? <div className='modalContainer'></div>:null}
        {createOrderPopupOpen && <Popup
        popupType='createOrderPopup'
        handleClose={togglePopupCreateOrder}
        content={
            <form onSubmit={onSubmitValidateInput}>
                <label className='formHeaderCreateDistinctOrder'>Create New Order</label>
                <br></br>
                <br></br>

                <label className='formLabelText'>Order No.:</label>
                <input type="number" className='createInputOrderNo' onChange={(e) => setOrderNoValue(e.target.value)}></input>
                <br></br>

                {/* <label className='formLabelText'>Menu Item Id:</label>
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
                <br></br> */}

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
            
             <ConfirmationPopupContents invokeAction={createOrder} invokeRefresh={getAllDistinctOrders} xButtonClose={closePopupCreateOrderConfirmation} closeButton={handleClosePopups} clickStatus={postDataClicked} statusMessage={postStatusMessage}/>
        }/>}


