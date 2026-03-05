import React from "react";
import RewardsCard from "../RewardsCard";
import BackgroundLogo from "@/components/icons/BackgroundLogo";

const RewardsPage = () => {
  return (
    <div
      className="h-screen w-screen text-white flex justify-center items-center"
      style={{
        background: "linear-gradient(180deg, #667EEA 0%, #764BA2 100%)",
      }}
    >
      <RewardsCard />
      <BackgroundLogo className="fixed -bottom-12 -right-72 sm:-bottom-16 sm:-right-36 w-3xl h-2/3" />
    </div>
  );
};

export default RewardsPage;
