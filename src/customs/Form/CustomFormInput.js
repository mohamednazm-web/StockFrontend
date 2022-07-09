import React from 'react'
import { FormattedMessage } from 'react-intl'
import {
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from 'reactstrap'
import InputPasswordToggle from '@components/input-password-toggle'
import classnames from 'classnames'
import { useFormContext, Controller, useWatch } from 'react-hook-form';
import InputMask from 'react-input-mask'

function CustomFormInput({ name, title, type = "text", IsDisabled = false ,defaultValue=""}) {
  const { control, register, getValues, setValue, errors, watch } = useFormContext();

  return (
    <FormGroup>
      <Label for={`${name}`}>
        <FormattedMessage id={`${title ?? name}`} />
      </Label>
      {
        type === 'password' ?
          <InputPasswordToggle
            name={`${name}`}
            className="input-group-mergere"
            inputClassName={classnames({
              'is-invalid': errors[`${name}`],
              'form-control': true,
            })}
            innerRef={register({
              required: true,
            })}
            control={control}
            disabled={IsDisabled}
          />
          : type == 'tel' ?
            <Controller
              as={InputMask}
              control={control}
              mask="+\964 999 999 9999"
              name={`${name}`}
              className="form-control"
              maskChar=" "
            />
            :
            <InputGroup className={type === 'email' && 'mb-2'}>
              {type === 'email' &&
                <InputGroupAddon addonType='prepend'>
                  <InputGroupText>@</InputGroupText>
                </InputGroupAddon>
              }
              <Input
                type={type}
                name={`${name}`}
                className={classnames({
                  'is-invalid': errors[`${name}`],
                  'form-control': true,
                })}
                innerRef={register({
                  required: true,
                })}
                control={control}
                readOnly={IsDisabled}
                defaultValue={defaultValue}
              // disabled={IsDisabled}
              />
            </InputGroup>
      }
      <small className="text-danger">
        {errors[`${name}`] && errors[`${name}`]?.message}
      </small>
    </FormGroup>
  )
}

export default React.memo(CustomFormInput)
