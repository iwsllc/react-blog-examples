import React, { useState, forwardRef, useEffect, ChangeEventHandler } from 'react'
import { toCsv } from '@iwsio/json-csv-core'
import { useFieldState, ValidatedForm, useForwardRef, FieldManager } from '@iwsio/forms'
import { items as initialItems, options as initialOptions } from './data'
import JsonField from './json-field'

export type JsonCsvExampleProps = { resultUpdated: () => void }

export type JsonValues = { items: any, options: any }

const defaultValues = { items: JSON.stringify(initialItems, null, 2), options: JSON.stringify(initialOptions, null, 2) }

// forwarding ref here because I was tinkering with hljs and the example dom
export const JsonCsvExample = forwardRef<HTMLFormElement, JsonCsvExampleProps>(({ resultUpdated }, ref) => {
	const refDom = useForwardRef<HTMLFormElement>(ref)
	const [result, setResult] = useState('')
	const fieldState = useFieldState({ items: JSON.stringify(initialItems, null, 2), options: JSON.stringify(initialOptions, null, 2) }, defaultValues)
	const { setFieldError, reset: resetFieldState } = fieldState
	const [jsonValues, setJsonValues] = useState<JsonValues>({ items: initialItems, options: initialOptions })

	const handleLocalChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
		let newJson
		try {
			newJson = JSON.parse(e.target.value)
		} catch (err) {
			setFieldError(e.target.name, 'Invalid JSON')
			console.error(err)
		}

		setJsonValues((old) => {
			const updated = { ...old }
			updated[e.target.name] = newJson
			return updated
		})
	}

	const convert = () => {
		let csv = ''
		try {
			csv = toCsv(jsonValues.items, jsonValues.options)
		} catch (err) {
			console.log(err)
		}
		setResult(csv)
	}

	const reset = () => {
		setResult('')
		setJsonValues({ items: initialItems, options: initialOptions })
		resetFieldState()
	}

	useEffect(() => {
		/* This is just informing the consumer that things changed rather than prop drilling values.
		 * I'm using this for syntax highlighting the dom via refExample.
		 */
		if (resultUpdated != null) resultUpdated()
	}, [result])

	return (
		<FieldManager fieldState={fieldState}>
			<ValidatedForm ref={refDom} noValidate={false} onValidSubmit={convert}>
				<div className="flex flex-col sm:flex-row sm:gap-4">
					<JsonField
						name="items"
						label="Items"
						onChange={handleLocalChange}
					/>
					<JsonField
						name="options"
						label="Options"
						onChange={handleLocalChange}
					/>
				</div>
				<div className="form-row my-3">
					<div className="col">
						<p className="text-right gap-2">
							<button type="button" className="btn btn-accent mr-2" onClick={reset}>Reset</button>
							<button type="submit" className="btn">Convert</button>
						</p>
						{result?.length ? <><h2 className="text-2xl font-semibold">Results:</h2><pre><code className="language-csv">{result}</code></pre></> : null}
					</div>
				</div>
			</ValidatedForm>
		</FieldManager>
	)
})

JsonCsvExample.displayName = 'JsonCsvExample'

export default JsonCsvExample
