import React, { useState, useEffect } from "react"
import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, Link } from "react-router-dom"
import { API } from "../../store/api/config"
import Swal from "sweetalert2"
import makeAnimated from "react-select/animated"
import ReactSelect from "react-select"
import NumberFormat from "react-number-format"
import { getAllItem, getAllVendor } from "../../store/actions"

import "./styles.css"
import { createStockEntry } from "../../store/actions"
import { Col, CardBody, Row, Input } from "reactstrap"

let renderCount = 0

const animatedComponents = makeAnimated()

const purposes = [
  { value: "Sales Return", label: "Sales Return" },
  { value: "Purchase Return", label: "Purchase Return" },
  { value: "Damage", label: "Damage" },
]

const trueOrFalse = [
  {
    value: true,
    label: "True",
  },
  {
    value: false,
    label: "False",
  },
]

const currency = [
  {
    value: "IQD",
    label: "IQD",
  },
  { value: "USD", label: "USD" },
]

const StockEntry = props => {
  const { Item } = useSelector(state => state)
  const { items } = Item

  const { Vendor } = useSelector(state => state)
  const { vendors } = Vendor

  const dispatch = useDispatch()

  const history = useHistory()

  useEffect(() => {
    dispatch(getAllItem())
    dispatch(getAllVendor())
  }, [])

  const {
    register,
    control,
    handleSubmit,
    reset,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      items: [{}],
    },
  })

  const watchItemsField = watch(["items"])

  console.log("watchItemsField", watchItemsField)

  useEffect(() => {}, [watchItemsField])

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  })

  const stringify = data => JSON.stringify(data)

  const calculatePrice = ({ index = 0, quantity = 1 }) => {
    if (quantity == 0) return
    const item = getValues().items[index]
    const price = item.price
    const total = price * quantity
    setValue(`items.${index}.price`, total)
  }

  const calculateStockLevel = () => {
    const items = getValues().items
    const total = items.reduce((acc, item) => {
      return acc + parseInt(item.quantity)
    }, 0)
    return total
  }

  const onSubmit = data => {
    const items = data.items.map(item => {
      return {
        series: item.series.value,
        name: item.series.label,
        price: item.price,
        quantity: item.quantity == undefined ? 1 : item.quantity,
      }
    })
    const request = {
      purpose: data.purpose.value,
      items: stringify(items),
      currency: data.currency.value,
      isOpening: data.isOpening.value,
      vendor_id: data.vendor_id.value,
      remarks: data.remarks,
      stockLevel: calculateStockLevel(),
      postingDate: new Date(),
    }
    if (dispatch(createStockEntry(request))) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "ئەم داواکارییە بە سەرکەوتووی زیادکرا",
        showConfirmButton: false,
        timer: 1500,
      })
      history.push("/stockEntries")
    }
  }

  renderCount++

  return (
    <React.Fragment>
      <div className="page-content">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 style={{ color: "black" }}>Stock Entry</h1>
          <CardBody>
            <Row>
              <Link
                to={{
                  pathname: "stockEntries",
                }}
                className="btn btn-primary"
              >
                visit stock
              </Link>
            </Row>
            <Row>
              <Col xs="12" md="6">
                <label htmlFor="dropdown" style={{ color: "black" }}>
                  Is Opening
                </label>
                <Controller
                  as={ReactSelect}
                  options={trueOrFalse}
                  name="isOpening"
                  isClearable
                  control={control}
                  rules={{
                    required: { value: true, message: "Required" },
                  }}
                />
                {errors.isOpening && (
                  <p style={{ color: "red" }}>{errors.isOpening.message}</p>
                )}
              </Col>
              <Col xs="12" md="6">
                <label style={{ color: "black" }}>Purpose</label>
                <Controller
                  rules={{
                    required: { value: true, message: "Required" },
                  }}
                  as={ReactSelect}
                  options={purposes}
                  name="purpose"
                  isClearable
                  control={control}
                />
                {errors.purpose && (
                  <p style={{ color: "red" }}>{errors.purpose.message}</p>
                )}
              </Col>
              <Col xs="12" md="6">
                <label style={{ color: "black" }}>Vendor</label>
                <Controller
                  rules={{
                    required: { value: true, message: "Required" },
                  }}
                  as={ReactSelect}
                  options={vendors.map(({ name, series }) => {
                    return { label: name, value: series }
                  })}
                  name="vendor_id"
                  isClearable
                  control={control}
                />
                {errors.vendor_id && (
                  <p style={{ color: "red" }}>{errors.vendor_id.message}</p>
                )}
              </Col>
              <Col xs="12" md="6">
                <label style={{ color: "black" }}>Currency</label>
                <Controller
                  as={ReactSelect}
                  options={currency}
                  name="currency"
                  isClearable
                  control={control}
                  rules={{
                    required: { value: true, message: "Required" },
                  }}
                />
                {errors.currency && (
                  <p style={{ color: "red" }}>{errors.currency.message}</p>
                )}
              </Col>

              <Col md="6" sm="12">
                <label for="remarks" style={{ color: "black" }}>
                  Remarks
                </label>
                <Input
                  type="textarea"
                  name="remarks"
                  innerRef={register()}
                  control={control}
                  defaultValue=""
                />
              </Col>
              <div className="" style={{ width: "100%" }}>
                <ul>
                  <label htmlFor="" style={{ color: "black" }}>
                    Select Items
                  </label>
                  <Row>
                    {fields.map((item, index) => {
                      return (
                        <li key={item.id}>
                          <Col>
                            <label style={{ color: "black" }}>Items</label>
                            <Controller
                              isClearable
                              name={`items.${index}.series`}
                              control={control}
                              render={({ value }) => {
                                return (
                                  <ReactSelect
                                    onChange={val => {
                                      setValue(`items.${index}.series`, {
                                        value: val.value,
                                        label: val.label,
                                      })
                                      setValue(
                                        `items.${index}.price`,
                                        val.price
                                      )
                                    }}
                                    value={value}
                                    options={items.map(
                                      ({ name, series, price }) => {
                                        return {
                                          label: name,
                                          value: series,
                                          price: price,
                                        }
                                      }
                                    )}
                                  />
                                )
                              }}
                            />
                            {errors.items && (
                              <p style={{ color: "red" }}>
                                {errors.items.message}
                              </p>
                            )}
                          </Col>
                          <Col>
                            <label style={{ color: "black" }}>Price</label>
                            <Controller
                              as={NumberFormat}
                              thousandSeparator
                              name={`items.${index}.price`}
                              className="input"
                              control={control}
                              disabled={true}
                            />
                          </Col>
                          <Col>
                            <label style={{ color: "black" }}>quantity</label>
                            <Controller
                              // as={NumberFormat}
                              thousandSeparator
                              className="input"
                              control={control}
                              name={`items.${index}.quantity`}
                              render={({ value }) => {
                                return (
                                  <input
                                    type="number"
                                    defaultValue={1}
                                    value={value}
                                    onChange={val => {
                                      setValue(
                                        `items.${index}.quantity`,
                                        val.target.value
                                      )
                                      calculatePrice({
                                        index: index,
                                        quantity: val.target.value,
                                      })
                                    }}
                                  />
                                )
                              }}
                            />
                          </Col>
                          <Col xs="12" md="6">
                            <button type="button" onClick={() => remove(index)}>
                              Delete
                            </button>
                          </Col>
                        </li>
                      )
                    })}
                  </Row>
                </ul>
              </div>
              <section>
                <button
                  type="button"
                  onClick={() => {
                    append({ name: "Item 1" })
                  }}
                >
                  Add New Item
                </button>
                <button
                  type="button"
                  onClick={() =>
                    reset({
                      userName: "mohammed",
                      items: [{ name: "Item 1" }],
                      user_image: "",
                    })
                  }
                >
                  reset
                </button>
              </section>
              <input type="submit" />
            </Row>
          </CardBody>
        </form>
        <hr />
      </div>
    </React.Fragment>
  )
}

export default StockEntry
