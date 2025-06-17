// Simulates the data structure we'd fetch from Firebase for the Event Management page
export interface EventPageData {
  hero: {
    backgroundImageUrl: string
    titlePart1: string
    titlePart2Gold: string
    tagline: string
  }
  services: {
    title: string
    items: Array<{
      id: string
      iconName: string // Lucide icon name (e.g., "Heart", "Briefcase")
      label: string
      serviceList: string[]
      quoteButtonText: string
    }>
  }
  quoteForm: {
    title: string
    fullNameLabel: string
    fullNamePlaceholder: string
    phoneLabel: string
    phonePlaceholder: string
    emailLabel: string
    emailPlaceholder: string
    eventTypeLabel: string
    estimatedBudgetLabel: string
    estimatedBudgetPlaceholder: string
    detailsLabel: string
    detailsPlaceholder: string
    submitButtonText: string
    successMessage: string
    errorMessage: string
  }
  howItWorks: {
    title: string
    steps: Array<{
      id: string
      iconName: string // Lucide icon name
      title: string
      description: string
    }>
  }
  footerCallout: {
    buttonText: string
    buttonLinkUrl: string
  }
}

// Sample data - this would come from Firebase
export const sampleEventPageData: EventPageData = {
  hero: {
    backgroundImageUrl: "/images/services/events.jpg",
    titlePart1: "Event ",
    titlePart2Gold: "Management",
    tagline: "You dream it. We plan it—all within your budget.",
  },
  services: {
    title: "Our Services",
    items: [
      {
        id: "wedding",
        iconName: "Heart",
        label: "Weddings",
        serviceList: [
          "Venue Scouting & Booking",
          "Decoration & Floral Design",
          "Catering Coordination",
          "Guest & VIP Transport",
          "On-site Logistics & Staffing",
          "Your Custom Requests…",
        ],
        quoteButtonText: "Get a Quote",
      },
      {
        id: "corporate",
        iconName: "Briefcase",
        label: "Corporate Events",
        serviceList: [
          "Conference Venue Logistics",
          "Audio/Visual Setup",
          "Delegate Transportation",
          "Gala Dinner Planning",
          "Team Building Event Transport",
          "Custom Branding Transport",
        ],
        quoteButtonText: "Get a Quote",
      },
      {
        id: "concert",
        iconName: "Music",
        label: "Concerts & Shows",
        serviceList: [
          "Artist & Crew Transport",
          "Equipment Haulage Solutions",
          "Audience Shuttle Services",
          "VIP Arrival Coordination",
          "Post-Event Transport",
          "Multi-Venue Tour Logistics",
        ],
        quoteButtonText: "Get a Quote",
      },
      {
        id: "anniversary",
        iconName: "Gift",
        label: "Anniversaries & Parties",
        serviceList: [
          "Intimate Gathering Transport",
          "Large Celebration Logistics",
          "Themed Party Vehicle Decor",
          "Guest Pickup & Drop-off",
          "Surprise Event Coordination",
          "Special Request Handling",
        ],
        quoteButtonText: "Get a Quote",
      },
      {
        id: "festival",
        iconName: "PartyPopper",
        label: "Festivals",
        serviceList: [
          "Multi-Day Transport Planning",
          "Vendor & Stallholder Logistics",
          "Mass Attendee Transport",
          "On-site Vehicle Management",
          "Emergency Transport Standby",
          "Sustainable Transport Options",
        ],
        quoteButtonText: "Get a Quote",
      },
      {
        id: "custom",
        iconName: "Sparkles",
        label: "Custom Events",
        serviceList: [
          "Unique Event Vision Realization",
          "Bespoke Transport Solutions",
          "Specialty Vehicle Sourcing",
          "Complex Itinerary Management",
          "Discreet VIP Services",
          "Anything You Can Imagine!",
        ],
        quoteButtonText: "Get a Quote",
      },
    ],
  },
  quoteForm: {
    title: "Request a Quote",
    fullNameLabel: "Full Name",
    fullNamePlaceholder: "Enter your full name",
    phoneLabel: "Phone Number",
    phonePlaceholder: "e.g., +250 788 123 456",
    emailLabel: "Email Address",
    emailPlaceholder: "Enter your email address",
    eventTypeLabel: "Event Type",
    estimatedBudgetLabel: "Estimated Budget (USD)",
    estimatedBudgetPlaceholder: "e.g., 5000",
    detailsLabel: "Details / Special Requests",
    detailsPlaceholder: "Describe your event and transport needs...",
    submitButtonText: "Submit Request",
    successMessage: "Thank you! Your quote request has been sent.",
    errorMessage: "Sorry, there was an error. Please try again.",
  },
  howItWorks: {
    title: "How We Work",
    steps: [
      {
        id: "vision",
        iconName: "Lightbulb",
        title: "Tell Us Your Vision",
        description: "Share your event details, dreams, and transportation requirements with our expert team.",
      },
      {
        id: "plan",
        iconName: "ClipboardList",
        title: "We Craft the Perfect Plan",
        description:
          "We meticulously plan logistics, source the best options, and arrange the perfect vehicles for your needs.",
      },
      {
        id: "celebrate",
        iconName: "Smile",
        title: "You Celebrate & Enjoy",
        description:
          "Relax and immerse yourself in your event, knowing all transportation is handled seamlessly by us.",
      },
    ],
  },
  footerCallout: {
    buttonText: "See Full Event Portfolio",
    buttonLinkUrl: "/portfolio/events", // Example URL
  },
}
