"use client";

import { useEffect, useState } from "react";
import PropertyApplicants from "../_components/property-applicants";
import LoadingSpinner from "@/components/loading-spinner";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";

interface PageProps {
  params: Promise<{ propertyId: string }>;
}

export default function PropertyApplicantsPage({ params }: PageProps) {
  const [propertyId, setPropertyId] = useState<string>("");

  useEffect(() => {
    params.then((p) => setPropertyId(p.propertyId));
  }, [params]);

  if (!propertyId) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-muted/20 py-8 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="max-w-5xl mx-auto"
      >
        <div className="mb-6">
          <Button variant="ghost" asChild className="mb-4">
            <Link href={`/property/${propertyId}`}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Property
            </Link>
          </Button>
        </div>

        <PropertyApplicants propertyId={propertyId} />
      </motion.div>
    </div>
  );
}
