import {
  GET_ITEM_REQUEST,
  GET_ITEM_SUCCESS,
  GET_ITEM_FAIL,
} from "./actionTypes"

import * as api from "../../api/index.js"

export const getAllItem = () => async dispatch => {
  dispatch({ type: GET_ITEM_REQUEST })
  try {
    const { data } = await api.getAllItem()
    dispatch({ type: GET_ITEM_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: GET_ITEM_FAIL, payload: error.message })
  }
}
