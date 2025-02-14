export const ResultView = ({ result }: { result: string | undefined }) => {
	if (result == null || result.length === 0) return null
	return (
		<>
			<h2 className="text-2xl font-semibold">Results:</h2>
			<pre><code className="language-csv">{result}</code></pre>
		</>
	)
}
