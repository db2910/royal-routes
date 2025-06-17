"use client"

import TeamCard from "./TeamCard"

interface TeamMember {
  id: string
  name: string
  position: string
  imageUrl: string
  experienceDescription: string
  email: string
}

interface OurTeamSectionProps {
  onViewTeamMember: (member: TeamMember) => void
}

export default function OurTeamSection({ onViewTeamMember }: OurTeamSectionProps) {
  // Team member data as specified
  const teamMembers: TeamMember[] = [
    {
      id: "member1",
      name: "Nsengimana Amzan",
      position: "CEO & Founder",
      imageUrl: "/images/about/team/amzan.jpeg",
      experienceDescription:
        "Amzan is a visionary leader with over 12 years of experience in the Rwandan tourism and logistics industry. His deep passion for showcasing Rwanda's beauty drives the company's mission.",
      email: "royalroute85@gmail.com",
    },
    {
      id: "member2",
      name: "Niyirora Ted Manzi",
      position: "Head of Operations",
      imageUrl: "https://via.placeholder.com/150/B8860B/001934?text=COO",
      experienceDescription:
        "Marie Claire meticulously manages all ground operations, ensuring every tour and transport service is executed seamlessly and efficiently across Rwanda.",
      email: "marie.u@royalroutes.com",
    },
    {
      id: "member3",
      name: "Niyirora Don Beni",
      position: "Lead Tour Guide",
      imageUrl: "https://via.placeholder.com/150/001934/B8860B?text=Guide",
      experienceDescription:
        "A certified national tour guide, David possesses extensive knowledge of Rwanda's diverse wildlife, rich history, and vibrant culture, making every tour insightful.",
      email: "david.m@royalroutes.com",
    },
    {
      id: "member4",
      name: "Chantal Umutoni",
      position: "Client Relations Manager",
      imageUrl: "https://via.placeholder.com/150/B8860B/001934?text=CRM",
      experienceDescription:
        "Chantal is dedicated to client satisfaction, specializing in crafting personalized itineraries and providing prompt, friendly support to all our guests.",
      email: "chantal.u@royalroutes.com",
    },
    {
      id: "member5",
      name: "Niyirora Don Beni",
      position: "Software Engineer & IT Support Specialist",
      imageUrl: "/images/about/team/don.jpeg",
      experienceDescription:
        "Don Beni is our Software Engineer & IT Support Specialist, expertly developing efficient software and providing comprehensive IT support. He ensure our technology operates seamlessly for everyone.",
      email: "donkyleben@gmail.com",
    },
    {
      id: "member6",
      name: "Isabelle Mukantwari",
      position: "Event Coordinator",
      imageUrl: "https://via.placeholder.com/150/B8860B/001934?text=Events",
      experienceDescription:
        "Isabelle is our expert in planning and executing diverse events, from large corporate retreats to intimate special celebrations, ensuring every detail is perfect.",
      email: "isabelle.m@royalroutes.com",
    },
  ]

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#001934] mb-4 font-arizona">Our Team</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Meet the passionate professionals who make your Rwanda experience unforgettable
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <TeamCard key={member.id} member={member} onViewClick={onViewTeamMember} />
          ))}
        </div>
      </div>
    </section>
  )
}
