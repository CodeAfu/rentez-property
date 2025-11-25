"use client";

import React from "react";

interface PropertyDetailsProps {
  id: string;
}

export default function PropertyDetails({ id }: PropertyDetailsProps) {
  return (
    <div className="mx-auto container mt-4">
      <div>{id}</div>
    </div>
  );
}
