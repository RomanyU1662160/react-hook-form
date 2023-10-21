import React, { ReactElement, memo } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

type FormValues = {
  name: string;
  email: string;
  channel: string;
  social: {
    facebook: string;
    twitter: string;
  };
  contactNumbers: {
    number: string;
  }[];
  address: {
    street: string;
    city: string;
    postcode: string;
  };
};

const onSubmit = (values: FormValues) => {
  console.log("values", values);
};

const defaults: FormValues = {
  name: "",
  email: "",
  channel: "",
  social: {
    facebook: "",
    twitter: "",
  },
  address: {
    street: "",
    city: "",
    postcode: "",
  },
  contactNumbers: [{ number: "" }],
};

const YoutubeForm = (): ReactElement => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    formState,
  } = useForm<FormValues>({
    mode: "onChange",
    defaultValues: defaults,
  });

  // for dynamic fields we use useFieldArray, useFieldArray is a custom hook that returns an object with the fields, append, prepend, remove, insert, swap, move, and replace methods to update the fields array.
  const {
    fields: contactFields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "contactNumbers",
  });

  console.log("errors:>>", formState.errors);
  return (
    <>
      <form
        className="col-md-8 offset-md-2"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className="form-group">
          <label htmlFor="name"> Name </label>

          <input
            type="text"
            id="name"
            className="form-control"
            {...register("name", {
              required: "Name is required",
              validate: (value) => value !== "admin" || "Nice try!",
            })}
          />
          <p className="text-danger"> {errors?.name?.message} </p>
        </div>
        <div className="form-group">
          <label htmlFor="email"> Email </label>
          <input
            type="email"
            id="email"
            className="form-control"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
              validate: {
                validate1: (value) =>
                  value !== "admin@test.com" ||
                  "Nice try!- can't use admin.com",
                validate2: (value) =>
                  value !== "test@test.com" || "Nice try!- can't use test.com",
              },
            })}
          />
          <button
            type="button"
            className="btn btn-default"
            onClick={() => trigger("email")}
          >
            Trigger Email validation
          </button>
          <p className="text-danger"> {errors?.email?.message} </p>
        </div>
        <div className="form-group">
          <label htmlFor="channel"> Channel </label>
          <input
            type="text"
            id="channel"
            className="form-control"
            {...register("channel", {
              required: "Channel is required",
            })}
          />
          <p className="text-danger"> {errors?.channel?.message} </p>
        </div>

        {/* Address */}
        <h4 className="text-info text-left mt-3"> Address</h4>
        <div className="form-control">
          <div className="row ">
            <div className="form-group">
              <label htmlFor="street"> Street </label>
              <input
                type="text"
                id="street"
                className="form-control"
                {...register("address.street", {
                  required: "street is required",
                })}
              />
              <p className="text-danger">{errors?.address?.street?.message} </p>
            </div>
            <div className="col">
              <label htmlFor="city"> City </label>
              <input
                type="text"
                id="city"
                className="form-control"
                {...register("address.city", {
                  required: "city is required",
                })}
              />
              <p className="text-danger"> {errors?.address?.city?.message} </p>
            </div>
            <div className="col">
              <label htmlFor="postcode"> Postcode </label>
              <input
                type="text"
                id="postcode"
                className="form-control"
                {...register("address.postcode", {
                  required: "postcode is required",
                })}
              />
              <p className="text-danger"> {errors?.address?.city?.message} </p>
            </div>
          </div>
        </div>
        {/* socials */}
        <h4 className="text-info text-left mt-3"> Socials</h4>
        <div className="form-control">
          <div className="row">
            <div className="col">
              <label htmlFor="facebook"> FaceBook </label>

              <input
                type="text"
                id="facebook"
                className="form-control"
                {...register("social.facebook", {
                  required: false,
                  validate: (value) =>
                    value !== "Mark Zuckerberg" ||
                    "Nice try!- you are not the owner of Facebook",
                })}
              />
              <p className="text-danger">
                {" "}
                {errors?.social?.facebook?.message}{" "}
              </p>
            </div>
            <div className="col">
              <label htmlFor="twitter"> Twitter </label>

              <input
                type="text"
                id="twitter"
                className="form-control"
                {...register("social.twitter", {
                  required: false,
                  validate: (value) =>
                    value !== "Elon Musk" ||
                    "Nice try!- you are not the owner of Twitter",
                })}
              />
              <p className="text-danger">
                {" "}
                {errors?.social?.twitter?.message}{" "}
              </p>
            </div>
          </div>
        </div>

        {/* Contacts */}
        <h4 className="text-info text-left mt-3"> Contacts</h4>
        <div className="form-control">
          <div className="row">
            <div className="col">
              {contactFields.map((field, index) => {
                return (
                  <>
                    <label htmlFor="mobile"> Contact number {index + 1} </label>
                    <input
                      key={field.id}
                      type="text"
                      id={field.id}
                      className="form-control"
                      {...register(`contactNumbers.${index}.number`, {
                        required: "Please add a contact number",
                        validate: (value) =>
                          value !== "0123456789" ||
                          "Nice try!- This is not a valid mobile number",
                      })}
                    />

                    {index !== 0 && (
                      <div>
                        <button
                          type="button"
                          className=" btn btn-sm btn-danger m-2"
                          onClick={() => remove(index)}
                        >
                          remove
                        </button>
                      </div>
                    )}
                    <p className="text-danger">
                      {errors?.contactNumbers?.[index]?.number?.message ?? ""}
                    </p>
                  </>
                );
              })}
            </div>
            <div className="row">
              <div className="col">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    append({ number: "" });
                  }}
                >
                  Add new number
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <button
            type="submit"
            className="btn btn-primary btn-lg btn-block mt-3"
          >
            Submit
          </button>
        </div>
      </form>

      <DevTool control={control} />
    </>
  );
};

const MemoizedYoutubeForm = memo(YoutubeForm);
export default MemoizedYoutubeForm;
