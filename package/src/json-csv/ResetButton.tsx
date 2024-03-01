import { useFieldManager } from '@iwsio/forms'
import { FC } from 'react'

export const ResetButton: FC<{onReset: () => void}> = ({ onReset }) => {
	const { reset } = useFieldManager()
	const handleReset = () => {
		reset()
		onReset()
	}
	return <button type="button" className="btn btn-accent mr-2" onClick={handleReset}>Reset</button>
}
