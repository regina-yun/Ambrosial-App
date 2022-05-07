import { useEffect, useState } from 'react';
import { ambrosialAxiosAPI } from '../../api/api';
import Popup from '../adminComponents/popup';
import UpdateAndDeleteButton from '../adminComponents/commonComponents/UpdateAndDeleteButton';
import ConfirmationPopupContents from '../adminComponents/commonComponents/confirmationPopupContents';
import './Payments.css';

export default function Payments() {

//#region CREATE PAYMENT

	const [createPaymentInput, setCreatePaymentInput] = useState({receiptID: 0, paymentType: '', paymentStatus: ''});

	const [createPaymentSubmitMessage, setCreatePaymentSubmitMessage] = useState('');
	const [createPaymentSubmitMessageStatus, setCreatePaymentSubmitMessageStatus] = useState(false);

	const [modalVisibleCreatePayment, setModalVisibleCreatePayment] = useState(false);
	const [createPaymentPopupOpen, setCreatePaymentPopupOpen] = useState(false);
	const [modalVisibleCreatePaymentConfirmation, setModalVisibleCreatePaymentConfirmation] = useState(false);
	const [createPaymentConfirmationPopupOpen, setCreatePaymentConfirmationPopupOpen] = useState(false);

	const [createPaymentPostStatus, setCreatePaymentPostStatus] = useState(false);
	const [createPaymentPostStatusMessage, setCreatePaymentPostStatusMessage] = useState(false);
	const [createPaymentPostDataClicked, setCreatePaymentPostDataClicked] = useState(false);

	function handleCreatePaymentOnChange(e) {
		let newCreatePaymentInput = {...createPaymentInput};
		newCreatePaymentInput[e.target.name] = e.target.value;
		// setCreatePaymentSubmitMessageStatus(false);
		setCreatePaymentInput(newCreatePaymentInput);
	}

	function onSubmitCreatePaymentInputValidation(e) {
		e.preventDefault();

		if(!createPaymentInput.receiptID && !createPaymentInput.paymentType && !createPaymentInput.paymentStatus) {
			setCreatePaymentSubmitMessageStatus(true)
			setCreatePaymentSubmitMessage('***All of the input fields are empty***');
			return;
		}
		else if(!createPaymentInput.receiptID || !createPaymentInput.paymentType || !createPaymentInput.paymentStatus) {
			setCreatePaymentSubmitMessageStatus(true)
			setCreatePaymentSubmitMessage('***Some of the input fields are empty***');
			return;
		}

		togglePopupCreatePaymentConfirmation();
	}

	function togglePopupCreatePayment() {
		setModalVisibleCreatePayment(!modalVisibleCreatePayment);
		setCreatePaymentPopupOpen(!createPaymentPopupOpen);
		setCreatePaymentSubmitMessageStatus(false);
	}

	function togglePopupCreatePaymentConfirmation(){
		setModalVisibleCreatePaymentConfirmation(!modalVisibleCreatePaymentConfirmation);
		setCreatePaymentConfirmationPopupOpen(!createPaymentConfirmationPopupOpen);
		togglePopupCreatePayment();
		setCreatePaymentSubmitMessageStatus(false);
	}

	function resetCreateInputsToDefault() {
		setCreatePaymentInput({receiptID: 0, paymentType: '', paymentStatus: ''});
		setCreatePaymentSubmitMessageStatus(false);
	}

	function closePopupCreatePaymentConfirmation() {
		resetCreateInputsToDefault();
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
			receiptID: createPaymentInput.receiptID,
			paymentType: createPaymentInput.paymentType,
			paymentStatus: createPaymentInput.paymentStatus
		})
		.then((response) => {
			console.log(`${response.config.method} method for route: ${response.config.url}`);
			console.log(`response Status: ${response.data.status}`);
			console.log(`response Message: ${response.data.message}`);
			console.log("response Data: ", response.data.data);

			setCreatePaymentPostStatus(response.data.status);
			setCreatePaymentPostStatusMessage(response.data.message);
 		})
		.catch((error) => {
			console.log(`${error.response.config.method} method for route: ${error.response.config.url}`);
			console.log(`Error Status: ${error.response.data.status}`);
			console.log(`Error Message: ${error.response.data.message}`);

			setCreatePaymentPostStatus(error.response.data.status);
			setCreatePaymentPostStatusMessage(error.response.data.message);
		});
		setCreatePaymentPostDataClicked(true);
	}
//#endregion

//#region UPDATE PAYMENT

	const [updatePaymentInput, setUpdatePaymentInput] = useState({paymentInvoiceID: 0, receiptID: 0, paymentType: '', paymentStatus: ''});

	const [updatePaymentSubmitMessage, setUpdatePaymentSubmitMessage] = useState('');
	const [updatePaymentSubmitMessageStatus, setUpdatePaymentSubmitMessageStatus] = useState(false);

	const [modalVisibleUpdatePayment, setModalVisibleUpdatePayment] = useState(false);
	const [updatePaymentPopupOpen, setUpdatePaymentPopupOpen] = useState(false);
	const [modalVisibleUpdatePaymentConfirmation, setModalVisibleUpdatePaymentConfirmation] = useState(false);
	const [updatePaymentConfirmationPopupOpen, setUpdatePaymentConfirmationPopupOpen] = useState(false);

	const [updatePaymentPostStatus, setUpdatePaymentPostStatus] = useState(false);
	const [updatePaymentPostStatusMessage, setUpdatePaymentPostStatusMessage] = useState(false);
	const [updatePaymentPostDataClicked, setUpdatePaymentPostDataClicked] = useState(false);

	function handleUpdatePaymentOnChange(e) {
		let updatePaymentInputValues = {...updatePaymentInput};
		updatePaymentInputValues[e.target.name] = e.target.value;
		setUpdatePaymentSubmitMessageStatus(false);
		setUpdatePaymentInput(updatePaymentInputValues);
	}

	function onSubmitUpdatePaymentInputValidation(e) {
		e.preventDefault();

		if(!updatePaymentInput.paymentInvoiceID && !updatePaymentInput.receiptID && !updatePaymentInput.paymentType && !updatePaymentInput.paymentStatus) {
			setUpdatePaymentSubmitMessageStatus(true)
			setUpdatePaymentSubmitMessage('***All of the input fields are empty***');
			return;
		}
		else if(updatePaymentInput.paymentInvoiceID || !updatePaymentInput.receiptID || !updatePaymentInput.paymentType || !updatePaymentInput.paymentStatus) {
			setUpdatePaymentSubmitMessageStatus(true)
			setUpdatePaymentSubmitMessage('***Some of the input fields are empty***');
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
		togglePopupUpdatePayment();
		setUpdatePaymentSubmitMessageStatus(false);
	}

	function resetUpdateInputsToDefault() {
		setUpdatePaymentInput({paymentInvoiceID: 0, receiptID: 0, paymentType: '', paymentStatus: ''});
		setUpdatePaymentSubmitMessageStatus(false);
	}

	function closePopupUpdatePaymentConfirmation() {
		resetUpdateInputsToDefault();
		togglePopupUpdatePaymentConfirmation();
	}

	function handleUpdatePaymentClosePopups(e) {
		e.preventDefault();
		setUpdatePaymentPopupOpen(!updatePaymentPopupOpen);
		setUpdatePaymentConfirmationPopupOpen(!updatePaymentConfirmationPopupOpen);
	}

	async function updatePayment(data) {


		await ambrosialAxiosAPI.put('/updatepayment/:invoiceID', {
			paymentInvoiceID: data.paymentInvoiceID,
			receiptID: data.receiptID,
			paymentType: data.paymentType,
			paymentStatus: data.paymentStatus
		})
		.then((response) => {
			console.log(`${response.config.method} method for route: ${response.config.url}`);
			console.log(`response Status: ${response.data.status}`);
			console.log(`response Message: ${response.data.message}`);
			console.log("response Data: ", response.data.data);

			setUpdatePaymentPostStatus(response.data.status);
			setCreatePaymentPostStatusMessage(response.data.message);
 		})
		.catch((error) => {
			console.log(`${error.response.config.method} method for route: ${error.response.config.url}`);
			console.log(`Error Status: ${error.response.data.status}`);
			console.log(`Error Message: ${error.response.data.message}`);

			setUpdatePaymentPostStatus(error.response.data.status);
			setUpdatePaymentPostStatusMessage(error.response.data.message);
		});
		setUpdatePaymentPostDataClicked(true);
	}
//#endregion

//#region DELETE PAYMENT

	// const [deletePaymentInput, setDeletePaymentInput] = useState({paymentInvoiceID: 0, receiptID: 0, paymentType: '', paymentStatus: ''});

	// const [deletePaymentMessage, setDeletePaymentMessage] = useState('');
	// const [deletePaymentMessageStatus, setDeletePaymentMessageStatus] = useState(false);

	const [modalVisibleDeletePaymentConfirmation, setModalVisibleDeletePaymentConfirmation] = useState(false);
	const [deletePaymentConfirmationPopupOpen, setDeletePaymentConfirmationPopupOpen] = useState(false);

	const [deletePaymentPostStatus, setDeletePaymentPostStatus] = useState(false);
	const [deletePaymentPostStatusMessage, setDeletePaymentPostStatusMessage] = useState(false);
	const [deletePaymentPostDataClicked, setDeletePaymentPostDataClicked] = useState(false);


	// function togglePopupUpdatePayment() {
	// 	setModalVisibleDeletePayment(!modalVisibleDeletePayment);
	// 	setDeletePaymentPopupOpen(!deletePaymentPopupOpen);
	// }

	function togglePopupDeletePaymentConfirmation(){
		setModalVisibleDeletePaymentConfirmation(!modalVisibleDeletePaymentConfirmation);
		setDeletePaymentConfirmationPopupOpen(!deletePaymentConfirmationPopupOpen);
	}

	// function resetUpdateInputsToDefault() {
	// 	setUpdatePaymentInput({paymentInvoiceID: 0, receiptID: 0, paymentType: '', paymentStatus: ''})
	// }

	function closePopupDeletePaymentConfirmation() {
		resetUpdateInputsToDefault();
		togglePopupDeletePaymentConfirmation();
	} 

	function handleDeletePaymentClosePopups(e) {
		e.preventDefault();
		setDeletePaymentConfirmationPopupOpen(!deletePaymentConfirmationPopupOpen);
		setModalVisibleDeletePaymentConfirmation(!modalVisibleDeletePaymentConfirmation);
	}
	async function deletePayment(data) {

		await ambrosialAxiosAPI.delete('/deletepayment/:invoiceID', {
			receiptID: data.receiptID
		})
		.then((response) => {
			console.log(`${response.config.method} method for route: ${response.config.url}`);
			console.log(`response Status: ${response.data.status}`);
			console.log(`response Message: ${response.data.message}`);
			console.log("response Data: ", response.data.data);

			setDeletePaymentPostStatus(response.data.status);
			setDeletePaymentPostStatusMessage(response.data.message);
 		})
		.catch((error) => {
			console.log(`${error.response.config.method} method for route: ${error.response.config.url}`);
			console.log(`Error Status: ${error.response.data.status}`);
			console.log(`Error Message: ${error.response.data.message}`);

			setDeletePaymentPostStatus(error.response.data.status);
			setDeletePaymentPostStatusMessage(error.response.data.message);
		});
		setDeletePaymentPostDataClicked(true);
	}


//#endregion

//#region GET ALL PAYMENT
	useEffect(() => {
		getAllPayment();
	}, []);

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

	//#endregion

//#region GET SPECIFIC PAYMENT
	
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
//#endregion


	return (
		<>
			<div className='createAndRefreshPayment'>
				<button className='refreshPaymentLogs' onClick={getAllPayment}>Refresh List</button>
				<button className='createPayment' onClick={togglePopupCreatePayment}>Create New Payment Log</button>
			</div>

			{modalVisibleCreatePayment && <div className='payment-modal'>
				{createPaymentPopupOpen && <Popup
					popupType='createPaymentPopup'
					handleClose={togglePopupCreatePayment}
					content={
						<form className='paymentForm' onSubmit={onSubmitCreatePaymentInputValidation}>
							<label className='paymentFormHeader'>Create New Payment Log</label>

							<br /><br />

							<label className='createPaymentFormLabelText'>Receipt ID</label>
							<input className='createPaymentInputReceiptId' value={createPaymentInput.receiptID} type='number' name='receiptID' onChange={handleCreatePaymentOnChange} autoComplete='off'/>
							
							<br /><br />

							<label className='createPaymentFormLabelText'>Payment Type</label>
							<input className='createPaymentInputPaymentType' value={createPaymentInput.paymentType} type='text' name='paymentType' onChange={handleCreatePaymentOnChange} autoComplete='off'/>

							<br /><br />

							<label className='createPaymentFormLabelText'>Payment Status</label>
							<input className='createPaymentInputPaymentStatus' value={createPaymentInput.paymentStatus} type='text' name='paymentStatus' onChange={handleCreatePaymentOnChange} autoComplete='off'/>
							
							<br /><br />

							<button className='paymentButton'>Submit</button>

							<br /><br />

							{createPaymentSubmitMessageStatus && <label className='paymentFormLabelTextStatus'>{<label className='paymentFormLabelText'>{createPaymentSubmitMessage}</label>}</label>}
						</form>
					}/>
				}
			</div>
			}

			{modalVisibleCreatePaymentConfirmation && <div className='payment-confirmation-modal'>
				{createPaymentConfirmationPopupOpen && <Popup
				popupType='createPaymentConfirmationPopup'
				handleClose={togglePopupCreatePaymentConfirmation}
				content={
					<ConfirmationPopupContents
	         clickStatus={createPaymentPostDataClicked}
					 statusMessage={createPaymentPostStatusMessage}
					 invokeAction={createPayment}
					 xButtonClose={closePopupCreatePaymentConfirmation}
					 closeButton={handleCreatePaymentClosePopups}
					/>
				}/>
				}   
			</div>
			}

			{modalVisibleUpdatePayment && <div className='payment-modal'>
				{updatePaymentPopupOpen && <Popup
					popupType='updatePaymentPopup'
					handleClose={togglePopupUpdatePayment}
					content={
						<form onSubmit={onSubmitUpdatePaymentInputValidation}>
							<label className='paymentFormHeader'>Update Payment Log</label>

							<br /><br />

							<label className='updatePaymentFormLabelText'>Invoice ID</label>
							<input className='updatePaymentInputInvoiceId' value={updatePaymentInput.paymentInvoiceID} type='number' name='paymentInvoiceID' onChange={handleUpdatePaymentOnChange} autoComplete='off'/>
							
							<br /><br />

							<label className='updatePaymentFormLabelText'>Receipt ID</label>
							<input className='updatePaymentInputReceiptId' value={updatePaymentInput.receiptID} type='number' name='receiptID' onChange={handleUpdatePaymentOnChange} autoComplete='off'/>
							
							<br /><br />

							<label className='updatePaymentFormLabelText'>Payment Type</label>
							<input className='updatePaymentInputPaymentType' value={updatePaymentInput.paymentType} type='text' name='paymentType' onChange={handleUpdatePaymentOnChange} autoComplete='off'/>
							
							<br /><br />

							<label className='updatePaymentFormLabelText'>Payment Status</label>
							<input className='updatePaymentInputPaymentStatus' value={updatePaymentInput.paymentStatus} type='text' name='paymentStatus' onChange={handleUpdatePaymentOnChange} autoComplete='off'/>
							
							<br /><br />

							<button className='paymentButton'>Submit</button>
							
							<br /><br />

							{updatePaymentSubmitMessageStatus && <label className='paymentFormLabelTextStatus'>{<label className='paymentFormLabelText'>{updatePaymentSubmitMessage}</label>}</label>}
						</form>
					}/>
				}
			</div>
			}
			
			{modalVisibleUpdatePaymentConfirmation && <div className='payment-confirmation-modal'>
				{updatePaymentConfirmationPopupOpen && <Popup
				popupType='updatePaymentConfirmationPopup'
				handleClose={togglePopupUpdatePaymentConfirmation}
				content={
					<ConfirmationPopupContents
					clickStatus={updatePaymentPostDataClicked}
					statusMessage={updatePaymentPostStatusMessage}
					invokeAction={updatePayment}
					xButtonClose={closePopupUpdatePaymentConfirmation}
					closeButton={handleUpdatePaymentClosePopups}
					/>
					}/>
				}   
			</div>
			}

			{modalVisibleDeletePaymentConfirmation && <div className='payment-confirmation-modal'>
				{deletePaymentConfirmationPopupOpen && <Popup
				popupType='deletePaymentConfirmationPopup'
				handleClose={togglePopupDeletePaymentConfirmation}
				content={
					<ConfirmationPopupContents
					clickStatus={deletePaymentPostDataClicked}
					statusMessage={deletePaymentPostStatusMessage}
					invokeAction={deletePayment}
					xButtonClose={closePopupDeletePaymentConfirmation}
					closeButton={handleDeletePaymentClosePopups}
					/>
					}/>
				}   
			</div>
			}

			<div className="payments">
					<h1>Payment Logs</h1>
					<table className='paymentTable'>
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
									<td className='actionButtons'><UpdateAndDeleteButton buttonText={'Update Payment Log'} setView={togglePopupUpdatePayment} setData={updatePayment} data={updatePaymentInput} setId={() => {}}/></td>
									<td className='actionButtons'><UpdateAndDeleteButton buttonText={'Delete Payment Log'} setView={togglePopupDeletePaymentConfirmation} setData={deletePayment} data={updatePaymentInput} setId={() => {}}/></td>
								</tr>
							)
						})}
					</table>
			</div>
		</>
	)
}