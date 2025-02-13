import { InvalidFeedbackForField } from '@iwsio/forms/InvalidFeedbackForField'
import { TextAreaField } from '@iwsio/forms/TextAreaField'
import { useFieldManager } from '@iwsio/forms/useFieldManager'
import { FC, TextareaHTMLAttributes, useCallback, useEffect } from 'react'

export const JsonField: FC<TextareaHTMLAttributes<HTMLTextAreaElement> & { name: string, label?: string, onChange?: (value: string) => void }> = ({ name, label, onChange, ...props }) => {
	const { checkFieldError, setFieldError, fields } = useFieldManager()
	const fieldError = checkFieldError(name)

	const checkValueAndTriggerChange = useCallback((value: string) => {
		try {
			JSON.parse(value)
			if (onChange != null) onChange(value)
		} catch (err) {
			setFieldError(name, 'Invalid JSON')
			console.error(err)
		}
	}, [name, onChange, setFieldError])

	useEffect(() => {
		if (fields[name] == null) return

		const id = setTimeout(() => {
			checkValueAndTriggerChange(fields[name])
		}, 200)
		return () => {
			clearTimeout(id)
		}
	}, [checkValueAndTriggerChange, fields, name])

	return (
		<div className="grow">
			<label className="label prose flex-col items-start">
				<h3>{label}</h3>
				<div className="indicator w-full">
					<InvalidFeedbackForField name={name} className="indicator-item badge badge-error" />
					<TextAreaField name={name} className={`textarea textarea-bordered w-full font-mono ${fieldError ? 'textarea-error' : ''}`} rows={25} required {...props} />
				</div>
			</label>
		</div>
	)
}
