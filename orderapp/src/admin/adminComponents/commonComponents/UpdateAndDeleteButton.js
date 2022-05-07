import './UpdateAndDeleteButton.css';

function UpdateAndDeleteButton(props){

    function updateAction(){
        props.setId(props.id);
        props.setData(props.data);
        props.setView(true);
    }

    return(
        <>
            <button className="updateAndDeleteDistinctOrderButton" onClick={updateAction}>{props.buttonText}</button>
        </>
    )
}

export default UpdateAndDeleteButton;


