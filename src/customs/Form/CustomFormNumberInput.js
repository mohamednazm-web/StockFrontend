import React from 'react'
import { FormattedMessage } from 'react-intl'
import {
  FormGroup,
  Label,
  Input
} from 'reactstrap'
import classnames from 'classnames'
import Cleave from 'cleave.js/react';
import { Controller, useWatch } from 'react-hook-form';
import { useFormContext } from 'react-hook-form'
import { parseNumber } from '@utils'
function CustomFormNumberInput({ name, title, defaultValue = 0, IsHidden = false, IsDisabled = false,
  options = {
    numeral: true,
    numeralDecimalScale: 6,
    numeralPositiveOnly: true,
  }, extraOnChangeFun }) {
  const { errors, register, control } = useFormContext()
  const _defaultValue = useWatch({
    control,
    name: [
      name
    ]
  })
  return (
    <FormGroup>
      {!IsHidden &&
        <Label for={`${name}`}>
          <FormattedMessage id={`${title ?? name}`} />
        </Label>
      }
      <Controller
        // as={ }
        name={`${name}`}
        control={control}
        render={({ onChange, ref, value }) => (
          <Cleave
            name={`${name}`}
            options={{
              ...options
            }}
            onChange={e => {
              onChange(e);
              if (extraOnChangeFun)
                extraOnChangeFun()
            }} // send value to hook form
            value={value}
            className={classnames({
              'is-invalid': errors[`${name}`],
              'form-control': true,
              "d-none": IsHidden
            })}
            disabled={
              _defaultValue === '' ||
              _defaultValue === undefined || IsDisabled
            }
          />
        )}
        className={classnames({
          'is-invalid': errors[`${name}`],
          'form-control': true,
          "d-none": IsHidden
        })}
        defaultValue={defaultValue}
        disabled={
          _defaultValue === '' ||
          _defaultValue === undefined || IsDisabled
        }
      />
      {
        !IsHidden &&
        <small className="text-danger">
          {errors[`${name}`] && errors[`${name}`]?.message}
        </small>

      }
    </FormGroup >
  )
}

export default React.memo(CustomFormNumberInput)
