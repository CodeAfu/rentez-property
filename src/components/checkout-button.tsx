"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Polar } from "@polar-sh/sdk";
import { useToast } from "@/providers/toast-provider";
import { devLog } from "@/lib/utils";

const polar = new Polar({
  server: 'sandbox',
  accessToken: "polar_oat_20l4c37dL9dnKTrerUQYCB0jZehVItCem6Du83q1oD7",
});
const ORGANIZATION_ID = "3e783099-3611-4627-99f5-45a61b2806b2";

export default function CheckoutButton({ propertyId, route }: { propertyId: string, route: string }) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

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

        if (matchingProduct) {
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
        returnUrl: `${window.location.origin}/property/${propertyId}`,
        // edit where ever you want it to lead to
        successUrl: `${window.location.origin}${route}`,
      });

      devLog("Checkout Result Retrieved:", checkout.url);
      devLog("Checkout Session Created:", checkout);

      // Redirect to checkout URL
      if (checkout.url) {
        devLog("Redirecting to Checkout URL:", checkout.successUrl);
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
  }

  return (
    <Button
      onClick={createCheckoutSession}
      disabled={isLoading}
    >
      {isLoading ? (
        "Processing..."
      ) : (
        "Proceed to Checkout"
      )}
    </Button>
  )
}
