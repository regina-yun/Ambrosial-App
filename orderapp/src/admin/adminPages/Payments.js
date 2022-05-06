import { useEffect, useState } from 'react';
import { ambrosialAxiosAPI } from '../../api/api';
import Popup from '../adminComponents/popup';
import './Payments.css';

export default function Payments() {

	//Create Payment

	const [modalVisibleCreatePayment, setModalVisibleCreatePayment] = useState(false);
	const [createPaymentPopupOpen, setCreatePaymentPopupOpen] = useState(false);

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

		await ambrosialAxiosAPI.put('/updatepayment/:invoiceID', {
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

		await ambrosialAxiosAPI.delete('/deletepayment/:invoiceID')
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

	const [allPaymentLogsData, setAllPaymentLogsData] = useState([]);

	async function getAllPayment() {
		
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

		await ambrosialAxiosAPI.get('viewpaymentlogs/:invoiceID')
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

	function togglePopupCreatePayment() {
		setModalVisibleCreatePayment(!modalVisibleCreatePayment);
		setCreatePaymentPopupOpen(!createPaymentPopupOpen);
	}

	return (
		<>
			<div className='createAndRefresh'>
				<button className='refreshPaymentLogs' onClick={e => getAllPayment(e)}>Refresh List</button>
				<button className='createPayment' onClick={togglePopupCreatePayment}>Create New Payment Log</button>
			</div>


			{/* insert modal code here */}

			{modalVisibleCreatePayment && <div className='create-payment-modal'>
				{createPaymentPopupOpen && <Popup
					popupType='createPaymentPopup'
					handleClose={togglePopupCreatePayment}
					content={
						<form>
							<label className='formHeader'>Create New Payment Log</label>

							<label className='formLabelText'>Receipt ID</label>
							<input className='createPaymentInputReceiptId' type='number' />
							
							<label className='formLabelText'>Payment Type</label>
							<input className='createPaymentInputPaymentType' type='text'/>

							<label className='formLabelText'>Payment Status</label>
							<input className='createPaymentInputPaymentStatus' type='text'/>
							
							<button className='createPaymentButton'>Submit</button>
						</form>
					}/>
				}
				</div>
			}
				

			<div className="payments">
					<h1>Payment Logs</h1>
					<table>
						<thead>
							<th>No.</th>
							<th>Receipt ID</th>
							<th>Payment Type</th>
							<th>Payment Status</th>
							<th colSpan='2'>Actions</th>
						</thead>

						{allPaymentLogsData.map((paymentLogs, index) => {
							<tr key={paymentLogs.receiptID}>
								<td>{index+1}</td>
								<td>{paymentLogs.receiptID}</td>
								<td>{paymentLogs.paymentType}</td>
								<td>{paymentLogs.paymentStatus}</td>
								<td className='actionButtons'><button className='paymentsPageUpdateButton' onClick={togglePopupUpdatePayment}>Update Payment Log</button></td>
								<td className='actionButtons'><button className='paymentsPageDeleteButton' onclick={togglePopupDeletePayment}>Delete Payment Log</button></td>
							</tr>
						})}
					</table>
			</div>
		</>
	)
}