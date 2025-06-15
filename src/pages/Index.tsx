import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Flame, X, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface VotingData {
  totalVotes: number;
  timeLeft: {
    days: number;
    hours: number;
    minutes: number;
  };
  hasUserVoted: boolean;
}

interface ActionCounts {
  fire: number;
  fox: number;
  snake: number;
}

const Index = () => {
  const [votingData, setVotingData] = useState<VotingData>({
    totalVotes: 20000,
    timeLeft: { days: 3, hours: 5, minutes: 23 },
    hasUserVoted: false,
  });

  const [isVoting, setIsVoting] = useState(false);
  const [actionCounts, setActionCounts] = useState<ActionCounts>({
    fire: 0,
    fox: 0,
    snake: 0,
  });

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setVotingData((prev) => {
        const newMinutes = prev.timeLeft.minutes - 1;
        if (newMinutes >= 0) {
          return {
            ...prev,
            timeLeft: { ...prev.timeLeft, minutes: newMinutes },
          };
        }

        const newHours = prev.timeLeft.hours - 1;
        if (newHours >= 0) {
          return {
            ...prev,
            timeLeft: { ...prev.timeLeft, hours: newHours, minutes: 59 },
          };
        }

        const newDays = prev.timeLeft.days - 1;
        if (newDays >= 0) {
          return {
            ...prev,
            timeLeft: { days: newDays, hours: 23, minutes: 59 },
          };
        }

        return prev;
      });
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const formatTime = (time: {
    days: number;
    hours: number;
    minutes: number;
  }) => {
    return `${time.days}D:${time.hours}HRS`;
  };

  const formatVoteCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(0)}K`;
    }
    return count.toString();
  };

  const handleVote = async () => {
    if (votingData.hasUserVoted) return;

    setIsVoting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setVotingData((prev) => ({
      ...prev,
      totalVotes: prev.totalVotes + 1,
      hasUserVoted: true,
    }));

    setIsVoting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black p-4">
      <Card className="relative w-full max-w-md overflow-hidden border-0 bg-transparent">
        {/* Timer Badge */}
        <div className="absolute top-4 left-4 z-20">
          <Badge
            variant="secondary"
            className="bg-black/60 text-white border-0 backdrop-blur-sm px-3 py-1.5 text-sm font-medium"
          >
            <div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse" />
            {formatTime(votingData.timeLeft)}
          </Badge>
        </div>

        {/* Main Content */}
        <div className="relative h-96 rounded-xl overflow-hidden bg-gradient-to-r from-orange-400 via-orange-500 to-purple-600">
          {/* Character Images Background */}
          <div className="absolute inset-0 flex">
            {/* Naruto Side */}
            <div className="w-1/2 bg-gradient-to-br from-orange-400 to-orange-600 relative overflow-hidden">
              <div className="absolute inset-0 bg-black/20" />
              {/* Placeholder for Naruto character - in production you'd use actual images */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 bg-orange-300/30 rounded-full flex items-center justify-center">
                  <span className="text-4xl font-bold text-white/80">N</span>
                </div>
              </div>
            </div>

            {/* Sasuke Side */}
            <div className="w-1/2 bg-gradient-to-bl from-purple-500 to-purple-700 relative overflow-hidden">
              <div className="absolute inset-0 bg-black/20" />
              {/* Placeholder for Sasuke character - in production you'd use actual images */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 bg-purple-300/30 rounded-full flex items-center justify-center">
                  <span className="text-4xl font-bold text-white/80">S</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content Overlay with Background Image */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "url(https://cdn.builder.io/api/v1/image/assets%2F54e4d43a0d654fbdae086f8842e8cdda%2F9784f132a4bc49e6bec8341bdeb6add7)",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          />

          {/* Dark Overlay on top of background image */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Interactive Content Overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-6">
            {/* Bottom Content */}
            <div className="space-y-4">
              {/* Action Icons with Corner Badges */}
              <div className="flex justify-start gap-3 relative z-50 mb-2">
                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setActionCounts((prev) => ({
                        ...prev,
                        fire: prev.fire + 1,
                      }));
                      console.log("Fire clicked!");
                    }}
                    className="w-12 h-12 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/80 hover:scale-110 transition-all duration-200 active:scale-95 cursor-pointer border border-white/20"
                    title="Fire"
                  >
                    <span className="text-xl">🔥</span>
                  </button>
                  {actionCounts.fire > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                      {actionCounts.fire}
                    </span>
                  )}
                </div>

                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setActionCounts((prev) => ({
                        ...prev,
                        fox: prev.fox + 1,
                      }));
                      console.log("Fox clicked!");
                    }}
                    className="w-12 h-12 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/80 hover:scale-110 transition-all duration-200 active:scale-95 cursor-pointer border border-white/20"
                    title="Fox"
                  >
                    <span className="text-xl">🦊</span>
                  </button>
                  {actionCounts.fox > 0 && (
                    <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                      {actionCounts.fox}
                    </span>
                  )}
                </div>

                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setActionCounts((prev) => ({
                        ...prev,
                        snake: prev.snake + 1,
                      }));
                      console.log("Snake clicked!");
                    }}
                    className="w-12 h-12 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/80 hover:scale-110 transition-all duration-200 active:scale-95 cursor-pointer border border-white/20"
                    title="Snake"
                  >
                    <span className="text-xl">🐍</span>
                  </button>
                  {actionCounts.snake > 0 && (
                    <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                      {actionCounts.snake}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  Naruto Vs Sasuke
                </h1>
              </div>

              <div className="flex items-center justify-between">
                <Button
                  onClick={handleVote}
                  disabled={votingData.hasUserVoted || isVoting}
                  className={cn(
                    "bg-orange-600 hover:bg-orange-700 text-white border-0 px-6 py-3 rounded-full font-semibold text-base transition-all duration-200",
                    votingData.hasUserVoted &&
                      "bg-green-600 hover:bg-green-600",
                    isVoting && "opacity-70",
                  )}
                >
                  {isVoting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Voting...
                    </div>
                  ) : votingData.hasUserVoted ? (
                    "Voted!"
                  ) : (
                    <>
                      Cast Vote
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>

                <div className="flex items-center gap-2 text-white">
                  <div className="flex items-center gap-1">
                    <div className="w-6 h-4 bg-white/20 rounded-sm flex items-end gap-0.5 px-1">
                      <div className="w-1 h-1 bg-white rounded-full" />
                      <div className="w-1 h-2 bg-white rounded-full" />
                      <div className="w-1 h-3 bg-white rounded-full" />
                    </div>
                  </div>
                  <span className="text-lg font-semibold">
                    {formatVoteCount(votingData.totalVotes)} Vote
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Success Message */}
        {votingData.hasUserVoted && (
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center rounded-xl z-[60]">
            <div className="bg-white rounded-xl p-6 text-center max-w-xs mx-4 relative">
              {/* Close Button */}
              <button
                onClick={() =>
                  setVotingData((prev) => ({ ...prev, hasUserVoted: false }))
                }
                className="absolute -top-2 -right-2 w-8 h-8 bg-gray-800 hover:bg-gray-900 text-white rounded-full flex items-center justify-center transition-colors duration-200 z-10"
                title="Close"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Vote Cast Successfully!
              </h3>
              <p className="text-gray-600 text-sm">
                Thank you for participating in the battle!
              </p>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Index;
