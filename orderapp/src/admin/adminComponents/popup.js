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
}

export default Popup;