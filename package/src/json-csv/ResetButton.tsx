import { useFieldManager } from '@iwsio/forms'

export const ResetButton = () => {
	const { reset } = useFieldManager()
	return <button type="button" className="btn btn-accent mr-2" onClick={reset}>Reset</button>
}
