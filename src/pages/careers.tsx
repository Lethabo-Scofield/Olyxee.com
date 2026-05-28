import { FC, useState } from "react";
import SEO from "../components/SEO";
import Header from "../components/header";
import Footer from "../components/footer";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin, X as CloseIcon, Briefcase, Search, Plus, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { roles, teams, searchRoles, type RoleType } from "../lib/careers-roles";

const roleHref = (role: { type: RoleType; slug: string }) =>
  role.type === "paid" ? `/careers/${role.slug}` : `/careers/internships?role=${role.slug}`;


function HeroSection() {
  return (
    <section className="relative pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative w-full aspect-[4/3] sm:aspect-[16/9] overflow-hidden rounded-2xl sm:rounded-3xl bg-neutral-100"
        >
          <Image
            src="/images/olyxee-whiteboard.png"
            alt="Olyxee team at work"
            fill
            priority
            sizes="100vw"
            className="object-contain object-center"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-10 sm:mt-14 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6"
        >
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-neutral-900 tracking-tight leading-[1.05] max-w-2xl">
            Careers at Olyxee
          </h1>
          <a
            href="#roles"
            className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-neutral-900 text-white rounded-full font-medium hover:bg-black transition-all text-sm self-start sm:self-auto"
          >
            View open roles
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function RolesSection() {
  const [filterType, setFilterType] = useState<"all" | RoleType>("all");
  const [filterTeam, setFilterTeam] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showAll, setShowAll] = useState<boolean>(false);

  const INITIAL_VISIBLE = 6;

  const typeFilteredRoles = filterType === "all" ? roles : roles.filter(r => r.type === filterType);
  const visibleTeams = Array.from(new Set(typeFilteredRoles.map(r => r.team)));
  const teamFilteredRoles = filterTeam === "All" ? typeFilteredRoles : typeFilteredRoles.filter(r => r.team === filterTeam);
  const q = searchQuery.trim();
  const matchedRoles = q ? searchRoles(q, teamFilteredRoles) : teamFilteredRoles;

  const isDefaultView = filterType === "all" && filterTeam === "All" && !q;
  const shouldCollapse = isDefaultView && !showAll && matchedRoles.length > INITIAL_VISIBLE;
  const filteredRoles = shouldCollapse ? matchedRoles.slice(0, INITIAL_VISIBLE) : matchedRoles;
  const hiddenCount = matchedRoles.length - filteredRoles.length;

  const paidCount = roles.filter(r => r.type === "paid").length;
  const internshipCount = roles.filter(r => r.type === "internship").length;

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
                  <CloseIcon className="w-3 h-3 text-neutral-600" />
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

              {/* Mobile: dropdown */}
              <div className="lg:hidden relative">
                <select
                  value={filterTeam}
                  onChange={(e) => setFilterTeam(e.target.value)}
                  aria-label="Filter roles by team"
                  className="appearance-none w-full bg-white border border-neutral-200 rounded-full pl-4 pr-10 py-2.5 text-sm text-neutral-900 font-medium focus:outline-none focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-300 transition-colors"
                >
                  {["All", ...visibleTeams].map((team) => (
                    <option key={team} value={team}>
                      {team}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500"
                  aria-hidden
                />
              </div>

              {/* Desktop: vertical nav */}
              <nav className="hidden lg:flex flex-col">
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
                    <motion.div
                      key={role.title}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.4, delay: idx * 0.04 }}
                    >
                      <Link
                        href={roleHref(role)}
                        className="w-full text-left py-7 sm:py-8 group flex items-center justify-between gap-6 transition-all"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-3 mb-2">
                            <h3 className="text-xl sm:text-2xl tracking-[-0.015em] font-medium text-neutral-900 group-hover:text-neutral-600 transition-colors">{role.title}</h3>
                            <span className={`text-[10px] font-medium uppercase tracking-[0.18em] px-2.5 py-1 rounded-full border ${
                              role.type === "paid"
                                ? "border-neutral-900 text-neutral-900"
                                : "border-neutral-200 text-neutral-500"
                            }`}>
                              {role.type === "paid" ? "Paid" : "Internship"}
                            </span>
                          </div>
                          <p className="text-sm text-neutral-500 leading-relaxed max-w-xl font-light">{role.description}</p>
                          <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-neutral-400">
                            <span className="flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5" />{role.team}</span>
                            <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{role.location}</span>
                          </div>
                        </div>
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center group-hover:bg-neutral-900 group-hover:text-white transition-all duration-300">
                          <ArrowRight className="w-4 h-4 text-neutral-500 group-hover:text-white transition-colors" />
                        </div>
                      </Link>
                    </motion.div>
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
        description="Join Olyxee and build the infrastructure that makes AI trustworthy. Open internships and paid roles across AI research, engineering, design, and operations. Ship real work from day one."
        path="/careers"
        keywords={["Olyxee careers", "AI internships", "AI research internship", "AI engineering jobs", "remote AI internship", "Olyxee jobs", "machine learning internship", "AI jobs Johannesburg", "AI jobs South Africa"]}
        jsonLd={[
          {
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
          },
          ...roles.map((role) => ({
            "@context": "https://schema.org",
            "@type": "JobPosting",
            title: role.title,
            description: `${role.description}\n\nResponsibilities:\n- ${role.responsibilities.join("\n- ")}\n\nRequirements:\n- ${role.requirements.join("\n- ")}`,
            datePosted: "2026-01-01",
            validThrough: "2026-12-31",
            employmentType: role.type === "internship" ? "INTERN" : "FULL_TIME",
            hiringOrganization: {
              "@type": "Organization",
              name: "Olyxee",
              sameAs: "https://olyxee.com",
              logo: "https://olyxee.com/Logo/Olyxee_Logo.png",
            },
            jobLocation: {
              "@type": "Place",
              address: {
                "@type": "PostalAddress",
                addressLocality: role.location.includes("Johannesburg") ? "Johannesburg" : undefined,
                addressCountry: "ZA",
              },
            },
            jobLocationType: role.location.toLowerCase().includes("remote") ? "TELECOMMUTE" : undefined,
            applicantLocationRequirements: role.location.toLowerCase().includes("remote")
              ? { "@type": "Country", name: "Worldwide" }
              : undefined,
            industry: "Artificial Intelligence",
            occupationalCategory: role.team,
            url: `https://olyxee.com/careers#${role.title.toLowerCase().replace(/\s+/g, "-")}`,
            ...(role.type === "internship"
              ? { baseSalary: { "@type": "MonetaryAmount", currency: "USD", value: { "@type": "QuantitativeValue", value: 0, unitText: "MONTH" } } }
              : {}),
          })),
        ]}
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
