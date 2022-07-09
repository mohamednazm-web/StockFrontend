import {
  GET_STOCK_ENTRY_REQUEST,
  GET_STOCK_ENTRY_SUCCESS,
  GET_STOCK_ENTRY_FAIL,
  CREATE_STOCK_ENTRY_REQUEST,
  CREATE_STOCK_ENTRY_SUCCESS,
  CREATE_STOCK_ENTRY_FAIL,
  UPDATE_STOCK_ENTRY_REQUEST,
  UPDATE_STOCK_ENTRY_SUCCESS,
  UPDATE_STOCK_ENTRY_FAIL,
  DELETE_STOCK_ENTRY_REQUEST,
  DELETE_STOCK_ENTRY_SUCCESS,
  DELETE_STOCK_ENTRY_FAIL,
  GET_ONE_STOCK_ENTRY_REQUEST,
  GET_ONE_STOCK_ENTRY_SUCCESS,
  GET_ONE_STOCK_ENTRY_FAIL,
} from "./actionTypes"

import * as api from "../../api/index.js"

// export const oneUserAddress = id => async dispatch => {
//   dispatch({ type: GET_ONE_STOCK_ENTRY_REQUEST })
//   try {
//     const { data } = await api.getOneUserAddress(id)
//     dispatch({ type: GET_ONE_STOCK_ENTRY_SUCCESS, payload: data.userAddress })
//   } catch (error) {
//     // console.log(error.message)
//     dispatch({ type: GET_ONE_STOCK_ENTRY_FAIL, payload: error.message })
//   }
// }

export const getAllStockEntry = () => async dispatch => {
  dispatch({ type: GET_STOCK_ENTRY_REQUEST })
  try {
    const { data } = await api.getAllStockEntry()
    console.log("getAllStockEntry", data)
    dispatch({ type: GET_STOCK_ENTRY_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: GET_STOCK_ENTRY_FAIL, payload: error.message })
  }
}

export const createStockEntry = stockEntryData => async dispatch => {
  dispatch({ type: CREATE_STOCK_ENTRY_REQUEST })
  try {
    const { data } = await api.createStockEntry(stockEntryData)
    console.log("createStockEntry", data)
    dispatch({ type: CREATE_STOCK_ENTRY_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: CREATE_STOCK_ENTRY_FAIL, payload: error.message })
  }
}

// export const updateUserAddress = (id, newUserAddress) => async dispatch => {
//   dispatch({ type: UPDATE_STOCK_ENTRY_REQUEST })
//   try {
//     console.log("newUserAddress", newUserAddress)
//     const { data } = await api.updateUserAddress(id, newUserAddress)
//     console.log(data)
//     // console.log(data)
//     dispatch({ type: UPDATE_STOCK_ENTRY_SUCCESS, payload: data.userAddress })
//   } catch (error) {
//     // console.log(error.message)
//     dispatch({ type: UPDATE_STOCK_ENTRY_FAIL, payload: error.message })
//   }
// }

export const deleteStockEntry = series => async dispatch => {
  dispatch({ type: DELETE_STOCK_ENTRY_REQUEST })
  try {
    const { data } = await api.deleteStockEntry(series)
    dispatch({ type: DELETE_STOCK_ENTRY_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: DELETE_STOCK_ENTRY_FAIL, payload: error.message })
  }
}
