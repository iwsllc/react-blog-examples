import { toCsv } from '@iwsio/json-csv-core'
import { ExportOptions } from '@iwsio/json-csv-core/types'
import { forwardRef, useEffect, useState } from 'react'
import { JsonField } from './JsonField.js'
import { ResetButton } from './ResetButton.js'
import { ResultView } from './ResultView.js'
import { items as initialItems, options as initialOptions } from './data.js'
import { simpleErrorMapping } from './simpleErrors.js'
import { useForwardRef } from '@iwsio/forms/useForwardRef'
import { FieldValues } from '@iwsio/forms/types'
import { FieldManager } from '@iwsio/forms/FieldManager'

export type JsonCsvExampleProps = { resultUpdated?: () => void }

export type JsonValues = { items: Record<string, any>[], options: Partial<ExportOptions> }

const defaultValues = { items: JSON.stringify(initialItems, null, 2), options: JSON.stringify(initialOptions, null, 2) }

// forwarding ref here because I was tinkering with hljs and the example dom
export const JsonCsvExample = forwardRef<HTMLFormElement, JsonCsvExampleProps>(({ resultUpdated }, ref) => {
	const refDom = useForwardRef<HTMLFormElement>(ref)
	const [result, setResult] = useState('')

	const handleValidSubmit = (values: FieldValues) => {
		let csv = ''
		try {
			const items = JSON.parse(values.items)
			const options = JSON.parse(values.options)
			csv = toCsv(items, options)
		}
		catch (err) {
			console.log(err)
		}
		setResult(csv)
	}

	useEffect(() => {
		/* This is just informing the consumer that things changed rather than prop drilling values.
		 * I'm using this for syntax highlighting the dom via refExample.
		 */
		if (resultUpdated != null) resultUpdated()
	}, [result])

	return (
		<FieldManager fields={{ ...defaultValues }} defaultValues={defaultValues} onValidSubmit={handleValidSubmit} errorMapping={simpleErrorMapping} ref={refDom}>
			<div className="flex flex-col sm:flex-row sm:gap-4">
				<JsonField name="items" label="Items" />
				<JsonField name="options" label="Options" />
			</div>
			<div className="form-row my-3">
				<div className="col">
					<p className="text-right gap-2">
						<ResetButton onReset={() => setResult(_old => '')} />
						<button type="submit" className="btn">Convert</button>
					</p>

				</div>
			</div>
			<ResultView result={result} />
		</FieldManager>
	)
})

JsonCsvExample.displayName = 'JsonCsvExample'

export default JsonCsvExample
