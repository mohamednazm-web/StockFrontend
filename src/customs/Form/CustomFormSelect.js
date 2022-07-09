import React, { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { FormGroup, Label, Input } from 'reactstrap';
import classnames from 'classnames';
import { Controller, useWatch } from 'react-hook-form';
import Routes from '@Routes';
import CustomSelect from 'components/CustomSelect';
import { useFormContext } from 'react-hook-form';
import { confirmAlert2 } from '@alerts';
import { compareArray } from '@utils';

function CustomFormSelect({
  name,
  title,
  textName = 'label',
  url,
  options,
  isMulti,
  valueName = 'value',
  IsDisabled = false,
  hacConfirmMessage = false,
  isClearable = false,
  IsHidden = false,
  ...restCustom
}) {
  const { errors, control } = useFormContext();
  const changeValue = (val, onChange) => {
    if (isMulti) {
      onChange(val?.map((x) => x.value) ?? null);
    } else {
      onChange(val?.value ?? null);
    }
  };
  const _previousValue = useWatch({ control, name: [name] });
  return (
    <FormGroup>
      {!IsHidden && (
        <>
          <Label for={`${name}`}>
            <FormattedMessage id={`${title ?? name}`} />
          </Label>
          <Controller
            control={control}
            name={`${name}`}
            render={({ onChange, ref, ...rest }) => (
              <CustomSelect
                {...rest}
                isClearable={isClearable}
                className={classnames({
                  'is-invalid': errors[`${name}`],
                })}
                isMulti={isMulti}
                textName={textName}
                valueName={valueName}
                inputRef={ref}
                onChange={(val) => {
                  if (!isMulti && _previousValue[name] === val?.value) return;
                  if (!hacConfirmMessage) {
                    changeValue(val, onChange);
                  } else {
                    confirmAlert2(
                      null,
                      () => {
                        changeValue(val, onChange);
                      },
                      'en'
                    );
                  }
                }}
                url={url}
                options={options}
                isDisabled={IsDisabled}
                {...restCustom}
              />
            )}
          />
          <small className="text-danger">
            {errors[`${name}`] && errors[`${name}`]?.message}
          </small>
        </>
      )}
    </FormGroup>
  );
}

export default React.memo(CustomFormSelect);
