import { FieldManager } from '@iwsio/forms/FieldManager'
import { FieldValues } from '@iwsio/forms/types'
import { toCsv } from '@iwsio/json-csv-core'
import { ExportOptions } from '@iwsio/json-csv-core/types'
import { Ref, useEffect, useImperativeHandle, useRef, useState } from 'react'

import { items as initialItems, options as initialOptions } from './data.js'
import { JsonField } from './JsonField.js'
import { ResetButton } from './ResetButton.js'
import { ResultView } from './ResultView.js'
import { simpleErrorMapping } from './simpleErrors.js'

export interface JsonCsvExampleProps {
	resultUpdated?: () => void
	ref?: Ref<HTMLFormElement>
	className?: string
}

export interface JsonValues { items: Record<string, any>[], options: Partial<ExportOptions> }

const defaultValues = { items: JSON.stringify(initialItems, null, 2), options: JSON.stringify(initialOptions, null, 2) }

// forwarding ref here because I was tinkering with hljs and the example dom
export const JsonCsvExample = ({ resultUpdated, className = '', ref }: JsonCsvExampleProps) => {
	const refDom = useRef<HTMLFormElement>(null)
	useImperativeHandle(ref, () => refDom.current!, [refDom])

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
		<FieldManager className={`flex flex-col gap-2 ${className ?? ''}`} fields={{ ...defaultValues }} defaultValues={defaultValues} onValidSubmit={handleValidSubmit} errorMapping={simpleErrorMapping} ref={refDom}>
			<div className="flex items-stretch gap-4">
				<JsonField name="items" label="Items" />
				<JsonField name="options" label="Options" />
			</div>
			<div className="flex items-center justify-end gap-2">
				<ResetButton className="btn btn-accent" onReset={() => setResult(_old => '')} />
				<button type="submit" className="btn">Convert</button>
			</div>
			<ResultView result={result} />
		</FieldManager>
	)
}
