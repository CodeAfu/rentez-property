"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  ShieldCheck,
  FileSignature,
  Headset,
  Zap,
  MousePointer2,
} from "lucide-react";
import DotPattern from "@/components/DotPattern";

export default function USPSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-150px",
  });

  const features = [
    {
      icon: ShieldCheck,
      title: "Verified Owners",
      desc: "Every landlord is verified so you can rent confidently with real, legitimate listings.",
      bg: "bg-blue-100",
      color: "text-blue-600",
    },
    {
      icon: Zap,
      title: "Instant Booking",
      desc: "See a place you like? Secure the room instantly without waiting for approval.",
      bg: "bg-amber-100",
      color: "text-amber-600",
    },
    {
      icon: FileSignature,
      title: "Digital Contracts",
      desc: "Sign contracts digitally right within the platform. No printing or scanning needed.",
      bg: "bg-emerald-100",
      color: "text-emerald-600",
    },
    {
      icon: Headset,
      title: "24/7 Support",
      desc: "Issues with your stay? Our support team is available anytime you need help.",
      bg: "bg-purple-100",
      color: "text-purple-600",
    },
  ];

  return (
    <section ref={ref} className="relative pt-10 pb-18 bg-white overflow-hidden">
      <DotPattern />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 font-serif tracking-tight mb-5">
            Why Choose RentEZ?
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            We designed RentEZ to remove stress from renting and to make the
            whole process safer, simpler, and more transparent.
          </p>
        </motion.div>

        {/* Grid features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: idx * 0.1 }}
              className="h-full"
            >
              <div className="h-full group border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-all bg-white">
                <div className="p-8 flex flex-col h-full">
                  {/* Icon */}
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 ${feature.bg} ${feature.color}`}
                  >
                    <feature.icon className="w-7 h-7" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-600 text-sm leading-relaxed grow">
                    {feature.desc}
                  </p>

                  {/* Learn More */}
                  <div className="mt-6 flex items-center text-sm font-semibold text-slate-400 group-hover:text-blue-600 transition-colors">
                    Learn more
                    <MousePointer2 className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
