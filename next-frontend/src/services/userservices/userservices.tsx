"use client";
import { queryClient } from "@/utils/ReactQueryProvider";
import { apiendpoints } from "@/utils/api-endpoints.constants";
import axiosInstance from "@/utils/axiosInstance";
import { queryKeys } from "@/utils/react-query-keys.constants";
import {
  showErrorToastMessage,
  showSuccessToastMessage,
} from "@/utils/toast.utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

export const GetAllStudentDetails = () => {
  //   return useQuery([queryKeys.getSingleUserDetails], async () => {
  //     const { data } = await axiosInstance.get(
  //       `${process.env.NEXT_PUBLIC_API_URL}${apiendpoints.getSingleUserDetails}`
  //     );
  //     console.log("data", data);
  //     return data;
  //   });

  return useQuery({
    queryKey: [queryKeys.getAllStudentDetails],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        `${process.env.NEXT_PUBLIC_API_URL}${apiendpoints.getAllStudentDetails}`
      );
      console.log("data", data);
      return data;
    },
    // enabled: false,
  });
};

export const GetStudentDetails = (user: string) => {
  return useQuery({
    queryKey: [queryKeys.getStudentDetails, user],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        `${process.env.NEXT_PUBLIC_API_URL}${apiendpoints.getStudentDetails(
          user
        )}`
      );
      console.log("data", data);
      return data;
    },
    // enabled: false,
  });
};

export const CreateStudent = (
  successCallback: () => void,
  failureCallback: () => void
) => {
  return useMutation({
    mutationKey: [queryKeys.createStudent],
    mutationFn: async (data: any) => {
      console.log(data);
      const response = await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_API_URL}${apiendpoints.createStudent}`,
        {
          data,
        }
      );
      return response;
    },
    onSuccess(data, variables, context) {
      console.log(data);
      successCallback();
    },
    onError(error, variables, context) {
      console.log(error);
      failureCallback();
    },
  });
};

export const UpdateStudentDetails = () => {
  return useMutation({
    mutationKey: [queryKeys.updateStudentDetails],
    mutationFn: async (data: any) => {
      console.log(data);
      const response = await axiosInstance.put(
        `${process.env.NEXT_PUBLIC_API_URL}${apiendpoints.updateStudentDetails(
          data?.id
        )}`,
        {
          data,
        }
      );
      return response;
    },
    onSuccess(data, variables, context) {
      showSuccessToastMessage("Student updated successfully");
      queryClient.invalidateQueries({
        queryKey: [queryKeys.getAllStudentDetails],
      });
    },
    onError(error, variables, context) {
      showErrorToastMessage("Failed to update student");
    },
  });
};

export const DeleteStudentsById = () => {
  return useMutation({
    mutationKey: [queryKeys.createStudent],
    mutationFn: async (id: any) => {
      console.log(id);
      const response = await axiosInstance.delete(
        `${process.env.NEXT_PUBLIC_API_URL}${apiendpoints.deleteStudent(id)}`
      );
      return response;
    },
    onSuccess(data, variables, context) {
      showSuccessToastMessage("Student deleted successfully");
      queryClient.invalidateQueries({
        queryKey: [queryKeys.getAllStudentDetails],
      });
    },
    onError(error, variables, context) {
      showErrorToastMessage("Failed to delete student");
    },
  });
};
