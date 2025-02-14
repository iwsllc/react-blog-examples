import { useFieldManager } from '@iwsio/forms/useFieldManager'
import { ComponentProps } from 'react'

export interface ResetButtonProps extends Pick<ComponentProps<'button'>, 'ref' | 'className'> { onReset: () => void }

export const ResetButton = ({ onReset, ...props }: ResetButtonProps) => {
	const { reset } = useFieldManager()
	const handleReset = () => {
		reset()
		onReset()
	}
	return <button {...props} type="button" onClick={handleReset}>Reset</button>
}
