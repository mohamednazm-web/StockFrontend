import { API } from "./config"

// START STOCK ENTRY //
export const getAllStockEntry = () => API.get("/stockEntry")
export const deleteStockEntry = series =>
  API.delete(`/stockEntry/delete/${series}`)
export const createStockEntry = newStockEntry =>
  API.post("/stockEntry", newStockEntry)
// END STOCK ENTRY //

// START ITEM //
export const getAllItem = () => API.get("/Item")
// END ITEM //

// START Vendor //
export const getAllVendor = () => API.get("/Vendor")
// END Vendor //
