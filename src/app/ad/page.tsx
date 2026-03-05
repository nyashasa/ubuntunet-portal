"use client";

import React, { useState, useRef, useCallback, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Progress from "@/components/Progress";
import { getRandomAd, PortalAd } from "@/lib/ads";
import { trackEvent } from "@/lib/events";

const FALLBACK_AD_URL = "/ads/Ad1.mp4";

const AdContent = () => {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);
  const animationFrameRef = useRef<number>(0);
  const hasTrackedView = useRef(false);

  const searchParams = useSearchParams();

  const tok = searchParams.get("tok");
  const redir = searchParams.get("redir");
  const origin = searchParams.get("origin");
  const clientIp = searchParams.get("clientip") || undefined;
  const clientMac = searchParams.get("clientmac") || undefined;
  const authUrl = `${origin}/nodogsplash_auth/?tok=${tok}&redir=${encodeURIComponent(
    redir || "http://ubuntu-net.vercel.app/"
  )}`;

  const [ad, setAd] = useState<PortalAd | null>(null);
  const [videoUrl, setVideoUrl] = useState<string>(FALLBACK_AD_URL);
  const [loading, setLoading] = useState(true);

  // Fetch a dynamic ad from Supabase on mount
  useEffect(() => {
    getRandomAd()
      .then((result) => {
        if (result) {
          setAd(result);
          setVideoUrl(result.assetUrl);
        }
      })
      .catch(() => {
        // Use fallback on error
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Track ad_view when video starts playing
  const handlePlay = useCallback(() => {
    if (ad && !hasTrackedView.current) {
      hasTrackedView.current = true;
      trackEvent({
        campaignId: ad.campaignId,
        creativeId: ad.creativeId,
        eventType: "ad_view",
        clientIp,
        clientMac,
      });
    }
  }, [ad, clientIp, clientMac]);

  const handleVideoEnd = useCallback(() => {
    router.push(authUrl);
  }, [router, authUrl]);

  const updateProgress = useCallback(() => {
    if (videoRef.current) {
      const currentTime = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      if (duration > 0) {
        const progressPercent = (currentTime / duration) * 100;
        setProgress(progressPercent);
      }
    }
    animationFrameRef.current = requestAnimationFrame(updateProgress);
  }, []);

  const handleTimeUpdate = useCallback(() => {
    if (!animationFrameRef.current) {
      animationFrameRef.current = requestAnimationFrame(updateProgress);
    }
  }, [updateProgress]);

  // Track ad_click when user taps the video
  const handleVideoClick = useCallback(() => {
    if (ad) {
      trackEvent({
        campaignId: ad.campaignId,
        creativeId: ad.creativeId,
        eventType: "ad_click",
        clientIp,
        clientMac,
      });
    }
  }, [ad, clientIp, clientMac]);

  if (loading) {
    return (
      <div className="bg-black h-screen w-screen text-white flex justify-center items-center">
        <div className="text-center">
          <p className="text-gray-400">Loading ad...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black h-screen w-screen text-white flex justify-center items-center">
      <video
        ref={videoRef}
        src={videoUrl}
        autoPlay
        muted
        controls={false}
        onPlay={handlePlay}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleVideoEnd}
        onClick={handleVideoClick}
        style={{
          width: "100%",
          height: "100%",
        }}
        className="object-contain"
      />

      <Progress value={progress} className="bottom-12" />
    </div>
  );
};

const AdPage = () => {
  return (
    <Suspense
      fallback={
        <div className="bg-black h-screen w-screen text-white flex justify-center items-center">
          <div>Loading...</div>
        </div>
      }
    >
      <AdContent />
    </Suspense>
  );
};

export default AdPage;
