import { render } from '@testing-library/react'

describe('Example React', function() {
	// beforeEach and afterEach need to setup DOM and clean it up between each `act()` so the rendered content can be tested
	const Hello = (props) => {
		if (props.name) {
			return <h1>Hello, {props.name}!</h1>
		} else {
			return <span>Hey, stranger</span>
		}
	}

	test('should render without the name', async () => {
		const { getByText } = render(<Hello />)
		expect(getByText('Hey, stranger')).to.be.ok
	})

	test('should render without the name', async () => {
		const { getByText } = render(<Hello name="Fred" />)
		expect(getByText('Hello, Fred!')).to.be.ok
	})
})
