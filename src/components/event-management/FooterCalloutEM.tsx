"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import type { EventPageData } from "@/src/types/event-management"

interface FooterCalloutEMProps {
  calloutData: EventPageData["footerCallout"]
}

export default function FooterCalloutEM({ calloutData }: FooterCalloutEMProps) {
  return (
    <section className="bg-royal-gold py-6 md:py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Link href={calloutData.buttonLinkUrl} passHref legacyBehavior>
          <Button
            variant="default"
            size="lg"
            className="bg-royal-blue text-white hover:bg-royal-blue/90 font-semibold text-base md:text-lg py-3 px-8 transition-transform hover:scale-105"
            style={{ minHeight: "44px" }}
          >
            {calloutData.buttonText}
          </Button>
        </Link>
      </div>
    </section>
  )
}
