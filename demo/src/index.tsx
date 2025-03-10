import './index.css'

import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'

import { App } from './App.js'
import { BUILD_SHA } from './constants.js'
import reportWebVitals from './reportWebVitals.js'

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
)

root.render(
	<StrictMode>
		<App />
		<span className="hidden">{BUILD_SHA}</span>
	</StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
if (process.env.NODE_ENV !== 'production') {
	reportWebVitals()
}
