import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';

type Button = {
  id: number;
  name: string;
};
const buttons: Button[] = [
  { id: 1, name: "I don't want to claim" },
  { id: 2, name: "I don't have time" },
  { id: 3, name: "I don't have the right documents" },
  { id: 4, name: 'I will wait for a decision' },
];

type formValues = {
  //   buttons: Button[];
  reason: string;
  customReason?: string;
};
const defaults: formValues = {
  //   buttons: buttons,
  reason: '',
  customReason: '',
};

const FormButtons = () => {
  const [showText, setShowText] = useState(false);
  const {
    control,
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<formValues>({
    mode: 'onChange',
    defaultValues: defaults,
  });

  const onSubmit = (data: formValues) => {
    console.log('data', data);
  };

  const handleSetReason = (btn: Button) => {
    console.log('e.target.value', btn.name);
    if (btn.name === 'something Else') {
      setShowText(true);
    } else {
      setShowText(false);
    }
    setValue('reason', btn.name);
  };

  //   const { fields, append, remove } = useFieldArray({
  //     control,
  //     name: "buttons",
  //   });
  const watchedReason = watch('reason');
  return (
    <>
      <h3 className=' text-primary text-center'>
        Please tell us why you don't want to claim
      </h3>
      {watchedReason}
      <p className='text-danger'> {errors.reason?.message} </p>
      <form onSubmit={handleSubmit(() => onSubmit)} noValidate>
        <div className='col-md-6 offset-md-3'>
          <div className='row'>
            {buttons.map((btn, index) => {
              return (
                <button
                  className='btn btn-secondary text-warning btn-lg btn-block m-3'
                  key={index}
                  type='button'
                  onClick={() => {
                    setValue('customReason', '', {
                      shouldValidate: true,
                      shouldDirty: true,
                    });
                    handleSetReason(btn);
                  }}
                  {...register('reason', {
                    required: {
                      value: showText ? true : false,
                      message: showText ? 'Please select a reason' : 'nothing',
                    },
                  })}
                >
                  {btn.name}
                </button>
              );
            })}
            <button
              className='btn btn-secondary text-warning btn-lg btn-block m-3'
              key={'something Else'}
              type='button'
              onClick={() => {
                setShowText(!showText);
                setValue('reason', '', {
                  shouldValidate: false,
                  shouldDirty: true,
                });
              }}
              {...register('reason', {
                required: {
                  value: showText ? true : false,
                  message: 'Please select a reason',
                },
              })}
            >
              Something Else
            </button>

            {showText && (
              <div className='form-group'>
                <p className='text-danger'> {errors.customReason?.message} </p>
                <label htmlFor='custom-reason'>
                  Please tell us why you don't want to claim
                </label>
                <textarea
                  className='form-control'
                  id='custom-reason'
                  rows={3}
                  {...register('customReason', {
                    required: 'Please select custom reason',
                  })}
                ></textarea>
              </div>
            )}
            {/* {fields.map((btn, index) => {
              return (
                <button
                  className="btn btn-secondary text-warning btn-lg btn-block m-3"
                  key={index}
                  type="button"
                  onClick={() => {
                    setValue("reason", btn.name);
                  }}
                  {...register("reason", {
                    required: "Please select a reason",
                  })}
                >
                  {btn.name}
                </button>
              );
            })} */}
          </div>
          <div className='row'>
            <button type='submit' className='btn btn-info btn-block btn-lg m-3'>
              Submit
            </button>
          </div>
        </div>
      </form>
      <DevTool control={control} />
    </>
  );
};

export default FormButtons;
