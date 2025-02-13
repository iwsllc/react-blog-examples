import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { JsonCsvExample } from './index.js'

vi.mock('./ResultView', () => ({ ResultView: ({ result }: any): any => <div data-testid="result">{result}</div> }))

describe('index', () => {
	it('should work with init data', async () => {
		const spy = vi.fn()
		render(<JsonCsvExample resultUpdated={spy} />)

		await userEvent.click(screen.getByText('Convert'))

		expect(screen.getByTestId('result').textContent).to.match(/Company,Name,Email,Downloaded,Year,Level/i)
		expect(spy).toHaveBeenCalledTimes(2) // init and convert
	})
	it('should not work with invalid json', async () => {
		const spy = vi.fn()
		const { container } = render(<JsonCsvExample resultUpdated={spy} />)

		await userEvent.click(screen.getByText('Convert'))

		expect(screen.getByTestId('result').textContent).to.match(/Company,Name,Email,Downloaded,Year,Level/i)
		expect(spy).toHaveBeenCalledTimes(2) // init and convert

		spy.mockClear()

		await userEvent.type(container.querySelector('textarea[name="items"]'), '123') // maybe three times

		await waitFor(() => {
			expect(spy).not.toHaveBeenCalled()
			expect(screen.queryByTestId('result').textContent).to.be.ok // remains the same
		})
	})
})
