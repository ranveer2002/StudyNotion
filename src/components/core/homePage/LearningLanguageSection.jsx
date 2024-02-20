import React from "react";
import HighlightText from "./HighlightText";
import CTAButton from "./Button";
import know_your_progress from "../../../assets/Images/Know_your_progress.png";
import compare_with_others from "../../../assets/Images/Compare_with_others.png";
import plan_your_lesson from "../../../assets/Images/Plan_your_lessons.png";

const LearningLanguageSection = () => {
  return (
    <div>
      <div className="flex flex-col items-center gap-6 mt-24">

        <div className="text-4xl font-semibold text-center">
          Your Swiss knife for
          <HighlightText text={"Learning any Language"} />
        </div>

        <div className="text-center mx-auto text-base text-richblack-600 font-medium w-[70%]">
          Using spin making learning multiple languages easy. with 20+ languages
          realistic voice-over, progress tracking, custom schedule and more.
        </div>

        <div className="flex flex-row items-center justify-center mt-10">
            <img src={know_your_progress} alt="know_your_progress" className="object-contain ml-16 -mr-28"/>  
            <img src={compare_with_others} alt="compare_with_others" className="object-contain -mr-36"/>  
            <img src={plan_your_lesson} alt="plan_your_lesson"/>  
        </div>

        <div className="w-fit mb-10">
            <CTAButton active={true} linkTo={"/signup"}>
                <div>
                   Learn more
                </div>
            </CTAButton>
        </div>
      </div>
    </div>
  );
};

export default LearningLanguageSection;
