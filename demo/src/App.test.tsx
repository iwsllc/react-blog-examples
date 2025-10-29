import { render, screen } from '@testing-library/react'
import * as example from '@iwsio/react-blog-examples/json-csv'

import { App } from './App.js'

vi.mock('@iwsio/react-blog-examples/json-csv')

test('renders learn react link', () => {
	vi.spyOn(example, 'JsonCsvExample').mockImplementation(() => <span data-testid="JsonCsvExample"></span>)
	render(<App />)
	expect(screen.getByTestId('JsonCsvExample')).toBeInTheDocument()
})
