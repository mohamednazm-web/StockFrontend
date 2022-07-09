import {
  GET_ITEM_REQUEST,
  GET_ITEM_SUCCESS,
  GET_ITEM_FAIL,
} from "./actionTypes"

const initialState = {
  isLoading: false,
  data: null,
  items: [],
  loaded: false,
  error: null,
}

const items = (state = initialState, action) => {
  switch (action.type) {
    // START GET ALL ITEMS
    case GET_ITEM_REQUEST:
      return {
        ...state,
        isLoading: true,
        loaded: false,
        items: [],
        error: null,
      }
    case GET_ITEM_SUCCESS:
      return {
        ...state,
        isLoading: false,
        loaded: true,
        items: action.payload,
        error: null,
      }
    case GET_ITEM_FAIL:
      return {
        ...state,
        isLoading: false,
        loaded: true,
        items: [],
        error: action.payload,
      }
    // END GET ALL ITEMS
    default:
      return state
  }
}

export default items
