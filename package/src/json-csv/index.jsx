import React, { useState, forwardRef, useEffect } from 'react'
import { toCsv } from '@iwsio/json-csv-core'
import { items as initialItems, options as initialOptions } from './data'
import JsonField from './json-field'

// forwarding ref here because I was tinkering with hljs and the example dom
const JsonCsvExample = forwardRef(({ resultUpdated }, ref) => {
	const [result, setResult] = useState('')

	// I'm lifting state from the JsonField to here so we have `reset`
	// ability from here as a composite component.
	const [jsonValues, setJsonValues] = useState({ items: initialItems, options: initialOptions })
	const [textValues, setTextValues] = useState({ items: JSON.stringify(initialItems, null, 2), options: JSON.stringify(initialOptions, null, 2) })
	const [valids, setValids] = useState({ items: true, options: true })

	function convert() {
		let csv = ''
		try {
			csv = toCsv(jsonValues.items, jsonValues.options)
		} catch (err) {
			console.log(err)
		}
		setResult(csv)
	}

	function onChange(e) {
		const name = e.target.name
		const text = e.target.value
		let valid = true
		let parsed = null
		try {
			parsed = JSON.parse(text)
		} catch {
			valid = false
		}

		const updatedText = { ...textValues }
		const updatedJson = { ...jsonValues }
		const updatedValids = { ...valids }

		updatedText[name] = text
		updatedJson[name] = parsed
		updatedValids[name] = valid

		setTextValues(updatedText)
		setJsonValues(updatedJson)
		setValids(updatedValids)
	}

	function reset() {
		setResult('')
		setJsonValues({ items: initialItems, options: initialOptions })
		setTextValues({ items: JSON.stringify(initialItems, null, 2), options: JSON.stringify(initialOptions, null, 2) })
		setValids({ items: true, options: true })
	}

	useEffect(() => {
		/* This is just informing the consumer that things changed rather than prop drilling values.
     * I'm using this for syntax highlighting the dom via refExample.
     */
		if (resultUpdated != null) resultUpdated()
	}, [result])

	return (
		<form ref={ref}>
			<div className="flex flex-col sm:flex-row sm:gap-4">
				<JsonField
					name="items"
					label="Items"
					value={textValues.items}
					valid={valids.items}
					onChange={onChange}
				/>
				<JsonField
					name="options"
					label="Options"
					value={textValues.options}
					valid={valids.options}
					onChange={onChange}
				/>
			</div>
			<div className="form-row mt-3">
				<div className="col">
					<p className="text-right gap-2">
						<button type="button" className="btn btn-accent mr-2" onClick={reset}>Reset</button>
						<button type="button" className="btn" onClick={convert}>Convert</button>
					</p>
					{result?.length ? <><h2 className="text-2xl font-semibold">Results:</h2><pre><code className="language-javascript">{result}</code></pre></> : null}
				</div>
			</div>
		</form>
	)
})
JsonCsvExample.displayName = 'JsonCsvExample'

export default JsonCsvExample
