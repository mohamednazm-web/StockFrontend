import React from 'react'
import { FormattedMessage, FormattedDate, useIntl } from 'react-intl'
import {
  FormGroup,
  Label,
  Input
} from 'reactstrap'
import classnames from 'classnames'
import Flatpickr from 'react-flatpickr';
import { useFormContext, Controller } from 'react-hook-form'

function CustomFormDateInput({ IsDisabled = false, name, title, defaultValue = [new Date()], options = { dateFormat: 'd-m-Y H:i', enableTime: true } }) {
  const { errors, register, control } = useFormContext()
  return (
    <FormGroup>
      <Label for={`${name}`}>
        <FormattedMessage id={`${title ?? name}`} />
      </Label>
      {/* { */}
        {/* // !IsDisabled ? */}
      <Controller
        as={<Flatpickr name={`${name}`} />}
        onChange={(date) => date}
        className={classnames({
          'is-invalid': errors[`${name}`],
          'form-control': true,
        })}
        name={`${name}`}
        control={control}
        options={options}
        defaultValue={defaultValue}
      />
      {/* :
          <Input value={new Date(defaultValue).toLocaleDateString()} disabled={IsDisabled} />
      } */}
      <small className="text-danger">
        {errors[`${name}`] && 'Date is required'}
      </small>
    </FormGroup>
  )
}

export default React.memo(CustomFormDateInput)
