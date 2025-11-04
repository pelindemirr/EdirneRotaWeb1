"use client";
import React from "react";
import { Brain, Lock, Sparkles } from "lucide-react";
import HowItWorks from "@/components/HowItWorks";
import Link from "next/link";
import Header from "@/components/layout/Header";

export default function GuestPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white px-6 text-center">
      <Header />
      <div className="flex flex-col justify-center items-center flex-1">
        {/* HowItWorks componenti */}
        <div className="w-full">
          <HowItWorks />
        </div>
      </div>
    </div>
  );
}
