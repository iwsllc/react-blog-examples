import * as forms from '@iwsio/forms'
import { render, screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { FC, PropsWithChildren } from 'react'

import { JsonField } from './JsonField.js'

const { FieldManager, useFieldManager } = forms

const Wrapper: FC<PropsWithChildren> = ({ children }) => {
	return (
		<FieldManager fields={{ items: '' }} nativeValidation>
			{children}
			<TestBits />
		</FieldManager>
	)
}

const TestBits = () => {
	const { setFieldError } = useFieldManager()
	return (
		<>
			<button data-testid="setError" onClick={() => setFieldError('items', 'test error')}>test</button>
		</>
	)
}

describe('JsonField', () => {
	it('should render with and without error', async () => {
		const spyChange = vi.fn()

		render(<JsonField data-testid="field" name="items" label="Items" onChange={spyChange} />, { wrapper: Wrapper })

		expect(screen.queryByText('test error')).toBeFalsy()
		expect(screen.getByTestId('field').className).not.to.match(/textarea-error/)

		await userEvent.type(screen.getByTestId('field'), 'test')

		await waitFor(() => {
			expect(spyChange).not.toHaveBeenCalled() // only called when valid JSON changes
		})

		spyChange.mockClear()
		await userEvent.clear(screen.getByTestId('field'))
		await userEvent.type(screen.getByTestId('field'), '{{}')

		await waitFor(() => {
			expect(screen.queryByText('test error')).toBeFalsy()
			expect(screen.getByTestId('field').className).not.to.match(/textarea-error/)
			expect(spyChange).toHaveBeenCalled() // only called when valid JSON changes
		})

		spyChange.mockClear()
		// test custom error
		await userEvent.click(screen.getByTestId('setError'))

		await waitFor(() => {
			expect(screen.getByText('test error').className).to.eq('indicator indicator-error')
			expect(screen.getByTestId('field').className).to.match(/!border-red-500/iu)
			expect(spyChange).not.toHaveBeenCalled()
		})
	})
})
