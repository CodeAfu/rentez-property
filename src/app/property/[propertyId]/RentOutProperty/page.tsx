"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/providers/toast-provider";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { withAuth } from "@/lib/auth";

const formSchema = z.object({
  monthlyIncome: z
    .number()
    .positive("Monthly income must be a positive number"),
  employerName: z
    .string()
    .min(2, "Employer name must be at least 2 characters")
    .optional()
    .or(z.literal("")),
  governmentIdType: z
    .string()
    .min(1, "Please select an ID type"),
  governmentIdNumber: z
    .string()
    .min(5, "Government ID number must be at least 5 characters")
    .max(50, "Government ID number is too long"),
  numberOfOccupants: z
    .number()
    .int("Number of occupants must be a whole number")
    .positive("Number of occupants must be at least 1")
    .optional()
    .nullable(),
  hasPets: z.boolean().optional().nullable(),
  petDetails: z
    .string()
    .max(500, "Pet details must be less than 500 characters")
    .optional()
    .or(z.literal("")),
});

type FormValues = z.infer<typeof formSchema>;

const ID_TYPES = ["NRIC", "Passport", "Driving License", "MyKad"];

interface PageProps {
  params: Promise<{ propertyId: string }>;
}

export default function RentOutPropertyPage({ params }: PageProps) {
  const [propertyId, setPropertyId] = useState<string>("");
  const [hasPetsChecked, setHasPetsChecked] = useState(false);
  
  const { toast } = useToast();
  const router = useRouter();

  const createPropertyMutation = useMutation({
    mutationFn: withAuth(async (payload: FormValues) => {
        console.log("API Payload:", payload);
        const response = await api.post("/api/ApplicantProfiles", payload);
        return response.data
    })
  })

  useEffect(() => {
    params.then((p) => setPropertyId(p.propertyId));
  }, [params]);

  const applyPropertyMutation = useMutation({
    mutationFn: withAuth(async (payload: FormValues) => {
      console.log("API Payload:", payload);
      const response = await api.post(
        `/api/Users/create-rent-profile`,
        payload
      );
      console.log("API Response:", response.data);
      return response.data;
    }),
    onSuccess: () => {
      toast({
        title: "Success!",
        message: "Your application has been submitted.",
      });
      router.push(`/property/${propertyId}`);
    },
    onError: (error) => {
      console.error("Submission Error:", error);
      if (axios.isAxiosError(error)) {
        toast({
          title: "Error",
          message:
            error?.response?.data?.message ||
            "Failed to submit application. Please try again.",
        });
      }
    },
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      monthlyIncome: 0,
      employerName: "",
      governmentIdType: "",
      governmentIdNumber: "",
      numberOfOccupants: null,
      hasPets: null,
      petDetails: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    const payload = {
      propertyId: propertyId,
      monthlyIncome: Number(data.monthlyIncome),
      employerName: data.employerName || "",
      governmentIdType: data.governmentIdType,
      governmentIdNumber: data.governmentIdNumber,
      numberOfOccupants: data.numberOfOccupants ? Number(data.numberOfOccupants) : null,
      hasPets: data.hasPets ?? false,
      petDetails: data.petDetails || "",
    };

    applyPropertyMutation.mutate(payload);
  };

  return (
    <div className="min-h-screen bg-muted/20 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="max-w-3xl mx-auto"
      >
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Property Application</CardTitle>
              <CardDescription>
                Fill in your details to apply for this property
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Monthly Income */}
              <div className="grid gap-2">
                <Label htmlFor="monthlyIncome">
                  Monthly Income (RM) <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="monthlyIncome"
                  type="number"
                  step="0.01"
                  placeholder="5000.00"
                  {...form.register("monthlyIncome", { valueAsNumber: true })}
                />
                {form.formState.errors.monthlyIncome && (
                  <p className="text-destructive text-sm">
                    {form.formState.errors.monthlyIncome.message}
                  </p>
                )}
              </div>

              {/* Employer Name */}
              <div className="grid gap-2">
                <Label htmlFor="employerName">Employer Name (Optional)</Label>
                <Input
                  id="employerName"
                  placeholder="e.g., ABC Corporation"
                  {...form.register("employerName")}
                />
                {form.formState.errors.employerName && (
                  <p className="text-destructive text-sm">
                    {form.formState.errors.employerName.message}
                  </p>
                )}
              </div>

              {/* Government ID Type */}
              <div className="grid gap-2">
                <Label htmlFor="governmentIdType">
                  Government ID Type <span className="text-destructive">*</span>
                </Label>
                <Select
                  value={form.watch("governmentIdType")}
                  onValueChange={(value) =>
                    form.setValue("governmentIdType", value)
                  }
                >
                  <SelectTrigger id="governmentIdType">
                    <SelectValue placeholder="Select ID type" />
                  </SelectTrigger>
                  <SelectContent>
                    {ID_TYPES.map((idType) => (
                      <SelectItem key={idType} value={idType}>
                        {idType}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {form.formState.errors.governmentIdType && (
                  <p className="text-destructive text-sm">
                    {form.formState.errors.governmentIdType.message}
                  </p>
                )}
              </div>

              {/* Government ID Number */}
              <div className="grid gap-2">
                <Label htmlFor="governmentIdNumber">
                  Government ID Number <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="governmentIdNumber"
                  placeholder="e.g., 123456-78-9012"
                  {...form.register("governmentIdNumber")}
                />
                {form.formState.errors.governmentIdNumber && (
                  <p className="text-destructive text-sm">
                    {form.formState.errors.governmentIdNumber.message}
                  </p>
                )}
              </div>

              {/* Number of Occupants */}
              <div className="grid gap-2">
                <Label htmlFor="numberOfOccupants">
                  Number of Occupants (Optional)
                </Label>
                <Input
                  id="numberOfOccupants"
                  type="number"
                  placeholder="2"
                  {...form.register("numberOfOccupants", {
                    setValueAs: (v) => (v === "" ? null : Number(v)),
                  })}
                />
                {form.formState.errors.numberOfOccupants && (
                  <p className="text-destructive text-sm">
                    {form.formState.errors.numberOfOccupants.message}
                  </p>
                )}
              </div>

              {/* Has Pets */}
              <div className="grid gap-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hasPets"
                    checked={hasPetsChecked}
                    onCheckedChange={(checked) => {
                      setHasPetsChecked(checked as boolean);
                      form.setValue("hasPets", checked as boolean);
                      if (!checked) {
                        form.setValue("petDetails", "");
                      }
                    }}
                  />
                  <Label htmlFor="hasPets" className="font-normal cursor-pointer">
                    I have pets
                  </Label>
                </div>
              </div>

              {/* Pet Details - Only shown if hasPets is true */}
              {hasPetsChecked && (
                <div className="grid gap-2">
                  <Label htmlFor="petDetails">Pet Details</Label>
                  <Textarea
                    id="petDetails"
                    placeholder="Please describe your pets (type, breed, size, etc.)"
                    className="resize-none min-h-24"
                    {...form.register("petDetails")}
                  />
                  {form.formState.errors.petDetails && (
                    <p className="text-destructive text-sm">
                      {form.formState.errors.petDetails.message}
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              type="submit"
              size="lg"
              className="w-full h-14 text-lg font-semibold shadow-md hover:shadow-lg transition-all"
              disabled={applyPropertyMutation.isPending}
            >
              {applyPropertyMutation.isPending ? "Submitting..." : "Submit Application"}
            </Button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
}
