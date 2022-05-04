import './Custombutton.css';

function ViewOrderItemsButton(props){

    function setOrderNo(){
        props.setOrderNo(props.orderNo);
        props.setViewOrder(true);
    }

    return(
        <>
            <button className="button" onClick={setOrderNo}>View Order items</button>
        </>
    )
}

export default ViewOrderItemsButton;


