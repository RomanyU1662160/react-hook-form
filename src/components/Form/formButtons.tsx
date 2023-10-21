import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

type Button = {
  id: number;
  name: string;
};
const buttons = [
  { id: 1, name: "I don't want to claim" },
  { id: 2, name: "I don't have time" },
  { id: 3, name: "I don't have the right documents" },
  { id: 4, name: "I will wait for a decision" },
];

type formValues = {
  buttons: Button[];
  reason: string;
};
const defaults: formValues = {
  buttons: buttons,
  reason: "",
};

const FormButtons = () => {
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<formValues>({
    mode: "onChange",
    defaultValues: defaults,
  });

  const onSubmit = (data: formValues) => {
    console.log("data", data);
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: "buttons",
  });

  return (
    <>
      <h3 className=" text-primary text-center">
        Please tell us why you don't want to claim{" "}
      </h3>
      <p className="text-danger"> {errors.reason?.message} </p>
      <form onSubmit={handleSubmit(() => onSubmit)} noValidate>
        <div className="col-md-6 offset-md-3">
          <div className="row">
            {/* {buttons.map((btn, index) => {
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
            {fields.map((btn, index) => {
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
            })}
          </div>
          <div className="row">
            <button type="submit" className="btn btn-info btn-block btn-lg m-3">
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
