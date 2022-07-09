import React, { useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import { FormGroup, Label, Input } from 'reactstrap';
import classnames from 'classnames';
import Cleave from 'cleave.js/react';
import NumberFormat from 'react-number-format';
import { Controller, useWatch } from 'react-hook-form';
import { useFormContext } from 'react-hook-form';
import { isNumber, toBoolean } from '../../utility/Utils';
function CustomFormIntegerInput({
  name,
  title,
  defaultValue = 0,
  min,
  max,
  IsHidden = false,
  IsDisabled = false,
  options = {
    allowEmptyFormatting: true
  },
  extraOnChangeFun,
}) {
  const { errors, register, control, getValues } = useFormContext();
  const _defaultValue = useWatch({
    control,
    name: [name],
  });
  return (
    <FormGroup>
      {!IsHidden && (
        <Label Label for={`${name}`}>
          <FormattedMessage id={`${title ?? name}`} />
        </Label>
      )}
      <Controller
        // as={ }
        name={`${name}`}
        control={control}
        as={
          <NumberFormat
            isAllowed={(values) => {
              const { floatValue } = values;
              if (!floatValue && floatValue !== 0) return true
              if (isNumber(min) && isNumber(max))
                return floatValue >= min && floatValue <= max;
              if (isNumber(min)) return floatValue >= min;
              if (isNumber(max)) return floatValue <= max;
              return true
            }}
            {...options}
          />
        }
        className={classnames({
          'is-invalid': errors[`${name}`],
          'form-control': true,
          'd-none': IsHidden,
        })}
        defaultValue={defaultValue}
        disabled={
          _defaultValue === '' || _defaultValue === undefined || IsDisabled
        }
      />
      {!IsHidden && (
        <small className="text-danger">
          {errors[`${name}`] && errors[`${name}`]?.message}
        </small>
      )}
    </FormGroup>
  );
}

export default React.memo(CustomFormIntegerInput);
