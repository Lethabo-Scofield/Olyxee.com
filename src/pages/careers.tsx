import { FC, useState } from "react";
import SEO from "../components/SEO";
import Header from "../components/header";
import Footer from "../components/footer";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin, X, Briefcase } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { roles, teams, type Role, type RoleType } from "../lib/careers-roles";
import ApplicationForm from "../components/careers/ApplicationForm";


function HeroSection() {
  return (
    <section className="relative pt-20 sm:pt-24">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="relative max-w-6xl mx-auto rounded-2xl sm:rounded-3xl overflow-hidden min-h-[480px] sm:min-h-[540px] lg:min-h-[600px]">
          <video
            src="/videos/careers-hero.mp4"
            poster="/images/careers-hero.webp"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
            tabIndex={-1}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/55" />
          <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-12 lg:p-16">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white leading-[1.08] tracking-tight mb-6 sm:mb-8"
            >
              Work with people who set the bar.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-base sm:text-lg text-white/70 max-w-xl leading-relaxed font-light mb-8 sm:mb-10"
            >
              We hire a small number of exceptional people and trust them with serious problems.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.65 }}
              className="flex flex-wrap gap-3"
            >
              <a
                href="#roles"
                className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-neutral-900 rounded-full font-medium hover:bg-neutral-100 transition-all text-sm"
              >
                View open roles <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function RolesSection() {
  const [filterType, setFilterType] = useState<"all" | RoleType>("all");
  const [filterTeam, setFilterTeam] = useState<string>("All");
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  const typeFilteredRoles = filterType === "all" ? roles : roles.filter(r => r.type === filterType);
  const visibleTeams = Array.from(new Set(typeFilteredRoles.map(r => r.team)));
  const filteredRoles = filterTeam === "All" ? typeFilteredRoles : typeFilteredRoles.filter(r => r.team === filterTeam);

  const paidCount = roles.filter(r => r.type === "paid").length;
  const internshipCount = roles.filter(r => r.type === "internship").length;

  const closeModal = () => setSelectedRole(null);

  return (
    <>
      <section id="roles" className="py-16 sm:py-24 lg:py-32 border-t border-neutral-100 bg-white">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-10"
          >
            <p className="text-xs font-semibold text-neutral-400 uppercase tracking-[0.2em] mb-4">Early career</p>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-neutral-900 mb-4">
              Open roles
            </h2>
            <p className="text-neutral-500 text-lg font-light">
              {paidCount} paid {paidCount === 1 ? "role" : "roles"} and {internshipCount} internships across {teams.length} teams. All remote.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="-mx-6 sm:mx-0 px-6 sm:px-0 mb-8 sm:mb-10 overflow-x-auto scrollbar-hide"
          >
            <div className="inline-flex items-center gap-1 p-1 rounded-full bg-neutral-100 whitespace-nowrap">
              {([
                { key: "all", label: `All (${roles.length})` },
                { key: "paid", label: `Paid roles (${paidCount})` },
                { key: "internship", label: `Internships (${internshipCount})` },
              ] as { key: "all" | RoleType; label: string }[]).map(opt => (
                <button
                  key={opt.key}
                  onClick={() => { setFilterType(opt.key); setFilterTeam("All"); }}
                  className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                    filterType === opt.key
                      ? 'bg-neutral-900 text-white shadow-lg shadow-neutral-900/20'
                      : 'text-neutral-500 hover:text-neutral-900'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10 lg:gap-16">
            <motion.aside
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:sticky lg:top-28 lg:self-start"
            >
              <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-[0.18em] mb-4">
                Teams
              </p>
              <nav className="flex flex-col">
                {["All", ...visibleTeams].map(team => (
                  <button
                    key={team}
                    onClick={() => setFilterTeam(team)}
                    className={`text-left py-2 text-sm transition-colors duration-200 ${
                      filterTeam === team
                        ? 'text-neutral-900 font-medium'
                        : 'text-neutral-400 hover:text-neutral-700'
                    }`}
                  >
                    {team}
                  </button>
                ))}
              </nav>
            </motion.aside>

            <div>
              <div className="space-y-0 divide-y divide-neutral-100 border-t border-neutral-100">
                <AnimatePresence mode="popLayout">
                  {filteredRoles.map((role, idx) => (
                    <motion.button
                      key={role.title}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.4, delay: idx * 0.04 }}
                      onClick={() => setSelectedRole(role)}
                      className="w-full text-left py-7 sm:py-8 group flex items-center justify-between gap-6 transition-all"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                          <h3 className="font-serif text-xl sm:text-2xl tracking-tight text-neutral-900 group-hover:text-neutral-600 transition-colors">{role.title}</h3>
                          <span className={`text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full ${
                            role.type === "paid"
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-blue-50 text-blue-700"
                          }`}>
                            {role.type === "paid" ? "Paid" : "Internship"}
                          </span>
                        </div>
                        <p className="text-sm text-neutral-400 leading-relaxed max-w-xl">{role.description}</p>
                        <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-neutral-400">
                          <span className="flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5" />{role.team}</span>
                          <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{role.location}</span>
                        </div>
                      </div>
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center group-hover:bg-neutral-900 group-hover:text-white transition-all duration-300">
                        <ArrowRight className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors" />
                      </div>
                    </motion.button>
                  ))}
                </AnimatePresence>
              </div>

              {filteredRoles.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-20"
                >
                  <p className="text-neutral-400 text-sm">No open positions on this team right now.</p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedRole && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[2000] flex items-end sm:items-center justify-center"
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-md" onClick={closeModal} />
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              className="relative w-full sm:max-w-lg bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] sm:max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-xl border-b border-neutral-100 px-5 sm:px-8 py-4 sm:py-5 flex items-center justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <h3 className="font-serif text-xl sm:text-2xl tracking-tight text-neutral-900 truncate">{selectedRole.title}</h3>
                  <p className="text-xs text-neutral-400 mt-0.5 truncate">{selectedRole.team} · {selectedRole.location}</p>
                </div>
                <button
                  onClick={closeModal}
                  aria-label="Close"
                  className="flex-shrink-0 w-10 h-10 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4 text-neutral-500" />
                </button>
              </div>

              <div className="px-5 sm:px-8 py-6">
                <p className="text-[15px] text-neutral-600 leading-relaxed mb-8">{selectedRole.description}</p>

                <div className="mb-8">
                  <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-4">What you'll do</h4>
                  <div className="space-y-3">
                    {selectedRole.responsibilities.map((r, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-neutral-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-[10px] font-semibold text-neutral-500">{i + 1}</span>
                        </div>
                        <p className="text-sm text-neutral-600 leading-relaxed">{r}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-4">To apply</h4>
                  <div className="space-y-3">
                    {selectedRole.requirements.map((r, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-300 mt-2 flex-shrink-0" />
                        <p className="text-sm text-neutral-600 leading-relaxed">{r}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-neutral-100 pt-6">
                  <ApplicationForm key={selectedRole.title} role={selectedRole} onClose={closeModal} />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function EmergingTalentSection() {
  return (
    <section className="py-16 sm:py-24 lg:py-32 border-t border-neutral-100">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-square w-full overflow-hidden rounded-2xl sm:rounded-3xl bg-neutral-100"
          >
            <Image
              src="/images/emerging-talent.png"
              alt="Three early-career colleagues talking together in a sunlit office"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <p className="text-xs font-semibold text-neutral-400 uppercase tracking-[0.2em] mb-4">Early career</p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight text-neutral-900 mb-6">
              Emerging talent
            </h2>
            <p className="text-base sm:text-lg text-neutral-500 leading-relaxed font-light mb-8 max-w-xl">
              Join us in building safe, beneficial AI for everyone. We welcome curious, driven people early in their professional journey through internships, residencies, and full-time roles.
            </p>
            <a
              href="#roles"
              className="group inline-flex items-center gap-2 text-sm font-medium text-neutral-900 border-b border-neutral-900 pb-1 hover:gap-3 transition-all"
            >
              Find out more <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  const steps = [
    { num: "01", title: "Apply", desc: "Send us your work. No cover letter needed. Just show us what you've built and what excites you." },
    { num: "02", title: "Chat", desc: "A casual conversation about what drives you, how you think, and where you want to go." },
    { num: "03", title: "Build", desc: "A short, relevant challenge. We want to see how you approach real problems, not trick questions." },
    { num: "04", title: "Join", desc: "Get onboarded, meet your team, and start shipping. You'll have real ownership from day one." },
  ];

  return (
    <section className="py-16 sm:py-24 lg:py-32 border-t border-neutral-100">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 sm:mb-16"
        >
          <p className="text-xs font-semibold text-neutral-400 uppercase tracking-[0.2em] mb-4">Process</p>
          <h2 className="font-serif text-3xl sm:text-5xl tracking-tight text-neutral-900">
            Four steps to joining
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-8">
          {steps.map((step, idx) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <div className="text-3xl font-serif text-neutral-200 mb-4">{step.num}</div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">{step.title}</h3>
              <p className="text-sm text-neutral-500 leading-relaxed font-light">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-20 sm:py-28 lg:py-36 border-t border-neutral-100">
      <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl tracking-tight text-neutral-900 mb-5 sm:mb-6">
            Don't see your role?
          </h2>
          <p className="text-neutral-500 text-lg max-w-lg mx-auto mb-10 font-light leading-relaxed">
            We hire for talent, not just titles. If you're exceptional at what you do and excited about making AI more reliable, reach out. We'll find a place for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-neutral-900 text-white rounded-full font-medium hover:bg-neutral-800 transition-all text-sm tracking-wide"
            >
              Get in Touch <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <a
              href="#roles"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-neutral-900 border border-neutral-200 rounded-full font-medium hover:bg-neutral-50 transition-all text-sm tracking-wide"
            >
              Browse roles
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const Careers: FC = () => {
  return (
    <div className="min-h-screen bg-white text-neutral-900 relative">
      <SEO
        title="Careers"
        description="Join Olyxee and build the infrastructure that makes AI trustworthy. 10 remote internships across AI research, engineering, design, and operations. Ship real work from day one."
        path="/careers"
        keywords={["Olyxee careers", "AI internships", "AI research internship", "AI engineering jobs", "remote AI internship", "Olyxee jobs", "machine learning internship"]}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Careers at Olyxee",
          url: "https://olyxee.com/careers",
          about: "Open internships and roles at Olyxee, the AI infrastructure company.",
          publisher: {
            "@type": "Organization",
            name: "Olyxee",
            url: "https://olyxee.com",
            logo: "https://olyxee.com/Logo/Olyxee_Logo.png"
          }
        }}
      />
      <Header />

      <main>
        <HeroSection />
        <RolesSection />
        <EmergingTalentSection />
        <ProcessSection />
        <CTASection />
      </main>

      <Footer variant="light" />
    </div>
  );
};

export default Careers;
