import { useEffect, useState } from 'react';
import './Receipts.css';
import Popup from '../adminComponents/popup';
import { ambrosialAxiosAPI } from '../../api/api';
import UpdateAndDeleteButton from '../adminComponents/commonComponents/UpdateAndDeleteButton';
import ConfirmationPopupContents from '../adminComponents/commonComponents/confirmationPopupContents';
import ViewOrderItems from '../adminComponents/ordersComponents/view-order-items';
import ViewOrderItemsButton from '../adminComponents/ordersComponents/view-order-items-button';

export default function Receipt(props) {

    //Create Receipt
    //Submit popup and confirmation popup
    const [createReceiptPopupOpen, setCreateReceiptPopupOpen] = useState(false);
    const [createReceiptConfirmationPopupOpen, setCreateReceiptConfirmationPopupOpen] = useState(false);

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
            setSubmitStatusMessage('***Please check the input fields***');
            return;
        }

        togglePopupCreateReceiptConfirmation();
    }

    function togglePopupCreateReceiptConfirmation() {
        // event.preventDefault();
        setCreateReceiptConfirmationPopupOpen(!createReceiptConfirmationPopupOpen);
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

    function handleClosePopups(){
        
        setCreateReceiptPopupOpen(false);
        setCreateReceiptConfirmationPopupOpen(false);
        setOrderNoIdValue(0);
        setTotalItemPriceValue(0);
        setPostStatus(false);
        setPostStatusMessage(false);
        setPostDataClicked(false);
    }

    //For the inputs to create receipt
    const [orderNoIdValue, setOrderNoIdValue] = useState(0);
    const [totalItemPriceValue, setTotalItemPriceValue] = useState(0);

    //For the result of the post
    const [postStatus, setPostStatus] = useState(false);
    const [postStatusMessage, setPostStatusMessage] = useState(false);
    //For showing the result message
    const [postDataClicked, setPostDataClicked] = useState(false);
    
    async function createReceipt(){
        console.log('called create receipt');
        
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





    //update///////////////////////////////////////////////////////////////////////////
    //setting update view
    const [viewUpdate, setViewUpdate] = useState(false);
    const [viewConfirmationUpdatePopupOpen, setViewConfirmationUpdatePopupOpen] = useState(false);
    console.log("viewUpdate is ", viewUpdate);
    console.log("viewConfirmationUpdatePopupOpen is ", viewConfirmationUpdatePopupOpen);
    //setting of receiptID for each row
    const [receiptID, setReceiptID] = useState(false);
    //setting of menuitem name for each row
    const [orderNoId, setOrderNo] = useState(0);

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






    // //Delete Receipt
    // //Submit popup and confirmation popup
    // const [deleteReceiptPopupOpen, setDeleteReceiptPopupOpen] = useState(false);

    // function togglePopupDeleteReceipt() {
    //     setDeleteReceiptPopupOpen(!deleteReceiptPopupOpen);
    //     setSubmitStatusMessageStatus(false);
    // }

    // function onSubmitValidateInput(event){
    //     event.preventDefault();
    //     if(!receiptID || !orderNoIdValue || !totalItemPriceValue) {
    //         setSubmitStatusMessageStatus(true);
    //         setSubmitStatusMessage('***Please check the input fields***');
    //         return;
    //     }

    //     togglePopupDeleteReceiptConfirmation();
    // }

    // function togglePopupDeleteReceiptConfirmation() {
    //     // event.preventDefault();
    //     setCreateReceiptConfirmationPopupOpen(!createReceiptConfirmationPopupOpen);
    //     togglePopupDeleteReceipt();
    //     setSubmitStatusMessageStatus(false);
    // }

    // function closePopupDeleteReceiptConfirmation(){
    //     resetInputsToDefaultValue();
    //     togglePopupDeleteReceiptConfirmation();
    // }

    // function resetInputsToDefaultValue(){
    //     setOrderNoIdValue(0);
    //     setTotalItemPriceValue(0);

    //     setSubmitStatusMessageStatus(false);
    // }

    // function handleClosePopups(event){
    //     event.preventDefault();
    //     setDeleteReceiptPopupOpen(!deleteReceiptPopupOpen);
    //     setCreateReceiptConfirmationPopupOpen(!createReceiptConfirmationPopupOpen);
    //     //setPostDataClicked(false);
    // }
    
    // async function deleteReceipt(event){
    //     console.log('called delete receipt');
    //     event.preventDefault();

    //     await ambrosialAxiosAPI.delete('/deletereceipt/:receiptID')
    //     .then((response) => {
    //          console.log(`${response.config.method} method`, `for route:, ${response.config.url}`);
    //          console.log(`response Status: ${response.data.status}`);
    //          console.log(`response Message: ${response.data.message}`);
    //          console.log("response Data: ", response.data.data);
    //          setPostStatus(response.data.status);
    //          setPostStatusMessage(response.data.message);
    //       })
    //     .catch((error) => {
    //         console.log(`${error.response.config.method} method`,`for route:, ${error.response.config.url}`);
    //         console.log(`Error Status: ${error.response.data.status}`);
    //         console.log(`Error Message: ${error.response.data.message}`);
    //         setPostStatus(error.response.data.status);
    //         setPostStatusMessage(error.response.data.message);
    //       });
    //       setPostDataClicked(true);
    // }






    //View Receipts
    useEffect(() => {
        getReceipts();
    }, []);

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
    const [modalVisible, setModalVisible] = useState(false);
    console.log('modalVisible in receipts is', modalVisible);
    
    useEffect( async () => {

        if((createReceiptPopupOpen===true)){
            setModalVisible(true);
        }

        if((createReceiptConfirmationPopupOpen === true) ){
            setModalVisible(true);
        }

        if((viewUpdate===true)){
            setModalVisible(true);
        }

        if((viewConfirmationUpdatePopupOpen === true) ){
            setModalVisible(true);
        }

        if((createReceiptPopupOpen===false) && (createReceiptConfirmationPopupOpen===false) && (viewUpdate===false) && (viewConfirmationUpdatePopupOpen===false)){
            // && (viewDelete===false) && (viewConfirmationDeletePopupOpen===false)
            setModalVisible(false);
        }else{
            console.log('not all popup states are false');
        }
        
    }, [createReceiptPopupOpen, createReceiptConfirmationPopupOpen, viewUpdate, viewConfirmationUpdatePopupOpen]);


    console.log('totalItemPrice is:', totalItemPriceValue);

    return (
        <>
        <div className='createAndRefresh'>
            <button  className='refreshList' onClick={getReceipts}>Refresh List</button>
            <button className='createReceipt' onClick={togglePopupCreateReceipt}>Create New Receipt</button> 
        </div>
            



            {modalVisible ? <div className='modal-one'></div>:null}
            {createReceiptPopupOpen && <Popup
            popupType='createReceiptPopup'
            handleClose={togglePopupCreateReceipt}
            content={
                <form onSubmit={onSubmitValidateInput}>
                    <label className='formHeader'>Create New Receipt</label>
                    <br /><br />

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

            {createReceiptConfirmationPopupOpen && <Popup
            popupType='createReceiptConfirmationPopup'
            handleClose={togglePopupCreateReceiptConfirmation}
            content={
                <ConfirmationPopupContents invokeAction={createReceipt} invokeRefresh={getReceipts} xButtonClose={closePopupCreateReceiptConfirmation} closeButton={handleClosePopups} clickStatus={postDataClicked} statusMessage={postStatusMessage}/>
            }/>}  


            
            {/* update Popup */}
            {viewUpdate && <Popup
                popupType='updateReceiptPopup'
                handleClose={toggleUpdateReceiptsPopup}
                content={
                    <form onSubmit={onSubmitValidateinputForUpdate}>
                        <label className='formHeader'>Update Receipt</label>
                            <br></br>
                            <br></br>

                            <label className='formLabelText'>Order No. Id:</label>
                            <input type="number" className='createInputOrderNoId' onChange={(e) => setOrderNoIdValueUpdate(e.target.value)}></input>
                            <br></br>

                            <label className='formLabelText'>Total Item Price:</label>
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



            {/* {modalVisibleUpdateReceipt ? <div className='modal-one'></div>:null}
            





            {modalVisibleDeleteReceipt ? <div className='modal-one'></div>:null}
            {deleteReceiptPopupOpen && <Popup
            popupType='deleteReceiptPopup'
            handleClose={togglePopupDeleteReceipt}
            content={
                <form onSubmit={onSubmitValidateInput}>
                    <div>
                    <label className='deleteReceiptConfirmationHeader'>Are You Sure ?</label>
                    <br></br>
                    {!postDataClicked ?  
                        <div>
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
            {createReceiptConfirmationPopupOpen && <Popup
            popupType='deleteReceiptConfirmationPopup'
            handleClose={togglePopupDeleteReceiptConfirmation}
            content={
                <div>
                    <label className='deleteReceiptConfirmationHeader'>Are You Sure ?</label>
                    <br></br>
                    {!postDataClicked ? 
                        <div>
                            <button className='deleteReceiptConfirmationYesButton' onClick={updateReceipt}>Yes</button>
                            <button className='deleteReceiptConfirmationNoButton' onClick={closePopupUpdateReceiptConfirmation}>No</button>
                        </div>:
                        <button type="button" className='deleteReceiptConfirmationYesButton'  onClick={handleClosePopups} >Close</button>
                    }
                    <br></br>
                    {postDataClicked ? <div className='deleteReceiptConfirmationStatusMessageContainer'><label className='deleteReceiptConfirmationStatusMessage'>{postStatusMessage}</label></div>: null}
                </div>
            }/>}   */}





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
                            <td className='actionButtons'><UpdateAndDeleteButton setId={setReceiptID} id={receiptsList.receiptID} setData={setOrderNo} data={receiptsList.DistinctOrderList.orderNo} setView={setViewUpdate} buttonText={"Update Receipt"}/></td>
                            <td className='actionButtons'><button className='trialReceiptContainerDeleteButton' onClick={togglePopupCreateReceiptConfirmation}>Delete Receipt</button></td>
                            </tr>
                        )
                    )}
                </table>

                {/* {modalVisibleViewReceipt ? <div className='modal'></div>:null} */}
                <ViewOrderItems orderNo={viewOrderItemsOrderNo} viewOrder={viewOrder} setViewOrder={setViewOrder}/>
            
            </div>
        </>
    )
}