import React from 'react'
import { useState } from 'react';

import Invoice from './Invoice.js'
import './OrderlistPopUp.css';


function OrderlistPopUp(props) {
    console.log('Inside Order List Popup, id for invoice:', props.id)
    console.log('Inside Order List Popup:', props.selectedItemList);
    return (props.trigger) ?  (

        <div className="orderlist-popup">
            <div className="popup-page">
                {props.children}

    {/* <button className="close" onClick={() => props.setTrigger(false)}>X</button> */}
    <h1 className="popupTitle">Your Order Has Been Sent!</h1>
    <Invoice className="invoice"/>
   
        
        </div>
    </div>

    ) : ""; 


}

export default OrderlistPopUp;
