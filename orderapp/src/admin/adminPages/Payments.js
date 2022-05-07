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

	const [createPaymentPostStatusMessage, setCreatePaymentPostStatusMessage] = useState(false);
	const [createPaymentPostDataClicked, setCreatePaymentPostDataClicked] = useState(false);

	function handleCreatePaymentOnChange(e) {
		let createPaymentInput = {...paymentInput};
		createPaymentInput[e.target.name] = e.target.value;
		setCreatePaymentMessageStatus(false);
		setPaymentInput(createPaymentInput);
	}

	function onSubmitCreatePaymentInputValidation(e) {
		e.preventDefault();

		if(!paymentInput.receiptID && !paymentInput.paymentType && !paymentInput.paymentStatus) {
			setCreatePaymentMessageStatus(true)
			setCreatePaymentMessage('***All of the input fields are empty***');
			return;
		}
		else if(!paymentInput.receiptID || !paymentInput.paymentType || !paymentInput.paymentStatus) {
			setCreatePaymentMessageStatus(true)
			setCreatePaymentMessage('***Some of the input fields are empty***');
			return;
		}

		togglePopupCreatePaymentConfirmation();
	}

	function togglePopupCreatePayment() {
		setModalVisibleCreatePayment(!modalVisibleCreatePayment);
		setCreatePaymentPopupOpen(!createPaymentPopupOpen);
	}

	function togglePopupCreatePaymentConfirmation(){
		setModalVisibleCreatePaymentConfirmation(!modalVisibleCreatePaymentConfirmation);
		setCreatePaymentConfirmationPopupOpen(!createPaymentConfirmationPopupOpen);
	}

	function resetInputsToDefault() {
		setPaymentInput({receiptID: 0, paymentType: '', paymentStatus: ''})
	}

	function closePopupCreatePaymentConfirmation() {
		resetInputsToDefault();
		togglePopupCreatePaymentConfirmation();
	}

	function handleCreatePaymentClosePopups(e) {
		e.preventDefault();
		setCreatePaymentPopupOpen(!createPaymentPopupOpen);
		setCreatePaymentConfirmationPopupOpen(!createPaymentConfirmationPopupOpen);
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

	const [updatePaymentInput, setUpdatePaymentInput] = useState({paymentInvoiceID: 0, receiptID: 0, paymentType: '', paymentStatus: ''});

	const [updatePaymentMessage, setUpdatePaymentMessage] = useState('');
	const [updatePaymentMessageStatus, setUpdatePaymentMessageStatus] = useState(false);

	const [modalVisibleUpdatePayment, setModalVisibleUpdatePayment] = useState(false);
	const [updatePaymentPopupOpen, setUpdatePaymentPopupOpen] = useState(false);
	const [modalVisibleUpdatePaymentConfirmation, setModalVisibleUpdatePaymentConfirmation] = useState(false);
	const [updatePaymentConfirmationPopupOpen, setUpdatePaymentConfirmationPopupOpen] = useState(false);

	const [updatePaymentPostStatusMessage, setUpdatePaymentPostStatusMessage] = useState(false);
	const [updatePaymentPostDataClicked, setUpdatePaymentPostDataClicked] = useState(false);

	function handleUpdatePaymentOnChange(e) {
		let updatePaymentInputValues = {...updatePaymentInput};
		updatePaymentInputValues[e.target.name] = e.target.value;
		setUpdatePaymentMessageStatus(false);
		setUpdatePaymentInput(updatePaymentInputValues);
	}

	function onSubmitUpdatePaymentInputValidation(e) {
		e.preventDefault();

		if(!updatePaymentInput.receiptID && !updatePaymentInput.paymentType && !updatePaymentInput.paymentStatus) {
			setUpdatePaymentMessageStatus(true)
			setUpdatePaymentMessage('***All of the input fields are empty***');
			return;
		}
		else if(!paymentInput.receiptID || !paymentInput.paymentType || !paymentInput.paymentStatus) {
			setUpdatePaymentMessageStatus(true)
			setUpdatePaymentMessage('***Some of the input fields are empty***');
			return;
		}

		togglePopupUpdatePaymentConfirmation();
	}

	function togglePopupUpdatePayment() {
		setModalVisibleUpdatePayment(!modalVisibleUpdatePayment);
		setUpdatePaymentPopupOpen(!updatePaymentPopupOpen);
	}

	function togglePopupUpdatePaymentConfirmation(){
		setModalVisibleUpdatePaymentConfirmation(!modalVisibleUpdatePaymentConfirmation);
		setUpdatePaymentConfirmationPopupOpen(!updatePaymentConfirmationPopupOpen);
	}

	function resetInputsToDefault() {
		setUpdatePaymentInput({paymentInvoiceID: 0, receiptID: 0, paymentType: '', paymentStatus: ''})
	}

	function closePopupUpdatePaymentConfirmation() {
		resetInputsToDefault();
		togglePopupUpdatePaymentConfirmation();
	}

	function handleUpdatePaymentClosePopups(e) {
		e.preventDefault();
		setUpdatePaymentPopupOpen(!updatePaymentPopupOpen);
		setUpdatePaymentConfirmationPopupOpen(!updatePaymentConfirmationPopupOpen);
	}

	async function updatePayment(e) {
		e.preventDefault();

		await ambrosialAxiosAPI.put('/updatepayment/:invoiceID', {
			paymentInvoiceID: "",
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
			setAllPaymentLogsData(response.data.data);
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
							<input className='createPaymentInputReceiptId' value={paymentInput.receiptID} type='number' name='receiptID' onChange={handleCreatePaymentOnChange} autoComplete='off'/>
							
							<label className='formLabelText'>Payment Type</label>
							<input className='createPaymentInputPaymentType' value={paymentInput.paymentType} type='text' name='paymentType' onChange={handleCreatePaymentOnChange} autoComplete='off'/>

							<label className='formLabelText'>Payment Status</label>
							<input className='createPaymentInputPaymentStatus' value={paymentInput.paymentStatus} type='text' name='paymentStatus' onChange={handleCreatePaymentOnChange} autoComplete='off'/>
							
							<button className='createPaymentButton'>Submit</button>

							{createPaymentMessageStatus && <label className='formLabelTextStatus'>{<label className='formLabelText'>{createPaymentMessage}</label>}</label>}
						</form>
					}/>
				}
			</div>
			}

			{modalVisibleCreatePaymentConfirmation && <div className='modal'>
				{createPaymentConfirmationPopupOpen && <Popup
				popupType='createPaymentConfirmationPopup'
				handleClose={togglePopupCreatePaymentConfirmation}
				content={
					<div>
						<label className='createPaymentConfirmationHeader'>Are You Sure ?</label>
						<br></br>
						{!createPaymentPostDataClicked ? 
							<div>
								<button className='createPaymentConfirmationYesButton' onClick={createPayment}>Yes</button>
								<button className='createPaymentConfirmationNoButton' onClick={closePopupCreatePaymentConfirmation}>No</button>
							</div>:
							<button type="button" className='createPaymentConfirmationYesButton'  onClick={handleCreatePaymentClosePopups} >Close</button>
						}
						<br></br>
						{createPaymentPostDataClicked ? <div className='createPaymentConfirmationStatusMessageContainer'><label className='createPaymentConfirmationStatusMessage'>{createPaymentPostStatusMessage}</label></div>: null}
					</div>
					}/>
				}   
			</div>
			}

			{modalVisibleUpdatePayment && <div className='modal'>
				{updatePaymentPopupOpen && <Popup
					popupType='updatePaymentPopup'
					handleClose={togglePopupUpdatePayment}
					content={
						<form onSubmit={onSubmitUpdatePaymentInputValidation}>
							<label className='formHeader'>Update Payment Log</label>

							<label className='formLabelText'>Invoice ID</label>
							<input className='updatePaymentInputInvoiceId' value={paymentInput.paymentInvoiceID} type='number' name='receiptID' onChange={handleUpdatePaymentOnChange} autoComplete='off'/>

							<label className='formLabelText'>Receipt ID</label>
							<input className='updatePaymentInputReceiptId' value={paymentInput.receiptID} type='number' name='receiptID' onChange={handleUpdatePaymentOnChange} autoComplete='off'/>
							
							<label className='formLabelText'>Payment Type</label>
							<input className='updatePaymentInputPaymentType' value={paymentInput.paymentType} type='text' name='paymentType' onChange={handleUpdatePaymentOnChange} autoComplete='off'/>

							<label className='formLabelText'>Payment Status</label>
							<input className='updatePaymentInputPaymentStatus' value={paymentInput.paymentStatus} type='text' name='paymentStatus' onChange={handleUpdatePaymentOnChange} autoComplete='off'/>
							
							<button className='updatePaymentButton'>Submit</button>

							{updatePaymentMessageStatus && <label className='formLabelTextStatus'>{<label className='formLabelText'>{updatePaymentMessage}</label>}</label>}
						</form>
					}/>
				}
			</div>
			}
				

			<div className="payments">
					<h1>Payment Logs</h1>
					<table>
						<tr>
							<th>Invoice ID</th>
							<th>Receipt ID</th>
							<th>Payment Type</th>
							<th>Payment Status</th>
							<th colSpan='2'>Actions</th>
						</tr>

						<br></br> 
						<br></br> 

						{allPaymentLogsData.map((paymentLogs) => {
							return(
								<tr key={paymentLogs.receiptID}>
									<td>{paymentLogs.paymentInvoiceID}</td>
									<td>{paymentLogs.receiptID}</td>
									<td>{paymentLogs.paymentType}</td>
									<td>{paymentLogs.paymentStatus}</td>
									<td className='actionButtons'><button className='updateAndDeleteButtonsContainer' onClick={togglePopupUpdatePayment}>Update Payment Log</button></td>
									{/* <td className='actionButtons'><button className='updateAndDeleteButtonsContainer' onclick={togglePopupDeletePayment}>Delete Payment Log</button></td> */}
								</tr>
							)
						})}
					</table>
			</div>
		</>
	)
}