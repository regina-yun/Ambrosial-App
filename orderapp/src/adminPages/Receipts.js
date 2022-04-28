import './Receipts.css';

export default function Receipts() {
    return (
        <div className="receipts">
            This is the receipts page
        </div>
    )
}

/*
import './Receipts.css';
import React, {useEffect, useState} from 'react';
import ViewButton from '../adminComponents/ViewButton';
import PrintButton from '../adminComponents/PrintButton';

export default function Receipts() {
    const [receiptsList, setReceiptsList] = useState([]);

    const getReceipts = async() => {
        const {status, data} = await API.get('/receipts');
        if (status === 200) {
            setReceiptsList(data);
        }
    
    useEffect(() => {
        getReceipts();
    },[]);

    return (
        <div className="receipts">
            <h1>Receipts</h1>
            <table>
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Order ID</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        receiptsList.length > 0
                        ? receiptsList.map (r =>
                        <tr key={r.id}>
                            <td>{r.id}</td>
                            <td>{r.orderNo}</td>
                            <td>
                                <ViewButton />
                                <PrintButton />
                            </td>
                        </tr>  
                        ) : (
                            <tr>
                                <td>No receipts in the list</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}
*/