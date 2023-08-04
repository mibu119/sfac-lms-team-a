import React from "react";
import { CreateLecture } from "./CreateLecture";

interface Props {
  setLecture: React.Dispatch<React.SetStateAction<CreateLecture>>;
}

export default function LecturePrivate({ setLecture }: Props) {
  const togglePrivate = () => {
    setLecture(prev => {
      return { ...prev, isPrivate: !prev.isPrivate };
    });
  };

  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <span className="text-[14px] font-bold">강의공개</span>
      <input
        type="checkbox"
        value=""
        className="sr-only peer"
        onChange={togglePrivate}
      />
      <div
        className="
        w-[48px] 
        h-[24px] 
        rounded-full
        ml-[12px]
        dark:bg-grayscale-10
        after:content-['']
        after:absolute
        after:top-[8px]
        after:left-[64px]
        after:bg-grayscale-30
        after:rounded-full
        after:h-[18px]
        after:w-[18px]
        after:transition-all
        peer-checked:after:translate-x-[120%]
        peer-checked:after:bg-white
        peer-checked:bg-primary-100"
      ></div>
    </label>
  );
}
