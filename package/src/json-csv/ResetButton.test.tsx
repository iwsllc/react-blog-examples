import { render, screen } from '@testing-library/react'
import { ResetButton } from './ResetButton'
import * as forms from '@iwsio/forms'
import userEvent from '@testing-library/user-event'

vi.mock('@iwsio/forms', () => ({ useFieldManager: vi.fn() }))

describe('ResetButton', () => {
	it('should reset the form', async () => {
		const spy = vi.fn()
		vi.spyOn(forms, 'useFieldManager').mockReturnValue({ reset: spy } as any)
		render(<ResetButton />)

		await userEvent.click(screen.getByRole('button'))

		expect(spy).toHaveBeenCalled()
	})
})
