import { useEffect, useState } from 'react';
import './Receipts.css';
import Popup from '../adminComponents/popup';
import { ambrosialAxiosAPI } from '../../api/api';
import ViewOrderItems from '../adminComponents/view-order-items';
import ViewOrderItemsButton from '../adminComponents/view-order-items-button';

export default function Receipt() {

    //Create Receipt
    //submit popup and confirmation popup
    const [createReceiptPopupOpen, setCreateReceiptPopupOpen] = useState(false);
    const [confirmationReceiptPopupOpen, setConfirmationReceiptPopupOpen] = useState(false);

    function togglePopupCreateReceipt() {
        setCreateReceiptPopupOpen(!createReceiptPopupOpen);
        setSubmitStatusMessageStatus(false);
    }

    //State to see empty string and status message
    const [submitStatusMessageStatus, setSubmitStatusMessageStatus] = useState(false);
    const [submitStatusMessage, setSubmitStatusMessage] = useState('');

    function onSubmitValidateInput(event){
        event.preventDefault();
        if(!orderNoIdValue || !totalItemPriceValue) {
            setSubmitStatusMessageStatus(true);
            setSubmitStatusMessage('***Please Fill Up Your Blank Input Fields***');
            return;
        }

        togglePopupCreateReceiptConfirmation();
    }

    function togglePopupCreateReceiptConfirmation() {
        // event.preventDefault();
        setConfirmationReceiptPopupOpen(!confirmationReceiptPopupOpen);
        togglePopupCreateReceipt();
        setSubmitStatusMessageStatus(false);
    }

    function closePopupCreateReceiptConfirmation(){
        resetInputsToDefaultValue();
        togglePopupCreateReceiptConfirmation();
    }

    function resetInputsToDefaultValue(){
        setOrderNoIdValue(0);
        setTotalItemPriceValue(0);

        setSubmitStatusMessageStatus(false);
    }

    function handleClosePopups(event){
        event.preventDefault();
        setCreateReceiptPopupOpen(!createReceiptPopupOpen);
        setConfirmationReceiptPopupOpen(!confirmationReceiptPopupOpen);
        //setPostDataClicked(false);
    }

    //For the inputs to create receipt
    const [orderNoIdValue, setOrderNoIdValue] = useState(0);
    const [totalItemPriceValue, setTotalItemPriceValue] = useState(0);

    //For the result of the post
    const [postStatus, setPostStatus] = useState(false);
    const [postStatusMessage, setPostStatusMessage] = useState(false);
    //For showing the result message
    const [postDataClicked, setPostDataClicked] = useState(false);
    
    async function createReceipt(event){
        console.log('called create receipt');
        event.preventDefault();

        await ambrosialAxiosAPI.post('/createreceipt', {
            orderNoId:orderNoIdValue,
            totalItemPrice:totalItemPriceValue,
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





    //Update Receipt
    //submit popup and confirmation popup
    
    const [receiptID, setReceiptID] = useState(0);
    const [receiptIDValue, setReceiptIDValue] = useState(0);
    const [updateReceiptPopupOpen, setUpdateReceiptPopupOpen] = useState(false);

    function togglePopupUpdateReceipt() {
        setUpdateReceiptPopupOpen(!updateReceiptPopupOpen);
        setSubmitStatusMessageStatus(false);
    }

    function onSubmitValidateInput(event){
        event.preventDefault();
        if(!orderNoIdValue || !totalItemPriceValue) {
            setSubmitStatusMessageStatus(true);
            setSubmitStatusMessage('***Please Fill Up Your Blank Input Fields***');
            return;
        }

        togglePopupUpdateReceiptConfirmation();
    }

    function togglePopupUpdateReceiptConfirmation() {
        // event.preventDefault();
        setConfirmationReceiptPopupOpen(!confirmationReceiptPopupOpen);
        togglePopupUpdateReceipt();
        setSubmitStatusMessageStatus(false);
    }

    function closePopupUpdateReceiptConfirmation(){
        resetInputsToDefaultValue();
        togglePopupUpdateReceiptConfirmation();
    }

    function resetInputsToDefaultValue(){
        setOrderNoIdValue(0);
        setTotalItemPriceValue(0);

        setSubmitStatusMessageStatus(false);
    }

    function handleClosePopups(event){
        event.preventDefault();
        setUpdateReceiptPopupOpen(!updateReceiptPopupOpen);
        setConfirmationReceiptPopupOpen(!confirmationReceiptPopupOpen);
        //setPostDataClicked(false);
    }
    
    async function updateReceipt(event){
        console.log('called update receipt');
        event.preventDefault();

        await ambrosialAxiosAPI.put('/updatereceipt/:receiptID', {
            receiptID:receiptIDValue,
            orderNoId:orderNoIdValue,
            totalItemPrice:totalItemPriceValue,
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






    //Delete Receipt
    //submit popup and confirmation popup
    const [deleteReceiptPopupOpen, setDeleteReceiptPopupOpen] = useState(false);

    function togglePopupDeleteReceipt() {
        setDeleteReceiptPopupOpen(!deleteReceiptPopupOpen);
        setSubmitStatusMessageStatus(false);
    }

    function onSubmitValidateInput(event){
        event.preventDefault();
        if(!receiptID || !orderNoIdValue || !totalItemPriceValue) {
            setSubmitStatusMessageStatus(true);
            setSubmitStatusMessage('***Please Fill Up Your Blank Input Fields***');
            return;
        }

        togglePopupDeleteReceiptConfirmation();
    }

    function togglePopupDeleteReceiptConfirmation() {
        // event.preventDefault();
        setConfirmationReceiptPopupOpen(!confirmationReceiptPopupOpen);
        togglePopupDeleteReceipt();
        setSubmitStatusMessageStatus(false);
    }

    function closePopupDeleteReceiptConfirmation(){
        resetInputsToDefaultValue();
        togglePopupDeleteReceiptConfirmation();
    }

    function resetInputsToDefaultValue(){
        setOrderNoIdValue(0);
        setTotalItemPriceValue(0);

        setSubmitStatusMessageStatus(false);
    }

    function handleClosePopups(event){
        event.preventDefault();
        setDeleteReceiptPopupOpen(!deleteReceiptPopupOpen);
        setConfirmationReceiptPopupOpen(!confirmationReceiptPopupOpen);
        //setPostDataClicked(false);
    }
    
    async function deleteReceipt(event){
        console.log('called delete receipt');
        event.preventDefault();

        await ambrosialAxiosAPI.delete('/deletereceipt/:receiptID')
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






    //View Receipts
    useEffect(() => {
        getReceipts();
    });

    //To get all receipts data
    const [receiptsListData, setReceiptsListData] = useState([]);
    
    const getReceipts = async() => {
        await ambrosialAxiosAPI.get('/receipts')
        .then((response) => {
             console.log(`${response.config.method} method`, `for route:, ${response.config.url}`);
             console.log(`response Status: ${response.data.status}`);
             console.log(`response Message: ${response.data.message}`);
             console.log("response Data: ", response.data.data);
             setReceiptsListData(response.data.data);
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

    //This is for viewing the receipt for a distinct order
    //const [viewReceiptItemsOrderNo, setViewReceiptItemsOrderNo] = useState(0);
    const [viewReceipt, setViewReceipt] = useState(false);

    //modal Code for popups
    const [modalVisibleCreateReceipt, setModalVisibleCreateReceipt] = useState(false);
    const [modalVisibleUpdateReceipt, setModalVisibleUpdateReceipt] = useState(false);
    const [modalVisibleDeleteReceipt, setModalVisibleDeleteReceipt] = useState(false);
    const [modalVisibleViewReceipt, setModalVisibleViewReceipt] = useState(false);
    const [modalVisibleConfirmationReceipt, setModalVisibleConfirmationReceipt] = useState(false);
    
    
    useEffect(async () => {

        if((createReceiptPopupOpen===true)){
            setModalVisibleCreateReceipt(true);
        }

        if((createReceiptPopupOpen===false) ){
            setModalVisibleCreateReceipt(false);
        }
        
    }, [createReceiptPopupOpen]);



    
    useEffect(async () => {

        if((updateReceiptPopupOpen===true)){
            setModalVisibleUpdateReceipt(true);
        }

        if((updateReceiptPopupOpen===false) ){
            setModalVisibleUpdateReceipt(false);
        }
        
    }, [updateReceiptPopupOpen]);




    useEffect(async () => {

        if((deleteReceiptPopupOpen===true)){
            setModalVisibleDeleteReceipt(true);
        }

        if((deleteReceiptPopupOpen===false) ){
            setModalVisibleDeleteReceipt(false);
        }
        
    }, [deleteReceiptPopupOpen]);



    useEffect(async () => {
          
        if((confirmationReceiptPopupOpen===true) ){
            setModalVisibleConfirmationReceipt(true);
        }

        if((confirmationReceiptPopupOpen===false)){
            setModalVisibleConfirmationReceipt(false);
        }
        
    }, [confirmationReceiptPopupOpen]);




    useEffect(async () => {
          
        if((viewReceipt===true) ){
            setModalVisibleViewReceipt(true);
        }

        if((viewReceipt===false)){
            setModalVisibleViewReceipt(false);
        }
        
    }, [viewReceipt]);

    return (
        <>
        
        <div className='createAndRefresh'>
            <button  className='refreshList' onClick={getReceipts}>Refresh List</button>
            <button className='createReceipt' onClick={togglePopupCreateReceipt}>Create New Receipt</button> 
        </div>
            
            {modalVisibleCreateReceipt ? <div className='modal-one'></div>:null}
            {createReceiptPopupOpen && <Popup
            popupType='createReceiptPopup'
            handleClose={togglePopupCreateReceipt}
            content={
                <form onSubmit={onSubmitValidateInput}>
                    <label className='formHeader'>Create New Receipt</label>
                    <br></br>
                    <br></br>

                    <label className='formLabelText'>Order No. Id:</label>
                    <input type="number" className='createInputOrderId' onChange={(e) => setOrderNoIdValue(e.target.value)}></input>
                    <br /><br />

                    <label className='formLabelText'>Total Item Price:</label>
                    <input pattern="^\d*(\.\d{0,2})?$" type="number" step="0.01" className='createInputTotalItemPrice' onChange={(e) => setTotalItemPriceValue(e.target.value)} ></input>
                    <br /><br />

                    <button className='createReceiptButton'>Submit</button>
                    <br /><br />

                    {submitStatusMessageStatus ? <label className='formLabelTextStatus'>{<label className='formLabelText'>{submitStatusMessage}</label>}</label>:null}
                </form>
            }/>}

            {modalVisibleConfirmationReceipt ? <div className='modal-two'></div>:null}
            {confirmationReceiptPopupOpen && <Popup
            popupType='createReceiptConfirmationPopup'
            handleClose={togglePopupCreateReceiptConfirmation}
            content={
                <div>
                    <label className='createReceiptConfirmationHeader'>Are You Sure ?</label>
                    <br></br>
                    {!postDataClicked ?  <div>
                            <button className='createReceiptConfirmationYesButton' onClick={createReceipt}>Yes</button>
                            <button className='createReceiptConfirmationNoButton' onClick={closePopupCreateReceiptConfirmation}>No</button>
                        </div>:
                        <button type="button" className='createReceiptConfirmationYesButton'  onClick={handleClosePopups} >Close</button>
                        
                    }
                    <br></br>
                    {postDataClicked ? <div className='createReceiptConfirmationStatusMessageContainer'><label className='createReceiptConfirmationStatusMessage'>{postStatusMessage}</label></div>: null}
                    
                </div>
            }/>}  





            {modalVisibleUpdateReceipt ? <div className='modal-one'></div>:null}
            {updateReceiptPopupOpen && <Popup
            popupType='updateReceiptPopup'
            handleClose={togglePopupUpdateReceipt}
            content={
                <form onSubmit={onSubmitValidateInput}>
                    <label className='formHeader'>Update Receipt</label>
                    <br></br>
                    <br></br>

                    <label className='formLabelText'>Order No. Id:</label>
                    <input type="number" className='updateInputOrderId' onChange={(e) => setOrderNoIdValue(e.target.value)}></input>
                    <br></br>

                    <label className='formLabelText'>Total Item Price:</label>
                    <input pattern="^\d*(\.\d{0,2})?$" type="number" step="0.01" className='updateInputTotalItemPrice' onChange={(e) => setTotalItemPriceValue(e.target.value)} ></input>
                    <br></br>

                    <button className='updateReceiptButton'>Submit</button>
                    <br></br>
                    <br></br>

                    {submitStatusMessageStatus ? <label className='formLabelTextStatus'>{<label className='formLabelText'>{submitStatusMessage}</label>}</label>:null}
                </form>
            }/>}

            {modalVisibleConfirmationReceipt ? <div className='modal-two'></div>:null}
            {confirmationReceiptPopupOpen && <Popup
            popupType='updateReceiptConfirmationPopup'
            handleClose={togglePopupUpdateReceiptConfirmation}
            content={
                <div>
                    <label className='updateReceiptConfirmationHeader'>Are You Sure ?</label>
                    <br></br>
                    {!postDataClicked ?  <div>
                            <button className='updateReceiptConfirmationYesButton' onClick={updateReceipt}>Yes</button>
                            <button className='updateReceiptConfirmationNoButton' onClick={closePopupUpdateReceiptConfirmation}>No</button>
                        </div>:
                        <button type="button" className='updateReceiptConfirmationYesButton'  onClick={handleClosePopups} >Close</button>
                        
                    }
                    <br></br>
                    {postDataClicked ? <div className='updateReceiptConfirmationStatusMessageContainer'><label className='updateReceiptConfirmationStatusMessage'>{postStatusMessage}</label></div>: null}
                    
                </div>
            }/>}  



            {modalVisibleDeleteReceipt ? <div className='modal-one'></div>:null}
            {deleteReceiptPopupOpen && <Popup
            popupType='deleteReceiptPopup'
            handleClose={togglePopupDeleteReceipt}
            content={
                <form onSubmit={onSubmitValidateInput}>
                    <div>
                    <label className='deleteReceiptConfirmationHeader'>Are You Sure ?</label>
                    <br></br>
                    {!postDataClicked ?  <div>
                            <button className='deleteReceiptConfirmationYesButton' onClick={deleteReceipt}>Yes</button>
                            <button className='deleteReceiptConfirmationNoButton' onClick={closePopupDeleteReceiptConfirmation}>No</button>
                        </div>:
                        <button type="button" className='deleteReceiptConfirmationYesButton'  onClick={handleClosePopups} >Close</button>
                        
                    }
                    <br></br>
                    {postDataClicked ? <div className='deleteReceiptConfirmationStatusMessageContainer'><label className='deleteReceiptConfirmationStatusMessage'>{postStatusMessage}</label></div>: null}
                    
                </div>

                    {submitStatusMessageStatus ? <label className='formLabelTextStatus'>{<label className='formLabelText'>{submitStatusMessage}</label>}</label>:null}
                </form>
            }/>}

            {modalVisibleConfirmationReceipt ? <div className='modal-two'></div>:null}
            {confirmationReceiptPopupOpen && <Popup
            popupType='deleteReceiptConfirmationPopup'
            handleClose={togglePopupDeleteReceiptConfirmation}
            content={
                <div>
                    <label className='deleteReceiptConfirmationHeader'>Are You Sure ?</label>
                    <br></br>
                    {!postDataClicked ?  <div>
                            <button className='deleteReceiptConfirmationYesButton' onClick={updateReceipt}>Yes</button>
                            <button className='deleteReceiptConfirmationNoButton' onClick={closePopupUpdateReceiptConfirmation}>No</button>
                        </div>:
                        <button type="button" className='deleteReceiptConfirmationYesButton'  onClick={handleClosePopups} >Close</button>
                        
                    }
                    <br></br>
                    {postDataClicked ? <div className='deleteReceiptConfirmationStatusMessageContainer'><label className='deleteReceiptConfirmationStatusMessage'>{postStatusMessage}</label></div>: null}
                    
                </div>
            }/>}  





            <div className="receipt">
                <h1>Receipts</h1>

                <table>
                    <tr>
                        <th>No.</th>
                        <th>Order No.</th>
                        <th>Actions</th>
                    </tr>
                    
                    {receiptsListData.map((receiptsList, index)=>(
                            <tr key={receiptsList.orderNoId}>
                            <td>{index+1}</td>
                            <td>{receiptsList.orderNoId}</td>
                            <td className='actionButtons'><ViewOrderItemsButton setReceiptNo={setViewOrderItemsOrderNo} orderNo={receiptsList.orderNoId} setViewReceipt={setViewReceipt}/></td>
                            <td className='actionButtons'><button className='trialReceiptContainerUpdateButton' onClick={togglePopupCreateReceiptConfirmation}>Update Receipt No.</button></td>
                            <td className='actionButtons'><button className='trialReceiptContainerDeleteButton' onClick={togglePopupCreateReceiptConfirmation}>Delete Receipt</button></td>
                            </tr>
                        )
                    )}
                    
                    

                </table>

                {modalVisibleViewReceipt ? <div className='modal'></div>:null}
                <ViewOrderItems orderNo={viewOrderItemsOrderNo} viewOrder={viewOrder} setViewOrder={setViewOrder}/>
            </div>
        </>
    )
}