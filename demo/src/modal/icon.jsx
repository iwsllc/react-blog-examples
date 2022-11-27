import React, { lazy, Suspense } from 'react' // lazy for lazy loading modules
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { config, library } from '@fortawesome/fontawesome-svg-core'
import { faSpinner } from '@fortawesome/free-solid-svg-icons/faSpinner'
import '@fortawesome/fontawesome-svg-core/styles.css'

config.autoAddCss = false
library.add(faSpinner)

const LazyIcon = lazy(() => import('./icon-actual'))

/*
	The purpose of this components only to centralize our icon usage and simplify global
	config for it.
*/
export const Icon = (props) => (
	<Suspense fallback={<FontAwesomeIcon data-testid="suspend-icon" {...props} icon={faSpinner} spin />}>
		<LazyIcon data-testid="actual-icon" {...props} />
	</Suspense>
)

export default Icon
