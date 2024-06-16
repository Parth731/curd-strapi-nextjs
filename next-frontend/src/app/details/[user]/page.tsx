"use client";
import UserDetails from "@/components/UserDetails";
import { GetStudentDetails } from "@/services/userservices/userservices";
import { useParams } from "next/navigation";
import React from "react";

const SingleUserDetails = () => {
  const router: any = useParams();
  console.log(router);

  const user = {
    username: "JohnDoe",
    email: "john@example.com",
    rollno: "12345",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  };
  return (
    <div>
      <UserDetails user={router?.user} />
    </div>
  );
};

export default SingleUserDetails;
