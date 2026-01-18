"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  return (
    <section className="py-20 bg-gradient-to-br from-primary-dark via-primary-dark-alt to-primary-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 text-white">What Our Clients Say</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Real businesses, real results with Voice AI automation
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-primary-secondary/50 backdrop-blur-sm border border-primary-accent/20 p-8 rounded-2xl shadow-lg hover:shadow-xl hover:border-primary-accent/50 transition-all duration-300"
            >
              <Quote className="text-primary-accent mb-4" size={32} />
              <p className="text-gray-300 mb-6 leading-relaxed italic">
                &quot;{testimonial.quote}&quot;
              </p>
              <div className="border-t border-primary-accent/20 pt-4">
                <p className="font-semibold text-white">{testimonial.name}</p>
                <p className="text-sm text-gray-300">
                  {testimonial.role} at {testimonial.company}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

