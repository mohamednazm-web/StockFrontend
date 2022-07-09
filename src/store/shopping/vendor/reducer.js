import {
  GET_VENDOR_REQUEST,
  GET_VENDOR_SUCCESS,
  GET_VENDOR_FAIL,
} from "./actionTypes"

const initialState = {
  isLoading: false,
  data: null,
  vendors: [],
  loaded: false,
  error: null,
}

const vendors = (state = initialState, action) => {
  switch (action.type) {
    // START GET ALL vendors
    case GET_VENDOR_REQUEST:
      return {
        ...state,
        isLoading: true,
        loaded: false,
        vendors: [],
        error: null,
      }
    case GET_VENDOR_SUCCESS:
      return {
        ...state,
        isLoading: false,
        loaded: true,
        vendors: action.payload,
        error: null,
      }
    case GET_VENDOR_FAIL:
      return {
        ...state,
        isLoading: false,
        loaded: true,
        vendors: [],
        error: action.payload,
      }
    // END GET ALL vendors
    default:
      return state
  }
}

export default vendors
