import * as forms from '@iwsio/forms/useFieldManager'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { ResetButton } from './ResetButton.js'

vi.mock('@iwsio/forms/useFieldManager', () => ({ useFieldManager: vi.fn() }))

describe('ResetButton', () => {
	it('should reset the form', async () => {
		const spyFieldManagerReset = vi.fn()
		const spyReset = vi.fn()
		vi.spyOn(forms, 'useFieldManager').mockReturnValue({ reset: spyFieldManagerReset } as any)
		render(<ResetButton onReset={spyReset} />)

		await userEvent.click(screen.getByRole('button'))

		expect(spyFieldManagerReset).toHaveBeenCalled()
		expect(spyReset).toHaveBeenCalled()
	})
})
