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

const initialState = {
  isLoading: false,
  data: null,
  stockEntry: [],
  listStockEntries: [],
  loaded: false,
  error: null,
}

const stockEntries = (state = initialState, action) => {
  switch (action.type) {
    // START STOCK ENTRY
    case CREATE_STOCK_ENTRY_REQUEST:
      return {
        ...state,
        isLoading: true,
        loaded: false,
        data: null,
        error: null,
      }
    case CREATE_STOCK_ENTRY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        loaded: true,
        listStockEntries: [...state.listStockEntries, action.payload],
        error: null,
      }
    case CREATE_STOCK_ENTRY_FAIL:
      return {
        ...state,
        isLoading: false,
        loaded: true,
        data: null,
        error: action.payload,
      }
    // END S
    // START GET ALL stockEntries
    case GET_ONE_STOCK_ENTRY_REQUEST:
      return {
        ...state,
        isLoading: true,
        loaded: false,
        stockEntry: [],
        error: null,
      }
    case GET_ONE_STOCK_ENTRY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        loaded: true,
        stockEntry: action.payload,
        error: null,
      }
    case GET_ONE_STOCK_ENTRY_FAIL:
      return {
        ...state,
        isLoading: false,
        loaded: true,
        stockEntry: [],
        error: action.payload,
      }
    // END GET ALL stockEntries
    // START GET ALL stockEntries
    case GET_STOCK_ENTRY_REQUEST:
      return {
        ...state,
        isLoading: true,
        loaded: false,
        listStockEntries: [],
        error: null,
      }
    case GET_STOCK_ENTRY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        loaded: true,
        listStockEntries: action.payload,
        error: null,
      }
    case GET_STOCK_ENTRY_FAIL:
      return {
        ...state,
        isLoading: false,
        loaded: true,
        listStockEntries: [],
        error: action.payload,
      }
    // END GET ALL stockEntries
    // START UPDATE ONE S
    case UPDATE_STOCK_ENTRY_REQUEST:
      return {
        ...state,
        isLoading: true,
        loaded: false,
        error: null,
      }
    case UPDATE_STOCK_ENTRY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        listStockEntries: action.payload,
        loaded: true,
        error: null,
      }
    case UPDATE_STOCK_ENTRY_FAIL:
      return {
        ...state,
        isLoading: false,
        loaded: true,
        error: action.payload,
      }
    // END UPDATE ONE S
    // START DELETE ONE S
    case DELETE_STOCK_ENTRY_REQUEST:
      return {
        ...state,
        isLoading: true,
        loaded: false,
        error: null,
      }
    case DELETE_STOCK_ENTRY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        listStockEntries: state.listStockEntries.filter(
          req => req.series != action.payload
        ),
        loaded: true,
        error: null,
      }
    case DELETE_STOCK_ENTRY_FAIL:
      return {
        ...state,
        isLoading: false,
        loaded: true,
        error: action.payload,
      }
    // END DELETE ONE S
    default:
      return state
  }
}

export default stockEntries
