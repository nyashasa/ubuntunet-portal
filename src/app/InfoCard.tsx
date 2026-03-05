import Logo from "@/components/icons/Logo";
import Link from "next/link";
import React from "react";

const InfoCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-[90%] text-center sm:w-[550px] h-4/5 sm:h-[500px] z-10 bg-white shadow-2xl p-6 flex flex-col gap-4  justify-between items-center">
      <Logo />
      {children}

      <div className="flex flex-col gap-2 text-gray justify-center items-center">
        <div className="flex flex-col gap-0 text-xs justify-center items-center">
          <span>By clicking Connect you agree to the </span>
          <Link href="/terms-and-conditions" className="text-orange underline">
            Terms and Conditions
          </Link>
        </div>
        <span>
          Powered By <span className="font-bold">UbuntuNet</span>
        </span>
      </div>
    </div>
  );
};

export default InfoCard;
