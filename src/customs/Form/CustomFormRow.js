import React, { useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import {
  FormGroup,
  Label,
  Input,
  Button,
  Row,
  Col
} from 'reactstrap'
import classnames from 'classnames'
import { useFieldArray, Controller, useFormContext, useWatch } from 'react-hook-form';
import { Plus, Info, Trash2 } from 'react-feather';
import CustomFormInput from './CustomFormInput';
import { switchCase } from '@babel/types';
import CustomFormInputCheckbox from './CustomFormInputCheckbox';
import CustomFormNumberInput from './CustomFormNumberInput';
import CustomFormDateInput from './CustomFormDateInput';
import CustomFormSelect from './CustomFormSelect';

function CustomFormRow({ name, child, onEdit }) {
  const { control, register, getValues, setValue, errors, watch } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: name
  });
  const data = useWatch({ control, name: `${name}` })
  useEffect(() => {
    console.log(`${name}_data`, errors, data)
  }, [errors])
  return (
    <>
      <FormGroup>
        <Label>
          <FormattedMessage id={`${name}`} />
        </Label>
        {fields.map((x, index) => (
          <Row key={x.id}>
            {
              child.map(x => {
                switch (x.type) {
                  case 'input':
                    return (
                      <Col md={`${x.size}`}>
                        <CustomFormInput {...x} name={`${name}[${index}].${x.name}`} title={`${x.name}`} />
                      </Col>
                    )
                  case 'checkbox':
                    return (
                      <Col md={`${x.size}`}>
                        <CustomFormInputCheckbox {...x} name={`${name}[${index}].${x.name}`} title={`${x.name}`} />
                      </Col>
                    )
                  case 'number':
                    return (
                      <Col md={`${x.size}`}>
                        <CustomFormNumberInput {...x} name={`${name}[${index}].${x.name}`} title={`${x.name}`} />
                      </Col>
                    )
                  case 'date':
                    return (
                      <Col md={`${x.size}`}>
                        <CustomFormDateInput {...x} name={`${name}[${index}].${x.name}`} title={`${x.name}`} />
                      </Col>
                    )
                  case 'select':
                    // name, title, textName, url, options, isMulti, valueName
                    return (
                      <Col md={`${x.size}`}>
                        <CustomFormSelect {...x} name={`${name}[${index}].${x.name}`} title={`${x.name}`} />
                      </Col>
                    )
                  default: return (
                    <h1>type is undefind</h1>
                  )
                }
              })
            }
            {/* const here for delete row of array */}
            <input
              className="d-none"
              name={`$${name}[${index}].id`}
              defaultValue={x.id ?? 0}
              ref={register()}
            />
            <Col md={!!onEdit ? 2 : 1} className="text-right">
              {
                !!onEdit &&
                <Button.Ripple
                  className="btn-icon mr-1 mt-2"
                  color="flat-primary"
                  onClick={() => onEdit(x.id)}
                >
                  <Info size="15" />
                </Button.Ripple>
              }
              <Button.Ripple
                className="btn-icon mr-1 mt-2"
                color="flat-danger"
                onClick={() => {
                  // removedRows(currency.id);
                  remove(index);
                }}
              >
                <Trash2 size="15" />
              </Button.Ripple>
            </Col>
            <Col sm={12}>
              <hr />
            </Col>
          </Row>
        ))}
        <Row>
          <Col>
            <small className="text-danger d-block my-1">
              {errors[`${name}`] && errors[`${name}`].message}
              <ul>
                {Array.isArray(errors[`${name}`]) &&
                  errors[`${name}`].map((x) =>
                    Object.keys(x)?.map((e) => <li>{x[e].message}</li>)
                  )}
              </ul>
            </small>
            <Button.Ripple
              className="btn-icon"
              color="success"
              onClick={() => append({})}
            >
              <Plus size={14} />
            </Button.Ripple>
          </Col>
        </Row>
      </FormGroup>
    </>
  )
}

export default React.memo(CustomFormRow)
