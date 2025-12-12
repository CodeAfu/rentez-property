"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star, Quote, CheckCircle2 } from "lucide-react";
import SpotlightCard from "@/components/SpotlightCard";

export default function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const reviews = [
    {
      name: "Alex Rivera",
      role: "Software Engineer",
      text: "I was skeptical at first, but RentEZ made it so easy. The virtual tour was spot on, and I signed the lease without visiting in person. Highly recommended.",
      rating: 5,
      avatarSeed: "alex"
    },
    {
      name: "Sarah Chen",
      role: "Sunway Student",
      text: "Finding student accommodation that is not a scam is hard. RentEZ verified everything. I love my new master room.",
      rating: 5,
      avatarSeed: "sarah"
    },
    {
      name: "Marcus Johnson",
      role: "Digital Nomad",
      text: "The instant booking feature is a lifesaver. Landed in the city, booked, and moved in the same day. Smooth experience.",
      rating: 4,
      avatarSeed: "marcus"
    },
    {
      name: "Emily Davis",
      role: "Graphic Designer",
      text: "I like the community aspect. Met great housemates. Support team is responsive and helpful.",
      rating: 5,
      avatarSeed: "emily"
    },
    {
      name: "David Kim",
      role: "Project Manager",
      text: "Digital contracts and automated payments make everything simple. No more printing and scanning documents.",
      rating: 5,
      avatarSeed: "david"
    },
    {
      name: "Jessica Lee",
      role: "Marketing Specialist",
      text: "Clean interface, solid listings, and trustworthy landlords. Best rental platform I have used.",
      rating: 5,
      avatarSeed: "jessica"
    }
  ];

  return (
    <section ref={ref} className="py-20 bg-slate-50/50 relative">
      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-slate-200 to-transparent"></div>

      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 font-serif mb-4">
              Loved by <span className="text-blue-600">Thousands</span>
            </h2>
            <p className="text-slate-600 text-lg pb-1">
              Don&apos;t just take our word for it. Here&apos;s what our community of Tenants and Landlords have to say
            </p>
          </motion.div>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="h-full"
            >
              <SpotlightCard className="h-full group">
                <div className="flex flex-col p-8 h-full relative z-10">

                  {/* Quote background icon */}
                  <div className="absolute top-6 right-6 text-slate-100 group-hover:text-blue-50 transition-colors duration-300">
                    <Quote className="w-10 h-10" />
                  </div>

                  {/* Header */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full p-0.5 bg-linear-to-br from-blue-500 to-purple-500 shadow-sm">
                      <img
                        src={`https://api.dicebear.com/7.x/notionists/svg?seed=${review.avatarSeed}`}
                        alt={review.name}
                        className="w-full h-full rounded-full bg-white object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{review.name}</h4>
                      <p className="text-slate-500 text-xs font-medium uppercase tracking-wide">
                        {review.role}
                      </p>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex gap-0.5 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < review.rating ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200"}`}
                      />
                    ))}
                  </div>

                  {/* Text */}
                  <p className="text-slate-600 text-sm leading-relaxed mb-6 grow">
                    &quot;{review.text}&quot;
                  </p>

                  {/* Footer */}
                  <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-emerald-600">
                    <CheckCircle2 className="w-4 h-4" /> Verified Tenant
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
