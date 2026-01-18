"use client";

import { motion } from "framer-motion";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  index: number;
}

export default function ServiceCard({
  title,
  description,
  icon,
  index,
}: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="bg-primary-secondary/50 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-primary-accent/20 hover:border-primary-accent/50"
    >
      <div className="w-16 h-16 bg-gradient-to-br from-primary-accent to-primary-accent-alt rounded-xl flex items-center justify-center text-3xl mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
      <p className="text-gray-300 leading-relaxed">{description}</p>
    </motion.div>
  );
}

