import React, { Suspense, lazy } from "react"
import ReactDOM from "react-dom"
import * as serviceWorker from "./serviceWorker"
import { BrowserRouter } from "react-router-dom"
// import "bootstrap-icons/font/bootstrap-icons.css"
import "./i18n"
import { Provider } from "react-redux"

import store from "./store"
// import App from "./App"
const App = lazy(() => import("./App"))

const app = (
  <Provider store={store}>
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Suspense>
  </Provider>
)

ReactDOM.render(app, document.getElementById("root"))
serviceWorker.unregister()
