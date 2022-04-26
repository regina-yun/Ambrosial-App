import './Custombutton.css';

function Custombutton(props){

    return(
        <>
            <button className="button" onClick={props.click}>{props.sign}</button>
        </>
    )
}

export default Custombutton;