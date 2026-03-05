import Button from "@/components/Button";
import React from "react";
import InfoCard from "./InfoCard";

const RewardsCard = () => {
  return (
    <InfoCard>
      <div className="flex flex-col gap-4 justify-center items-center">
        <h1 className="text-2xl sm:text-3xl font-semibold text-green">
          🎉 YOU&apos;RE CONNECTED! 🎉
        </h1>
        <h1 className="text-xl font-bold text-purple">
          Enjoy UNLIMITED high-speed WiFi
        </h1>
        <p className="text-xl text-gray-500">Thanks for watching! 🙏</p>

        <div className="flex gap-4 flex-col sm:flex-row">
          <Button>Claim reward</Button>
          <Button variant="outline">Stay browsing</Button>
        </div>
      </div>
    </InfoCard>
  );
};

export default RewardsCard;
