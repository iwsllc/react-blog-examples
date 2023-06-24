import React from 'react'
import { TextAreaField, useFieldManager } from '@iwsio/forms'

const JsonField = ({ name, label, onChange }) => {
	const { fieldErrors } = useFieldManager()

	const valid = fieldErrors[name] == null
	return (
		<div className="grow">
			<label className="label flex-col items-start prose">
				<h3>{label}</h3>
				<TextAreaField name={name} onChange={onChange} className={`w-full font-mono textarea textarea-bordered ${!valid ? 'is-invalid' : ''}`} rows={25} required />
			</label>
			{!valid ? <div className="invalid-feedback">Broken JSON</div> : null}
		</div>
	)
}

export default JsonField
