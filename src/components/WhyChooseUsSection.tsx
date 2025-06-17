"use client"

import { useEffect, useRef, useState } from "react"
import { Check, Star, Shield, Users, Award } from "lucide-react"

export default function WhyChooseUsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [imageVisible, setImageVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    )

    const imageObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setImageVisible(true)
        }
      },
      {
        threshold: 0.2,
      },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    if (imageRef.current) {
      imageObserver.observe(imageRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
      if (imageRef.current) {
        imageObserver.unobserve(imageRef.current)
      }
    }
  }, [])

  const reasons = [
    {
      icon: <Star className="w-6 h-6" />,
      title: "20+ Years of Excellence",
      description:
        "Two decades of experience in Rwanda's tourism industry, ensuring unmatched expertise and service quality.",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Safety & Reliability",
      description:
        "Your safety is our priority with well-maintained vehicles, certified guides, and comprehensive insurance coverage.",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Local Expertise",
      description: "Our team of local experts provides authentic insights and access to hidden gems across Rwanda.",
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Personalized Service",
      description: "Tailored experiences designed to match your preferences, ensuring every journey is uniquely yours.",
    },
  ]

  return (
    <section ref={sectionRef} className="py-16 lg:py-24 bg-[#001934]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Image Side */}
          <div className="order-2 lg:order-1" ref={imageRef}>
            <div className="relative h-96 lg:h-[500px] rounded-xl overflow-hidden shadow-xl">
              <img
                src="/images/about/why.jpg"
                alt="Happy Tourists in Rwanda"
                className={`w-full h-full object-cover transition-transform duration-1000 ${
                  imageVisible ? "scale-105" : "scale-100"
                }`}
              />
            </div>
          </div>

          {/* Content Side */}
          <div className="order-1 lg:order-2">
            {/* Section Title */}
            <div
              className={`transform transition-all duration-700 mb-8 ${
                isVisible ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
              }`}
              style={{ transitionDelay: "0.2s" }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-[#B8860B] font-arizona mb-4">Why Choose Us</h2>
              <p className="text-gray-300 text-lg">
                Discover what makes Royal Routes the preferred choice for travelers exploring Rwanda.
              </p>
            </div>

            {/* Reasons List */}
            <div className="space-y-6">
              {reasons.map((reason, index) => (
                <div
                  key={index}
                  className={`transform transition-all duration-700 ${
                    isVisible ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
                  }`}
                  style={{ transitionDelay: `${0.4 + index * 0.1}s` }}
                >
                  <div className="flex items-start space-x-4 group">
                    {/* Icon */}
                    <div className="flex-shrink-0 w-12 h-12 bg-[#B8860B] rounded-lg flex items-center justify-center text-[#001934] group-hover:scale-110 transition-transform duration-300">
                      {reason.icon}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-[#B8860B] mb-2 font-arizona">{reason.title}</h3>
                      <p className="text-gray-300 leading-relaxed">{reason.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Call to Action */}
            <div
              className={`transform transition-all duration-700 mt-8 ${
                isVisible ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
              }`}
              style={{ transitionDelay: "0.8s" }}
            >
              <div className="flex items-center space-x-3 text-[#B8860B]">
                <Check className="w-5 h-5" />
                <span className="text-lg font-medium">Ready to experience Rwanda like never before?</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
