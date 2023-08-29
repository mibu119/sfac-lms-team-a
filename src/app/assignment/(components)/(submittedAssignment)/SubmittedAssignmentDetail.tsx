"use client";
import React from "react";
import { User } from "@/types/firebase.types";
import { useGetSubmittedAssignment } from "@/hooks/reactQuery/submittedAssignment/useGetSubmittedAssignment";
import useGetFeedbacks from "@/hooks/reactQuery/feedback/useGetFeedbacks";
import LoadingSpinner from "@/components/Loading/Loading";
import SubmittedAssignmentContent from "./SubmittedAssignmentContent";
import Feedback from "../(feedback)/Feedback";

const SubmittedAssignmentDetail = ({
  docId,
  userData,
  handleModal,
}: {
  docId: string;
  userData: User;
  handleModal?: () => void;
}) => {
  const {
    data: submittedAssignmentData,
    isLoading: submittedAssignmentIsLoading,
    error: submittedAssignmentError,
  } = useGetSubmittedAssignment(docId);
  const { data: feedbackData, isLoading: feedbackIsLoading } =
    useGetFeedbacks(docId);

  if (submittedAssignmentIsLoading || feedbackIsLoading) {
    return <LoadingSpinner />;
  }

  console.log(submittedAssignmentData);

  return (
    <section className="mt-[22.92px]">
      <SubmittedAssignmentContent
        data={submittedAssignmentData}
        feedbackLength={feedbackData?.length}
        submittedAssignmentId={docId}
        handleModal={handleModal}
      />
      <Feedback data={feedbackData} docId={docId} userData={userData} />
    </section>
  );
};

export default SubmittedAssignmentDetail;
