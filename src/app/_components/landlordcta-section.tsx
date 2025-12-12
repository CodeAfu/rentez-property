import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LandlordCTA() {
  return (
    <section className="w-full py-20 bg-white">
      <div className="max-w-3xl mx-auto px-6 py-12 bg-primary text-white rounded-2xl shadow-sm text-center">
        <h2 className="text-4xl font-semibold mb-3">Have a room to rent?</h2>
        <p className="text-m mb-8 opacity-90">
          List your property now and reach thousands of verified tenants.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild className="bg-white text-primary hover:bg-white/90">
            <Link href="/property/create">More Information</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
