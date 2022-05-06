import { useEffect, useState } from 'react';
import { ambrosialAxiosAPI } from '../../api/api';
import Popup from '../adminComponents/popup';
import './Payments.css';

export default function Payments() {

	//Create Payment
	const [paymentInput, setPaymentInput] = useState({receiptID: 0, paymentType: '', paymentStatus: ''});

	const [createPaymentMessage, setCreatePaymentMessage] = useState('');
	const [createPaymentMessageStatus, setCreatePaymentMessageStatus] = useState(false);

	const [modalVisibleCreatePayment, setModalVisibleCreatePayment] = useState(false);
	const [createPaymentPopupOpen, setCreatePaymentPopupOpen] = useState(false);
	const [modalVisibleCreatePaymentConfirmation, setModalVisibleCreatePaymentConfirmation] = useState(false);
	const [createPaymentConfirmationPopupOpen, setCreatePaymentConfirmationPopupOpen] = useState(false);

	function handleCreatePaymentOnChange(e) {
		let createPaymentInput = {...paymentInput};
		createPaymentInput[e.target.name] = e.target.value;

		setPaymentInput(createPaymentInput);
	}

	function onSubmitCreatePaymentInputValidation(e) {
		e.preventDefault();

		if(!paymentInput.receiptID && !paymentInput.paymentType && !paymentInput.paymentStatus) {
			setCreatePaymentMessageStatus(true)
			setCreatePaymentMessage('***Please check the input fields***');
			return;
		}
		else if(!paymentInput.receiptID || !paymentInput.paymentType || !paymentInput.paymentStatus) {
			setCreatePaymentMessageStatus(true)
			setCreatePaymentMessage('***Please check the input fields***');
			return;
		}
	}

	function togglePopupCreatePayment() {
		setModalVisibleCreatePayment(!modalVisibleCreatePayment);
		setCreatePaymentPopupOpen(!createPaymentPopupOpen);
	}


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



	return (
		<>
			<div className='createAndRefresh'>
				<button className='refreshPaymentLogs' onClick={getAllPayment}>Refresh List</button>
				<button className='createPayment' onClick={togglePopupCreatePayment}>Create New Payment Log</button>
			</div>


			{/* insert modal code here */}

			{modalVisibleCreatePayment && <div className='modal'>
			{createPaymentPopupOpen && <Popup
				popupType='createPaymentPopup'
				handleClose={togglePopupCreatePayment}
				content={
					<form onSubmit={onSubmitCreatePaymentInputValidation}>
						<label className='formHeader'>Create New Payment Log</label>

						<label className='formLabelText'>Receipt ID</label>
						<input className='createPaymentInputReceiptId' type='number' name='receiptID' onChange={handleCreatePaymentOnChange}/>
						
						<label className='formLabelText'>Payment Type</label>
						<input className='createPaymentInputPaymentType' type='text' name='paymentType' onChange={handleCreatePaymentOnChange}/>

						<label className='formLabelText'>Payment Status</label>
						<input className='createPaymentInputPaymentStatus' type='text' name='paymentStatus' onChange={handleCreatePaymentOnChange}/>
						
						<button className='createPaymentButton'>Submit</button>

						{createPaymentMessageStatus && <label className='formLabelTextStatus'>{<label className='formLabelText'>{createPaymentMessage}</label>}</label>}
					</form>
				}/>
			}
			</div>
			}

			{modalVisibleCreatePaymentConfirmation && <div className='modal'></div>}
				{createPaymentConfirmationPopupOpen && <Popup
				popupType='deleteReceiptConfirmationPopup'
				handleClose={togglePopupDeleteReceiptConfirmation}
				content={
						<div>
								<label className='deleteReceiptConfirmationHeader'>Are You Sure ?</label>
								<br></br>
								{!postDataClicked ? 
										<div>
												<button className='deleteReceiptConfirmationYesButton' onClick={updateReceipt}>Yes</button>
												<button className='deleteReceiptConfirmationNoButton' onClick={closePopupUpdateReceiptConfirmation}>No</button>
										</div>:
										<button type="button" className='deleteReceiptConfirmationYesButton'  onClick={handleClosePopups} >Close</button>
								}
								<br></br>
								{postDataClicked ? <div className='deleteReceiptConfirmationStatusMessageContainer'><label className='deleteReceiptConfirmationStatusMessage'>{postStatusMessage}</label></div>: null}
						</div>
				}/>}   
				

			<div className="payments">
					<h1>Payment Logs</h1>
					<table>
						<tr>
							<th>No.</th>
							<th>Receipt ID</th>
							<th>Payment Type</th>
							<th>Payment Status</th>
							<th colSpan='2'>Actions</th>
						</tr>

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