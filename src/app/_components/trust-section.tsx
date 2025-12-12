"use client";

import { ShieldCheck, Users, ClipboardCheck, Smartphone } from "lucide-react";

export default function TrustSecuritySection() {
  const features = [
    {
      icon: <ClipboardCheck size={32} />,
      title: "Instant Booking",
      desc: "Easy booking with verified reviews and assessments."
    },
    {
      icon: <ShieldCheck size={32} />,
      title: "Verified Landlords",
      desc: "Verified landlords maintain oversight for your rentals."
    },
    {
      icon: <Users size={32} />,
      title: "Tenant Community",
      desc: "Community features that connect tenants and owners."
    },
    {
      icon: <Smartphone size={32} />,
      title: "Easy App Management",
      desc: "Simple tools to help manage your rentals and services."
    }
  ];

  return (
    <section className="w-full py-20 bg-gray-50">
      <h2 className="text-center text-3xl font-semibold mb-4">
        Why Choose RentEZ?
      </h2>

      <div className="mx-auto max-w-6xl mt-8 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f, idx) => (
          <div
            key={idx}
            className="p-6 border rounded-xl shadow-sm bg-white flex flex-col items-center text-center"
          >
            <div className="p-3 rounded-full bg-primary/10 text-primary mb-3">
              {f.icon}
            </div>
            <p className="font-semibold text-lg mb-1">{f.title}</p>
            <p className="text-sm text-muted-foreground">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
