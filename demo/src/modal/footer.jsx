import React from 'react'
import Icon from './icon'

export default function ModalFooterWithBusy({ close, confirm, disabled }) {
	return (
		<>
			<button className="btn btn-secondary" type="button" disabled={disabled} onClick={() => { if (close != null) close() }}>{disabled ? <><Icon icon="spinner" spin /> </> : null}Cancel</button>
			<button className="btn btn-primary" type="button" disabled={disabled} onClick={() => { if (confirm != null) confirm() }}>{disabled ? <><Icon icon="spinner" spin /> </> : null}OK</button>
		</>
	)
}
