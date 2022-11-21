import React from 'react'

export default function ModalContent({ data, status }) {
	return (
		<p>
			Custom content to show.
			<br />Custom props: <code>{JSON.stringify(data)}</code>
			{status != null ? <><br />Status: <code>{status}</code></> : null}
		</p>
	)
}
