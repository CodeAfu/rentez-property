"use client";

import { Star } from "lucide-react";

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Justin Carna",
      role: "President Manager",
      text: "My testimonial can customly enhance how I enjoy the booking experience using the service.",
      stars: 5
    },
    {
      name: "Kams Linhown",
      role: "Renter",
      text: "I have a long stay at a room that has given me a good experience overall.",
      stars: 5
    },
    {
      name: "Slen",
      role: "Scoutcorer",
      text: "I really love the service and it has made my renting process simple and smooth.",
      stars: 5
    }
  ];

  return (
    <section className="w-full py-20 bg-gray-50">
      <h2 className="text-center text-3xl font-semibold mb-16">
        Testimonials from Our Happy Tenants       
      </h2>


      <div className="mx-auto max-w-6xl grid gap-6 grid-cols-1 md:grid-cols-3">
        {testimonials.map((t, idx) => (
          <div
            key={idx}
            className="p-6 border rounded-xl bg-white shadow-sm"
          >
            <div className="flex gap-1 mb-3">
              {Array.from({ length: t.stars }).map((_, starIdx) => (
                <Star key={starIdx} size={16} className="text-yellow-500 fill-yellow-500" />
              ))}
            </div>

            <p className="text-sm text-muted-foreground mb-4">{t.text}</p>

            <div className="flex flex-col">
              <p className="font-semibold">{t.name}</p>
              <p className="text-xs text-muted-foreground">{t.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
