"use client";

import { motion } from "framer-motion";
import { Building2, Square, Home, Layers } from "lucide-react";

export default function AccommodationTypesSection() {
  const types = [
    { name: "Apartments", icon: Building2, img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00" },
    { name: "Rooms", icon: Home, img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267" },
    { name: "Studios", icon: Square, img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688" },
    { name: "Duplexes", icon: Layers, img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750" }
  ];

  return (
    <section className="pt-16 pb-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16">Types of Accommodation for Rent</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {types.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="h-64 rounded-2xl shadow-lg overflow-hidden relative group"
            >
              <motion.div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${t.img})` }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.6 }}
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 p-6">
                <t.icon className="w-8 h-8 text-white mb-2" />
                <h3 className="text-2xl font-bold text-white">{t.name}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
