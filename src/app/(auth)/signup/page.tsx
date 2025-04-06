"use client";
import { useEffect, useState } from "react";
import FirstPage from "./FirstPage";
import SecondPage from "./SecondPage";

export default function SignUp() {
  const [currentStep, setCurrentStep] = useState(0);
  const FormSteps = [FirstPage, SecondPage][currentStep];

  useEffect(() => {
    setCurrentStep(Number(0));
  }, []);

  return (
    <div
      className="w-[50%] cursor-default h-screen flex items-center justify-center"
      key={currentStep}
    >
      <FormSteps currentStep={currentStep} setCurrentStep={setCurrentStep} />
    </div>
  );
}