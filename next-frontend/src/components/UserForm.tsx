"use client";
import React, { useEffect } from "react";
import { ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import {
  CreateStudent,
  DeleteStudentsById,
  GetStudentDetails,
  UpdateStudentDetails,
} from "@/services/userservices/userservices";
import { toast } from "react-toastify";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import {
  showErrorToastMessage,
  showSuccessToastMessage,
} from "@/utils/toast.utils";

const UserForm = () => {
  const router = useRouter();
  const params = useSearchParams();
  const searchUser = params.get("user");
  const isEdit = params.get("isEdit");
  console.log(isEdit);
  const successCallback = () => {
    showSuccessToastMessage("Student created successfully");
  };

  const failureCallback = () => {
    showErrorToastMessage("Failed to create student");
  };

  const {
    mutate: createStudentMutation,
    data: createStudentData,
    isError: createStudentisError,
    error: createStudentError,
    isLoading: createStudentIsLoading,
  }: any = CreateStudent(successCallback, failureCallback);

  const {
    status: getSingleUserDetailsStatus,
    data: getSingleUserDetailsData,
    isError: getSingleUserDetailsIsError,
    error: getSingleUserDetailsError,
    isLoading: getSingleUserDetailsIsLoading,
    refetch: getSingleUserDetailsRefetch,
  } = GetStudentDetails(searchUser as string);

  const {
    mutate: updateStudentMutation,
    data: updateStudentData,
    isError: updateStudentisError,
    error: updateStudentError,
    isLoading: updateStudentIsLoading,
  }: any = UpdateStudentDetails();

  useEffect(() => {
    if (isEdit === "true") {
      getSingleUserDetailsRefetch();
    }
  }, []);

  console.log(getSingleUserDetailsData);

  const handleStudentSubmit = (values: any) => {
    console.log(values);
    if (isEdit) {
      const data = { ...values, id: getSingleUserDetailsData?.data?.id };
      updateStudentMutation(data);
      router.push("/");
    } else {
      console.log(values);
      const data = {
        username: values.username,
        email: values.email,
        rollno: values.rollno,
        description: values.description,
        slug: `${values.username}`,
      };
      createStudentMutation(data);
      router.push("/");
    }
  };

  const initialValues =
    isEdit === "true"
      ? {
          // username: getSingleUserDetailsData?.data?.attributes?.username,
          // email: getSingleUserDetailsData?.data?.attributes?.email,
          // rollno: getSingleUserDetailsData?.data?.attributes?.rollno,
          // description: getSingleUserDetailsData?.data?.attributes?.description,
          ...getSingleUserDetailsData?.data?.attributes,
        }
      : {
          username: "",
          email: "",
          rollno: "",
          description: "",
        };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    rollno: Yup.string().required("Roll No is required"),
    description: Yup.string().required("Description is required"),
  });

  const studentFormik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleStudentSubmit,
    enableReinitialize: true,
  });

  const {
    values,
    handleChange,
    handleSubmit,
    touched,
    errors,
    resetForm,
    isSubmitting,
    isValid,
  } = studentFormik;

  return (
    <div className="min-h-screen bg-gray-900 flex justify-center items-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-white text-center text-2xl font-bold mb-4">
          {isEdit === "true" ? "Edit User Form" : "Add User Form"}
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="block text-gray-400">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={values?.username}
              onChange={handleChange}
              className="block w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-4 text-white"
            />
            {touched?.username && errors?.username ? (
              <div className="text-red-500 mt-1">
                {errors?.username as string}
              </div>
            ) : null}
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-400">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={values?.email}
              onChange={handleChange}
              className="block w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-4 text-white"
            />
            {touched?.email && errors?.email ? (
              <div className="text-red-500 mt-1">{errors?.email as string}</div>
            ) : null}
          </div>
          <div>
            <label htmlFor="rollno" className="block text-gray-400">
              Roll No
            </label>
            <input
              type="number"
              id="rollno"
              name="rollno"
              value={values?.rollno}
              onChange={handleChange}
              className="block w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-4 text-white"
            />

            {touched?.rollno && errors?.rollno ? (
              <div className="text-red-500 mt-1">
                {errors?.rollno as string}
              </div>
            ) : null}
          </div>
          <div>
            <label htmlFor="description" className="block text-gray-400">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              value={values?.description}
              onChange={handleChange}
              className="block w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-4 text-white"
            />
            {touched?.description && errors?.description ? (
              <div className="text-red-500 mt-1">
                {errors?.description as string}
              </div>
            ) : null}
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            disabled={isSubmitting || !isValid}
          >
            {isEdit === "true" ? "Update" : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
