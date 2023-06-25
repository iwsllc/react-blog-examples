import React from 'react'
import { TextAreaField, useFieldManager } from '@iwsio/forms'

const JsonField = ({ name, label, onChange }) => {
	const { fieldErrors } = useFieldManager()

	const valid = fieldErrors[name] == null
	return (
		<div className="grow">
			<label className="label flex-col items-start prose">
				<h3>{label}</h3>
				<div className="w-full indicator">
					{!valid && <span className="indicator-item badge badge-error">Invalid JSON</span>}
					<TextAreaField name={name} onChange={onChange} className={`w-full font-mono textarea textarea-bordered ${!valid ? 'textarea-error' : ''}`} rows={25} required />
				</div>
			</label>
		</div>
	)
}

export default JsonField
