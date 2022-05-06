import './confirmationPopupContents.css';

function ConfirmationPopupContents(props){

    //update example:
    //props needed are: updateDistinctOrder(), closePopupUpdateDistinctOrderConfirmation(), handleCloseUpdatePopups(), updateDataClicked and updateDistinctOrderStatusMessage
    
    //need function for yes, no and close button
    function yesButtonAction(event){
        event.preventDefault();
        props.invokeAction();
        props.invokeRefresh();
    }

    function noButtonAction(event){
        event.preventDefault();
        props.xButtonClose();
    }

    function closeButtonAction(event){
        event.preventDefault();
        props.closeButton();
        props.invokeRefresh();
    }

    return(
        <div>
            <label className='generalConfirmationHeader'>Are You Sure ?</label>
                <br></br>
                {!props.clickStatus ?  <div> 
                        <button className='generalConfirmationYesButton' onClick={yesButtonAction}>Yes</button>
                        <button className='generalConfirmationNoButton' onClick={noButtonAction}>No</button>
                    </div>:
                    <button type="button" className='generalConfirmationCloseButton'  onClick={closeButtonAction} >Close</button>
                    
                }
                <br></br>
                {props.clickStatus ? <div className='generalConfirmationStatusMessageContainer'><label className='generalConfirmationStatusMessage'>{props.statusMessage}</label></div>: null}
                
        </div>
    );
}


export default ConfirmationPopupContents;


