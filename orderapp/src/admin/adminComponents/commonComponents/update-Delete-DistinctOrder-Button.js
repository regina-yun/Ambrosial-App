import './update-Delete-DistinctOrder-Button.css';

function UpdateAndDeleteDistinctOrderButton(props){

    function updateAction(){
        props.setOrderNoId(props.orderNoId);
        props.setOrderNo(props.orderNo);
        props.setView(true);
    }

    return(
        <>
            <button className="updateAndDeleteDistinctOrderButton" onClick={updateAction}>{props.buttonText}</button>
        </>
    )
}

export default UpdateAndDeleteDistinctOrderButton;


