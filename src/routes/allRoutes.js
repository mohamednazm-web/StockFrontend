import StockEntry from "pages/Forms/StockEntry"
import React from "react"
import { Redirect } from "react-router-dom"

// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"

// Stock
import Stock from "../pages/Dashboard/StockEntry"

const userRoutes = [
  { path: "/stockEntries", component: Stock },

  { path: "/stock-entry", component: StockEntry },
  // this route should be at the end of all other routes
  { path: "/", exact: true, component: () => <Redirect to="/stock-entry" /> },
]

const authRoutes = [
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
]

export { userRoutes, authRoutes }
