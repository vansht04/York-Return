import { Users, Linkedin, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

export default function Team() {
  const members = [
    {
      name: "Vansh Tejnani",
      role: "Founder",
      bio: "LOOKING FOR AN INTERNSHIP, HIRE ME!!!!",
      img: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZnVubnklMjBjYXR8ZW58MHx8MHx8fDA%3D",
      linkedin: "https://www.linkedin.com/in/vansht/"
    },
    {
      name: "Vineet Tejnani",
      role: "Founder",
      bio: "LOOKING FOR AN INTERNSHIP, HIRE ME!!!!",
      img: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZnVubnklMjBjYXR8ZW58MHx8MHx8fDA%3D",
      linkedin: "https://ca.linkedin.com/in/vineettejnani"
    },
    {
      name: "Agasti Kulkarni",
      role: "Founder",
      bio: "LOOKING FOR AN INTERNSHIP, HIRE ME!!!!",
      img: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZnVubnklMjBjYXR8ZW58MHx8MHx8fDA%3D",
      linkedin: "https://ca.linkedin.com/in/agasti-kulkarni-005191329"
    },
    {
      name: "Kenzi Sulaiman",
      role: "Founder",
      bio: "LOOKING FOR AN INTERNSHIP, HIRE ME!!!!",
      img: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZnVubnklMjBjYXR8ZW58MHx8MHx8fDA%3D",
      linkedin: "https://ca.linkedin.com/in/kenzis"
    }
  ];

  return (
    <main className="max-w-6xl mx-auto px-4 py-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <div className="w-16 h-16 bg-red-50 rounded-[28px] flex items-center justify-center text-[#E31837] mx-auto mb-6">
          <Users className="w-8 h-8" />
        </div>
        <h1 className="text-5xl font-black tracking-tight mb-4 text-gray-900">Meet the Team</h1>
        <p className="text-gray-500 font-medium">The students building secure campus infrastructure.</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {members.map((member, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group"
          >
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-red-500 rounded-[48px] rotate-6 group-hover:rotate-3 transition-transform duration-500" />
              <img 
                src={member.img} 
                alt={member.name}
                className="relative w-full aspect-square object-cover rounded-[48px] shadow-2xl transition-transform duration-500 group-hover:-translate-y-2 group-hover:-translate-x-2 grayscale group-hover:grayscale-0"
              />
              <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-[#E31837]" />
              </div>
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-1">{member.name}</h3>
            <p className="text-sm font-black text-red-500 uppercase tracking-widest mb-4">{member.role}</p>
            <p className="text-gray-500 font-medium text-sm leading-relaxed mb-6">{member.bio}</p>
            <div className="flex gap-4">
              <a 
                href={member.linkedin} 
                target="_blank" 
                rel="noreferrer" 
                className="w-full h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 hover:text-[#0077b5] hover:bg-white hover:shadow-lg transition-all border border-transparent hover:border-blue-100"
              >
                <Linkedin className="w-5 h-5 mr-2" />
                <span className="text-[10px] font-black uppercase tracking-widest">Connect on LinkedIn</span>
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
