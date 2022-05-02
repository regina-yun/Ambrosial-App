import './Receipts.css';
import React, {useEffect, useState} from 'react';
import Popup from '../adminComponents/popup';
const ambrosialAxiosAPI = require("../api/api");

export default function Receipts() {
    
    const [receiptsList, setReceiptsList] = useState([]);

    const getReceipts = async(response) => {
        await ambrosialAxiosAPI.get('/receipts')
        .then((response) => {
             console.log(`${response.config.method} method`, `for route:, ${response.config.url}`);
             console.log(`response Status: ${response.data.status}`);
             console.log(`response Message: ${response.data.message}`);
             console.log("response Data: ", response.data.data);
             setReceiptsList(response.data.data);
           })
        .catch((error) => {
           console.log(`${error.response.config.method} method`,`for route:, ${error.response.config.url}`);
           console.log(`Error Status: ${error.response.data.status}`);
           console.log(`Error Message: ${error.response.data.message}`);
         });
    }
    
    useEffect(() => {
        getReceipts();
    });



    const [isOpen, setIsOpen] = useState(false);
    const [newReceipt, setNewReceipt] = useState([]);
    function handleCreate() { 

        function togglePopup() {
            setIsOpen(!isOpen);
        }

        function handlesubmit(e){
            e.preventDefault();
    
            (async ()=>{
                await ambrosialAxiosAPI.post('/createreceipt')
                .then((response) => {
                    console.log(`${response.config.method} method`, `for route:, ${response.config.url}`);
                    console.log(`response Status: ${response.data.status}`);
                    console.log(`response Message: ${response.data.message}`);
                    console.log("response Data: ", response.data.data);
                    setNewReceipt(response.data.data);
                })
                .catch((error) => {
                console.log(`${error.response.config.method} method`,`for route:, ${error.response.config.url}`);
                console.log(`Error Status: ${error.response.data.status}`);
                console.log(`Error Message: ${error.response.data.message}`);
                });
            })();
        }

        return (
            <>
                {isOpen && <Popup
                popupType='create-receipt-popup'
                handleClose={togglePopup}
                content={
                    <>
                        <h2 className='create-receipt-content'>Create receipt</h2>
                        <form onSubmit={handlesubmit}>
                        <input className='inputvalue' type="text" placeholder="Enter Order Number ID" name="orderNoID" size="50" autoFocus />
                        <input className='inputvalue' type="text" placeholder="Enter total price" name="totalPrice" size="50" />
                        <button className='create-button'>Create</button>
                        </form>
                    </>
                }
                />
                }   
            </>    
        );
    }
    



    const [oneReceipt, setOneReceipt] = useState([]);

    function handleView(orderNoId) {

        function togglePopup() {
            setIsOpen(!isOpen);
        }

        const getOneReceipt = async(response) => {
            await ambrosialAxiosAPI.get(`/receipts/${orderNoId}`)
            .then((response) => {
                console.log(`${response.config.method} method`, `for route:, ${response.config.url}`);
                console.log(`response Status: ${response.data.status}`);
                console.log(`response Message: ${response.data.message}`);
                console.log("response Data: ", response.data.data);
                setOneReceipt(response.data.data);
            })
            .catch((error) => {
            console.log(`${error.response.config.method} method`,`for route:, ${error.response.config.url}`);
            console.log(`Error Status: ${error.response.data.status}`);
            console.log(`Error Message: ${error.response.data.message}`);
            });
        }
    
        getOneReceipt();

        return (
            <>
                {isOpen && <Popup
                popupType='view-receipt-popup'
                handleClose={togglePopup}
                content={
                <h2 className='view-receipt-content'>View receipt</h2>
                }
                />
                }   
            </>    
        );
    }




    const [updatedReceipt, setUpdatedReceipt] = useState([]);

    function handleEdit() {

        function togglePopup() {
            setIsOpen(!isOpen);
        }

        (async (receiptID)=>{
            //const receiptID = 1;
            await ambrosialAxiosAPI.put(`/updatereceipt/${receiptID}`, {    
                orderNoId: 1,
                totalPrice: 61.23
            })
            .then((response) => {
                console.log(`${response.config.method} method for route: ${response.config.url}`);
                console.log(`response Status: ${response.data.status}`);
                console.log(`response Message: ${response.data.message}`);
                console.log("response Data: ", response.data.data);
                setUpdatedReceipt(response.data.data)
            })
            .catch((error) => {
                console.log(`${error.response.config.method} method for route: ${error.response.config.url}`);
                console.log(`Error Status: ${error.response.data.status}`);
                console.log(`Error Message: ${error.response.data.message}`);
            });
        })();

        return (
            <>
                {isOpen && <Popup
                popupType='edit-receipt-popup'
                handleClose={togglePopup}
                content={
                <>
                    <h2 className='edit-receipt-content'>Edit receipt</h2>
                </>
                }
                />
                }   
            </>    
        );
    }




    function handleDelete() {

        function togglePopup() {
            setIsOpen(!isOpen);
        }

        function handleCancel() {
            setIsOpen(!isOpen);
        }

        function handleConfirm() {
            (async (receiptID)=>{
                //const receiptID = 1;
                await ambrosialAxiosAPI.delete(`/updatereceipt/${receiptID}`)
                .then((response) => {
                    console.log(`${response.config.method} method for route: ${response.config.url}`);
                    console.log(`response Status: ${response.data.status}`);
                    console.log(`response Message: ${response.data.message}`);
                    console.log("response Data: ", response.data.data);
                })
                .catch((error) => {
                    console.log(error);
                    console.log(`${error.response.config.method} method for route: ${error.response.config.url}`);
                    console.log(`Error Status: ${error.response.data.status}`);
                    console.log(`Error Message: ${error.response.data.message}`);
                });
            })();
        }
        

        return (
            <>
                {isOpen && <Popup
                popupType='delete-receipt-popup'
                handleClose={togglePopup}
                content={
                    <>
                        <h2 className='delete-receipt-content'>Delete receipt</h2>
                        <span>
                            <button className="cancel" 
                                    onClick={handleCancel}
                            >
                            Cancel
                            </button>
                            <button className="confirm"
                                    onClick={handleConfirm}
                            >
                            Confirm
                            </button>
                        </span>
                    </>
                }
                />
                }   
            </>    
        );
    }




    return (
        <div className="receipts">
            <h1>Receipts</h1>
            <button className="create"
                    onClick={handleCreate}
            >
            Create new receipt
            </button>
            <table className="receipts-table">
                <thead>
                    <tr>
                        <th className="column-one">No.</th>
                        <th className="column-two">Order number ID</th>
                        <th className="column-three">Total Price</th>
                        <th className="column-four">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        receiptsList.length > 0
                        ? receiptsList.map (r =>
                        <tr key={r.id}>
                            <td>{r.id}</td>
                            <td>{r.orderNoId}</td>
                            <td>{r.totalPrice}</td>
                            <td>
                                <button className="action"
                                        onClick={handleView}
                                >
                                View
                                </button>
                                <button className="action"
                                        onClick={handleEdit}
                                >
                                Edit
                                </button>
                                <button className="action"
                                        onClick={handleDelete}
                                >
                                Delete
                                </button>
                            </td>
                        </tr>  
                        ) : (
                            <tr>
                                <td className="none">No receipts in the list</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}