"use client";
import Button from "@/components/Button";

import React, { Suspense } from "react";
import InfoCard from "./InfoCard";
import { useRouter, useSearchParams } from "next/navigation";

const WelcomeCardContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.toString();

  return (
    <InfoCard>
      <div className="flex flex-col gap-3 justify-center items-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-green">
          Welcome aboard! 🎉
        </h1>
        <p className="text-xl text-gray-500">Your ride just got better with</p>
        <h1 className="text-xl font-extrabold text-purple">
          FREE UNLIMITED WIFI
        </h1>
        <Button onClick={() => router.push(`/ad?${query}`)}>
          UNLOCK Wifi NOW
        </Button>
      </div>
    </InfoCard>
  );
};

const WelcomeCard = () => {
  return (
    <Suspense
      fallback={
        <InfoCard>
          <div className="flex flex-col gap-3 justify-center items-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-green">
              Welcome aboard! 🎉
            </h1>
            <p className="text-xl text-gray-500">
              Your ride just got better with
            </p>
            <h1 className="text-xl font-extrabold text-purple">
              FREE UNLIMITED WIFI
            </h1>
            <Button disabled>Loading...</Button>
          </div>
        </InfoCard>
      }
    >
      <WelcomeCardContent />
    </Suspense>
  );
};

export default WelcomeCard;
