import React from "react";

type OnboardingProgressProps = {
  currentStep: number;
  totalSteps: number;
};

const OnboardingProgress = ({
  currentStep,
  totalSteps,
}: OnboardingProgressProps) => {
  return (
    <div className="flex gap-2 mb-6">
      {Array.from({ length: totalSteps }).map((_, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber <= currentStep;
        const isCurrent = stepNumber === currentStep;
        const isCompleted = stepNumber < currentStep;

        return (
          <div
            key={stepNumber}
            className={`h-1 rounded-full transition-all flex-1 ${
              isCurrent
                ? "bg-purple"
                : isCompleted
                  ? "bg-purple/60"
                  : "bg-purple/20"
            }`}
          />
        );
      })}
    </div>
  );
};

export default OnboardingProgress;

