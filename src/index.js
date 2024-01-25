import React from "react"
import ReactDOM from "react-dom"
import {HashRouter} from "react-router-dom"
import {store} from "./store/store"
import {Provider} from "react-redux"
import "./index.css"
import {App} from "./App"

ReactDOM.render(
	<React.StrictMode>
		<HashRouter>
			<Provider store={store}>
				<App />
			</Provider>
		</HashRouter>
	</React.StrictMode>,
	document.getElementById("root")
)
