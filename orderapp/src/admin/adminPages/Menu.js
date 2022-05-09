import './Menu.css';
import React, { useEffect, useState } from 'react';
import { ambrosialAxiosAPI } from '../../api/api';
import Popup from '../adminComponents/popup';
import UpdateAndDeleteButton from '../adminComponents/commonComponents/UpdateAndDeleteButton';
import ConfirmationPopupContents from '../adminComponents/commonComponents/confirmationPopupContents';

export default function Menu() {

    //submit popup and confirmation popup
    //By Shaun
    // const [createOrderPopupOpen, setCreateOrderPopupOpen] = useState(false);
    // const [confirmationOrderPopupOpen, setConfirmationOrderPopupOpen] = useState(false);

    // function togglePopupCreateOrder() {
    //     setCreateOrderPopupOpen(!createOrderPopupOpen);
    //     setSubmitStatusMessageStatus(false);
    //     setModalVisible(!modalVisible);
    //   }

    //State to see empty string and status message
    //By Shaun
    // const [submitStatusMessageStatus, setSubmitStatusMessageStatus] = useState(false);
    // const [submitStatusMessage, setSubmitStatusMessage] = useState('');

    //validation on submit
    // function onSubmitValidateInput(event) {
    //     event.preventDefault();
    //     if (!orderNoValue) {
    //         setSubmitStatusMessageStatus(true);
    //         setSubmitStatusMessage('***Please Fill Up Your Blank Input Fields***');
    //         return;
    //     }

    //     togglePopupCreateOrderConfirmation();
    // }

    //By Shaun
    // function togglePopupCreateOrderConfirmation() {

    //     setConfirmationOrderPopupOpen(!confirmationOrderPopupOpen);
    //     togglePopupCreateOrder();
    //     setSubmitStatusMessageStatus(false);
    // }

    // function closePopupCreateOrderConfirmation() {
    //     console.log('in closePopupCreateOrderConfirmation here');
    //     setOrderNoValue(0);

    //     setPostDataClicked(false);
    //     setPostStatusMessage(false);
    //     setPostDataClicked(false);
    //     setSubmitStatusMessageStatus(false);
    //     setCreateOrderPopupOpen(true);
    //     setConfirmationOrderPopupOpen(false);

    // }

    // //final close
    // function handleClosePopups() {

    //     setOrderNoValue(0);

    //     setPostDataClicked(false);
    //     setPostStatusMessage(false);
    //     setPostDataClicked(false);
    //     setSubmitStatusMessageStatus(false);
    //     setCreateOrderPopupOpen(false);
    //     setConfirmationOrderPopupOpen(false);

    // }

    // //For the inputs to create order
    // const [orderNoValue, setOrderNoValue] = useState(0);

    // //For the result of the post
    // const [postStatus, setPostStatus] = useState(false);
    // const [postStatusMessage, setPostStatusMessage] = useState(false);
    // //For showing the result message
    // const [postDataClicked, setPostDataClicked] = useState(false);

    // async function createDistinctOrder() {
    //     console.log('called create distinct order');

    //     await ambrosialAxiosAPI.post('/createdistinctorder', {
    //         orderNo: orderNoValue,
    //     })
    //         .then((response) => {
    //             console.log(`${response.config.method} method`, `for route:, ${response.config.url}`);
    //             console.log(`response Status: ${response.data.status}`);
    //             console.log(`response Message: ${response.data.message}`);
    //             console.log("response Data: ", response.data.data);
    //             setPostStatus(response.data.status);
    //             setPostStatusMessage(response.data.message);
    //         })
    //         .catch((error) => {
    //             console.log(`${error.response.config.method} method`, `for route:, ${error.response.config.url}`);
    //             console.log(`Error Status: ${error.response.data.status}`);
    //             console.log(`Error Message: ${error.response.data.message}`);
    //             setPostStatus(error.response.data.status);
    //             setPostStatusMessage(error.response.data.message);
    //         });


    //     setPostDataClicked(true);
    // }

    //========== Get Request: All Menu Items ==========

    useEffect(async () => {
        //preload the menu items
        getAllMenuItems();

    }, []);


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

    // //This is for viewing a distintive Menu Item (Refer to view-order-items.js line 135 from this point onwards for viewing/updates)
    const [viewMenuItemID, setViewMenuItemID] = useState(0);
    // const [viewMenuItemSrc, setViewMenuItemSrc] = useState(0);
    // const [viewMenuItemAlt, setViewMenuItemAlt] = useState(0);
    // const [viewMenuItemType, setViewMenuItemType] = useState(0);
    // const [viewMenuItemPrice, setViewMenuItemPrice] = useState(0);
    // const [viewMenuItemCategory, setViewMenuItemCategory] = useState(0);
    // const [viewMenuItemChefRecommendation, setViewMenuItemChefRecommendation] = useState(0);

    //========== This is for Updating of Menu Item
    //setting update view
    const [viewUpdate, setViewUpdate] = useState(false);
    const [viewConfirmationUpdatePopupOpen, setViewConfirmationUpdatePopupOpen] = useState(false);
    console.log("viewUpdate is ", viewUpdate);
    console.log("viewConfirmationUpdatePopupOpen is ", viewConfirmationUpdatePopupOpen);

    //setting of Menu Item ID for each row
    const [menuItemID, setMenuItemID] = useState(false);
    //const [menuItemUpdate, setMenuItemUpdate] = useState(0);

    console.log("Menu Item ID is ", menuItemID);
    //console.log("Menu Item Update is ", menuItemUpdate);

    //Validating the input tag
    const [updateSubmitStatus, setUpdateSubmitStatus] = useState(false);
    const [updateSubmitStatusMessage, setUpdateSubmitStatusMessage] = useState('');

    //setting of the update distinct menu Item confirmation

    //function to toggle the popup update
    function toggleUpdateMenuItemPopup() {
        setViewUpdate(!viewUpdate);
        setUpdateSubmitStatus(false);
        setModalVisible(!modalVisible);
    }


    //function to validate the input tag for update
    function onSubmitValidateinputForUpdate(event) {
        event.preventDefault();
        console.log(menuItemIDValueUpdate);
        if (!menuItemIDValueUpdate || !menuItemSrcValueUpdate || !menuItemTypeValueUpdate || !menuItemPriceValueUpdate || !menuItemCategoryValueUpdate || !menuItemChefRecommendationValueUpdate) {
            setUpdateSubmitStatus(true);
            setUpdateSubmitStatusMessage('***Please Fill Up Your Blank Input Fields***');
            console.log('inhere');
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
        setMenuItemIDValueUpdate(0);
        setMenuItemSrcValueUpdate(0);
        setMenuItemAltValueUpdate(0);
        setMenuItemTypeValueUpdate(0);
        setMenuItemPriceValueUpdate(0);
        setMenuItemCategoryValueUpdate(0);
        setMenuItemChefRecommendationValueUpdate(0);

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
        setMenuItemIDValueUpdate(0);
        setMenuItemSrcValueUpdate(0);
        setMenuItemAltValueUpdate(0);
        setMenuItemTypeValueUpdate(0);
        setMenuItemPriceValueUpdate(0);
        setMenuItemCategoryValueUpdate(0);
        setMenuItemChefRecommendationValueUpdate(0);

        setUpdateDataClicked(false);
        setUpdateMenuItemStatus(false);
        setUpdateMenuItemStatusMessage(false);
        setUpdateSubmitStatus(false);
        setUpdateSubmitStatusMessage('');
        setViewUpdate(true);
        setViewConfirmationUpdatePopupOpen(false);
    }

    //For the inputs to update order
    const [menuItemIDValueUpdate, setMenuItemIDValueUpdate] = useState(0);
    const [menuItemSrcValueUpdate, setMenuItemSrcValueUpdate] = useState(0);
    const [menuItemAltValueUpdate, setMenuItemAltValueUpdate] = useState(0);
    const [menuItemTypeValueUpdate, setMenuItemTypeValueUpdate] = useState(0);
    const [menuItemPriceValueUpdate, setMenuItemPriceValueUpdate] = useState(0);
    const [menuItemCategoryValueUpdate, setMenuItemCategoryValueUpdate] = useState(0);
    const [menuItemChefRecommendationValueUpdate, setMenuItemChefRecommendationValueUpdate] = useState(0);

    //setting of update being clicked and updating of menu itemID for distinct order
    //For the result of the post
    const [updateMenuItemStatus, setUpdateMenuItemStatus] = useState(false);
    const [updateMenuItemStatusMessage, setUpdateMenuItemStatusMessage] = useState(false);


    //For showing the result message
    const [updateDataClicked, setUpdateDataClicked] = useState(false);

    async function updateMenuItem() {
        console.log('called update menu item');

        await ambrosialAxiosAPI.put(`/update-mi/${menuItemID}`, {

            // field that is not needed in Menu Item for changing
            // orderNoId: orderNoIdValueUpdate,
            //menuItemID: menuItemIDValueUpdate,
            src: menuItemSrcValueUpdate,
            alt: menuItemAltValueUpdate,
            type: menuItemTypeValueUpdate,
            price: menuItemPriceValueUpdate,
            category: menuItemCategoryValueUpdate,
            chefRecommendation: menuItemChefRecommendationValueUpdate,
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
    //setting delete view
    const [viewDelete, setViewDelete] = useState(false);
    const [viewConfirmationDeletePopupOpen, setViewConfirmationDeletePopupOpen] = useState(false);

    //Validating the input tag
    const [deleteSubmitStatus, setDeleteSubmitStatus] = useState(false);
    const [deleteSubmitStatusMessage, setDeleteSubmitStatusMessage] = useState('');

    //setting of the update distinct order confirmation

    //function to toggle the popup update
    function toggleDeleteMenuItemPopup() {
        setViewDelete(!viewDelete);
        setDeleteSubmitStatus(false);
        setModalVisible(!modalVisible);
    }

    //function to validate the input tag for delete
    function onSubmitValidateinputForDelete(event) {
        event.preventDefault();

        toggleDeleteMenuItemConfirmation();
    }

    function toggleDeleteMenuItemConfirmation() {

        console.log('in toggleDeleteMenuItemConfirmation');
        setViewDelete(!viewDelete);
        setViewConfirmationDeletePopupOpen(!viewConfirmationDeletePopupOpen);
        toggleDeleteMenuItemPopup();
        setDeleteSubmitStatus(false);

    }

    function closePopupDeleteMenuItemConfirmation() {

        setDeleteDataClicked(false);
        setDeleteMenuItemStatus(false);
        setDeleteMenuItemStatusMessage(false);
        setDeleteSubmitStatus(false);
        setDeleteSubmitStatusMessage('');
        setViewDelete(true);
        setViewConfirmationDeletePopupOpen(false);
        console.log('In closePopupDeleteMenuItemConfirmation');
    }

    //final close
    function handleCloseDeletePopups() {


        setDeleteDataClicked(false);
        setDeleteMenuItemStatus(false);
        setDeleteMenuItemStatusMessage(false);
        setDeleteSubmitStatus(false);
        setDeleteSubmitStatusMessage('');
        setViewDelete(false);
        setViewConfirmationDeletePopupOpen(false);
    }

    //setting of update being clicked and updating of order no for distinct order
    //For the result of the post
    const [deleteMenuItemStatus, setDeleteMenuItemStatus] = useState(false);
    const [deleteMenuItemStatusMessage, setDeleteMenuItemStatusMessage] = useState(false);
    //For showing the result message
    const [deleteDataClicked, setDeleteDataClicked] = useState(false);

    async function deleteMenuItem() {
        console.log('called delete menu item');


        await ambrosialAxiosAPI.delete(`/delete-mi/${menuItemID}`)
            .then((response) => {
                console.log(`${response.config.method} method for route: ${response.config.url}`);
                console.log(`response Status: ${response.data.status}`);
                console.log(`response Message: ${response.data.message}`);
                console.log("response Data: ", response.data.data);
                setDeleteMenuItemStatus(response.data.status);
                setDeleteMenuItemStatusMessage(response.data.message);
            })
            .catch((error) => {
                console.log(`${error.response.config.method} method for route: ${error.response.config.url}`);
                console.log(`Error Status: ${error.response.data.status}`);
                console.log(`Error Message: ${error.response.data.message}`);
                setDeleteMenuItemStatus(error.response.data.status);
                setDeleteMenuItemStatusMessage(error.response.data.message);
            });

        setDeleteDataClicked(true);
    }

    // /////////////////////////////////////////////////////////////////////////////
    // //order data status and ordereditems data (found in view-order-items but not order.js. to confirm if needed)


    //modal Code for popups
    const [modalVisible, setModalVisible] = useState(false);
    console.log('viewUpdate:', viewUpdate);
    console.log('viewConfirmationUpdatePopupOpen:', viewConfirmationUpdatePopupOpen);

    //UseEffect to track the different popups
    useEffect(async () => {

        // if ((createMenuItemPopupOpen === true)) {
        //     setModalVisible(true);
        // }

        // if ((confirmationMenuItemPopupOpen === true)) {
        //     setModalVisible(true);
        // }

        // if ((viewMenuItem === true)) {
        //     setModalVisible(true);
        // }

        if ((viewUpdate === true)) {
            setModalVisible(true);
        }

        if ((viewConfirmationUpdatePopupOpen === true)) {
            setModalVisible(true);
        }

        if ((viewDelete === true)) {
            setModalVisible(true);
        }

        if ((viewConfirmationDeletePopupOpen === true)) {
            setModalVisible(true);
        }

        // if ((createMenuItemPopupOpen === false) && (confirmationMenuItemPopupOpen === false) && (viewMenuItem === false) && (viewUpdate === false) && (viewConfirmationUpdatePopupOpen === false) && (viewDelete === false) && (viewConfirmationDeletePopupOpen === false)) {
        //     setModalVisible(false);
        // } 
        else {
            console.log('not all popup states are false');
        }

    }, [
        //createMenuItemPopupOpen,
        // confirmationMenuItemPopupOpen, 
        // viewMenuItem, 
        viewUpdate, viewConfirmationUpdatePopupOpen, viewDelete, viewConfirmationDeletePopupOpen]);

    return (
        <>
            {/* By Shuan*/}
            {/* <div className='createAndRefresh'>
            <button className='refreshList' onClick={getAllDistinctOrders}>Refresh List</button>
            <button className='createOrder' onClick={togglePopupCreateOrder}>Create New Order</button>
        </div>

        {modalVisible ? <div className='modalContainer'></div> : null}
        {createOrderPopupOpen && <Popup
            popupType='createOrderPopup'
            handleClose={togglePopupCreateOrder}
            content={
                <form onSubmit={onSubmitValidateInput}>
                    <label className='formHeaderCreateDistinctOrder'>Create New Order</label>
                    <br></br>
                    <br></br>

                    <label className='formLabelTextCreateDistinctOrder'>Order No.:</label>
                    <input type="number" className='createInputOrderNo' onChange={(e) => setOrderNoValue(e.target.value)}></input>
                    <br></br>

                    <button className='createOrderButton'>Submit</button>
                    <br></br>
                    <br></br>

                    {submitStatusMessageStatus ? <label className='formLabelTextStatusCreateDistinctOrder'>{<label className='formLabelTextCreateDistinctOrder'>{submitStatusMessage}</label>}</label> : null}
                </form>
            } />}


        {confirmationOrderPopupOpen && <Popup
            popupType='createOrderConfirmationPopup'
            handleClose={togglePopupCreateOrderConfirmation}
            content={
                <ConfirmationPopupContents invokeAction={createDistinctOrder} invokeRefresh={getAllDistinctOrders} xButtonClose={closePopupCreateOrderConfirmation} closeButton={handleClosePopups} clickStatus={postDataClicked} statusMessage={postStatusMessage} />
            } />} */}


            {/* update Popup */}
            {
                viewUpdate && <Popup
                    popupType='updateMenuItemPopup'
                    handleClose={toggleUpdateMenuItemPopup}
                    content={
                        <form onSubmit={onSubmitValidateinputForUpdate}>
                            <label className='formHeader'>Update Menu Item</label>
                            <br></br>
                            <br></br>
                            {/* Retrieve menuItemID from backend */}
                            <label className='formLabelTextUpdate'>Menu Item ID:</label>
                            <label className='formLabelMenuItemUpdate'>{viewMenuItemID}</label>
                            <br></br>
                            {/* Input fields for menu item popup */}
                            <label className='formLabelText'>Item Image:</label>
                            <input type="number" className='updateMenuItemAlt' onChange={(e) => setMenuItemSrcValueUpdate(e.target.value)}></input>
                            <br></br>
                            <label className='formLabelText'>Item Description:</label>
                            <input type="number" className='updateMenuItemAlt' onChange={(e) => setMenuItemAltValueUpdate(e.target.value)}></input>
                            <br></br>
                            <label className='formLabelText'>Type:</label>
                            <input type="number" className='updateMenuItemtype' onChange={(e) => setMenuItemTypeValueUpdate(e.target.value)}></input>
                            <br></br>
                            <label className='formLabelText'>Price:</label>
                            <input type="number" className='updateMenuItemPrice' onChange={(e) => setMenuItemPriceValueUpdate(e.target.value)}></input>
                            <br></br>
                            <label className='formLabelText'>Category:</label>
                            <input type="number" className='updateMenuItemCategory' onChange={(e) => setMenuItemCategoryValueUpdate(e.target.value)}></input>
                            <br></br>
                            <label className='formLabelText'>Chef Recommendation:</label>
                            <input type="number" className='updateMenuItemChefRecommendation' onChange={(e) => setMenuItemChefRecommendationValueUpdate(e.target.value)}></input>
                            <br></br>
                            <button className='updateMenuItemButton'>Submit</button>
                            <br></br>
                            <br></br>

                            {updateSubmitStatus ? <label className='formLabelTextStatus'>{<label className='formLabelText'>{updateSubmitStatusMessage}</label>}</label> : null}
                        </form>
                    } />
            }

            {
                viewConfirmationUpdatePopupOpen && <Popup
                    popupType='updateMenuItemConfirmationPopup'
                    handleClose={closePopupUpdateMenuItemConfirmation}
                    content={
                        //props needed are: updateMenuItem(), closePopupUpdateMenuItemConfirmation(), handleCloseUpdatePopups(), updateDataClicked and updateMenuOrderStatusMessage
                        <ConfirmationPopupContents invokeAction={updateMenuItem} invokeRefresh={getAllMenuItems} xButtonClose={closePopupUpdateMenuItemConfirmation} closeButton={handleCloseUpdatePopups} clickStatus={updateDataClicked} statusMessage={updateMenuItemStatusMessage} />
                    } />}

            {/* delete Popup */}
            {viewDelete && <Popup
                popupType='deleteMenuItemPopup'
                handleClose={toggleDeleteMenuItemPopup}
                content={
                    <form onSubmit={onSubmitValidateinputForDelete}>
                        <label className='formHeaderDeleteMenuItem'>Delete Menu Item Record</label>
                        <br></br>
                        <br></br>
                        {/* Retrieve menuItemID from backend */}
                        <label className='formLabelTextDeleteMenuItem'>Menu Item:</label>
                        <label className='formLabelMenuItem'>{viewMenuItemID}</label>
                        <br></br>

                        {/* Input fields for menu item popup */}
                        {/* <label className='formLabelText'>Item Image:</label>
                        <label className='formLabelMenuItem'>{viewMenuItemSrc}</label>
                        <br></br>
                        <label className='formLabelText'>Item Description:</label>
                        <label className='formLabelMenuItem'>{viewMenuItemAlt}</label>
                        <br></br>
                        <label className='formLabelText'>Type:</label>
                        <label className='formLabelMenuItem'>{viewMenuItemType}</label>
                        <br></br>
                        <label className='formLabelText'>Price:</label>
                        <label className='formLabelMenuItem'>{viewMenuItemPrice}</label>
                        <br></br>
                        <label className='formLabelText'>Category:</label>
                        <label className='formLabelMenuItem'>{viewMenuItemCategory}</label>
                        <br></br>
                        <label className='formLabelText'>Chef Recommendation:</label>
                        <label className='formLabelMenuItem'>{viewMenuItemChefRecommendation}</label>
                        <br></br> */}
                        <button className='deleteMenuItemButton'>Submit</button>
                        <br></br>
                        <br></br>

                        {deleteSubmitStatus ? <label className='formLabelTextStatus'>{<label className='formLabelText'>{deleteSubmitStatusMessage}</label>}</label> : null}
                    </form>
                } />}

            {viewConfirmationDeletePopupOpen && <Popup
                popupType='deleteMenuItemConfirmationPopup'
                handleClose={toggleDeleteMenuItemConfirmation}
                content={
                    <ConfirmationPopupContents invokeAction={deleteMenuItem} invokeRefresh={getAllMenuItems} xButtonClose={closePopupDeleteMenuItemConfirmation} closeButton={handleCloseDeletePopups} clickStatus={deleteDataClicked} statusMessage={deleteMenuItemStatusMessage} />
                } />
            }

            <div className="menuitems">
                This is the menu page

                <table className='table'>
                    <tr>
                        <th>Menu Item ID</th>
                        <th>Image</th>
                        <th>Type</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Chef Recommendation</th>
                        <th>Action</th>
                    </tr>

                    {menuItemData.map((allMenuItems) => (
                        <tr key={allMenuItems.menuItemID}>
                            <td>{allMenuItems.menuItemID}</td>
                            <td><img class="menuitem-image" src={allMenuItems.src}></img></td>
                            <td>{allMenuItems.alt}</td>
                            <td>{allMenuItems.type}</td>
                            <td>{allMenuItems.price}</td>
                            <td>{allMenuItems.category}</td>
                            <td>{allMenuItems.chefRecommendation ? "Yes" : "No"}</td>

                            <td className='actionButtons'><UpdateAndDeleteButton setId={setMenuItemID} id={menuItemData.menuItemID} setData={setViewMenuItemID} data={allMenuItems.menuItemID} setView={setViewUpdate} buttonText={"Update Menu Item"} /></td>
                            <td className='actionButtons'><UpdateAndDeleteButton setId={setMenuItemID} id={menuItemData.menuItemID} setData={setViewMenuItemID} data={allMenuItems.menuItemID} setView={setViewDelete} buttonText={"Delete Menu Item"} /></td>
                        </tr>
                    )
                    )}

                </table>


                {/* <ViewMenuItems setMenuItemID={setMenuItemID} setOrderNo={setViewOrderItemsOrderNo} viewMenuItem={viewMenuItemID} setViewMenuItem={setViewMenuItemID} /> */}

            </div>

        </>
    )

}