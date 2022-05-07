import './Menu.css';
import React, {useEffect, useState} from 'react';
import { ambrosialAxiosAPI } from '../../api/api';

export default function Menu() {

    //For the inputs to create menu item
    // const [orderNoIdValue, setOrderNoIdValue] = useState(0);
    // const [menuItemIDValue, setMenuItemIDValue] = useState(0);
    // const [quantityValue, setQuantityValue] = useState(0);
    // const [totalItemPriceValue, setTotalItemPriceValue] = useState(0);
    // const [tableNoValue, setTableNoValue] = useState(0);
    // const [orderStatusValue, setOrderStatusValue] = useState('');


    useEffect(async () => {    
        //preload the menu
        getAllMenuItems(); 
        
    });

    // function handleSort() {
    //     const sortedData = [].sort((a,b) => {
    //         return a.first > b.first ? 1: -1
    //     })
    //     getAllMenuItems(sortedData)
    // }

    //To get all menu data
    const [menuItemData, setMenuItemData] = useState([]);
    
    async function getAllMenuItems(){
        await ambrosialAxiosAPI.get('/findall-mi')
        .then((response) => {
         console.log(`${response.config.method} method`, `for route:, ${response.config.url}`);
         console.log(`response Status: ${response.data.status}`);
         console.log(`response Message: ${response.data.message}`);
         //Not in template literal as it will only show the type object
         console.log("response Data: ", response.data.data);
         setMenuItemData(response.data.data);
       })
       .catch((error) => {
       console.log(`${error.response.config.method} method`,`for route:, ${error.response.config.url}`);
       console.log(`Error Status: ${error.response.data.status}`);
       console.log(`Error Message: ${error.response.data.message}`);
     });
    }

    // //This is for viewing the orders for a distinct order
    // const [viewOrderItemsOrderNo, setViewOrderItemsOrderNo] = useState(0);
    // const [viewOrder, setViewOrder] = useState(false);

return (
    <>
    <div className='createAndRefresh'>
        <button  className='refreshMenuItemList' onClick={getAllMenuItems}>Refresh Menu Item List</button>
        <button className='createMenuItem' onClick={getAllMenuItems}>Create New Menu Item</button> 
    </div>
    
    <div className="orders">
            This is the menu page

            <table className='table'>
                <tr>
                    <th>Menu Item ID</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Chef Recommendation</th>
                    <th>Action</th>
                </tr>

                {menuItemData.map((allMenuItems)=>(
                        <tr key={allMenuItems.menuItemID}>
                        <td>{allMenuItems.menuItemID}</td>
                        <td>{allMenuItems.alt}</td>
                        <td>{allMenuItems.type}</td>
                        <td>{allMenuItems.price}</td>
                        <td>{allMenuItems.category}</td>
                        <td>{allMenuItems.chefRecommendation ? "Yes": "No" }</td> 

                        <td className='actionButtons'>Update Menu Item</td>

                        {/* <td className='actionButtons'><UpdateAndDeleteDistinctOrderButton setOrderNoId={setOrderNoId} orderNoId={allMenuItems.orderNoId} setView={setViewUpdate} buttonText={"Update Order Items"}/></td> */}
                        {/* <td className='actionButtons'><button className='trialOrderContainerUpdateButton' onClick={togglePopupCreateOrderConfirmation}>Update Order No.</button></td> */}
                        {/* <td className='actionButtons'><button className='trialOrderContainerDeleteButton' onClick={togglePopupCreateOrderConfirmation}>Delete Order</button></td> */}
                        </tr>
                    )
                )}


                       
            </table>

            </div>
    </>
    )  

}





// const ambrosialAxiosAPI = require("../../api/api");

// export default function Menu() {
    
//     const [receiptsList, setReceiptsList] = useState([]);

//     const getReceipts = async() => {
//         await ambrosialAxiosAPI.get('/receipts')
//         .then((response) => {
//              console.log(`${response.config.method} method`, `for route:, ${response.config.url}`);
//              console.log(`response Status: ${response.data.status}`);
//              console.log(`response Message: ${response.data.message}`);
//              console.log("response Data: ", response.data.data);
//              setReceiptsList(response.data.data);
//            })
//         .catch((error) => {
//            console.log(`${error.response.config.method} method`,`for route:, ${error.response.config.url}`);
//            console.log(`Error Status: ${error.response.data.status}`);
//            console.log(`Error Message: ${error.response.data.message}`);
//          });
//     }
    
//     useEffect(() => {
//         getReceipts();
//     });


//     const [create, setCreate] = useState(false);
//     const [newReceipt, setNewReceipt] = useState([]);

//         function handleCreate(e){
//             e.preventDefault();
    
//             (async ()=>{
//                 await ambrosialAxiosAPI.post('/createreceipt')
//                 .then((response) => {
//                     console.log(`${response.config.method} method`, `for route:, ${response.config.url}`);
//                     console.log(`response Status: ${response.data.status}`);
//                     console.log(`response Message: ${response.data.message}`);
//                     console.log("response Data: ", response.data.data);
//                     setNewReceipt(response.data.data);
//                 })
//                 .catch((error) => {
//                 console.log(`${error.response.config.method} method`,`for route:, ${error.response.config.url}`);
//                 console.log(`Error Status: ${error.response.data.status}`);
//                 console.log(`Error Message: ${error.response.data.message}`);
//                 });
//             })();
//         }
    
    


//     const [view, setView] = useState(false);
//     const [oneReceipt, setOneReceipt] = useState([]);

//         const getOneReceipt = async() => {
//             await ambrosialAxiosAPI.get('/vieworderitems')
//             .then((response) => {
//                 console.log(`${response.config.method} method`, `for route:, ${response.config.url}`);
//                 console.log(`response Status: ${response.data.status}`);
//                 console.log(`response Message: ${response.data.message}`);
//                 console.log("response Data: ", response.data.data);
//                 setOneReceipt(response.data.data);
//             })
//             .catch((error) => {
//             console.log(`${error.response.config.method} method`,`for route:, ${error.response.config.url}`);
//             console.log(`Error Status: ${error.response.data.status}`);
//             console.log(`Error Message: ${error.response.data.message}`);
//             });
//         }

//     useEffect(() => {
//         getOneReceipt();
//     });


//     const [edit, setEdit] = useState(false);
//     const [updatedReceipt, setUpdatedReceipt] = useState([]);

//     function handleEdit(e) {
//         e.preventDefault();

//         (async (receiptID)=>{
//             //const receiptID = 1;
//             await ambrosialAxiosAPI.put(`/updatereceipt/${receiptID}`, {    
//                 orderNoId: 1,
//                 totalPrice: 61.23
//             })
//             .then((response) => {
//                 console.log(`${response.config.method} method for route: ${response.config.url}`);
//                 console.log(`response Status: ${response.data.status}`);
//                 console.log(`response Message: ${response.data.message}`);
//                 console.log("response Data: ", response.data.data);
//                 setUpdatedReceipt(response.data.data)
//             })
//             .catch((error) => {
//                 console.log(`${error.response.config.method} method for route: ${error.response.config.url}`);
//                 console.log(`Error Status: ${error.response.data.status}`);
//                 console.log(`Error Message: ${error.response.data.message}`);
//             });
//         })();
//     }



//     const [destroy, setDestroy] = useState(false);

//         function handleDestroy() {
//             (async (receiptID)=>{
//                 //const receiptID = 1;
//                 await ambrosialAxiosAPI.delete(`/updatereceipt/${receiptID}`)
//                 .then((response) => {
//                     console.log(`${response.config.method} method for route: ${response.config.url}`);
//                     console.log(`response Status: ${response.data.status}`);
//                     console.log(`response Message: ${response.data.message}`);
//                     console.log("response Data: ", response.data.data);
//                 })
//                 .catch((error) => {
//                     console.log(error);
//                     console.log(`${error.response.config.method} method for route: ${error.response.config.url}`);
//                     console.log(`Error Status: ${error.response.data.status}`);
//                     console.log(`Error Message: ${error.response.data.message}`);
//                 });
//             })();
//         }



//     return (
//     <>
//         <div className={create ? "create-popup active" : "create-popup"}>
//             <p className="close" onClick={() => setCreate(false)}>X</p>
//             <form onSubmit={handleCreate}>
//                 <h2>Create receipt</h2><br />
//                 <div>
//                     <label className="ONID">Order Number ID:</label>
//                     <input className='inputvalue' type="text" placeholder="Enter Order Number ID" name="orderNoID" autoFocus /><br />
//                 </div><br />
//                 <div>
//                     <label className="TP">Total Price:</label>
//                 <input className='inputvalue' type="text" placeholder="Enter total price" name="totalPrice" /><br />
//                 </div><br />
//                 <div className='create-button'>
//                     <button>Create</button>
//                 </div>
//             </form>
//         </div>



//         <div className={view ? "view-popup active" : "view-popup"}>
//         <p className="close" onClick={() => setView(false)}>X</p>
//             <h2>View receipt</h2><br />
//             {oneReceipt}
//         </div>


//         <div className={edit ? "edit-popup active" : "edit-popup"}>
//             <p className="close" onClick={() => setEdit(false)}>X</p>
//             <form onSubmit={handleEdit}>
//                 <h2>Edit receipt</h2><br />
//                 <div>
//                     <label className="ONID">Order Number ID:</label>
//                     <input className='inputvalue' type="text" placeholder="Enter Order Number ID" name="orderNoID" autoFocus /><br />
//                 </div><br />
//                 <div>
//                     <label className="TP">Total Price:</label>
//                 <input className='inputvalue' type="text" placeholder="Enter total price" name="totalPrice" /><br />
//                 </div><br />
//                 <div className='create-button'>
//                     <button>Update</button>
//                 </div>
//             </form>
//         </div>



//         <div className={destroy ? "destroy-popup active" : "destroy-popup"}>
//         <p className="close" onClick={() => setDestroy(false)}>X</p>   
//         <h2 className='destroy-receipt-content'>Delete receipt</h2>
//         <h3>Are you sure?</h3><br />
//             <span>
//                 <button className="cancel" 
//                         onClick={() => setDestroy(false)}
//                 >
//                 Cancel
//                 </button>
//                 <button className="confirm"
//                         onClick={handleDestroy}
//                 >
//                 Confirm
//                 </button>
//             </span>
//         </div>


//         <div className="receipts">
//             <h1>Receipts</h1>
//             <button className="create"
//                     onClick={() => setCreate(true)}
//             >
//             Create new receipt
//             </button>
//             <table className="receipts-table">
//                 <thead>
//                     <tr>
//                         <th className="column-one">No.</th>
//                         <th className="column-two">Order number ID</th>
//                         <th className="column-three">Total Price</th>
//                         <th className="column-four">Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {
//                         receiptsList.length > 0
//                         ? receiptsList.map (r =>
//                         <tr key={r.id}>
//                             <td>{r.id}</td>
//                             <td>{r.orderNoId}</td>
//                             <td>{r.totalPrice}</td>
//                             <td>
//                                 <button className="action"
//                                         onClick={() => {setView(true)}}
//                                 >
//                                 View
//                                 </button>
//                                 <button className="action"
//                                         onClick={() => {setEdit(true)}}
//                                 >
//                                 Edit
//                                 </button>
//                                 <button className="action"
//                                         onClick={() => {setDestroy(true)}}
//                                 >
//                                 Delete
//                                 </button>
//                             </td>
//                         </tr>  
//                         )
//                         : 
//                         (
//                             <tr>
//                                 <td className="none">No receipts in the list</td>
//                             </tr>
//                         )
//                     }
//                 </tbody>
//             </table>
//         </div>
// </>
//     )
// }


