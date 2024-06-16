"use client";

import {
  DeleteStudentsById,
  GetAllStudentDetails,
} from "@/services/userservices/userservices";
import useGlobalStore from "@/store/useGlobalStore";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const MyTable = ({ studentData }: any) => {
  const router = useRouter();
  const params = useSearchParams();
  const isEdit = params.get("isEdit");

  const { setLoading } = useGlobalStore();

  const {
    status: getAllStudentDetailsStatus,
    data: getAllStudentDetailsData,
    isError: getAllStudentDetailsIsError,
    error: getAllStudentDetailsError,
    isLoading: getAllStudentDetailsIsLoading,
    refetch: getAllStudentDetailsRefetch,
  } = GetAllStudentDetails();

  const {
    mutate: deleteStudentMutation,
    data: deleteStudentData,
    isError: deleteStudentisError,
    error: deleteStudentError,
    isLoading: deleteStudentIsLoading,
  }: any = DeleteStudentsById();

  useEffect(() => {
    if (isEdit) {
      getAllStudentDetailsRefetch();
    }
  }, [getAllStudentDetailsData]);

  console.log(getAllStudentDetailsData);

  useEffect(() => {
    if (getAllStudentDetailsIsLoading) {
      setLoading(true);
    }
    return () => {
      setLoading(false);
    };
  }, []);

  const handlerDeleteUser = (item: any) => {
    console.log("delete user");
    deleteStudentMutation(item?.id);
    getAllStudentDetailsRefetch();
  };
  return (
    <>
      {getAllStudentDetailsData?.data?.length > 0 ? (
        <div className="min-h-screen bg-gray-900 flex justify-center items-center">
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left mb-2">Username</th>
                  <th className="px-4 py-2 text-left mb-2">Email</th>
                  <th className="px-4 py-2 text-left mb-2">Roll No</th>
                  <th className="px-4 py-2 text-left mb-2">Description</th>
                  <th className="px-4 py-2 mb-2"></th>
                  <th className="px-4 py-2 mb-2"></th>
                  <button
                    className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded mb-2"
                    onClick={() => router.push("/addandupdate")}
                  >
                    Add Student
                  </button>
                </tr>
              </thead>
              <tbody>
                {getAllStudentDetailsData?.data?.map((item: any) => {
                  return (
                    <>
                      <tr>
                        <td className="border px-4 py-2">
                          {item?.attributes?.username}
                        </td>
                        <td className="border px-4 py-2">
                          {item?.attributes?.email}
                        </td>
                        <td className="border px-4 py-2">
                          {item?.attributes?.rollno}
                        </td>
                        <td className="border px-4 py-2">
                          {item?.attributes?.description}
                        </td>
                        <td className="border px-4 py-2">
                          <button
                            className="bg-lime-500 hover:bg-lime-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() =>
                              router.push(`/details/${item?.attributes?.slug}`)
                            }
                          >
                            View
                          </button>
                        </td>
                        <td className="border px-4 py-2">
                          <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() =>
                              router.push(
                                `/addandupdate?isEdit=true&user=${item?.attributes?.slug}`
                              )
                            }
                          >
                            Edit
                          </button>
                        </td>
                        <td className="border px-4 py-2">
                          <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => handlerDeleteUser(item)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : getAllStudentDetailsIsLoading ? (
        <h1>Loading ....</h1>
      ) : (
        <>
          <h1>No data found</h1>
          <button
            className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded mb-2"
            onClick={() => router.push("/addandupdate")}
          >
            Add Student
          </button>
        </>
      )}
    </>
  );
};

export default MyTable;
