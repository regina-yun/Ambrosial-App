import './popup.css';

function Popup(props){

    if(props.popupType === 'view-popup'){
        return(
            <div className="view-popup-box">
                <div className="view-box">
                    <span className="view-close-icon" onClick={props.handleClose}>x</span>
                        {props.content}
                </div>
            </div>
        );
    }
    else if(props.popupType === 'create-popup'){
        return(
            <div className="create-popup-box">
                <div className="create-box">
                    <span className="create-close-icon" onClick={props.handleClose}>x</span>
                        {props.content}
                </div>
            </div>
        );
    }
    else if(props.popupType === 'update-popup'){
        return(
            <div className="update-popup-box">
                <div className="update-box">
                    <span className="update-close-icon" onClick={props.handleClose}>x</span>
                        {props.content}
                </div>
            </div>
        );
    }
    else if(props.popupType === 'delete-popup'){
        return(
            <div className="delete-popup-box">
                <div className="delete-box">
                    <span className="delete-close-icon" onClick={props.handleClose}>x</span>
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
}

export default Popup;