"use client";
import { GetStudentDetails } from "@/services/userservices/userservices";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const UserDetails = ({ user }: any) => {
  const router = useRouter();

  const {
    status: getSingleUserDetailsStatus,
    data: getSingleUserDetailsData,
    isError: getSingleUserDetailsIsError,
    error: getSingleUserDetailsError,
    isLoading: getSingleUserDetailsIsLoading,
    refetch: getSingleUserDetailsRefetch,
  } = GetStudentDetails(user);

  useEffect(() => {
    getSingleUserDetailsRefetch();
  }, []);

  console.log(getSingleUserDetailsData);
  return (
    <div className="min-h-screen bg-gray-900 flex justify-center items-center">
      {getSingleUserDetailsData?.data !== null ? (
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
          <h2
            className="text-xs font-bold mb-4 cursor-pointer"
            onClick={() => router.back()}
          >
            Go Back
          </h2>
          <div className="text-white text-center">
            <h2 className="text-2xl font-bold mb-4">User Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 sm:col-span-1">
                <p className="text-gray-400">Username:</p>
                <p className="text-xl font-semibold">
                  {getSingleUserDetailsData?.data?.attributes?.username}
                </p>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <p className="text-gray-400">Email:</p>
                <p className="text-xl font-semibold">
                  {getSingleUserDetailsData?.data?.attributes?.email}
                </p>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <p className="text-gray-400">Roll No:</p>
                <p className="text-xl font-semibold">
                  {getSingleUserDetailsData?.data?.attributes?.rollno}
                </p>
              </div>
              <div className="col-span-2">
                <p className="text-gray-400">Description:</p>
                <p className="text-xl font-semibold">
                  {getSingleUserDetailsData?.data?.attributes?.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : getSingleUserDetailsIsLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <h1>No Data Found</h1>
        </>
      )}
    </div>
  );
};

export default UserDetails;
