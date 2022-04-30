import './Receipts.css';
import React, {useEffect, useState} from 'react';

export default function Receipts() {
    // const [receiptsList, setReceiptsList] = useState([]);

    // const getReceipts = async() => {
    //     const {status, data} = await API.get('/receipts');
    //     if (status === 200) {
    //         setReceiptsList(data);
    //     }
    // }
    
    // useEffect(() => {
    //     getReceipts();
    // },[]);

    return (
        <div className="receipts">
            <h1>Receipts</h1>
            <button className="create">Create new receipt</button>
            <table className="receipts-table">
                <thead>
                    <tr>
                        <th className="column-one">No.</th>
                        <th className="column-two">Order number ID</th>
                        <th className="column-three">Total Price</th>
                        <th className="column-four">Actions</th>
                    </tr>
                </thead>
                <tbody>
                        <tr>
                            <td>1</td>
                            <td>2</td>
                            <td>$50.00</td>
                            <td>
                                <button className="action">Edit</button>
                                <button className="action">Delete</button>
                            </td>
                        </tr>  
                </tbody>
            </table>
        </div>
    )
}