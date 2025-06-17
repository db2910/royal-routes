"use client"

import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function AboutUsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Image Column */}
          <div className="relative h-[400px] lg:h-[500px] overflow-hidden rounded-xl shadow-xl">
            <img src="/images/hero/about-home.jpg" alt="Royal Routes Fleet" className="w-full  object-cover" />
            <div className="absolute inset-0 bg-[#001934]/20"></div>
          </div>

          {/* Content Column */}
          <div className="space-y-6">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-[#B8860B] font-script text-3xl"
            >
              About Us
            </motion.h3>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-[#001934]"
            >
              It's time to start your adventure
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-gray-700 text-lg leading-relaxed"
            >
              Royal Routes is a premier Rwandan tour and travel company dedicated to providing exceptional experiences
              across East Africa. Founded in 2015, we specialize in customized safaris, mountain gorilla trekking, and
              cultural immersion tours. Our mission is to showcase Rwanda's natural beauty and rich heritage while
              maintaining the highest standards of service and sustainability.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-gray-700 text-lg leading-relaxed"
            >
              We are fully licensed by the Rwanda Development Board (RDB) and proud members of the Rwanda Tours and
              Travel Association (RTTA). Our team of experienced guides and travel experts are committed to creating
              unforgettable journeys that connect travelers with the heart of East Africa.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link
                href="/about"
                className="inline-flex items-center gap-2 bg-[#B8860B] text-[#001934] font-semibold py-3 px-6 rounded-lg hover:bg-[#B8860B]/90 transition-all duration-200"
              >
                Learn More
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
