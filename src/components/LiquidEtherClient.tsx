"use client";

import React from "react";
import LiquidEther from "./LiquidEther";

type Props = {
  className?: string;
  colors?: string[];
  autoDemo?: boolean;
  autoSpeed?: number;
  autoIntensity?: number;
  cursorSize?: number;
  [k: string]: unknown;
};

export default function LiquidEtherClient(props: Props) {
  return <LiquidEther {...props} />;
}