import { combineReducers } from "redux"

// Front
import Layout from "./layout/reducer"

// Authentication
import Login from "./auth/login/reducer"
import Profile from "./auth/profile/reducer"

import stockEntry from "./shopping/stockEntry/reducer"

import Item from "./shopping/item/reducer"

import Vendor from "./shopping/vendor/reducer"

const rootReducer = combineReducers({
  Layout,
  Login,
  Profile,
  stockEntry: stockEntry,
  Item,
  Vendor,
})

export default rootReducer
