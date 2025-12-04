"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "motion/react";
import { Upload, X } from "lucide-react";
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
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/providers/toast-provider";
import { MALAYSIAN_STATES, ROOM_TYPES } from "@/lib/consts";
import { useAuth } from "@/providers/auth-provider";
import { useRouter, usePathname } from "next/navigation";
import LoadingSpinner from "@/components/loading-spinner";
import api from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { withAuth } from "@/lib/auth";

const formSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters")
    .max(100, "Title must be less than 100 characters"),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters")
    .max(1000, "Description must be less than 1000 characters"),
  rent: z.number().positive("Rent must be positive"),
  state: z.string().min(1, "Please select a state"),
  city: z.string().min(2, "City is required").max(50, "City name is too long"),
  address: z
    .string()
    .min(10, "Address must be at least 10 characters")
    .max(200, "Address is too long"),
  depositRequired: z.number().nullable(),
  billsIncluded: z.object({
    wifi: z.boolean().nullable(),
    electricity: z.boolean().nullable(),
    water: z.boolean().nullable(),
    gas: z.boolean().nullable(),
  }),
  roomType: z.array(z.string()).min(1, "Select at least one room type"),
  preferredRaces: z.array(z.string()),
  preferredOccupation: z.array(z.string()),
  leaseTermCategory: z
    .array(z.string())
    .min(1, "Select at least one lease term"),
});

type FormValues = z.infer<typeof formSchema>;

const races = ["Malay", "Chinese", "Indian", "Others", "Any"];
const occupations = ["Student", "Working Professional", "Any"];
const leaseTerms = ["Short Term", "Long Term", "Flexible"];

export default function CreateListing() {
  const [, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const { isAuthenticating, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();

  const createPropertyMutation = useMutation({
    mutationFn: withAuth(async (payload: FormValues) => {
      console.log("API Payload:", payload);
      const response = await api.post("/api/Property", payload);
      console.log("API Response:", response.data);
      return response.data;
    }),
    onSuccess: () => {
      toast({
        title: "Success!",
        message: "Your property listing has been created.",
      });
      router.push("/dashboard");
    },
    onError: (error) => {
      console.error("Submission Error:", error);
      if (axios.isAxiosError(error)) {
        toast({
          title: "Error",
          message:
            error?.response?.data?.message ||
            "Failed to create listing. Please try again.",
        });
      }
    },
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      rent: 0,
      state: "",
      city: "",
      address: "",
      depositRequired: null,
      billsIncluded: {
        wifi: null,
        electricity: null,
        water: null,
        gas: null,
      },
      roomType: [],
      preferredRaces: [],
      preferredOccupation: [],
      leaseTermCategory: [],
    },
  });

  // Auth Logic
  useEffect(() => {
    if (!isAuthenticating && !isAuthenticated) {
      router.push(`/auth/login?redirectTo=${encodeURIComponent(pathname)}`);
    }
  }, [isAuthenticated, isAuthenticating, router, pathname]);

  const handleImageUpload = (files: FileList | null) => {
    if (!files) return;

    const fileArray = Array.from(files);
    const validImages = fileArray.filter((file) =>
      file.type.startsWith("image/"),
    );

    if (validImages.length !== fileArray.length) {
      toast({
        title: "Invalid files",
        message: "Only image files are allowed",
      });
      return;
    }

    setImages((prev) => [...prev, ...validImages]);

    validImages.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = () => setIsDragging(false);
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleImageUpload(e.dataTransfer.files);
  };

  const onSubmit = (data: FormValues) => {
    console.log("Form Data:", data);
    const payload = {
      title: data.title,
      description: data.description,
      address: data.address,
      city: data.city,
      state: data.state,
      rent: Number(data.rent), // Ensure number
      // Send Base64 strings array
      images: imagePreviews,

      // Handle deposit (ensure null if 0 or empty, or send number)
      depositRequired: data.depositRequired
        ? Number(data.depositRequired)
        : null,

      billsIncluded: {
        wifi: data.billsIncluded.wifi ?? false,
        electricity: data.billsIncluded.electricity ?? false,
        water: data.billsIncluded.water ?? false,
        gas: data.billsIncluded.gas ?? false,
      },

      leaseAgreementId: null,

      // Arrays
      roomType: data.roomType,
      preferredRaces: data.preferredRaces,
      preferredOccupation: data.preferredOccupation,
      leaseTermCategory: data.leaseTermCategory, // Ensure this matches backend expected strings
    };

    console.log("Submitting Payload:", payload);

    createPropertyMutation.mutate(payload);
  };

  if (isAuthenticating) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-muted/20 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="max-w-5xl mx-auto"
      >
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-2xl">Property Details</CardTitle>
                <CardDescription>
                  Provide essential details about your property
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-2">
                  <Label htmlFor="title">Property Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Cozy Studio Apartment in KL Sentral"
                    {...form.register("title")}
                  />
                  <p className="text-muted-foreground text-sm">
                    A good title increases visibility
                  </p>
                  {form.formState.errors.title && (
                    <p className="text-destructive text-sm">
                      {form.formState.errors.title.message}
                    </p>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the unit, facilities, surroundings..."
                    className="min-h-40 resize-none"
                    {...form.register("description")}
                  />
                  {form.formState.errors.description && (
                    <p className="text-destructive text-sm">
                      {form.formState.errors.description.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="rent">Monthly Rent (RM)</Label>
                    <Input
                      id="rent"
                      type="number"
                      placeholder="1800"
                      {...form.register("rent", { valueAsNumber: true })}
                    />
                    {form.formState.errors.rent && (
                      <p className="text-destructive text-sm">
                        {form.formState.errors.rent.message}
                      </p>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="depositRequired">Deposit (RM) - Optional</Label>
                    <Input
                      id="depositRequired"
                      type="number"
                      placeholder="1800"
                      {...form.register("depositRequired", { 
                        setValueAs: (v) => v === "" ? null : Number(v)
                      })}
                    />
                    {form.formState.errors.depositRequired && (
                      <p className="text-destructive text-sm">
                        {form.formState.errors.depositRequired.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label>Room Type</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {ROOM_TYPES.map((type) => {
                      const roomTypeValue = form.watch("roomType") || [];
                      return (
                        <div key={type} className="flex items-center space-x-2 space-y-0">
                          <Checkbox
                            id={`roomType-${type}`}
                            checked={roomTypeValue.includes(type)}
                            onCheckedChange={(checked) => {
                              const current = form.getValues("roomType") || [];
                              if (checked) {
                                form.setValue("roomType", [...current, type]);
                              } else {
                                form.setValue("roomType", current.filter((val) => val !== type));
                              }
                            }}
                          />
                          <Label htmlFor={`roomType-${type}`} className="font-normal cursor-pointer">
                            {type}
                          </Label>
                        </div>
                      );
                    })}
                  </div>
                  {form.formState.errors.roomType && (
                    <p className="text-destructive text-sm">
                      {form.formState.errors.roomType.message}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-2xl">Bills & Utilities</CardTitle>
                <CardDescription>
                  Which bills are included in the rent?
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {(["wifi", "electricity", "water", "gas"] as const).map((bill) => {
                    const billValue = form.watch(`billsIncluded.${bill}`);
                    return (
                      <div key={bill} className="flex items-center space-x-2 space-y-0">
                        <Checkbox
                          id={`bill-${bill}`}
                          checked={billValue ?? false}
                          onCheckedChange={(checked) => {
                            form.setValue(`billsIncluded.${bill}`, checked as boolean);
                          }}
                        />
                        <Label htmlFor={`bill-${bill}`} className="capitalize font-normal cursor-pointer">
                          {bill}
                        </Label>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-2xl">Tenant Preferences</CardTitle>
                <CardDescription>
                  Specify your tenant preferences (optional)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-2">
                  <Label>Preferred Race</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {races.map((race) => {
                      const racesValue = form.watch("preferredRaces") || [];
                      return (
                        <div key={race} className="flex items-center space-x-2 space-y-0">
                          <Checkbox
                            id={`race-${race}`}
                            checked={racesValue.includes(race)}
                            onCheckedChange={(checked) => {
                              const current = form.getValues("preferredRaces") || [];
                              if (checked) {
                                form.setValue("preferredRaces", [...current, race]);
                              } else {
                                form.setValue("preferredRaces", current.filter((val) => val !== race));
                              }
                            }}
                          />
                          <Label htmlFor={`race-${race}`} className="font-normal cursor-pointer">
                            {race}
                          </Label>
                        </div>
                      );
                    })}
                  </div>
                  {form.formState.errors.preferredRaces && (
                    <p className="text-destructive text-sm">
                      {form.formState.errors.preferredRaces.message}
                    </p>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label>Preferred Occupation</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {occupations.map((occupation) => {
                      const occupationsValue = form.watch("preferredOccupation") || [];
                      return (
                        <div key={occupation} className="flex items-center space-x-2 space-y-0">
                          <Checkbox
                            id={`occupation-${occupation}`}
                            checked={occupationsValue.includes(occupation)}
                            onCheckedChange={(checked) => {
                              const current = form.getValues("preferredOccupation") || [];
                              if (checked) {
                                form.setValue("preferredOccupation", [...current, occupation]);
                              } else {
                                form.setValue("preferredOccupation", current.filter((val) => val !== occupation));
                              }
                            }}
                          />
                          <Label htmlFor={`occupation-${occupation}`} className="font-normal cursor-pointer">
                            {occupation}
                          </Label>
                        </div>
                      );
                    })}
                  </div>
                  {form.formState.errors.preferredOccupation && (
                    <p className="text-destructive text-sm">
                      {form.formState.errors.preferredOccupation.message}
                    </p>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label>Lease Term</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {leaseTerms.map((term) => {
                      const leaseTermsValue = form.watch("leaseTermCategory") || [];
                      return (
                        <div key={term} className="flex items-center space-x-2 space-y-0">
                          <Checkbox
                            id={`leaseTerm-${term}`}
                            checked={leaseTermsValue.includes(term)}
                            onCheckedChange={(checked) => {
                              const current = form.getValues("leaseTermCategory") || [];
                              if (checked) {
                                form.setValue("leaseTermCategory", [...current, term]);
                              } else {
                                form.setValue("leaseTermCategory", current.filter((val) => val !== term));
                              }
                            }}
                          />
                          <Label htmlFor={`leaseTerm-${term}`} className="font-normal cursor-pointer">
                            {term}
                          </Label>
                        </div>
                      );
                    })}
                  </div>
                  {form.formState.errors.leaseTermCategory && (
                    <p className="text-destructive text-sm">
                      {form.formState.errors.leaseTermCategory.message}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-2xl">Location Information</CardTitle>
                <CardDescription>
                  Where is your property located?
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="state">State</Label>
                    <Select
                      value={form.watch("state")}
                      onValueChange={(value) => form.setValue("state", value)}
                    >
                      <SelectTrigger id="state">
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        {MALAYSIAN_STATES.map((state) => (
                          <SelectItem key={state} value={state}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {form.formState.errors.state && (
                      <p className="text-destructive text-sm">
                        {form.formState.errors.state.message}
                      </p>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="city">City</Label>
                    <Input 
                      id="city"
                      placeholder="e.g., Petaling Jaya" 
                      {...form.register("city")} 
                    />
                    {form.formState.errors.city && (
                      <p className="text-destructive text-sm">
                        {form.formState.errors.city.message}
                      </p>
                    )}
                  </div>
                </div>

                <Separator />

                <div className="grid gap-2">
                  <Label htmlFor="address">Full Address</Label>
                  <Textarea
                    id="address"
                    placeholder="Include street name, building, and unit number"
                    className="resize-none"
                    {...form.register("address")}
                  />
                  {form.formState.errors.address && (
                    <p className="text-destructive text-sm">
                      {form.formState.errors.address.message}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-2xl">Property Images</CardTitle>
                <CardDescription>
                  Upload clear and attractive images of your property
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-xl p-10 text-center transition-all cursor-pointer ${
                    isDragging
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <input
                    type="file"
                    id="file-upload"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e.target.files)}
                    className="hidden"
                  />

                  <label htmlFor="file-upload">
                    <div className="flex flex-col items-center gap-4">
                      <div className="p-4 bg-primary/10 rounded-full">
                        <Upload className="w-8 h-8 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-lg font-medium">
                          Drag & drop images here, or click to upload
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Supported: JPG, PNG, WEBP (Max 5MB)
                        </p>
                      </div>
                    </div>
                  </label>
                </div>

                {imagePreviews.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4"
                  >
                    {imagePreviews.map((preview, index) => (
                      <motion.div
                        key={index}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: index * 0.06 }}
                        className="relative group aspect-square"
                      >
                        <img
                          src={preview}
                          alt={`Property preview ${index + 1}`}
                          className="w-full h-full object-cover rounded-xl border shadow-sm"
                        />

                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 p-1.5 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </CardContent>
            </Card>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="submit"
                size="lg"
                className="w-full h-14 text-lg font-semibold shadow-md hover:shadow-lg transition-all"
              >
                Publish Listing
              </Button>
            </motion.div>
          </form>
      </motion.div>
    </div>
  );
}
