import { InvalidFeedbackForField, TextAreaField, useFieldManager } from '@iwsio/forms'
import { FC, TextareaHTMLAttributes, useCallback, useEffect } from 'react'

export const JsonField: FC<TextareaHTMLAttributes<HTMLTextAreaElement> & { name: string, label?: string, onChange?: (value: string) => void }> = ({ name, label, onChange, ...props }) => {
	const { checkFieldError, setFieldError, fields } = useFieldManager()
	const fieldError = checkFieldError(name)

	const checkValueAndTriggerChange = useCallback((value: string) => {
		try {
			JSON.parse(value)
			if (onChange != null) onChange(value)
		}
		catch (err) {
			setFieldError(name, 'Invalid JSON')
			console.error(err)
		}
	}, [onChange, setFieldError])

	useEffect(() => {
		if (fields[name] == null) return

		const id = setTimeout(() => {
			checkValueAndTriggerChange(fields[name])
		}, 200)
		return () => {
			clearTimeout(id)
		}
	}, [fields[name]])

	return (
		<div className="grow">
			<label className="label flex-col items-start prose">
				<h3>{label}</h3>
				<div className="w-full indicator">
					<InvalidFeedbackForField name={name} className="indicator-item badge badge-error" />
					<TextAreaField name={name} className={`w-full font-mono textarea textarea-bordered ${fieldError ? 'textarea-error' : ''}`} rows={25} required {...props} />
				</div>
			</label>
		</div>
	)
}
