import { FC, useState } from "react";
import SEO from "../components/SEO";
import Header from "../components/header";
import Footer from "../components/footer";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin, X, Briefcase, Search, Plus } from "lucide-react";
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
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showAll, setShowAll] = useState<boolean>(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  const INITIAL_VISIBLE = 6;

  const typeFilteredRoles = filterType === "all" ? roles : roles.filter(r => r.type === filterType);
  const visibleTeams = Array.from(new Set(typeFilteredRoles.map(r => r.team)));
  const teamFilteredRoles = filterTeam === "All" ? typeFilteredRoles : typeFilteredRoles.filter(r => r.team === filterTeam);
  const q = searchQuery.trim().toLowerCase();
  const matchedRoles = q
    ? teamFilteredRoles.filter(r =>
        r.title.toLowerCase().includes(q) ||
        r.team.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.location.toLowerCase().includes(q)
      )
    : teamFilteredRoles;

  const isDefaultView = filterType === "all" && filterTeam === "All" && !q;
  const shouldCollapse = isDefaultView && !showAll && matchedRoles.length > INITIAL_VISIBLE;
  const filteredRoles = shouldCollapse ? matchedRoles.slice(0, INITIAL_VISIBLE) : matchedRoles;
  const hiddenCount = matchedRoles.length - filteredRoles.length;

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
            className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            <div className="-mx-6 sm:mx-0 px-6 sm:px-0 overflow-x-auto scrollbar-hide">
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
            </div>

            <div className="relative w-full sm:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search roles, teams, or skills"
                aria-label="Search roles"
                className="w-full pl-11 pr-10 py-2.5 text-sm rounded-full bg-neutral-100 border border-transparent text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:bg-white focus:border-neutral-300 focus:ring-2 focus:ring-neutral-200 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-neutral-200 hover:bg-neutral-300 flex items-center justify-center transition-colors"
                >
                  <X className="w-3 h-3 text-neutral-600" />
                </button>
              )}
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

              {(shouldCollapse || (isDefaultView && showAll && matchedRoles.length > INITIAL_VISIBLE)) && (
                <div className="pt-8 flex flex-col items-center gap-2">
                  <button
                    onClick={() => setShowAll(v => !v)}
                    className="group inline-flex items-center gap-2 px-6 py-3 rounded-full border border-neutral-300 text-sm font-medium text-neutral-900 hover:border-neutral-900 hover:bg-neutral-900 hover:text-white transition-all"
                  >
                    {showAll
                      ? `Show fewer roles`
                      : `View ${hiddenCount} more ${hiddenCount === 1 ? "role" : "roles"}`}
                    <ArrowRight className={`w-4 h-4 transition-transform ${showAll ? "-rotate-90" : "rotate-90"}`} />
                  </button>
                  <p className="text-xs text-neutral-400">
                    {showAll
                      ? `Showing all ${matchedRoles.length} open roles`
                      : `Showing ${filteredRoles.length} of ${matchedRoles.length} open roles`}
                  </p>
                </div>
              )}

              {filteredRoles.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-20"
                >
                  <p className="text-neutral-500 text-sm mb-4">
                    {q
                      ? `No roles match "${searchQuery}".`
                      : "No open positions on this team right now."}
                  </p>
                  {q && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="text-sm font-medium text-neutral-900 underline underline-offset-4 hover:no-underline"
                    >
                      Clear search
                    </button>
                  )}
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

                {selectedRole.type === "internship" && (
                  <div className="mb-6 rounded-2xl border-2 border-red-500 bg-red-50 p-5 shadow-[0_0_0_4px_rgba(239,68,68,0.08)]">
                    <p className="text-xs font-bold text-red-700 uppercase tracking-widest mb-2">
                      ⚠ Heads up — this is an unpaid internship
                    </p>
                    <p className="text-sm text-red-900/80 leading-relaxed">
                      This role is designed for people who want hands-on experience working on real AI problems alongside our team. You'll get mentorship, a written reference, and meaningful work you can point to — but no salary or stipend. Apply only if that trade-off works for you right now.
                    </p>
                  </div>
                )}

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
            <p className="text-base sm:text-lg text-neutral-500 leading-relaxed font-light mb-8">
              Join us in building safe, beneficial AI for everyone. We welcome curious, driven people early in their professional journey through internships, residencies, and full-time roles.
            </p>
            <Link
              href="/about"
              className="group inline-flex items-center gap-2 text-sm font-medium text-neutral-900 border-b border-neutral-900 pb-1 hover:gap-3 transition-all"
            >
              Find out more <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  const steps = [
    {
      num: "01",
      title: "Apply",
      desc: "Send us your work - a portfolio, GitHub, blog post, or CV. No cover letter required. We read every application carefully and reply within two to three weeks if we'd like to take the next step.",
    },
    {
      num: "02",
      title: "Intro conversation",
      desc: "A 30-minute chat with someone on the team. We'll talk about what drives you, what you've built, and what you want to work on next. You'll get a clear picture of the role and the team.",
    },
    {
      num: "03",
      title: "Skills assessment",
      desc: "A short, role-relevant exercise you can do in your own time - usually 2 to 4 hours of work. We want to see how you approach real problems, not trick questions or whiteboard puzzles. Paid for paid roles.",
    },
    {
      num: "04",
      title: "Team interviews",
      desc: "Two or three conversations with people you'd work with directly. We'll dig into your past work, talk through your assessment, and answer anything you want to know about how the team operates.",
    },
    {
      num: "05",
      title: "Decision & offer",
      desc: "We move fast. You'll usually hear our decision within a week of the final interview. If it's a yes, you'll get a written offer with all the details - compensation, start date, and how the first weeks will go.",
    },
  ];

  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="py-16 sm:py-24 lg:py-32 border-t border-neutral-100">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-10 sm:mb-14"
        >
          <p className="text-xs font-semibold text-neutral-400 uppercase tracking-[0.2em] mb-4">Process</p>
          <h2 className="font-serif text-3xl sm:text-5xl tracking-tight text-neutral-900 mb-5">
            How we hire
          </h2>
          <p className="text-base sm:text-lg text-neutral-500 leading-relaxed font-light max-w-2xl">
            Our interview process is designed to find thoughtful people with diverse expertise. Here's what to expect at each stage.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="border-t border-neutral-200"
        >
          {steps.map((step, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={step.num} className="border-b border-neutral-200">
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 sm:gap-6 py-5 sm:py-7 text-left group"
                >
                  <div className="flex items-baseline gap-4 sm:gap-6 min-w-0">
                    <span className="text-xs sm:text-sm font-mono text-neutral-400 tabular-nums flex-shrink-0">
                      {step.num}
                    </span>
                    <h3 className="text-lg sm:text-xl font-medium text-neutral-900 group-hover:text-neutral-600 transition-colors">
                      {step.title}
                    </h3>
                  </div>
                  <span
                    className={`flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-500 group-hover:border-neutral-900 group-hover:text-neutral-900 transition-all ${
                      isOpen ? "rotate-45 border-neutral-900 text-neutral-900" : ""
                    }`}
                    style={{ transition: "transform 0.3s ease, border-color 0.2s, color 0.2s" }}
                    aria-hidden="true"
                  >
                    <Plus className="w-4 h-4" />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-6 sm:pb-8 pl-10 sm:pl-14 pr-12 sm:pr-16">
                        <p className="text-sm sm:text-base text-neutral-500 leading-relaxed font-light max-w-2xl">
                          {step.desc}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-16 sm:py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-neutral-100 rounded-2xl sm:rounded-3xl px-6 sm:px-12 lg:px-16 py-16 sm:py-20 lg:py-24 text-center"
        >
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl tracking-tight text-neutral-900 mb-5 sm:mb-6">
            Don't see your role?
          </h2>
          <p className="text-neutral-600 text-lg max-w-lg mx-auto mb-10 font-light leading-relaxed">
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
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-neutral-900 bg-white border border-neutral-200 rounded-full font-medium hover:bg-neutral-50 transition-all text-sm tracking-wide"
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
        <EmergingTalentSection />
        <RolesSection />
        <ProcessSection />
        <CTASection />
      </main>

      <Footer variant="light" />
    </div>
  );
};

export default Careers;
