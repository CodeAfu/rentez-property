"use client"

import { Button } from "@/components/ui/button";
import { Polar } from "@polar-sh/sdk";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/providers/toast-provider";
import LoadingSpinner from "@/components/loading-spinner";

const polar = new Polar({
  server: 'sandbox',
  accessToken: "polar_oat_20l4c37dL9dnKTrerUQYCB0jZehVItCem6Du83q1oD7",
});

const ORGANIZATION_ID = "3e783099-3611-4627-99f5-45a61b2806b2";

export default function CheckoutPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const propertyId = params.propertyId as string;
  const [isLoading, setIsLoading] = useState(false);

  console.log("Property ID for Payment:", propertyId);

  const createCheckoutSession = async () => {
    try {
      setIsLoading(true);

      // Fetch all products from Polar
      const result = await polar.products.list({
        organizationId: ORGANIZATION_ID,
      });

      // Find the product where description matches propertyId
      let polarProductId: string | null = null;

      for await (const page of result) {
        const matchingProduct = page.result.items.find(
          (product) => product.description === propertyId
        );
        console.log("Checking Product:", matchingProduct);

        if (matchingProduct) {
          console.log("Matching Polar Product Found:", matchingProduct);
          polarProductId = matchingProduct.id;
          break;
        }
      }

      if (!polarProductId) {
        toast({
          title: "Error",
          message: "Property not found in payment system.",
        });
        return;
      }

      // Create checkout session
      const checkout = await polar.checkouts.create({
        products: [polarProductId],
      });

      // Redirect to checkout URL
      if (checkout.url) {
        window.location.href = checkout.url;
      } else {
        toast({
          title: "Error",
          message: "Failed to create checkout session.",
        });
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast({
        title: "Error",
        message: "Failed to create payment session.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-6 text-center">
        <h1 className="text-3xl font-bold">Proceed to Payment</h1>
        <p className="text-muted-foreground">
          Click the button below to proceed with your property rental payment.
        </p>
        <Button
          onClick={createCheckoutSession}
          disabled={isLoading}
          size="lg"
          className="w-full"
        >
          {isLoading ? (
            <>
              <LoadingSpinner /> Processing...
            </>
          ) : (
            "Proceed to Checkout"
          )}
        </Button>
      </div>
    </div>
  )
}
