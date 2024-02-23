import { ErrorMapping } from '@iwsio/forms'

export const simpleErrorMapping: ErrorMapping = {
	badInput: 'Invalid',
	patternMismatch: 'Invalid',
	rangeOverflow: 'Too high',
	rangeUnderflow: 'Too low',
	stepMismatch: 'Invalid',
	tooLong: 'Too long',
	tooShort: 'Too short',
	typeMismatch: 'Invalid',
	valueMissing: 'Required'
}
