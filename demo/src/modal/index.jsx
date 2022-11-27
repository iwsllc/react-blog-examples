import React from 'react'
import { ModalProvider } from '@iwsio/react-blog-examples'
import ModalExample from './modal'

export default function ModalExampleContainer() {
	return (
		<ModalProvider>
			<ModalExample />
		</ModalProvider>
	)
}
