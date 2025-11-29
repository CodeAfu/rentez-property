"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, usePathname } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, AlertCircle } from "lucide-react";

import api from "@/lib/api";
import { useAuth } from "@/providers/auth-provider";
import { getPropertyByIdQueryOptions } from "@/queries/get-property-by-id";
import LoadingSpinner from "@/components/loading-spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/providers/toast-provider";
import {
  BILL_KEYS,
  LEASE_TERMS,
  MALAYSIAN_STATES,
  ROOM_TYPES,
} from "@/lib/consts";
import Link from "next/link";
import { editPropertyFormSchema, EditPropertyFormValues } from "../types";

// --- Component ---

interface EditPropertyComponentProps {
  propertyId: string;
}

export default function EditPropertyComponent({
  propertyId,
}: EditPropertyComponentProps) {
  const { user, isAuthenticated, isAuthenticating } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Fetch Data
  const {
    data: property,
    isLoading,
    isError,
    error,
  } = useQuery({
    ...getPropertyByIdQueryOptions(propertyId, user?.id),
    enabled: !!user?.id,
    retry: false,
  });

  // Auth Logic
  useEffect(() => {
    if (!isAuthenticating && !isAuthenticated) {
      router.push(`/auth/login?redirectTo=${encodeURIComponent(pathname)}`);
    }
  }, [isAuthenticated, isAuthenticating, router, pathname]);

  // Setup Form
  const form = useForm({
    resolver: zodResolver(editPropertyFormSchema),
    defaultValues: {
      title: "",
      description: "",
      rent: 0,
      address: "",
      city: "",
      state: "",
      depositRequired: false,
      billsIncluded: {
        wifi: false,
        electricity: false,
        water: false,
        gas: false,
      },
      roomType: [] as string[],
      leaseTermCategory: [] as string[], // Default empty array
    },
  });

  // Populate Form
  useEffect(() => {
    if (property) {
      form.reset({
        title: property.title,
        description: property.description,
        rent: property.rent,
        address: property.address,
        city: property.city,
        state: property.state,
        depositRequired: property.depositRequired ?? false,
        billsIncluded: property.billsIncluded ?? {
          wifi: false,
          electricity: false,
          water: false,
          gas: false,
        },
        roomType: property.roomType,
        leaseTermCategory: property.leaseTermCategory, // Populate from API
      });
    }
  }, [property, form]);

  // Mutation
  const updateMutation = useMutation({
    mutationFn: async (values: EditPropertyFormValues) => {
      await api.put(`/api/property/${propertyId}`, values);
    },
    onSuccess: () => {
      toast({ title: "Success", message: "Property updated successfully" });
      queryClient.invalidateQueries({ queryKey: ["property", propertyId] });
      router.push(`/property/${propertyId}`);
    },
    onError: (err) => {
      console.error(err);
      toast({
        type: "error",
        title: "Error",
        message: "Failed to update property",
      });
    },
  });

  function onSubmit(values: EditPropertyFormValues) {
    updateMutation.mutate(values);
  }

  if (isAuthenticating || isLoading) return <LoadingSpinner />;

  if (isError) {
    const errorMessage =
      error instanceof Error ? error.message : "An error occurred";
    const isUnauthorized = errorMessage.toLowerCase().includes("authorized");
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
        <div className="bg-destructive/10 p-4 rounded-full">
          <AlertCircle className="w-10 h-10 text-destructive" />
        </div>
        <h1 className="text-2xl font-bold">
          {isUnauthorized ? "Access Denied" : "Error"}
        </h1>
        <p className="text-muted-foreground max-w-md">
          {isUnauthorized ? "Permission denied." : errorMessage}
        </p>
        <Button variant="outline" onClick={() => router.back()}>
          Go Back
        </Button>
      </div>
    );
  }

  if (!property) return null;

  return (
    <div className="container max-w-5xl mx-auto py-8 px-4">
      <div className="p-8 bg-card shadow rounded">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Edit Property</h1>
            <p className="text-muted-foreground">
              Update your property details.
            </p>
          </div>
          <Button variant="ghost" onClick={() => router.back()}>
            Cancel
          </Button>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* ... Title, Desc, Rent, Address fields (Same as before) ... */}
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="rent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rent (RM)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        value={field.value as number}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {MALAYSIAN_STATES.map((s) => (
                          <SelectItem key={s} value={s}>
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Details & Inclusions Section */}
            <div className="p-6 border rounded-lg space-y-4">
              <h3 className="font-medium">Details & Inclusions</h3>
              <FormField
                control={form.control}
                name="depositRequired"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Deposit Required</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4 mt-4">
                {BILL_KEYS.map((key) => (
                  <FormField
                    key={key}
                    control={form.control}
                    name={`billsIncluded.${key}`}
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="capitalize">
                            {key} Included
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            </div>

            {/* Room Types & Lease Terms Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Room Types */}
              <FormField
                control={form.control}
                name="roomType"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel>Room Types</FormLabel>
                      <FormDescription>Select available types.</FormDescription>
                    </div>
                    <div className="space-y-2">
                      {ROOM_TYPES.map((type) => (
                        <FormField
                          key={type}
                          control={form.control}
                          name="roomType"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(type)}
                                  onCheckedChange={(checked) =>
                                    checked
                                      ? field.onChange([...field.value, type])
                                      : field.onChange(
                                          field.value?.filter(
                                            (v: string) => v !== type,
                                          ),
                                        )
                                  }
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {type}
                              </FormLabel>
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Lease Term Category */}
              <FormField
                control={form.control}
                name="leaseTermCategory"
                render={() => (
                  <FormItem>
                    <div className="mb-4 h-fit">
                      <FormLabel>Lease Terms</FormLabel>
                      <FormDescription>Select accepted terms.</FormDescription>
                    </div>
                    <div className="space-y-2">
                      {LEASE_TERMS.map((term) => (
                        <FormField
                          key={term}
                          control={form.control}
                          name="leaseTermCategory"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(term)}
                                  onCheckedChange={(checked) =>
                                    checked
                                      ? field.onChange([...field.value, term])
                                      : field.onChange(
                                          field.value?.filter(
                                            (v: string) => v !== term,
                                          ),
                                        )
                                  }
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {term}
                              </FormLabel>
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-normal">Lease Agreement</label>
              {property.agreementId ? (
                <Button asChild size="sm" className="w-fit">
                  <Link
                    href={`/property/${property.id}/lease/${property.agreementId}`}
                  >
                    View Lease
                  </Link>
                </Button>
              ) : (
                <Button asChild size="sm" className="w-fit">
                  <Link href={`/property/${property.id}/lease`}>
                    Create Lease
                  </Link>
                </Button>
              )}
            </div>

            <div className="flex items-center justify-end gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={updateMutation.isPending}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={updateMutation.isPending}>
                {updateMutation.isPending && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}{" "}
                Save Changes
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
