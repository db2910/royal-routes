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
      name: "Kanobana Clarise",
      position: "Human Resource",
      imageUrl: "https://via.placeholder.com/150/001934/B8860B?text=Clarise", // Adjusted placeholder text for her name
      experienceDescription:
        "Kanobana Clarise is a dedicated Human Resource professional with a proven track record in talent management, employee relations, and fostering a positive workplace culture. Her expertise ensures effective recruitment, staff development, and the overall well-being of our team, contributing significantly to our operational excellence.",
      email: "royalroute85@gmail.com",
  },
  {
    id: "member3",
    name: "Kanobana Vincent",
    position: "Head of Drivers",
    imageUrl: "https://via.placeholder.com/150/001934/B8860B?text=Vincent", // Adjusted placeholder text for his name
    experienceDescription:
      "As Head of Drivers, Kanobana Vincent brings extensive experience in fleet management and driver supervision. He is dedicated to upholding the highest standards of safety, punctuality, and professionalism across our driving team, ensuring every client's journey is smooth, secure, and enjoyable. Vincent's leadership is key to our reliable transportation services.",
    email: "royalroute85@gmail.com",
},
{
  id: "member4",
  name: "Dieudonne",
  position: "Travel Consultant",
  imageUrl: "https://via.placeholder.com/150/B8860B/001934?text=Dieudonne", // Adjusted placeholder text for his name
  experienceDescription:
    "Dieudonne is a highly skilled Travel Consultant dedicated to curating exceptional travel experiences. With a keen eye for detail, he specializes in crafting personalized itineraries and providing prompt, friendly support, ensuring every client's journey through Rwanda is perfectly tailored and memorable.",
  email: "royalroute85@gmail.com",
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
