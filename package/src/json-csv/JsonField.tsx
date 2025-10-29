import { InvalidFeedbackForField } from '@iwsio/forms/InvalidFeedbackForField'
import { TextAreaField } from '@iwsio/forms/TextAreaField'
import { useFieldManager } from '@iwsio/forms/useFieldManager'
import classNames from 'classnames'
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
		<div className="flex grow">
			<label className="label prose grow flex-col items-start gap-2">
				<h3>{label}</h3>
				<div className="relative flex">
					{/* <div className="before-content-['test'] flex before:absolute before:inset-0">test</div> */}
					<InvalidFeedbackForField name={name} className="indicator indicator-error" />
					<TextAreaField name={name} className={classNames('textarea textarea-bordered grow font-mono', { 'textarea-error': fieldError != null })} rows={25} required {...props} />
				</div>
			</label>
		</div>
	)
}
