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
}

export default Popup;