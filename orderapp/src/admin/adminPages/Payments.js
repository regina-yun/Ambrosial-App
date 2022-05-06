import { useEffect } from 'react';
import { ambrosialAxiosAPI } from '../../api/api';
import './Payments.css';

export default function Payments() {

	//Create Payment
	async function createPayment(e) {
		e.preventDefault();

		await ambrosialAxiosAPI.post('/createpayment', {
			receiptID: "",
			paymentType: "",
			paymentStatus: ""
		})
		.then((response) => {
			console.log(`${response.config.method} method for route: ${response.config.url}`);
			console.log(`response Status: ${response.data.status}`);
			console.log(`response Message: ${response.data.message}`);
			console.log("response Data: ", response.data.data);
 		})
		.catch((error) => {
				console.log(`${error.response.config.method} method for route: ${error.response.config.url}`);
				console.log(`Error Status: ${error.response.data.status}`);
				console.log(`Error Message: ${error.response.data.message}`);
		});
	}

	//Update Payment
	async function updatePayment(e) {
		e.preventDefault();

		await ambrosialAxiosAPI.put(`/updatepayment/${invoiceID}`, {
			receiptID: "",
			paymentType: "",
			paymentStatus: ""
		})
		.then((response) => {
			console.log(`${response.config.method} method for route: ${response.config.url}`);
			console.log(`response Status: ${response.data.status}`);
			console.log(`response Message: ${response.data.message}`);
			console.log("response Data: ", response.data.data);
 		})
		.catch((error) => {
				console.log(`${error.response.config.method} method for route: ${error.response.config.url}`);
				console.log(`Error Status: ${error.response.data.status}`);
				console.log(`Error Message: ${error.response.data.message}`);
		});
	}

	//Delete Payment
	async function deletePayment(e) {
		e.preventDefault();

		await ambrosialAxiosAPI.delete(`/deletepayment/${invoiceID}`)
		.then((response) => {
			console.log(`${response.config.method} method for route: ${response.config.url}`);
			console.log(`response Status: ${response.data.status}`);
			console.log(`response Message: ${response.data.message}`);
			console.log("response Data: ", response.data.data);
 		})
		.catch((error) => {
				console.log(`${error.response.config.method} method for route: ${error.response.config.url}`);
				console.log(`Error Status: ${error.response.data.status}`);
				console.log(`Error Message: ${error.response.data.message}`);
		});
	}

	//Read All Payment
	useEffect(() => {
		getAllPayment();
	});

	const [allPaymentLogsData, setAllPaymentlogsData] = useState([]);

	async function getAllPayment(e) {
		e.preventDefault();

		await ambrosialAxiosAPI.get('/viewpaymentlogs')
		.then((response) => {
			console.log(`${response.config.method} method for route: ${response.config.url}`);
			console.log(`response Status: ${response.data.status}`);
			console.log(`response Message: ${response.data.message}`);
			console.log("response Data: ", response.data.data);
 		})
		.catch((error) => {
				console.log(`${error.response.config.method} method for route: ${error.response.config.url}`);
				console.log(`Error Status: ${error.response.data.status}`);
				console.log(`Error Message: ${error.response.data.message}`);
		});
	}

	//Read Specific Payment
	async function getSpecificPayment(e) {
		e.preventDefault();

		await ambrosialAxiosAPI.get(`/viewpaymentlogs/${invoiceID}`)
		.then((response) => {
			console.log(`${response.config.method} method for route: ${response.config.url}`);
			console.log(`response Status: ${response.data.status}`);
			console.log(`response Message: ${response.data.message}`);
			console.log("response Data: ", response.data.data);
 		})
		.catch((error) => {
				console.log(`${error.response.config.method} method for route: ${error.response.config.url}`);
				console.log(`Error Status: ${error.response.data.status}`);
				console.log(`Error Message: ${error.response.data.message}`);
		});
	}

	return (
		<>
			<div className='createAndRefresh'>
				<button className='refreshPaymentLogs' onClick={getAllPayment}>Refresh List</button>
				<button className='createPayment' onClick={}>Create New Payment Log</button>
			</div>

			{/* insert modal code here */}

			<div className="payments">
					<h1>Payment Logs</h1>
					<table>
						<tr>
							<th>No.</th>
							<th>Receipt ID</th>
							<th>Payment Type</th>
							<th>Payment Status</th>
							<th colspan='2'>Actions</th>
						</tr>

						{allPaymentLogsData.map((paymentLogs, index) => {
							<tr key={paymentLogs.receiptID}>
								<td>{index+1}</td>
								<td>{paymentLogs.receiptID}</td>
								<td>{paymentLogs.paymentType}</td>
								<td>{paymentLogs.paymentStatus}</td>
								<td className='actionButtons'><button className='paymentsPageUpdateButton' onClick={}>Update Payment Log</button></td>
								<td className='actionButtons'><button className='paymentsPageDeleteButton' onclick={}>Delete Payment Log</button></td>
							</tr>
						})}
					</table>
			</div>
		</>
	)
}