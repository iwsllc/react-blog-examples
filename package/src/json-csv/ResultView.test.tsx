import { render, screen } from '@testing-library/react'
import { ResultView } from './ResultView.js'

describe('ResultView', () => {
	it('should render without result', () => {
		render(<ResultView data-testid="result" result={null} />)

		expect(screen.queryByText('Results:')).not.to.be.ok
	})
	it('should render with result', () => {
		render(<ResultView data-testid="result" result="test 123" />)

		expect(screen.getByText('Results:')).to.be.ok
		expect(screen.getByText('test 123')).to.be.ok
	})
})
