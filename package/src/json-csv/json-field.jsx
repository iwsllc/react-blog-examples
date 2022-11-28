import React from 'react'

const JsonField = ({ name, label, onChange, value, valid }) => (
	<div className="flex-1 flex flex-col">
		<label htmlFor={name} className="label">
			<span className="label-text">{label}</span>
		</label>
		<textarea name={name} id={name} className={`font-mono textarea textarea-bordered ${!valid ? 'is-invalid' : ''}`} rows="25" value={value} onChange={onChange} />
		{!valid ? <div className="invalid-feedback">Broken JSON</div> : null}
	</div>
)

export default JsonField
