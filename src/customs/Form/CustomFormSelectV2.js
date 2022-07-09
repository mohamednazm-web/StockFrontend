import React, { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { FormGroup, Label, Input } from 'reactstrap';
import classnames from 'classnames';
import { Controller, useWatch } from 'react-hook-form';
import Routes from '@Routes';
import CustomSelectV2 from 'components/CustomSelectV2';
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
              <CustomSelectV2
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
                  if (isMulti) {
                    onChange(val?.map((x) => x.value) ?? null);
                  } else {
                    onChange(val?.value ?? null);
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
