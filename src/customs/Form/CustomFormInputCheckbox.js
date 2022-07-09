import React from 'react'
import { FormattedMessage } from 'react-intl'
import {
  FormGroup,
  Label,
  CustomInput
} from 'reactstrap'
import classnames from 'classnames'
import { useFormContext } from 'react-hook-form'

function CustomFormInputCheckbox({ name, direction = "row", title, IsDisabled = false }) {
  const { errors, register, control } = useFormContext()
  return (
    <FormGroup>
      <Label
        for={`${name}`}
        style={{ userSelect: "none" }}
        className={`d-flex ${'flex-' + direction} align-items-center justify-content-between`}
      >
        <CustomInput
          innerRef={register}
          name={`${name}`}
          id={`${name}`}
          // value={true}
          type="checkbox"
          className="position-relative m-0"
          disabled={IsDisabled}
          control={control}
        />
        <p className="m-0 p-0">
          <FormattedMessage id={`${title ?? name}`} />
        </p>
      </Label>

      <small className="text-danger">
        {errors[`${name}`] && errors[`${name}`]?.message}
      </small>
    </FormGroup>
  )
}

export default React.memo(CustomFormInputCheckbox)
