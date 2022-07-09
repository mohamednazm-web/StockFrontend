import {
  GET_VENDOR_REQUEST,
  GET_VENDOR_SUCCESS,
  GET_VENDOR_FAIL,
} from "./actionTypes"

import * as api from "../../api/index.js"

export const getAllVendor = () => async dispatch => {
  dispatch({ type: GET_VENDOR_REQUEST })
  try {
    const { data } = await api.getAllVendor()
    dispatch({ type: GET_VENDOR_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: GET_VENDOR_FAIL, payload: error.message })
  }
}
