import './popup.css';

function Popup(props){

    if(props.popupType === 'loginPopup'){
        return(
            <div className="loginPopup-box">
                <div className="login-box">
                    <span className="login-close-icon" onClick={props.handleClose}>x</span>
                        {props.content}
                </div>
            </div>
        );
    }
    else if(props.popupType === 'updatePasswordErrorPopup'){
        return(
            <div className="updatePasswordError-box">
                <div className="updatePasswordError-box">
                    <span className="updatePasswordError-close-icon" onClick={props.handleClose}>x</span>
                        {props.content}
                </div>
            </div>
        );
    }
    else if(props.popupType === 'updatePasswordSuccessPopup'){
        return(
            <div className="updatePasswordSuccess-box">
                <div className="updatePasswordSuccess-box">
                    <span className="updatePasswordSuccess-close-icon" onClick={props.handleClose}>x</span>
                        {props.content}
                </div>
            </div>
        );
    }
    else if(props.popupType === 'createOrderPopup'){
        return(
            <div className="createOrderPopup-box">
                <div className="createOrder-box">
                    <span className="createOrder-close-icon" onClick={props.handleClose}>x</span>
                        {props.content}
                </div>
            </div>
        );
    }
    else if(props.popupType === 'createOrderConfirmationPopup'){
        return(
            <div className="createOrderConfirmationPopup-box">
                <div className="createOrderConfirmation-box">
                    <span className="createOrderConfirmation-close-icon" onClick={props.handleClose}>x</span>
                        {props.content}
                </div>
            </div>
        );
    }
    else if(props.popupType === 'viewOrderPopup'){
        return(
            <div className="viewOrderPopup-box">
                <div className="viewOrder-box">
                    <span className="viewOrder-close-icon" onClick={props.handleClose}>x</span>
                        {props.content}
                </div>
            </div>
        );
    }
    else if(props.popupType === 'createOrderItemPopup'){
        return(
            <div className="createOrderItemPopup-box">
                <div className="createOrderItem-box">
                    <span className="createOrderItem-close-icon" onClick={props.handleClose}>x</span>
                        {props.content}
                </div>
            </div>
        );
    }
    else if(props.popupType === 'createOrderItemConfirmationPopup'){
        return(
            <div className="createOrderItemConfirmationPopup-box">
                <div className="createOrderItemConfirmation-box">
                    <span className="createOrderItemConfirmation-close-icon" onClick={props.handleClose}>x</span>
                        {props.content}
                </div>
            </div>
        );
    }
    else if(props.popupType === 'updateCurrentDistinctOrderPopup'){
        return(
            <div className="updateCurrentDistinctOrderPopup-box">
                <div className="updateCurrentDistinctOrder-box">
                    <span className="updateCurrentDistinctOrder-close-icon" onClick={props.handleClose}>x</span>
                        {props.content}
                </div>
            </div>
        );
    }
    else if(props.popupType === 'updateOrderConfirmationPopup'){
        return(
            <div className="updateOrderConfirmationPopup-box">
                <div className="updateOrderConfirmation-box">
                    <span className="updateOrderConfirmation-close-icon" onClick={props.handleClose}>x</span>
                        {props.content}
                </div>
            </div>
        );
    }
    else if(props.popupType === 'updateOrderItemPopup'){
        return(
            <div className="updateOrderItemPopup-box">
                <div className="updateOrderItem-box">
                    <span className="updateOrderItem-close-icon" onClick={props.handleClose}>x</span>
                        {props.content}
                </div>
            </div>
        );
    }
    else if(props.popupType === 'updateOrderItemConfirmationPopup'){
        return(
            <div className="updateOrderItemConfirmationPopup-box">
                <div className="updateOrderItemConfirmation-box">
                    <span className="updateOrderItemConfirmation-close-icon" onClick={props.handleClose}>x</span>
                        {props.content}
                </div>
            </div>
        );
    }
    else if(props.popupType === 'deleteCurrentDistinctOrderPopup'){
        return(
            <div className="deleteCurrentDistinctOrderPopup-box">
                <div className="deleteCurrentDistinctOrder-box">
                    <span className="deleteCurrentDistinctOrder-close-icon" onClick={props.handleClose}>x</span>
                        {props.content}
                </div>
            </div>
        );
    }
    else if(props.popupType === 'deleteOrderConfirmationPopup'){
        return(
            <div className="deleteOrderConfirmationPopup-box">
                <div className="deleteOrderConfirmation-box">
                    <span className="deleteOrderConfirmation-close-icon" onClick={props.handleClose}>x</span>
                        {props.content}
                </div>
            </div>
        );
    }
    else if(props.popupType === 'createReceiptPopup'){
        return(
            <div className="createReceiptPopup-box">
                <div className="createReceipt-box">
                    <span className="createReceipt-close-icon" onClick={props.handleClose}>x</span>
                        {props.content}
                </div>
            </div>
        );
    }
    else if(props.popupType === 'createReceiptConfirmationPopup'){
        return(
            <div className="createReceiptConfirmationPopup-box">
                <div className="createReceiptConfirmation-box">
                    <span className="createReceiptConfirmation-close-icon" onClick={props.handleClose}>x</span>
                        {props.content}
                </div>
            </div>
        );
    }
    else if(props.popupType === 'updateReceiptPopup'){
        return(
            <div className="updateReceiptPopup-box">
                <div className="updateReceipt-box">
                    <span className="updateReceipt-close-icon" onClick={props.handleClose}>x</span>
                        {props.content}
                </div>
            </div>
        );
    }
    else if(props.popupType === 'updateReceiptConfirmationPopup'){
        return(
            <div className="updateReceiptConfirmationPopup-box">
                <div className="updateReceiptConfirmation-box">
                    <span className="updateReceiptConfirmation-close-icon" onClick={props.handleClose}>x</span>
                        {props.content}
                </div>
            </div>
        );
    }
    else if(props.popupType === 'deleteReceiptPopup'){
        return(
            <div className="deleteReceiptPopup-box">
                <div className="deleteReceipt-box">
                    <span className="deleteReceipt-close-icon" onClick={props.handleClose}>x</span>
                        {props.content}
                </div>
            </div>
        );
    }
    else if(props.popupType === 'deleteReceiptConfirmationPopup'){
        return(
            <div className="deleteReceiptConfirmationPopup-box">
                <div className="deleteReceiptConfirmation-box">
                    <span className="deleteReceiptConfirmation-close-icon" onClick={props.handleClose}>x</span>
                        {props.content}
                </div>
            </div>
        );
    }
    else if(props.popupType === 'viewReceiptPopup'){
        return(
            <div className="viewReceiptPopup-box">
                <div className="viewReceipt-box">
                    <span className="viewReceipt-close-icon" onClick={props.handleClose}>x</span>
                        {props.content}
                </div>
            </div>
        );
    }
    else if(props.popupType === 'createPaymentPopup'){
        return(
            <div className="createPaymentPopup-box">
                <div className="createPayment-box">
                    <span className="createPayment-close-icon" onClick={props.handleClose}>x</span>
                        {props.content}
                </div>
            </div>
        );
    }
    else if(props.popupType === 'createPaymentConfirmationPopup'){
        return(
            <div className="createPaymentConfirmationPopup-box">
                <div className="createPaymentConfirmation-box">
                    <span className="createPaymentConfirmation-close-icon" onClick={props.handleClose}>x</span>
                        {props.content}
                </div>
            </div>
        );
    }
}

export default Popup;