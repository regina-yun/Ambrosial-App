import './Receipts.css';
import React, {useEffect, useState} from 'react';
import Popup from '../adminComponents/popup';

export default function Receipts() {
    /*
    const [receiptsList, setReceiptsList] = useState([]);

    (async ()=>{
        await ambrosialAxiosAPI.get('/receipts')
        .then((response) => {
             console.log(`${response.config.method} method`, `for route:, ${response.config.url}`);
             console.log(`response Status: ${response.data.status}`);
             console.log(`response Message: ${response.data.message}`);
             console.log("response Data: ", response.data.data);
           })
        .catch((error) => {
           console.log(`${error.response.config.method} method`,`for route:, ${error.response.config.url}`);
           console.log(`Error Status: ${error.response.data.status}`);
           console.log(`Error Message: ${error.response.data.message}`);
         });
    })();
    
    useEffect(() => {
        getReceipts();
    },[]);

    function handleCreate() {
        const [isOpen, setIsOpen] = useState(false);

        function togglePopup() {
            setIsOpen(!isOpen);
        }

        (async ()=>{
            await ambrosialAxiosAPI.post('/createreceipt')
            .then((response) => {
                console.log(`${response.config.method} method`, `for route:, ${response.config.url}`);
                console.log(`response Status: ${response.data.status}`);
                console.log(`response Message: ${response.data.message}`);
                console.log("response Data: ", response.data.data);
            })
            .catch((error) => {
            console.log(`${error.response.config.method} method`,`for route:, ${error.response.config.url}`);
            console.log(`Error Status: ${error.response.data.status}`);
            console.log(`Error Message: ${error.response.data.message}`);
            });
        })();

        return (
            <>
                {isOpen && <Popup
                popupType='view-receipt-popup'
                handleClose={togglePopup}
                content={<p className='view-receipt-content'>View receipt</p>}/>}   
            </>    
        );
    }
    
    function handleView(orderNoId) {
        const [isOpen, setIsOpen] = useState(false);

        function togglePopup() {
            setIsOpen(!isOpen);
        }

        (async ()=>{
            await ambrosialAxiosAPI.get(`/receipts/${orderNoId}`)
            .then((response) => {
                console.log(`${response.config.method} method`, `for route:, ${response.config.url}`);
                console.log(`response Status: ${response.data.status}`);
                console.log(`response Message: ${response.data.message}`);
                console.log("response Data: ", response.data.data);
            })
            .catch((error) => {
            console.log(`${error.response.config.method} method`,`for route:, ${error.response.config.url}`);
            console.log(`Error Status: ${error.response.data.status}`);
            console.log(`Error Message: ${error.response.data.message}`);
            });
        })();

        return (
            <>
                {isOpen && <Popup
                popupType='view-receipt-popup'
                handleClose={togglePopup}
                content={<p className='view-receipt-content'>View receipt</p>}/>}   
            </>    
        );
    }

    function handleEdit() {
        const [isOpen, setIsOpen] = useState(false);

        function togglePopup() {
            setIsOpen(!isOpen);
        }

        (async (receiptID)=>{
            const receiptID = 1;
            await ambrosialAxiosAPI.put(`/updatereceipt/${receiptID}`, {    
                orderNoId: 1,
                totalPrice: 61.23
            })
            .then((response) => {
                console.log(`${response.config.method} method for route: ${response.config.url}`);
                console.log(`response Status: ${response.data.status}`);
                console.log(`response Message: ${response.data.message}`);
                console.log("response Data: ", response.data.data);
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
                content={<p className='edit-receipt-content'>Edit receipt</p>}/>}   
            </>    
        );
    }

    function handleDelete() {
        const [isOpen, setIsOpen] = useState(false);

        function togglePopup() {
            setIsOpen(!isOpen);
        }

        (async (receiptID)=>{
            const receiptID = 1;
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

        return (
            <>
                {isOpen && <Popup
                popupType='delete-receipt-popup'
                handleClose={togglePopup}
                content={<p className='delete-receipt-content'>Delete receipt</p>}/>}   
            </>    
        );
    }
*/
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
                        <tr>
                            <td>1</td>
                            <td>2</td>
                            <td>$50.00</td>
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
                </tbody>
            </table>
        </div>
    )
}