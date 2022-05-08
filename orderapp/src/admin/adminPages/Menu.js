import './Menu.css';
import React, { useEffect, useState } from 'react';
import { ambrosialAxiosAPI } from '../../api/api';
import Popup from '../adminComponents/popup';
import UpdateAndDeleteButton from '../adminComponents/commonComponents/UpdateAndDeleteButton';
import ConfirmationPopupContents from '../adminComponents/commonComponents/confirmationPopupContents';

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



    //To get all menu data
    const [menuItemData, setMenuItemData] = useState([]);

    async function getAllMenuItems() {
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
                console.log(`${error.response.config.method} method`, `for route:, ${error.response.config.url}`);
                console.log(`Error Status: ${error.response.data.status}`);
                console.log(`Error Message: ${error.response.data.message}`);
            });
    }

    // //This is for viewing the orders for a distinct order
    const [viewSingleMenuItem, setViewSingleMenuItem] = useState(0);
    const [viewMenuItem, setMenuItem] = useState(false);


    //========== This is for Creation of New Menu Item




    //========== This is for Updating of Menu Item
    //setting update view
    const [viewUpdate, setViewUpdate] = useState(false);
    const [viewConfirmationUpdatePopupOpen, setViewConfirmationUpdatePopupOpen] = useState(false);
    console.log("viewUpdate is ", viewUpdate);
    console.log("viewConfirmationUpdatePopupOpen is ", viewConfirmationUpdatePopupOpen);
    //setting of Menu Item for each row (May Not be neccessary?)
    const [menuItemID, setMenuItemID] = useState(false);
    const [menuItemUpdate, setMenuItemUpdate] = useState(0);

    console.log("Menu Item ID is ", menuItemID);
    console.log("Menu Item Update is ", menuItemUpdate); //May Not Be necessar=y for Menu Item

    //Validating the input tag
    const [updateSubmitStatus, setUpdateSubmitStatus] = useState(false);
    const [updateSubmitStatusMessage, setUpdateSubmitStatusMessage] = useState('');

    //========== setting of the update Menu Item confirmation

    //function to toggle the popup update
    function toggleUpdateMenuItemPopup() {
        setViewUpdate(!viewUpdate);
        setUpdateSubmitStatus(false);
        setModalVisible(!modalVisible);
    }

    //function to validate the input tags for update
    function onSubmitValidateinputForUpdate(event) {
        event.preventDefault();
        console.log(menuItemUpdate);
        if (!menuItemUpdate) {
            setUpdateSubmitStatus(true);
            setUpdateSubmitStatusMessage('***Please Fill Up Your Blank Input Fields***');
            console.log('in validating inputs for update menu item');
            return;
        }

        toggleUpdateMenuItemConfirmation();
    }

    function toggleUpdateMenuItemConfirmation() {
        // event.preventDefault();
        console.log('in toggle here');
        setViewUpdate(!viewUpdate);
        setViewConfirmationUpdatePopupOpen(!viewConfirmationUpdatePopupOpen);
        toggleUpdateMenuItemPopup();
        setUpdateSubmitStatus(false);
        //setOrderNoUpdate(0);
    }

    function closePopupUpdateMenuItemConfirmation() {
        //setOrderNoUpdate(0);
        setMenuItemIDValueUpdate(0);

        setUpdateDataClicked(false);
        setUpdateMenuItemStatus(false);
        setUpdateMenuItemStatusMessage(false);
        setUpdateSubmitStatus(false);
        setUpdateSubmitStatusMessage('');
        setViewUpdate(true);
        setViewConfirmationUpdatePopupOpen(false);
        console.log('in here');
    }

    //final close
    function handleCloseUpdatePopups(event) {
        //setOrderNoUpdate(0);
        //setSrcValueUpdate(0);
        //setMeunItemValueUpdate(0);
        setAltValueUpdate(0);
        setTypeValueUpdate(0);
        setPriceValueUpdate(0);
        setCategoryValueUpdate(0);
        setChefRecommendationValueUpdate(0);

        setUpdateDataClicked(false);
        setUpdateMenuItemStatus(false);
        setUpdateMenuItemStatusMessage(false);
        setUpdateSubmitStatus(false);
        setUpdateSubmitStatusMessage('');
        setViewUpdate(false);
        setViewConfirmationUpdatePopupOpen(false);
    }

    //For the inputs to update order
    // const [menuItemIDValueUpdate, setmenuItemIDValueUpdate] = useState(0);
    // const [srcValueUpdate, setSrcValueUpdate] = useState(0); (Image)
    const [altValueUpdate, setAltValueUpdate] = useState(0);
    const [typeValueUpdate, setTypeValueUpdate] = useState(0);
    const [priceValueUpdate, setPriceValueUpdate] = useState(0);
    const [categoryValueUpdate, setCategoryValueUpdate] = useState(0);
    const [chefRecommendationValueUpdate, setChefRecommendationValueUpdate] = useState(0);

    //setting of update being clicked and updating of order no for distinct order
    //For the result of the post
    const [updateMenuItemStatus, setUpdateMenuItemStatus] = useState(false);
    const [updateMenuItemStatusMessage, setUpdateMenuItemStatusMessage] = useState(false);
    //For showing the result message
    const [updateDataClicked, setUpdateDataClicked] = useState(false);

    async function updateMenuItem() {
        console.log('called menu item update');

        await ambrosialAxiosAPI.put(`/new-mi/${menuItemID}`, {
            //menuItemID: menuItemIDValueUpdate,
            // src: (To update once code get to worked for image input) 
            alt: altValueUpdate,
            type: typeValueUpdate,
            price: priceValueUpdate,
            category: categoryValueUpdate,
            chefrecommendation: chefRecommendationValueUpdate,

            //Check if need to include rest of the field
        })
            .then((response) => {
                console.log(`${response.config.method} method for route: ${response.config.url}`);
                console.log(`response Status: ${response.data.status}`);
                console.log(`response Message: ${response.data.message}`);
                console.log("response Data: ", response.data.data);
                setUpdateMenuItemStatus(response.data.status);
                setUpdateMenuItemStatusMessage(response.data.message);
            })
            .catch((error) => {
                console.log(`${error.response.config.method} method for route: ${error.response.config.url}`);
                console.log(`Error Status: ${error.response.data.status}`);
                console.log(`Error Message: ${error.response.data.message}`);
                setUpdateMenuItemStatus(error.response.data.status);
                setUpdateMenuItemStatusMessage(error.response.data.message);
            });

        setUpdateDataClicked(true);
    }



    //========== This is for Deleting of Menu Item
    //setting Menu update button


    //modal Code for popups
    const [modalVisible, setModalVisible] = useState(false);
    console.log('modalVisible in receipts is', modalVisible);

    useEffect(async () => {

        // if((createMenuItemPopupOpen===true)){
        //     setModalVisible(true);
        // }

        // if((createMenuItemConfirmationPopupOpen === true) ){
        //     setModalVisible(true);
        // }

        if ((viewUpdate === true)) {
            setModalVisible(true);
        }

        if ((viewConfirmationUpdatePopupOpen === true)) {
            setModalVisible(true);
        }

        // if ((viewDelete === true)) {
        //     setModalVisible(true);
        // }

        // if ((viewConfirmationDeletePopupOpen === true)) {
        //     setModalVisible(true);
        // }

        // if((createMenuItemPopupOpen===false) && (createMenuItemConfirmationPopupOpen===false) && (viewUpdate===false) && (viewConfirmationUpdatePopupOpen===false) && (viewDelete===false) && (viewConfirmationDeletePopupOpen===false)){
        //     setModalVisible(false);
        //} 
        else {
            console.log('not all popup states are false');
        }
        //===== Uncomment once Creation is completed ===== 
    }, [
        // createMenuItemPopupOpen, createMenuItemConfirmationPopupOpen, 
        viewUpdate, viewConfirmationUpdatePopupOpen,
        // viewDelete, viewConfirmationDeletePopupOpen
    ]);



    return (
        <>
            <div className='createAndRefresh'>
                <button className='refreshMenuItemList' onClick={getAllMenuItems}>Refresh Menu Item List</button>
                <button className='createMenuItem' onClick={getAllMenuItems}>Create New Menu Item</button>
            </div>

            {/* update Popup */}
            {viewUpdate && <Popup
                popupType='updateMenuItemPopup'
                handleClose={toggleUpdateMenuItemPopup}
                content={
                    <form onSubmit={onSubmitValidateinputForUpdate}>
                        <label className='formHeader'>Update Menu Item</label>
                        <br></br>
                        <br></br>
                        {/* Instead of doing input type, need to pull in menuItemID from backend */}
                        {/* <label className='formLabelText'>Menu Item ID:</label>  */}

                        <label className='formLabelText'>Item Description:</label>
                        <input type="number" className='updateMenuItemAlt' onChange={(e) => setAltValueUpdate(e.target.value)}></input>
                        <br></br>
                        <label className='formLabelText'>Type:</label>
                        <input type="number" className='updateMenuItemtype' onChange={(e) => setTypeValueUpdate(e.target.value)}></input>
                        <br></br>
                        <label className='formLabelText'>Price:</label>
                        <input type="number" className='updateMenuItemPrice' onChange={(e) => setPriceValueUpdate(e.target.value)}></input>
                        <br></br>
                        <label className='formLabelText'>Category:</label>
                        <input type="number" className='updateMenuItemCategory' onChange={(e) => setCategoryValueUpdate(e.target.value)}></input>
                        <br></br>
                        <label className='formLabelText'>Chef Recommendation:</label>
                        <input type="number" className='updateMenuItemChefRecommendation' onChange={(e) => setChefRecommendationValueUpdate(e.target.value)}></input>
                        <br></br>
                        <button className='updateMenuItemButton'>Submit Update</button>
                        <br></br>
                        <br></br>

                        {updateSubmitStatus ? <label className='formLabelTextStatus'>{<label className='formLabelText'>{updateSubmitStatusMessage}</label>}</label> : null}
                    </form>
                } />}

            {viewConfirmationUpdatePopupOpen && <Popup
                popupType='updateMenuItemConfirmationPopup'
                handleClose={toggleUpdateMenuItemConfirmation}
                content={
                    //props needed are: updateMenuItem(), closePopupUpdateMenuItemConfirmation(), handleCloseUpdatePopups(), updateDataClicked and updateMenuItemStatusMessage
                    <ConfirmationPopupContents invokeAction={updateMenuItem} invokeRefresh={getAllMenuItems} xButtonClose={closePopupUpdateMenuItemConfirmation} closeButton={handleCloseUpdatePopups} clickStatus={updateDataClicked} statusMessage={updateMenuItemStatusMessage} />
                } />}


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

                    {menuItemData.map((allMenuItems) => (
                        <tr key={allMenuItems.menuItemID}>
                            <td>{allMenuItems.menuItemID}</td>
                            <td>{allMenuItems.alt}</td>
                            <td>{allMenuItems.type}</td>
                            <td>{allMenuItems.price}</td>
                            <td>{allMenuItems.category}</td>
                            <td>{allMenuItems.chefRecommendation ? "Yes" : "No"}</td>

                            <td className='actionButtons'><UpdateAndDeleteButton setId={setMenuItemID} id={allMenuItems.menuItemID} data={allMenuItems.alt} setView={setViewUpdate} buttonText={"Update Menu Item"} /></td>
                            {/* <td className='actionButtons'><UpdateAndDeleteButton setId={setReceiptID} id={receiptsList.receiptID} setData={setOrderNo} data={receiptsList.DistinctOrderList.orderNo} setView={setViewDelete} buttonText={"Delete Receipt"} /></td> */}

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



