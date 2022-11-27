import React from 'react' // lazy for lazy loading modules
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons/faCircle'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons/faInfoCircle'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons/faCircleCheck'
import { library } from '@fortawesome/fontawesome-svg-core'

library.add(faCircle, faInfoCircle, faCircleCheck)


/*
	The purpose of this components only to centralize our icon usage and simplify global
	config for it.
*/
export function ActualIcon(props) {
	// So I'm totally tweaking this behavior for our usage of these icons in this app. Normally,
	// you ALWAYS have to provide the `far` prefix for regular icons because the default is
	// `fas` for solid. But we're going to tweak it; and automatically add `far` prefix.
	// Caveat: To use `fas` or other prefixes, you'll need to define it fully: i.e. `icon={['fas', 'icon-name']}`

	let icon = props.icon
	if (typeof icon === 'string' && !/\s/.test(icon)) { // if the icon is just simply one word like `fa-circle`, prefix it with solid
		icon = ['fas', props.icon]
	}
	// props includes icon, but the subsequent icon overrides it.
	return <FontAwesomeIcon {...props} icon={icon} />
}

export default ActualIcon
