"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState, SetStateAction } from "react";
import { Users, Building2, MapPin } from "lucide-react";

export default function MetricsSection() {
  const metricsRef = useRef(null);
  const isMetricsInView = useInView(metricsRef, { once: true, margin: "-100px" });

  const [tenants, setTenants] = useState(0);
  const [properties, setProperties] = useState(0);
  const [cities, setCities] = useState(0);

  useEffect(() => {
    if (isMetricsInView) {
      const animate = (setter: { (value: SetStateAction<number>): void; (value: SetStateAction<number>): void; (value: SetStateAction<number>): void; (arg0: number): void; }, target: number) => {
        let n = 0;
        const step = target / 60;
        const timer = setInterval(() => {
          n += step;
          if (n >= target) {
            setter(target);
            clearInterval(timer);
          } else {
            setter(Math.floor(n));
          }
        }, 2000 / 60);
      };

      animate(setTenants, 15000);
      animate(setProperties, 8500);
      animate(setCities, 20);
    }
  }, [isMetricsInView]);

  return (
    <section ref={metricsRef} className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Tenants */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isMetricsInView ? { opacity: 1, y: 0 } : {}}
          className="text-center p-8 rounded-2xl bg-blue-50 shadow-md border"
        >
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center">
              <Users className="w-10 h-10 text-white" />
            </div>
          </div>
          <div className="text-5xl font-bold text-blue-600">{tenants.toLocaleString()}+</div>
          <p className="text-slate-600 font-medium">Happy Tenants</p>
        </motion.div>

        {/* Properties */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isMetricsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="text-center p-8 rounded-2xl bg-indigo-50 shadow-md border"
        >
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-indigo-600 rounded-2xl flex items-center justify-center">
              <Building2 className="w-10 h-10 text-white" />
            </div>
          </div>
          <div className="text-5xl font-bold text-indigo-600">{properties.toLocaleString()}+</div>
          <p className="text-slate-600 font-medium">Properties Listed</p>
        </motion.div>

        {/* Cities */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isMetricsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="text-center p-8 rounded-2xl bg-cyan-50 shadow-md border"
        >
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center">
              <MapPin className="w-10 h-10 text-white" />
            </div>
          </div>
          <div className="text-5xl font-bold text-blue-600">{cities}+</div>
          <p className="text-slate-600 font-medium">Cities Covered</p>
        </motion.div>
      </div>
    </section>
  );
}
