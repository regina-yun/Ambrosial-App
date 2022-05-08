import './view-order-items-button.css';

function ViewOrderItemsButton(props){

    function setOrderNo(){
        props.setOrderNo(props.orderNo);
        props.setViewOrder(true);
    }

    return(
        <>
            <button className="viewOrderItemsButton" onClick={setOrderNo}>View Order items</button>
        </>
    )
}

export default ViewOrderItemsButton;


