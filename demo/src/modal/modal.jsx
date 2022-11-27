import React, { useState } from 'react'
import { useModal } from '@iwsio/react-blog-examples'
import ModalFooterWithBusy from './footer'
import ModalContent from './content'

export default function ModalExample() {
	const { modal } = useModal()
	const [alerts, setAlerts] = useState(false)

	function launchModalSuccess() {
		modal(ModalContent, {
			data: { name: 'test', color: 'blue' }
		}, {
			close: onModalClose,
			confirm: onModalConfirm,
			header: null, // leave it blank
			footer: { type: ModalFooterWithBusy } // we're customizing this one to use the Icon spinner.
		})
	}
	function launchModalFail() {
		modal(ModalContent, {
			status: 'pending',
			data: { name: 'test', color: 'blue' }
		}, {
			close: onModalClose,
			confirm: onModalConfirmFail,
			header: null, // leave it blank
			footer: { type: ModalFooterWithBusy } // we're customizing this one to use the Icon spinner.
		})
	}

	function onModalClose() {
		if (alerts) window.alert('modal closing...')
	}
	function onModalConfirmFail() {
		return new Promise((resolve) => {
			if (alerts) window.alert('modal confirmed... waiting two seconds for long-running work.')
			setTimeout(() => {
				if (alerts) window.alert('process failed... returning false to prevent closing modal.')
				resolve({ success: false, props: { status: 'failed', error: 'code 500...' } })
			}, 2000)
		})
	}
	function onModalConfirm() {
		return new Promise((resolve) => {
			if (alerts) window.alert('modal confirmed... waiting two seconds for long-running work.')
			setTimeout(() => {
				resolve()
			}, 2000)
		})
	}

	return (
		<>
      <p className="text-secondary">
        <em>
          Both modals will invoke <code>alert()</code> to inform you when callbacks are called. This first successful example will run a two second process on <code>confirm</code> and then return <code>true</code> so it automatically closes upon completion.
        </em>
      </p>
      <div className="form-group">
        <div className="custom-control custom-switch">
          <input type="checkbox" className="custom-control-input" id="switchEnableAlerts" value={alerts} onChange={(e) => { setAlerts(e.target.checked) }} />
          <label className="custom-control-label" htmlFor="switchEnableAlerts">Invoke <code>alert()</code> in examples?</label>
        </div>
      </div>
      <p><button type="button" className="btn btn-secondary" onClick={launchModalSuccess}>Launch modal</button></p>
      <p className="text-secondary"><em>This next example will emulate a failure during the two second process. It returns <code>false</code> and provides a change of <code>props</code> (in this case status) to show it updated and did NOT automatically close.</em></p>
      <p><button type="button" className="btn btn-danger" onClick={launchModalFail}>Launch modal (with failure)</button></p>
		</>
	)
}
