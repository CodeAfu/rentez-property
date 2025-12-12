"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ShieldCheck, Zap, FileSignature, Headset } from "lucide-react";

/* ----------------------------------------------------
   Spotlight Card
---------------------------------------------------- */
const SpotlightCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const onMove = (e: { clientX: number; clientY: number; }) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={onMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md ${className}`}
    >
      <div
        className="absolute -inset-px pointer-events-none transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(450px circle at ${pos.x}px ${pos.y}px, rgba(59,130,246,0.12), transparent 40%)`
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
};

/* ----------------------------------------------------
   Background Dot Pattern
---------------------------------------------------- */
const DotPattern = () => (
  <svg
    className="absolute inset-0 -z-10 w-full h-full stroke-slate-200 [mask-image:radial-gradient(100%_100%_at_top_center,white,transparent)]"
    aria-hidden="true"
  >
    <defs>
      <pattern id="dots" width={20} height={20} patternUnits="userSpaceOnUse">
        <circle cx={2} cy={2} r={1} className="fill-slate-300" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#dots)" strokeWidth={0} />
  </svg>
);

/* ----------------------------------------------------
   Main Component (Matches Screenshot)
---------------------------------------------------- */
export default function USPSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });

  const features = [
    {
      icon: ShieldCheck,
      title: "Instant Booking",
      desc: "Instant booking with verified assessments and secure processes.",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: FileSignature,
      title: "Verified Landlords",
      desc: "Every landlord is verified to ensure trust and transparency.",
      color: "bg-emerald-100 text-emerald-600"
    },
    {
      icon: Zap,
      title: "Tenant Community",
      desc: "Enjoy community features that help connect owners and tenants.",
      color: "bg-amber-100 text-amber-600"
    },
    {
      icon: Headset,
      title: "Easy App Management",
      desc: "Manage your bookings smoothly with user friendly tools.",
      color: "bg-purple-100 text-purple-600"
    }
  ];

  return (
    <section ref={ref} className="relative py-20 bg-white">
      <DotPattern />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Why Choose RentEZ
          </h2>
          <p className="text-slate-600 text-base max-w-2xl mx-auto">
            Enjoy a trusted, secure, and seamless rental experience built for modern renters and landlords.
          </p>
        </div>

        {/* Grid Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: idx * 0.1 }}
            >
              <SpotlightCard>
                <div className="p-6 flex flex-col items-center text-center space-y-4">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center ${f.color}`}
                  >
                    <f.icon className="w-7 h-7" />
                  </div>

                  <h3 className="text-lg font-semibold text-slate-900">
                    {f.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
