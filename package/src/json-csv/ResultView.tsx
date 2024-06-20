import { FC } from 'react'

export const ResultView: FC<{ result: string | undefined }> = ({ result }) => {
	return (
		<>
			{result?.length
				? (
					<>
						<h2 className="text-2xl font-semibold">Results:</h2>
						<pre><code className="language-csv">{result}</code></pre>
					</>
				)
				: null}
		</>
	)
}
