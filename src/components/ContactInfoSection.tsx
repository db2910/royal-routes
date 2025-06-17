"use client"

import { Phone, Mail, MapPin, Clock } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export default function ContactInfoSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target) // Unobserve after first intersection
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  const contactBlocks = [
    {
      icon: <Phone className="w-6 h-6 text-[#B8860B]" />,
      heading: "Phone",
      description: "Call us directly for immediate assistance",
      detail: "+250 788 547 440",
      href: "tel:+250788547440",
    },
    {
      icon: <Mail className="w-6 h-6 text-[#B8860B]" />,
      heading: "Email",
      description: "Send us a detailed message",
      detail: "royalroute85@gmail.com",
      href: "mailto:royalroute85@gmail.com",
    },
    {
      icon: <MapPin className="w-6 h-6 text-[#B8860B]" />,
      heading: "Location",
      description: "Visit our office in Kigali",
      detail: "Norrsken House, 1 KN 78 St Kigali",
      href: "https://www.google.com/maps/place/Norrsken+House+Kigali/@-1.9511719,30.0574183,928m/data=!3m1!1e3!4m6!3m5!1s0x19dca5a86d814c61:0x7d3b83e12b1c11a9!8m2!3d-1.9511719!4d30.0599932!16s%2Fg%2F11rd26_3_h?entry=ttu&g_ep=EgoyMDI1MDYxMS4wIKXMDSoASAFQAw%3D%3D",
    },
    {
      icon: <Clock className="w-6 h-6 text-[#B8860B]" />,
      heading: "Business Hours",
      description: "", // No description for business hours in the image
      details: ["Monday - Friday: 9:00 AM - 6:00 PM", "Saturday: 9:00 AM - 5:00 PM", "Sunday: 10:00 AM - 4:00 PM"],
    },
  ]

  return (
    <div
      ref={sectionRef}
      className="bg-[#1E293B] p-6 md:p-8 lg:p-10 rounded-xl shadow-2xl transform transition-all duration-700 ease-out"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
      }}
    >
      <h2 className="text-3xl lg:text-4xl font-bold mb-4 font-arizona">
        <span className="text-white">Contact </span>
        <span className="text-[#B8860B]">Information</span>
      </h2>
      <p className="text-gray-300 leading-relaxed mb-8 text-sm md:text-base">
        We're here to assist you with all your luxury car rental and tourism needs. Reach out to us through any of the
        following channels.
      </p>

      <div className="space-y-6">
        {contactBlocks.map((block, index) => (
          <div
            key={index}
            className={`bg-[#0F172A] p-4 rounded-lg shadow-lg transform transition-all duration-500 ease-out`}
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateX(0)" : "translateX(-20px)",
              transitionDelay: `${isVisible ? index * 150 : 0}ms`,
            }}
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 bg-[#B8860B]/20 p-3 rounded-md">{block.icon}</div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1 font-arizona">{block.heading}</h3>
                {block.description && <p className="text-gray-400 text-xs mb-1">{block.description}</p>}
                {block.detail && (
                  <a
                    href={block.href || "#"}
                    target={block.href && block.href.startsWith("http") ? "_blank" : undefined}
                    rel={block.href && block.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="text-[#B8860B] font-medium hover:underline text-sm"
                  >
                    {block.detail}
                  </a>
                )}
                {block.details && (
                  <ul className="space-y-0.5 mt-1">
                    {block.details.map((item, i) => (
                      <li key={i} className="text-gray-300 text-xs">
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
