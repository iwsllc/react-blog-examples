import { FieldManager } from '@iwsio/forms/FieldManager'
import { FieldValues } from '@iwsio/forms/types'
import { useForwardRef } from '@iwsio/forms/useForwardRef'
import { toCsv } from '@iwsio/json-csv-core'
import { ExportOptions } from '@iwsio/json-csv-core/types'
import { forwardRef, useEffect, useState } from 'react'

import { items as initialItems, options as initialOptions } from './data.js'
import { JsonField } from './JsonField.js'
import { ResetButton } from './ResetButton.js'
import { ResultView } from './ResultView.js'
import { simpleErrorMapping } from './simpleErrors.js'

export interface JsonCsvExampleProps { resultUpdated?: () => void }

export interface JsonValues { items: Record<string, any>[], options: Partial<ExportOptions> }

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
		} catch (err) {
			console.log(err)
		}
		setResult(csv)
	}

	useEffect(() => {
		/* This is just informing the consumer that things changed rather than prop drilling values.
		 * I'm using this for syntax highlighting the dom via refExample.
		 */
		if (resultUpdated != null) resultUpdated()
	}, [result, resultUpdated])

	return (
		<FieldManager fields={{ ...defaultValues }} defaultValues={defaultValues} onValidSubmit={handleValidSubmit} errorMapping={simpleErrorMapping} ref={refDom}>
			<div className="flex flex-col sm:flex-row sm:gap-4">
				<JsonField name="items" label="Items" />
				<JsonField name="options" label="Options" />
			</div>
			<div className="form-row my-3">
				<div className="col">
					<p className="gap-2 text-right">
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
