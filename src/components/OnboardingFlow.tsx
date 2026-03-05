"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Logo from "./icons/Logo";
import OnboardingProgress from "./OnboardingProgress";
import RadioButton from "./RadioButton";
import BackgroundGradient from "./BackgroundGradient";
import Link from "next/link";
import { submitSurvey } from "@/lib/surveys";

type SurveyData = {
  reasonForConnecting?: string;
  uberWiFiPreference?: string;
};

const OnboardingFlowContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.toString();

  const [currentStep, setCurrentStep] = useState(0);
  const [surveyData, setSurveyData] = useState<SurveyData>({});
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalSteps = 3; // Welcome (0), Step 1 (1), Step 2 (2)

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      // Add animation when transitioning from welcome to first question
      if (currentStep === 0) {
        // Fade out welcome content
        setShowForm(true);
        // After fade out, change step and fade in form
        setTimeout(() => {
          setCurrentStep(1);
        }, 300);
      } else {
        setCurrentStep(currentStep + 1);
      }
    } else {
      // Submit survey data and proceed
      handleSubmit();
    }
  };

  const handleSkip = () => {
    // Skip to ad page
    router.push(`/ad?${query}`);
  };

  const handleSubmit = async () => {
    // Send survey data to Supabase
    setIsSubmitting(true);
    try {
      const clientip = searchParams.get("clientip") || "";
      const clientmac = searchParams.get("clientmac") || "";

      await submitSurvey({
        reasonForConnecting: surveyData.reasonForConnecting!,
        wifiPreference: surveyData.uberWiFiPreference!,
        clientIp: clientip,
        clientMac: clientmac,
      });
    } catch (error) {
      console.error("Failed to save survey data:", error);
      // Continue even if survey save fails
    } finally {
      setIsSubmitting(false);
    }
    // Proceed to ad page
    router.push(`/ad?${query}`);
  };

  const handleRadioChange = (field: keyof SurveyData, value: string) => {
    setSurveyData((prev) => ({ ...prev, [field]: value }));
  };

  const canProceed = () => {
    if (currentStep === 1) {
      return !!surveyData.reasonForConnecting;
    }
    if (currentStep === 2) {
      return !!surveyData.uberWiFiPreference;
    }
    return true;
  };

  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className=" bg-white flex flex-col items-center justify-center px-4 w-full">
      <BackgroundGradient />

      {/* Content */}
      <div className="h-screen z-10 w-full  ">
        {/* Main Content */}
        {/* Logo Header */}
        <div className="bg-[#F8F9FA] z-20 mt-5 rounded-2xl w-full  flex justify-center items-center shadow-lg px-6 py-3 ">
          <Logo width="160" height="92" />
        </div>
        <div className="flex justify-center items-center mt-10 sm:mt-28">
          <div className="w-full max-w-md flex flex-col justify-center ">
            <div className=" flex  flex-col justify-end ">
              {/* Greeting and Heading */}
              <div className="mb-6 text-left">
                {currentStep === 0 && (
                  <p className="text-sm text-gray-500 mb-2">{getGreeting()}.</p>
                )}
                <h1 className="text-4xl font-medium text-black mb-2">
                  Save your data
                </h1>
                <p className="text-xl text-black">connect for free.</p>
              </div>

              {/* Card */}
              <div className="bg-white rounded-3xl shadow-2xl p-6 mb-6 relative overflow-hidden">
                {currentStep === 0 && (
                  <div
                    className={`flex flex-col items-center gap-6 transition-all duration-300 ${
                      showForm
                        ? "opacity-0 scale-95 -translate-y-4"
                        : "opacity-100 scale-100 translate-y-0"
                    }`}
                  >
                    <p className="text-lg text-black text-center">
                      2 quick taps, then you&apos;re online.
                    </p>
                    <button
                      onClick={handleNext}
                      className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue to-purple text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
                    >
                      Let&apos;s connect
                    </button>
                    <button
                      onClick={handleSkip}
                      className="text-blue text-sm font-medium hover:underline"
                    >
                      Skip to Wifi
                    </button>
                  </div>
                )}

                {currentStep === 1 && (
                  <div className="flex flex-col gap-6 animate-[slideInUp_0.5s_ease-out]">
                    <OnboardingProgress currentStep={1} totalSteps={2} />
                    <h2 className="text-xl font-semibold text-black">
                      Why are you connecting?
                    </h2>
                    <div className="flex flex-col gap-3">
                      <RadioButton
                        id="reason-low-data"
                        label="Low on data"
                        value="low-on-data"
                        checked={
                          surveyData.reasonForConnecting === "low-on-data"
                        }
                        onChange={(value) =>
                          handleRadioChange("reasonForConnecting", value)
                        }
                      />
                      <RadioButton
                        id="reason-urgent"
                        label="Need to send something urgent"
                        value="urgent"
                        checked={surveyData.reasonForConnecting === "urgent"}
                        onChange={(value) =>
                          handleRadioChange("reasonForConnecting", value)
                        }
                      />
                      <RadioButton
                        id="reason-browse"
                        label="Want to browse/pass time"
                        value="browse"
                        checked={surveyData.reasonForConnecting === "browse"}
                        onChange={(value) =>
                          handleRadioChange("reasonForConnecting", value)
                        }
                      />
                      <RadioButton
                        id="reason-curious"
                        label="Just curious"
                        value="curious"
                        checked={surveyData.reasonForConnecting === "curious"}
                        onChange={(value) =>
                          handleRadioChange("reasonForConnecting", value)
                        }
                      />
                    </div>
                    <button
                      onClick={handleNext}
                      disabled={!canProceed()}
                      className={`w-full py-4 rounded-2xl font-semibold text-lg transition-all ${
                        canProceed()
                          ? "bg-gradient-to-r from-blue to-purple text-white shadow-lg hover:shadow-xl"
                          : "bg-white border-2 border-purple/30 text-purple/50 cursor-not-allowed"
                      }`}
                    >
                      Almost there
                    </button>
                    <button
                      onClick={handleSkip}
                      className="text-blue text-sm font-medium hover:underline text-center"
                    >
                      Skip to Wifi
                    </button>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <OnboardingProgress currentStep={2} totalSteps={2} />
                    <h2 className="text-xl font-semibold text-black">
                      Would you choose Ubers with free WiFi?
                    </h2>
                    <div className="flex flex-col gap-3">
                      <RadioButton
                        id="uber-definitely"
                        label="Definitely"
                        value="definitely"
                        checked={surveyData.uberWiFiPreference === "definitely"}
                        onChange={(value) =>
                          handleRadioChange("uberWiFiPreference", value)
                        }
                      />
                      <RadioButton
                        id="uber-maybe"
                        label="Maybe"
                        value="maybe"
                        checked={surveyData.uberWiFiPreference === "maybe"}
                        onChange={(value) =>
                          handleRadioChange("uberWiFiPreference", value)
                        }
                      />
                      <RadioButton
                        id="uber-doesnt-matter"
                        label="Doesn't matter to me"
                        value="doesnt-matter"
                        checked={
                          surveyData.uberWiFiPreference === "doesnt-matter"
                        }
                        onChange={(value) =>
                          handleRadioChange("uberWiFiPreference", value)
                        }
                      />
                    </div>
                    <button
                      onClick={handleNext}
                      disabled={!canProceed() || isSubmitting}
                      className={`w-full py-4 rounded-2xl font-semibold text-lg transition-all ${
                        canProceed()
                          ? "bg-gradient-to-r from-blue to-purple text-white shadow-lg hover:shadow-xl"
                          : "bg-white border-2 border-purple/30 text-purple/50 cursor-not-allowed"
                      } ${isSubmitting ? "opacity-50 disabled:cursor-not-allowed cursor-not-allowed" : ""}`}
                    >
                      Start browsing
                    </button>
                    <button
                      onClick={handleSkip}
                      className="text-blue text-sm font-medium hover:underline text-center"
                    >
                      Skip to Wifi
                    </button>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="text-center space-y-2 text-white">
                <div className="text-sm ">✓ Secure ✓ Private ✓ No spam</div>
                <Link
                  href="/terms-and-conditions"
                  className="text-sm font-medium hover:underline"
                >
                  Terms and Conditions
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const OnboardingFlow = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-b from-white via-purple/10 to-purple/30 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      }
    >
      <OnboardingFlowContent />
    </Suspense>
  );
};

export default OnboardingFlow;
