import React, { useState } from "react";

import Popup from '../components/popup/popup';
import CartItems from '../components/CartItems';
import TotalBillCalculator from '../components/TotalBillCalculator';
import OrderlistSendBtn from '../components/OrderlistSendBtn';
import OrderlistPopUp from '../components/OrderlistPopUp' ;
import "./orderlist.css";

function OrderList(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [sendOrderPopup, setSendOrderPopup] = useState(false);
  const [TotalBilling, setTotalBilling] = useState(0);
  
  const handleTotalBill = (bill) => {
    console.log('Inside handle total billing: ', bill);
    setTotalBilling(bill);
  }

  const togglePopup = () => {
    setIsOpen(!isOpen);
  }
  
  const toggleSendOrderPopup = () => {
    setSendOrderPopup(!sendOrderPopup);
  }
  
  function updateQuantityHandler() {
    let totalQuantity = 0;
    for (let i = 0; i < props.selectedItemList.length; i++){
      totalQuantity += props.selectedItemList[i].quantity;
    }
    return totalQuantity;
  }

  return(
    <>
      <img src="https://i.ibb.co/tYKtTN0/image.jpg"
        alt="cart icon" 
        className="orderlisticon"
        style={{height: 45, width: 45}}
        onClick={togglePopup} />

      <div className="quantityUpdater">{updateQuantityHandler()}</div>
        
      {isOpen && <Popup 
      popupType='orderlist-popup' 
      handleClose={togglePopup}
      content={
        <>
          <CartItems selectedItemList={props.selectedItemList} setSelectedItemList={props.setSelectedItemList}/>
          <TotalBillCalculator selectedItemList={props.selectedItemList} handleTotalBill={handleTotalBill}/>              
          <OrderlistSendBtn selectedItemList={props.selectedItemList} TotalBilling={TotalBilling} setIsOpen={setIsOpen} setSendOrderPopup={setSendOrderPopup}/>
        </>
      }/>}

      {sendOrderPopup && <Popup 
        popupType='orderbill-popup' 
        handleClose={toggleSendOrderPopup}
        content={<OrderlistPopUp setSendOrderPopup={setSendOrderPopup} TotalBilling={TotalBilling} selectedItemList={props.selectedItemList}/>}/>}
    </>);

}

export default OrderList;
