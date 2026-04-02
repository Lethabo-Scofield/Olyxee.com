import { FC, useState } from "react";
import SEO from "../components/SEO";
import Header from "../components/header";
import Footer from "../components/footer";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin, X, CheckCircle, Briefcase } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Role {
  title: string;
  team: string;
  location: string;
  type: "full-time" | "internship";
  description: string;
  responsibilities: string[];
  requirements: string[];
}

const roles: Role[] = [
  {
    title: "AI/ML Scientist",
    team: "AI Research & Development",
    location: "Remote",
    type: "full-time",
    description: "Drive foundational research in AI verification, model reliability, and safety evaluation.",
    responsibilities: [
      "Design and run experiments on model verification and safety",
      "Publish research and contribute to the broader AI safety community",
      "Develop novel techniques for AI reliability assessment",
    ],
    requirements: [
      "PhD or equivalent experience in ML, AI, or related field",
      "Strong publication record in top-tier venues",
      "Deep expertise in PyTorch or JAX",
    ],
  },
  {
    title: "Deep Learning Engineer",
    team: "AI Research & Development",
    location: "Remote",
    type: "full-time",
    description: "Build and optimize deep learning systems for model verification and inference.",
    responsibilities: [
      "Implement and optimize deep learning architectures",
      "Build training and evaluation pipelines at scale",
      "Collaborate with research to productionize new methods",
    ],
    requirements: [
      "3+ years experience with deep learning frameworks",
      "Strong understanding of transformer architectures",
      "Experience with distributed training and GPU optimization",
    ],
  },
  {
    title: "Research Engineer",
    team: "AI Research & Development",
    location: "Remote",
    type: "full-time",
    description: "Bridge research and engineering on model verification and physics-informed AI systems.",
    responsibilities: [
      "Prototype and implement research ideas in production code",
      "Build tools for model verification and testing",
      "Develop physics-informed AI verification approaches",
    ],
    requirements: [
      "MS or PhD in CS, Physics, or related field",
      "Strong software engineering skills alongside research ability",
      "Experience with scientific computing or simulation",
    ],
  },
  {
    title: "Data Scientist / AI Analyst",
    team: "AI Research & Development",
    location: "Remote",
    type: "full-time",
    description: "Analyze model behavior, build evaluation benchmarks, and surface reliability insights.",
    responsibilities: [
      "Design and maintain model evaluation benchmarks",
      "Analyze large-scale model performance data",
      "Build dashboards and reports for AI reliability metrics",
    ],
    requirements: [
      "Strong statistical analysis and data science skills",
      "Experience with Python, SQL, and visualization tools",
      "Understanding of ML model evaluation methodologies",
    ],
  },
  {
    title: "NLP Engineer",
    team: "AI Research & Development",
    location: "Remote",
    type: "full-time",
    description: "Build and improve language model pipelines, RAG systems, and text verification tools.",
    responsibilities: [
      "Develop and optimize RAG pipelines for verification",
      "Build language model evaluation and testing frameworks",
      "Improve NLP components across the platform",
    ],
    requirements: [
      "3+ years NLP/LLM experience",
      "Experience with retrieval-augmented generation systems",
      "Strong Python skills and familiarity with HuggingFace ecosystem",
    ],
  },
  {
    title: "Computer Vision Engineer",
    team: "AI Research & Development",
    location: "Remote",
    type: "full-time",
    description: "Develop vision-based verification systems and visual AI reliability tools.",
    responsibilities: [
      "Build computer vision pipelines for model verification",
      "Develop visual analysis tools for AI behavior monitoring",
      "Optimize vision models for production deployment",
    ],
    requirements: [
      "Strong experience with computer vision frameworks",
      "Knowledge of image classification, detection, and segmentation",
      "Experience deploying vision models at scale",
    ],
  },
  {
    title: "Reinforcement Learning Engineer",
    team: "AI Research & Development",
    location: "Remote",
    type: "full-time",
    description: "Apply RL techniques to AI alignment verification and adaptive testing systems.",
    responsibilities: [
      "Design RL-based approaches for automated model testing",
      "Build reward models for AI behavior verification",
      "Develop adaptive evaluation strategies",
    ],
    requirements: [
      "Strong RL background with practical implementation experience",
      "Familiarity with RLHF and alignment techniques",
      "Experience with policy optimization and reward modeling",
    ],
  },
  {
    title: "Backend Engineer",
    team: "Infrastructure & Platform",
    location: "Remote",
    type: "full-time",
    description: "Build and scale the APIs and services that power Olyxee's verification platform.",
    responsibilities: [
      "Design and implement scalable API services",
      "Build microservices for model evaluation pipelines",
      "Optimize system performance and reliability",
    ],
    requirements: [
      "3+ years backend engineering experience",
      "Proficiency in Python, Go, or Rust",
      "Experience with distributed systems and API design",
    ],
  },
  {
    title: "Frontend Engineer",
    team: "Infrastructure & Platform",
    location: "Remote",
    type: "full-time",
    description: "Build the web interfaces and dashboards that make AI verification accessible.",
    responsibilities: [
      "Develop interactive dashboards for model metrics",
      "Build developer-facing tools and documentation UIs",
      "Create intuitive interfaces for complex AI workflows",
    ],
    requirements: [
      "3+ years with React/TypeScript",
      "Experience with data visualization libraries",
      "Eye for clean, functional design",
    ],
  },
  {
    title: "Full Stack Engineer",
    team: "Infrastructure & Platform",
    location: "Remote",
    type: "full-time",
    description: "Work across the stack to build end-to-end features for the Olyxee platform.",
    responsibilities: [
      "Build features spanning frontend, backend, and data layers",
      "Design and implement new platform capabilities",
      "Maintain and improve existing platform infrastructure",
    ],
    requirements: [
      "Strong frontend and backend skills",
      "Experience with modern web frameworks and databases",
      "Ability to own features end-to-end",
    ],
  },
  {
    title: "DevOps / MLOps Engineer",
    team: "Infrastructure & Platform",
    location: "Remote",
    type: "full-time",
    description: "Build and maintain the CI/CD, deployment, and ML infrastructure that keeps Olyxee running.",
    responsibilities: [
      "Design and manage ML training and serving infrastructure",
      "Build CI/CD pipelines for model and code deployment",
      "Automate infrastructure provisioning and monitoring",
    ],
    requirements: [
      "Experience with Kubernetes, Docker, and cloud platforms",
      "Familiarity with ML pipeline tools (MLflow, Kubeflow, etc.)",
      "Strong scripting and automation skills",
    ],
  },
  {
    title: "Cloud Infrastructure Engineer",
    team: "Infrastructure & Platform",
    location: "Remote",
    type: "full-time",
    description: "Architect and manage cloud infrastructure across AWS, GCP, and Azure.",
    responsibilities: [
      "Design multi-cloud infrastructure for AI workloads",
      "Optimize cloud costs and resource utilization",
      "Implement infrastructure as code and automation",
    ],
    requirements: [
      "Deep experience with at least two major cloud platforms",
      "Infrastructure as code expertise (Terraform, Pulumi)",
      "Understanding of GPU compute and AI-specific infrastructure",
    ],
  },
  {
    title: "Site Reliability Engineer",
    team: "Infrastructure & Platform",
    location: "Remote",
    type: "full-time",
    description: "Ensure the Olyxee platform is reliable, performant, and available at scale.",
    responsibilities: [
      "Define and monitor SLOs for platform services",
      "Build observability and incident response systems",
      "Drive reliability improvements across the stack",
    ],
    requirements: [
      "3+ years SRE or production engineering experience",
      "Strong systems programming and debugging skills",
      "Experience with monitoring, alerting, and on-call practices",
    ],
  },
  {
    title: "Database Engineer",
    team: "Infrastructure & Platform",
    location: "Remote",
    type: "full-time",
    description: "Design and maintain the data layer powering AI verification at scale.",
    responsibilities: [
      "Design schemas and optimize queries for large-scale data",
      "Manage SQL, NoSQL, and graph database systems",
      "Build data pipelines for model evaluation results",
    ],
    requirements: [
      "Deep expertise in PostgreSQL, MongoDB, or Neo4j",
      "Experience with database performance tuning",
      "Understanding of data modeling for ML workloads",
    ],
  },
  {
    title: "Security Engineer",
    team: "Infrastructure & Platform",
    location: "Remote",
    type: "full-time",
    description: "Secure the platform and contribute to AI safety from a cybersecurity perspective.",
    responsibilities: [
      "Implement security controls across infrastructure and code",
      "Conduct security reviews and threat modeling",
      "Develop AI-specific security measures and monitoring",
    ],
    requirements: [
      "3+ years in cybersecurity or security engineering",
      "Experience with cloud security and DevSecOps",
      "Interest in AI safety and adversarial robustness",
    ],
  },
  {
    title: "Product Manager",
    team: "Product & Design",
    location: "Remote",
    type: "full-time",
    description: "Define and drive the product strategy for Olyxee's AI verification tools.",
    responsibilities: [
      "Define product roadmap based on customer and market insights",
      "Work closely with engineering and research to ship features",
      "Measure product success and iterate based on data",
    ],
    requirements: [
      "3+ years product management for technical/AI products",
      "Strong analytical and communication skills",
      "Ability to translate complex technical concepts for users",
    ],
  },
  {
    title: "Technical Product Manager",
    team: "Product & Design",
    location: "Remote",
    type: "full-time",
    description: "Own the technical product vision for platform APIs, SDKs, and developer tools.",
    responsibilities: [
      "Define API and SDK product requirements",
      "Coordinate across engineering teams on platform features",
      "Manage developer experience and documentation strategy",
    ],
    requirements: [
      "Engineering background with product management experience",
      "Deep understanding of developer tools and APIs",
      "Experience working with ML/AI infrastructure products",
    ],
  },
  {
    title: "UX/UI Designer",
    team: "Product & Design",
    location: "Remote",
    type: "full-time",
    description: "Design elegant interfaces for complex AI infrastructure tools.",
    responsibilities: [
      "Create wireframes, prototypes, and high-fidelity designs",
      "Design end-to-end user flows for technical products",
      "Establish and maintain the design system",
    ],
    requirements: [
      "Portfolio demonstrating strong UI/UX work",
      "Proficiency in Figma or similar design tools",
      "Experience designing for technical/developer audiences",
    ],
  },
  {
    title: "Interaction Designer",
    team: "Product & Design",
    location: "Remote",
    type: "full-time",
    description: "Craft interactions and motion design that make AI tools intuitive to use.",
    responsibilities: [
      "Design micro-interactions and transitions",
      "Build interactive prototypes for user testing",
      "Define interaction patterns for data-heavy interfaces",
    ],
    requirements: [
      "Strong interaction and motion design portfolio",
      "Prototyping skills in Framer, Principle, or code",
      "Understanding of accessibility and usability standards",
    ],
  },
  {
    title: "Design Researcher",
    team: "Product & Design",
    location: "Remote",
    type: "full-time",
    description: "Understand user needs and behaviors to inform product and design decisions.",
    responsibilities: [
      "Plan and conduct user research studies",
      "Synthesize findings into actionable design recommendations",
      "Build and maintain user personas and journey maps",
    ],
    requirements: [
      "Experience with qualitative and quantitative research methods",
      "Strong synthesis and communication skills",
      "Background in HCI, psychology, or related field",
    ],
  },
  {
    title: "AI Model Validator / Tester",
    team: "QA & Testing",
    location: "Remote",
    type: "full-time",
    description: "Validate AI models for correctness, reliability, and safety before deployment.",
    responsibilities: [
      "Design and execute model validation test suites",
      "Identify edge cases and failure modes in AI systems",
      "Build automated testing frameworks for model evaluation",
    ],
    requirements: [
      "Understanding of ML model evaluation and testing",
      "Experience with test automation and frameworks",
      "Analytical mindset with attention to detail",
    ],
  },
  {
    title: "Software QA Engineer",
    team: "QA & Testing",
    location: "Remote",
    type: "full-time",
    description: "Ensure platform quality through comprehensive testing and quality processes.",
    responsibilities: [
      "Design and maintain test plans and test cases",
      "Perform manual and automated testing across the platform",
      "Track and report bugs, collaborate on fixes",
    ],
    requirements: [
      "3+ years QA experience in a software environment",
      "Experience with test management and bug tracking tools",
      "Strong analytical and problem-solving skills",
    ],
  },
  {
    title: "Automation Test Engineer",
    team: "QA & Testing",
    location: "Remote",
    type: "full-time",
    description: "Build and maintain automated test infrastructure for the Olyxee platform.",
    responsibilities: [
      "Develop end-to-end and integration test automation",
      "Build CI/CD test pipelines and reporting",
      "Maintain test frameworks and improve test coverage",
    ],
    requirements: [
      "Strong experience with test automation frameworks",
      "Proficiency in Python or JavaScript for testing",
      "Experience with API and UI testing tools",
    ],
  },
  {
    title: "Performance & Load Tester",
    team: "QA & Testing",
    location: "Remote",
    type: "full-time",
    description: "Ensure the platform performs reliably under load and at scale.",
    responsibilities: [
      "Design and run performance and load tests",
      "Identify bottlenecks and recommend optimizations",
      "Build performance benchmarking and monitoring tools",
    ],
    requirements: [
      "Experience with load testing tools (k6, Locust, JMeter)",
      "Understanding of system performance metrics",
      "Ability to analyze and report on performance data",
    ],
  },
  {
    title: "Technical Project Manager",
    team: "Business & Operations",
    location: "Remote",
    type: "full-time",
    description: "Drive cross-functional project execution across engineering, research, and product teams.",
    responsibilities: [
      "Manage project timelines, resources, and deliverables",
      "Coordinate across engineering, research, and product",
      "Identify and mitigate project risks proactively",
    ],
    requirements: [
      "3+ years technical project management experience",
      "Strong organizational and communication skills",
      "Experience in AI/ML or developer tools space preferred",
    ],
  },
  {
    title: "Solutions Engineer",
    team: "Business & Operations",
    location: "Remote",
    type: "full-time",
    description: "Help customers integrate and get value from Olyxee's verification platform.",
    responsibilities: [
      "Provide technical guidance during customer onboarding",
      "Build demos, proof-of-concepts, and integration guides",
      "Serve as the technical bridge between customers and product",
    ],
    requirements: [
      "Engineering background with customer-facing experience",
      "Strong communication and presentation skills",
      "Understanding of AI/ML deployment and infrastructure",
    ],
  },
  {
    title: "Business Analyst",
    team: "Business & Operations",
    location: "Remote",
    type: "full-time",
    description: "Analyze market opportunities and support strategic decision-making.",
    responsibilities: [
      "Conduct market and competitive analysis",
      "Build financial models and business cases",
      "Support leadership with data-driven insights",
    ],
    requirements: [
      "Strong analytical and modeling skills",
      "Experience with market research in tech/AI",
      "Excellent communication and presentation skills",
    ],
  },
  {
    title: "Sales Engineer",
    team: "Business & Operations",
    location: "Remote",
    type: "full-time",
    description: "Drive technical sales for Olyxee's AI verification and reliability solutions.",
    responsibilities: [
      "Lead technical discussions and product demos with prospects",
      "Understand customer requirements and map to solutions",
      "Collaborate with product on customer feedback and needs",
    ],
    requirements: [
      "Technical background with sales or pre-sales experience",
      "Understanding of AI/ML infrastructure and workflows",
      "Strong relationship-building skills",
    ],
  },
  {
    title: "Marketing Specialist",
    team: "Business & Operations",
    location: "Remote",
    type: "full-time",
    description: "Tell the Olyxee story and grow awareness for AI verification as a category.",
    responsibilities: [
      "Create content for blog, social media, and events",
      "Plan and execute marketing campaigns for AI products",
      "Manage brand presence and developer community engagement",
    ],
    requirements: [
      "Experience marketing technical/AI products",
      "Strong writing and content creation skills",
      "Understanding of developer and B2B marketing",
    ],
  },
  {
    title: "AI Research Intern",
    team: "AI Research & Development",
    location: "Remote",
    type: "internship",
    description: "Contribute to research on AI verification, model reliability, and safety evaluation.",
    responsibilities: [
      "Conduct experiments on model verification techniques",
      "Help publish papers and build research prototypes",
      "Collaborate with senior researchers on open problems",
    ],
    requirements: [
      "Pursuing a degree in CS, ML, or related field",
      "Familiarity with PyTorch or TensorFlow",
      "Strong analytical and problem-solving skills",
    ],
  },
  {
    title: "ML Engineering Intern",
    team: "AI Research & Development",
    location: "Remote",
    type: "internship",
    description: "Work on model optimization pipelines, quantization, and hardware-aware inference.",
    responsibilities: [
      "Build and improve optimization pipelines",
      "Implement quantization and pruning techniques",
      "Benchmark models across different hardware targets",
    ],
    requirements: [
      "Experience with Python and ML frameworks",
      "Understanding of model compression techniques",
      "Interest in edge computing and embedded systems",
    ],
  },
  {
    title: "Backend Engineering Intern",
    team: "Infrastructure & Platform",
    location: "Remote",
    type: "internship",
    description: "Help build and scale APIs and services powering the Olyxee platform.",
    responsibilities: [
      "Develop and test API endpoints",
      "Write integration tests and improve code quality",
      "Assist with database and service architecture",
    ],
    requirements: [
      "Familiarity with Python, Go, or Node.js",
      "Understanding of REST APIs and databases",
      "Strong problem-solving skills",
    ],
  },
  {
    title: "Frontend Engineering Intern",
    team: "Infrastructure & Platform",
    location: "Remote",
    type: "internship",
    description: "Build dashboards, developer tools, and data visualization for the Olyxee platform.",
    responsibilities: [
      "Develop interactive dashboards for model metrics",
      "Improve developer-facing documentation and tools",
      "Create intuitive UIs for complex workflows",
    ],
    requirements: [
      "Experience with React, TypeScript, or Next.js",
      "Eye for clean, functional design",
      "Interest in developer experience and tooling",
    ],
  },
  {
    title: "DevOps / MLOps Intern",
    team: "Infrastructure & Platform",
    location: "Remote",
    type: "internship",
    description: "Automate CI/CD pipelines, manage cloud infrastructure, and improve deployment reliability.",
    responsibilities: [
      "Build and maintain CI/CD pipelines",
      "Automate infrastructure provisioning",
      "Monitor and improve system reliability",
    ],
    requirements: [
      "Familiarity with CI/CD tools (GitHub Actions, etc.)",
      "Basic cloud platform experience (AWS, GCP, or Azure)",
      "Scripting skills in Bash or Python",
    ],
  },
  {
    title: "Product Design Intern",
    team: "Product & Design",
    location: "Remote",
    type: "internship",
    description: "Design interfaces for AI infrastructure tools. Shape how developers interact with Olyxee.",
    responsibilities: [
      "Create wireframes and high-fidelity mockups",
      "Design end-to-end user flows for technical products",
      "Conduct user research with developer audiences",
    ],
    requirements: [
      "Portfolio demonstrating UI/UX work",
      "Proficiency in Figma or similar design tools",
      "Interest in designing for technical users",
    ],
  },
  {
    title: "QA / Testing Intern",
    team: "QA & Testing",
    location: "Remote",
    type: "internship",
    description: "Help ensure platform quality through testing, bug reporting, and automation.",
    responsibilities: [
      "Write and execute test cases",
      "Report and track bugs across the platform",
      "Assist with building automated test suites",
    ],
    requirements: [
      "Attention to detail and analytical mindset",
      "Basic programming skills in Python or JavaScript",
      "Interest in software quality and testing",
    ],
  },
  {
    title: "Technical Writing Intern",
    team: "Business & Operations",
    location: "Remote",
    type: "internship",
    description: "Write documentation, tutorials, and educational content about AI infrastructure.",
    responsibilities: [
      "Write and maintain API and SDK documentation",
      "Create tutorials and getting-started guides",
      "Produce blog posts on AI infrastructure topics",
    ],
    requirements: [
      "Strong technical writing skills",
      "Ability to explain complex topics simply",
      "Familiarity with developer documentation",
    ],
  },
  {
    title: "Community & Marketing Intern",
    team: "Business & Operations",
    location: "Remote",
    type: "internship",
    description: "Grow the Olyxee developer community, create content, and support marketing efforts.",
    responsibilities: [
      "Engage with the developer community on social media",
      "Create content for blog, newsletters, and events",
      "Support partnership and outreach initiatives",
    ],
    requirements: [
      "Excellent communication skills",
      "Interest in AI, developer communities, and open source",
      "Self-motivated and organized",
    ],
  },
];

const teams = Array.from(new Set(roles.map(r => r.team)));

function HeroSection() {
  return (
    <section className="relative pt-20 sm:pt-24">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="relative max-w-6xl mx-auto rounded-2xl sm:rounded-3xl overflow-hidden min-h-[480px] sm:min-h-[540px] lg:min-h-[600px]">
          <Image
            src="/images/careers-hero.png"
            alt="Team collaborating on code"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/55" />
          <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-12 lg:p-16">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white leading-[1.08] tracking-tight mb-6 sm:mb-8"
            >
              Do the best work of your life.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-base sm:text-lg text-white/70 max-w-xl leading-relaxed font-light mb-8 sm:mb-10"
            >
              Join a small team solving hard problems in AI reliability and verification.
              Build something that matters.
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
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-white border border-white/25 rounded-full font-medium hover:bg-white/10 transition-all text-sm"
              >
                Learn about Olyxee
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ValuesSection() {
  const values = [
    {
      num: "01",
      title: "Ship real work",
      desc: "Your contributions go to production from week one. No busywork, no fake projects.",
      gradient: "/images/gradient-orange-pink.png",
    },
    {
      num: "02",
      title: "Learn from the best",
      desc: "Work alongside experienced engineers and researchers who've built systems at scale.",
      gradient: "/images/gradient-blue-pink.png",
    },
    {
      num: "03",
      title: "Work from anywhere",
      desc: "Fully remote with flexible hours. We care about what you build, not when you build it.",
      gradient: "/images/gradient-yellow-green.png",
    },
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
          <p className="text-xs font-semibold text-neutral-400 uppercase tracking-[0.2em] mb-4">Why Olyxee</p>
          <h2 className="font-serif text-3xl sm:text-5xl tracking-tight text-neutral-900">
            We built the kind of company we'd want to work at.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
          {values.map((v, idx) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="relative rounded-2xl sm:rounded-3xl overflow-hidden p-7 sm:p-8 min-h-[220px] flex flex-col justify-end group"
            >
              <div className="absolute inset-0">
                <Image src={v.gradient} alt="" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
              </div>
              <div className="absolute inset-0 bg-white/80 group-hover:bg-white/70 transition-all duration-500" />
              <div className="relative">
                <div className="text-3xl font-serif text-neutral-300 mb-4">{v.num}</div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">{v.title}</h3>
                <p className="text-sm text-neutral-500 leading-relaxed font-light">{v.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function RolesSection() {
  const [filterTeam, setFilterTeam] = useState<string>("All");
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", portfolio: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const filteredRoles = filterTeam === "All" ? roles : roles.filter(r => r.team === filterTeam);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) return;
    const subject = encodeURIComponent(`Application: ${selectedRole.title}`);
    const body = encodeURIComponent(
      `Role: ${selectedRole.title}\nTeam: ${selectedRole.team}\n\nName: ${formData.name}\nEmail: ${formData.email}\nPortfolio/LinkedIn: ${formData.portfolio}\n\n${formData.message}`
    );
    window.location.href = `mailto:scofieldx911@gmail.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setSelectedRole(null);
      setFormData({ name: "", email: "", portfolio: "", message: "" });
    }, 3000);
  };

  return (
    <>
      <section id="roles" className="py-32 sm:py-44 border-t border-neutral-100">
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-neutral-900 mb-4">
              Open roles
            </h2>
            <p className="text-neutral-500 text-lg font-light">
              {roles.length} positions across {teams.length} teams. All remote.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-wrap gap-2 mb-12"
          >
            {["All", ...teams].map(team => (
              <button
                key={team}
                onClick={() => setFilterTeam(team)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  filterTeam === team
                    ? 'bg-neutral-900 text-white shadow-lg shadow-neutral-900/20'
                    : 'bg-neutral-100 text-neutral-500 hover:bg-neutral-200 hover:text-neutral-700'
                }`}
              >
                {team}
              </button>
            ))}
          </motion.div>

          <div className="space-y-0 divide-y divide-neutral-100">
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
                      <h3 className="text-lg sm:text-xl tracking-tight text-neutral-900 group-hover:text-neutral-600 transition-colors">{role.title}</h3>
                      <span className={`text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full ${
                        role.type === 'internship'
                          ? 'bg-blue-50 text-blue-500'
                          : 'bg-green-50 text-green-500'
                      }`}>
                        {role.type === 'internship' ? 'Unpaid Internship' : 'Full-time'}
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
            <div className="absolute inset-0 bg-black/50 backdrop-blur-md" onClick={() => { setSelectedRole(null); setSubmitted(false); }} />
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              className="relative w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-xl border-b border-neutral-100 px-6 sm:px-8 py-5 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-neutral-900">{selectedRole.title}</h3>
                  <p className="text-xs text-neutral-400 mt-0.5">{selectedRole.team} · {selectedRole.location}</p>
                </div>
                <button
                  onClick={() => { setSelectedRole(null); setSubmitted(false); }}
                  className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4 text-neutral-500" />
                </button>
              </div>

              <div className="px-6 sm:px-8 py-6">
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
                  <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-4">What we're looking for</h4>
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
                  {submitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-10"
                    >
                      <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-5">
                        <CheckCircle className="w-7 h-7 text-green-500" />
                      </div>
                      <h4 className="text-lg text-neutral-900 mb-1">Application sent</h4>
                      <p className="text-sm text-neutral-500">Your email client should have opened. We'll be in touch.</p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleApply} className="space-y-4">
                      <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-2">Apply now</h4>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 bg-neutral-50 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900/10 text-sm text-neutral-900 placeholder:text-neutral-400"
                        placeholder="Full name"
                      />
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 bg-neutral-50 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900/10 text-sm text-neutral-900 placeholder:text-neutral-400"
                        placeholder="Email address"
                      />
                      <input
                        type="text"
                        value={formData.portfolio}
                        onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                        className="w-full px-4 py-3 bg-neutral-50 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900/10 text-sm text-neutral-900 placeholder:text-neutral-400"
                        placeholder="Portfolio or LinkedIn (optional)"
                      />
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 bg-neutral-50 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-900/10 text-sm text-neutral-900 placeholder:text-neutral-400 resize-none"
                        rows={3}
                        placeholder="Tell us about yourself..."
                      />
                      <button
                        type="submit"
                        className="w-full py-3.5 bg-neutral-900 text-white rounded-xl font-medium text-sm hover:bg-black transition-colors"
                      >
                        Submit Application
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function ProcessSection() {
  const steps = [
    { num: "01", title: "Apply", desc: "Pick a role and tell us about yourself. No cover letter — just the basics." },
    { num: "02", title: "Chat", desc: "A short conversation about your interests and what excites you about AI." },
    { num: "03", title: "Build", desc: "A small, relevant project to see how you think. Nothing unreasonable." },
    { num: "04", title: "Join", desc: "Start with the team. Get onboarded, meet your mentor, and ship code." },
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
            We're always open to meeting exceptional people.
            Tell us what you'd like to work on.
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
      <SEO title="Careers" description="Join Olyxee and work on AI infrastructure that matters. Open positions in research, engineering, design, and more." path="/careers" />
      <Header />

      <main>
        <HeroSection />
        <ValuesSection />
        <RolesSection />
        <ProcessSection />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
};

export default Careers;
