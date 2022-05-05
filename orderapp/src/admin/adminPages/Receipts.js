import './Receipts.css';
import React, {useEffect, useState} from 'react';
const ambrosialAxiosAPI = require("../../api/api");

export default function Receipts() {
    
    const [receiptsList, setReceiptsList] = useState([]);

    const getReceipts = async() => {
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


    const [create, setCreate] = useState(false);
    const [newReceipt, setNewReceipt] = useState([]);

        function handleCreate(e){
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
    
    


    const [view, setView] = useState(false);
    const [oneReceipt, setOneReceipt] = useState([]);

        const getOneReceipt = async() => {
            await ambrosialAxiosAPI.get('/vieworderitems')
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

    useEffect(() => {
        getOneReceipt();
    });


    const [edit, setEdit] = useState(false);
    const [updatedReceipt, setUpdatedReceipt] = useState([]);

    function handleEdit(e) {
        e.preventDefault();

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
    }



    const [destroy, setDestroy] = useState(false);

        function handleDestroy() {
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
        <div className={create ? "create-popup active" : "create-popup"}>
            <p className="close" onClick={() => setCreate(false)}>X</p>
            <form onSubmit={handleCreate}>
                <h2>Create receipt</h2><br />
                <div>
                    <label className="ONID">Order Number ID:</label>
                    <input className='inputvalue' type="text" placeholder="Enter Order Number ID" name="orderNoID" autoFocus /><br />
                </div><br />
                <div>
                    <label className="TP">Total Price:</label>
                <input className='inputvalue' type="text" placeholder="Enter total price" name="totalPrice" /><br />
                </div><br />
                <div className='create-button'>
                    <button>Create</button>
                </div>
            </form>
        </div>



        <div className={view ? "view-popup active" : "view-popup"}>
        <p className="close" onClick={() => setView(false)}>X</p>
            <h2>View receipt</h2><br />
            {oneReceipt}
        </div>


        <div className={edit ? "edit-popup active" : "edit-popup"}>
            <p className="close" onClick={() => setEdit(false)}>X</p>
            <form onSubmit={handleEdit}>
                <h2>Edit receipt</h2><br />
                <div>
                    <label className="ONID">Order Number ID:</label>
                    <input className='inputvalue' type="text" placeholder="Enter Order Number ID" name="orderNoID" autoFocus /><br />
                </div><br />
                <div>
                    <label className="TP">Total Price:</label>
                <input className='inputvalue' type="text" placeholder="Enter total price" name="totalPrice" /><br />
                </div><br />
                <div className='create-button'>
                    <button>Update</button>
                </div>
            </form>
        </div>



        <div className={destroy ? "destroy-popup active" : "destroy-popup"}>
        <p className="close" onClick={() => setDestroy(false)}>X</p>   
        <h2 className='destroy-receipt-content'>Delete receipt</h2>
        <h3>Are you sure?</h3><br />
            <span>
                <button className="cancel" 
                        onClick={() => setDestroy(false)}
                >
                Cancel
                </button>
                <button className="confirm"
                        onClick={handleDestroy}
                >
                Confirm
                </button>
            </span>
        </div>


        <div className="receipts">
            <h1>Receipts</h1>
            <button className="create"
                    onClick={() => setCreate(true)}
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
                            <td>3</td>
                            <td>
                                <button className="action"
                                        onClick={() => {setView(true)}}
                                >
                                View
                                </button>
                                <button className="action"
                                        onClick={() => {setEdit(true)}}
                                >
                                Edit
                                </button>
                                <button className="action"
                                        onClick={() => {setDestroy(true)}}
                                >
                                Delete
                                </button>
                            </td>
                        </tr>
                </tbody>
            </table>
        </div>
</>
    )
}
