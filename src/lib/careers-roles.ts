export type RoleType = "internship" | "paid";

export type QuestionType = "text" | "textarea" | "url" | "select";

export interface Question {
  id: string;
  label: string;
  placeholder?: string;
  type: QuestionType;
  required?: boolean;
  options?: string[];
  inputMode?: "text" | "email" | "url" | "numeric";
  autoComplete?: string;
}

export interface Role {
  title: string;
  team: string;
  location: string;
  type: RoleType;
  description: string;
  responsibilities: string[];
  requirements: string[];
  questions?: Question[];
}

export const roles: Role[] = [
  {
    title: "AI Researcher",
    team: "AI Research & Development",
    location: "Hybrid · Johannesburg",
    type: "paid",
    description: "Lead original research on AI verification, evaluation, and reliability. Your work will set the technical direction for how the industry trusts AI systems.",
    responsibilities: [
      "Define and lead a research agenda on model verification, evaluation, and reliability",
      "Design and run rigorous experiments, then turn results into shipped product capabilities",
      "Publish findings, influence the broader research community, and represent Olyxee externally",
      "Mentor engineers and interns and raise the technical bar across the team",
    ],
    requirements: [
      "PhD in computer science, machine learning, statistics, or a closely related field. Exceptional candidates with a Master's and a strong publication record will be considered.",
      "6+ years of research experience in ML, NLP, or AI systems, with at least one senior or lead research role.",
      "Strong track record of first-author, peer-reviewed publications at top-tier venues such as NeurIPS, ICML, ICLR, ACL, or EMNLP. Share links to your publications.",
      "Strong programming skills in Python and deep familiarity with modern ML frameworks (PyTorch, JAX, or similar).",
      "Experience taking research from idea to working prototype, not just paper.",
      "Share your CV, Google Scholar or publications page, and GitHub in your application.",
    ],
    questions: [
      {
        id: "highest_degree",
        label: "Highest degree completed",
        type: "select",
        required: true,
        options: ["PhD", "Master's", "Currently in PhD program", "Other"],
      },
      {
        id: "years_experience",
        label: "Years of research experience",
        placeholder: "e.g. 7",
        type: "text",
        required: true,
        inputMode: "numeric",
      },
      {
        id: "scholar_link",
        label: "Google Scholar or publications page",
        placeholder: "https://scholar.google.com/...",
        type: "url",
        required: true,
        inputMode: "url",
        autoComplete: "url",
      },
      {
        id: "github_link",
        label: "GitHub or code portfolio (optional)",
        placeholder: "https://github.com/yourhandle",
        type: "url",
        required: false,
        inputMode: "url",
      },
      {
        id: "key_publication",
        label: "Most impactful publication or research project",
        placeholder: "Title, venue, your role, and what made it matter.",
        type: "textarea",
        required: true,
      },
    ],
  },
  {
    title: "AI Engineer (Intern)",
    team: "Engineering & AI",
    location: "Remote",
    type: "internship",
    description: "Turn cutting-edge research into production systems. You'll bridge the gap between what's possible in a lab and what works at scale.",
    responsibilities: [
      "Build and deploy AI models that power real verification workflows",
      "Design data pipelines that handle production-scale AI evaluation",
      "Work directly with researchers to bring new ideas to life in code",
    ],
    requirements: [
      "Link to portfolio, GitHub, or projects you have worked on",
    ],
  },
  {
    title: "Machine Learning Engineer (Intern)",
    team: "Engineering & AI",
    location: "Remote",
    type: "internship",
    description: "Make AI systems faster, more accurate, and production-ready. Your work directly impacts how reliable AI is for thousands of teams.",
    responsibilities: [
      "Build training and evaluation pipelines that set the standard for quality",
      "Optimize models for real-world performance, not just benchmarks",
      "Design testing frameworks that catch problems before users do",
    ],
    requirements: [
      "Link to portfolio, GitHub, or projects you have worked on",
    ],
  },
  {
    title: "Backend Software Engineer (Intern)",
    team: "Engineering & AI",
    location: "Remote",
    type: "internship",
    description: "Build the APIs and services that power AI verification at scale. The systems you create will handle millions of evaluation requests.",
    responsibilities: [
      "Design and build APIs that are fast, reliable, and well-documented",
      "Architect backend services that scale with growing demand",
      "Shape the database and service layer that everything else depends on",
    ],
    requirements: [
      "Link to portfolio, GitHub, or projects you have worked on",
    ],
  },
  {
    title: "Frontend Software Engineer (Intern)",
    team: "Engineering & AI",
    location: "Remote",
    type: "internship",
    description: "Design and build the interfaces that make complex AI data simple and actionable. Your work defines how teams experience Olyxee.",
    responsibilities: [
      "Build dashboards and visualizations that turn raw AI data into clear insights",
      "Create developer tools that engineers actually enjoy using",
      "Craft interfaces that make complex verification workflows feel effortless",
    ],
    requirements: [
      "Link to portfolio, GitHub, or projects you have worked on",
    ],
  },
  {
    title: "Cloud / DevOps Engineer (Intern)",
    team: "Engineering & AI",
    location: "Remote",
    type: "internship",
    description: "Build and operate the cloud foundation Olyxee runs on. You'll work on the systems that keep our platform fast, secure, and always on.",
    responsibilities: [
      "Provision and manage cloud infrastructure across compute, storage, and networking",
      "Automate deployments, scaling, and observability with infrastructure-as-code",
      "Harden security, cost, and reliability of services running in production",
    ],
    requirements: [
      "Link to portfolio, GitHub, or projects you have worked on",
    ],
  },
  {
    title: "QA / Test Engineer (Intern)",
    team: "Engineering & AI",
    location: "Remote",
    type: "internship",
    description: "Be the last line of defense before our tools reach production. You'll ensure that the platform teams trust to verify AI is itself bulletproof.",
    responsibilities: [
      "Design and execute test strategies that catch what others miss",
      "Build automated test suites that scale with the platform",
      "Set the quality bar for a product where reliability is the entire promise",
    ],
    requirements: [
      "Link to portfolio, GitHub, or projects you have worked on",
    ],
  },
  {
    title: "Data Analyst (Intern)",
    team: "Data & AI Support",
    location: "Remote",
    type: "internship",
    description: "Turn raw product, research, and customer data into the insights that guide what we build next. You'll work across teams to surface what actually matters.",
    responsibilities: [
      "Build dashboards, reports, and ad-hoc analyses that inform product and research decisions",
      "Design and run experiments to measure impact and guide prioritization",
      "Partner with engineering and AI teams to improve data quality and instrumentation",
    ],
    requirements: [
      "Link to portfolio, GitHub, or projects you have worked on",
    ],
  },
  {
    title: "Data Annotation Specialist (Intern)",
    team: "Data & AI Support",
    location: "Remote",
    type: "internship",
    description: "Help our models see the world correctly. You'll build and refine the labeled datasets that power AI verification and evaluation.",
    responsibilities: [
      "Annotate, review, and quality-check datasets used to train and evaluate models",
      "Define and maintain labeling guidelines that keep data consistent across contributors",
      "Flag edge cases and ambiguous data so models learn the right behavior",
    ],
    requirements: [
      "Link to portfolio, GitHub, or examples of detail-oriented work you've done",
    ],
  },
  {
    title: "Product Manager (Intern)",
    team: "Product & Business",
    location: "Remote",
    type: "internship",
    description: "Shape what we build and why. You'll work with engineering, research, and design to take ideas from problem statement to shipped product.",
    responsibilities: [
      "Translate user problems into clear product specs, roadmaps, and priorities",
      "Coordinate cross-functional teams to ship features users actually adopt",
      "Talk to customers, run discovery, and turn feedback into product direction",
    ],
    requirements: [
      "Link to portfolio, notion docs, or past projects you have shipped",
    ],
  },
  {
    title: "Business Analyst (Intern)",
    team: "Product & Business",
    location: "Remote",
    type: "internship",
    description: "Connect data, strategy, and operations. You'll help leadership make better decisions backed by real numbers and clear analysis.",
    responsibilities: [
      "Analyse business performance, market trends, and customer behavior",
      "Build models, reports, and recommendations that guide strategic decisions",
      "Document processes, requirements, and trade-offs across teams",
    ],
    requirements: [
      "Link to portfolio, case studies, or past projects you have worked on",
    ],
  },
  {
    title: "Marketing / Growth Intern",
    team: "Growth & Operations",
    location: "Remote",
    type: "internship",
    description: "Help the world hear about Olyxee. You'll run experiments across content, channels, and campaigns to grow our reach and pipeline.",
    responsibilities: [
      "Plan and execute content, social, email, and community campaigns",
      "Run growth experiments and measure what's actually moving the needle",
      "Support product launches with positioning, messaging, and distribution",
    ],
    requirements: [
      "Link to portfolio, campaigns, or past projects you have worked on",
    ],
  },
  {
    title: "Technical Support / Operations Intern",
    team: "Growth & Operations",
    location: "Remote",
    type: "internship",
    description: "Keep customers unblocked and the business running smoothly. You'll sit at the intersection of users, product, and internal operations.",
    responsibilities: [
      "Respond to customer questions and triage issues to the right team",
      "Document common problems and turn fixes into self-serve resources",
      "Improve internal tools, processes, and workflows that keep teams efficient",
    ],
    requirements: [
      "Examples of past support, operations, or process work you've done",
    ],
  },
  {
    title: "Compliance / Risk Analyst (Intern)",
    team: "Industry & Compliance (Ordo)",
    location: "Remote",
    type: "internship",
    description: "Work on Ordo, our industry and compliance product. You'll help ensure AI systems meet the regulatory and risk standards real industries require.",
    responsibilities: [
      "Research compliance, risk, and regulatory requirements across target industries",
      "Map controls and evaluation criteria into product requirements",
      "Review processes and outputs for adherence to internal and external standards",
    ],
    requirements: [
      "Link to portfolio, coursework, or past projects related to compliance, risk, or policy",
    ],
  },
  {
    title: "Technical Writer (Intern)",
    team: "Industry & Compliance (Ordo)",
    location: "Remote",
    type: "internship",
    description: "Make complex technical and compliance topics easy to understand. You'll own the docs, guides, and references that help users actually use our products.",
    responsibilities: [
      "Write and maintain product documentation, API references, and tutorials",
      "Partner with engineers and product to keep docs accurate as features ship",
      "Turn compliance and research material into clear, accessible content",
    ],
    requirements: [
      "Link to writing samples, docs, or content you have published",
    ],
  },
  {
    title: "Financial Data Engineer (Intern)",
    team: "Finance Data (Addup)",
    location: "Remote",
    type: "internship",
    description: "Work on Addup, our financial data reliability product. You'll build the pipelines that ingest, clean, and standardize financial data from accounting systems, banks, and spreadsheets.",
    responsibilities: [
      "Build connectors and ETL pipelines that pull data from accounting platforms, banks, and CSV/Excel sources",
      "Design schemas and transformations that turn messy ledger data into clean, queryable records",
      "Write tests and validations that catch broken or malformed financial data before it reaches users",
    ],
    requirements: [
      "Link to portfolio, GitHub, or projects involving data pipelines, SQL, or financial datasets",
    ],
  },
  {
    title: "Data Reconciliation Analyst (Intern)",
    team: "Finance Data (Addup)",
    location: "Remote",
    type: "internship",
    description: "Help finance teams trust their numbers. You'll design and refine the matching, verification, and reconciliation logic that powers Addup.",
    responsibilities: [
      "Define matching rules that reconcile transactions across banks, ledgers, and invoices",
      "Investigate edge cases, mismatches, and exceptions and turn them into product improvements",
      "Build evaluation sets and quality benchmarks for reconciliation accuracy",
    ],
    requirements: [
      "Link to portfolio, GitHub, coursework, or examples of detail-oriented analytical work",
    ],
  },
  {
    title: "Accounting Operations Intern",
    team: "Finance Data (Addup)",
    location: "Remote",
    type: "internship",
    description: "Bring real accounting domain expertise into Addup. You'll partner with engineers and product to make sure what we ship matches how finance teams actually close their books.",
    responsibilities: [
      "Map real-world close, reconciliation, and review workflows into product requirements",
      "Test new features against realistic ledgers and surface gaps before launch",
      "Translate accounting standards and finance team feedback into clear specs",
    ],
    requirements: [
      "Studying accounting, finance, or related; share coursework, internships, or relevant projects",
    ],
  },
  {
    title: "Frontend Engineer – Finance UI (Intern)",
    team: "Finance Data (Addup)",
    location: "Remote",
    type: "internship",
    description: "Design and build the dashboards and review screens finance teams use every day in Addup. Your work makes complex reconciliation work feel calm and obvious.",
    responsibilities: [
      "Build dashboards, review queues, and ledger views with clear, accessible UX",
      "Implement interactions for matching, approving, and exporting financial records",
      "Polish performance and details so workflows stay fast on real-world data volumes",
    ],
    requirements: [
      "Link to portfolio, GitHub, or projects showing frontend work (React/Next.js a plus)",
    ],
  },
  {
    title: "Marketing Lead",
    team: "Marketing & Growth",
    location: "Hybrid · Johannesburg",
    type: "paid",
    description: "Own how the world hears about Olyxee. You'll set the strategy, lead the channels, and turn a technical product into a story engineers, founders, and enterprises actually trust.",
    responsibilities: [
      "Set and execute the company-wide marketing strategy across positioning, content, and growth",
      "Lead campaigns across social, email, SEO, and developer communities end to end",
      "Own product launches, narrative, and brand voice in every customer-facing surface",
      "Run experiments, define KPIs, and report on pipeline impact to leadership",
    ],
    requirements: [
      "Bachelor's degree in marketing, communications, business, or a related field. Master's strongly preferred.",
      "8+ years of marketing experience, with at least 3 years owning a marketing function as a lead, head, or director.",
      "Proven experience marketing technical, B2B, or developer-focused products.",
      "Strong portfolio of campaigns, launches, or content with measurable outcomes.",
      "Excellent written English and confident communicating with both engineers and executives.",
      "Share your CV or LinkedIn and links to past work in your application.",
    ],
    questions: [
      {
        id: "years_experience",
        label: "Years of marketing experience",
        placeholder: "e.g. 9",
        type: "text",
        required: true,
        inputMode: "numeric",
      },
      {
        id: "years_lead",
        label: "Years owning a marketing function (lead, head, or director)",
        placeholder: "e.g. 4",
        type: "text",
        required: true,
        inputMode: "numeric",
      },
      {
        id: "linkedin_link",
        label: "LinkedIn profile",
        placeholder: "https://linkedin.com/in/...",
        type: "url",
        required: true,
        inputMode: "url",
        autoComplete: "url",
      },
      {
        id: "portfolio_link",
        label: "Portfolio, campaign examples, or company sites (optional)",
        placeholder: "https://...",
        type: "url",
        required: false,
        inputMode: "url",
      },
      {
        id: "best_campaign",
        label: "Best campaign you've led and the measurable outcome",
        placeholder: "What you ran, who it was for, and the numbers it moved.",
        type: "textarea",
        required: true,
      },
    ],
  },
  {
    title: "Accountant (Ordo)",
    team: "Finance & Accounting",
    location: "Hybrid · Johannesburg",
    type: "paid",
    description: "Own the financial heartbeat of Ordo. You'll keep books accurate, reporting clean, and help leadership make sharper decisions with real numbers.",
    responsibilities: [
      "Own end-to-end bookkeeping, reconciliations, and monthly and annual close for Ordo",
      "Prepare invoices, expense reports, payroll inputs, and cash-flow statements for leadership",
      "Lead budgeting, forecasting, and financial analysis to inform product and hiring decisions",
      "Ensure compliance with tax, audit, and reporting requirements across jurisdictions",
    ],
    requirements: [
      "Bachelor's degree in accounting or finance. CPA, ACCA, CA(SA), or equivalent professional qualification required.",
      "7+ years of professional accounting experience, with at least 2 years owning the books for a tech, SaaS, or growth-stage company.",
      "Hands-on experience with full-cycle accounting and modern accounting software (e.g. QuickBooks, Xero, NetSuite).",
      "Strong working knowledge of GAAP or IFRS and standard tax compliance.",
      "High attention to detail, comfortable owning numbers leadership will act on.",
      "Share your CV or LinkedIn in your application.",
    ],
    questions: [
      {
        id: "qualification",
        label: "Professional qualification",
        type: "select",
        required: true,
        options: ["CPA", "ACCA", "CA(SA)", "CIMA", "Other equivalent", "In progress"],
      },
      {
        id: "years_experience",
        label: "Years of professional accounting experience",
        placeholder: "e.g. 8",
        type: "text",
        required: true,
        inputMode: "numeric",
      },
      {
        id: "industry_experience",
        label: "Years owning the books for a tech, SaaS, or growth-stage company",
        placeholder: "e.g. 3",
        type: "text",
        required: true,
        inputMode: "numeric",
      },
      {
        id: "linkedin_link",
        label: "LinkedIn profile",
        placeholder: "https://linkedin.com/in/...",
        type: "url",
        required: true,
        inputMode: "url",
        autoComplete: "url",
      },
      {
        id: "tools_used",
        label: "Accounting tools you've worked with",
        placeholder: "e.g. QuickBooks, Xero, NetSuite, Sage",
        type: "text",
        required: true,
      },
      {
        id: "scope_owned",
        label: "Most complex close, audit, or financial process you've owned",
        placeholder: "What you owned, the size of the business, and the outcome.",
        type: "textarea",
        required: true,
      },
    ],
  },
  {
    title: "Robotics Engineer (Intern)",
    team: "Olyxee Robotics",
    location: "Remote",
    type: "internship",
    description: "Help us bring embodied AI into the real world. You'll work on perception, control, and on-device deployment for robotic platforms ranging from manipulators to mobile bases.",
    responsibilities: [
      "Prototype perception, planning, or control modules for robotic platforms",
      "Run experiments in simulation and on physical hardware, then iterate quickly",
      "Help integrate foundation models with low-level control for real-world tasks",
    ],
    requirements: [
      "Hands-on experience with ROS, Isaac Sim, MuJoCo, Gazebo, or similar robotics stacks",
      "Comfort with Python and C++; familiarity with PyTorch or JAX is a plus",
      "Share your GitHub, demo videos, or links to robotics projects you've shipped",
    ],
  },
  {
    title: "Robotics Research (Intern)",
    team: "Olyxee Robotics",
    location: "Remote",
    type: "internship",
    description: "Push the boundary of what physical AI systems can do. Work alongside our research team on spatial reasoning, dexterous manipulation, and learned control.",
    responsibilities: [
      "Investigate open problems in embodied AI: perception, planning, manipulation, sim-to-real",
      "Design and run experiments, then translate findings into engineering work",
      "Co-author write-ups and contribute to internal and external publications",
    ],
    requirements: [
      "Strong fundamentals in machine learning and robotics; coursework, projects, or papers in either",
      "Programming fluency in Python; experience with reinforcement learning or imitation learning is a plus",
      "Share your CV, GitHub, and any publications, demos, or course projects",
    ],
  },
  {
    title: "Electrical Engineer",
    team: "Olyxee Robotics",
    location: "Hybrid · Johannesburg",
    type: "paid",
    description: "Own the electrical design of our robotic platforms end to end. This is a senior, high-bar role: you'll lead schematics, multi-layer PCBs, power, motor drives, and sensor integration on real hardware that ships into the field.",
    responsibilities: [
      "Lead schematic and multi-layer PCB design (8+ layers, mixed-signal) for compute, power, and sensor subsystems",
      "Specify and integrate BLDC/servo motor drivers, high-current battery systems, and functional safety circuits",
      "Own bring-up, characterization, EMC/EMI debug, thermal analysis, and signal-integrity validation",
      "Drive DFM, DFT, and qualification from prototype through small-batch production with contract manufacturers",
      "Set the technical bar across electrical engineering and mentor junior engineers and interns",
    ],
    requirements: [
      "BEng/BSc in Electrical, Electronic, or Mechatronic Engineering. MEng or PhD strongly preferred.",
      "6+ years designing production-grade hardware, with at least one product shipped to customers in volume.",
      "Expert-level Altium (or KiCad) — multi-layer, controlled-impedance, mixed-signal PCBs you've taken from schematic to manufacturing.",
      "Deep experience in motor control (FOC for BLDC/PMSM), high-current power electronics (>50 A), and battery management.",
      "Hands-on competence with high-speed digital interfaces (USB 3, Ethernet, MIPI CSI/DSI, PCIe) and lab instruments (scope, VNA, logic analyzer, thermal camera).",
      "Strong fundamentals in EMC/EMI design and pre-compliance testing; experience taking a product through CE/FCC certification.",
      "Comfortable reading and writing firmware in C/C++ on bare-metal MCUs (STM32, NXP, or similar) to support bring-up.",
      "Must include: CV, portfolio with at least two boards you led end-to-end (schematics, layouts, photos), and at least one technical reference we can contact.",
    ],
    questions: [
      {
        id: "highest_degree",
        label: "Highest degree completed",
        type: "select",
        required: true,
        options: ["PhD", "MEng / MSc", "BEng / BSc", "Other"],
      },
      {
        id: "years_experience",
        label: "Years of professional electrical engineering experience",
        placeholder: "e.g. 8",
        type: "text",
        required: true,
        inputMode: "numeric",
      },
      {
        id: "shipped_products",
        label: "Number of products you've shipped to production",
        placeholder: "e.g. 3",
        type: "text",
        required: true,
        inputMode: "numeric",
      },
      {
        id: "eda_tools",
        label: "Primary PCB design tool and years of expert use",
        placeholder: "e.g. Altium Designer · 6 years",
        type: "text",
        required: true,
      },
      {
        id: "hardest_board",
        label: "The hardest board you've ever designed",
        placeholder: "Layer count, signal classes, power, what made it hard, and the outcome.",
        type: "textarea",
        required: true,
      },
      {
        id: "motor_power_experience",
        label: "Motor control and power electronics experience",
        placeholder: "Specific topologies, current/voltage ranges, controllers used, and what you owned.",
        type: "textarea",
        required: true,
      },
      {
        id: "compliance_experience",
        label: "EMC / regulatory compliance work you've led",
        placeholder: "Standards (CE, FCC, UL, IEC 61508, etc.), pre-compliance setup, and outcomes.",
        type: "textarea",
        required: true,
      },
      {
        id: "portfolio_link",
        label: "Portfolio URL with at least two boards (schematics, layouts, photos)",
        placeholder: "https://...",
        type: "url",
        required: true,
        inputMode: "url",
      },
      {
        id: "github_link",
        label: "GitHub or firmware code samples (optional)",
        placeholder: "https://github.com/yourhandle",
        type: "url",
        required: false,
        inputMode: "url",
      },
      {
        id: "reference_contact",
        label: "Technical reference (name, role, relationship, email)",
        placeholder: "Someone senior who has reviewed your hardware work.",
        type: "textarea",
        required: true,
      },
    ],
  },
  {
    title: "Electrical Engineer (Intern)",
    team: "Olyxee Robotics",
    location: "Remote",
    type: "internship",
    description: "Get hands-on with the electrical systems behind real robots. Support PCB design, bring-up, and validation across our robotics platforms.",
    responsibilities: [
      "Assist with schematic capture, PCB layout, and BOM management",
      "Help bring up new boards and run validation tests on the bench",
      "Document designs, test results, and lessons learned for the team",
    ],
    requirements: [
      "Studying Electrical, Electronic, or Mechatronic Engineering, or equivalent self-taught background",
      "Familiarity with at least one EDA tool (Altium, KiCad, Eagle) and basic lab equipment",
      "Share your CV and any project portfolios, GitHub, or boards you've designed or built",
    ],
  },
  {
    title: "Mechanical Engineer (Intern)",
    team: "Olyxee Robotics",
    location: "Remote",
    type: "internship",
    description: "Help design the physical structures behind our robots, from brackets and enclosures to full mechanical assemblies. Work alongside electrical and software teams to ship real hardware.",
    responsibilities: [
      "Model parts and assemblies in CAD (SolidWorks, Fusion 360, or Onshape)",
      "Prep designs for 3D printing, CNC, and sheet-metal manufacturing",
      "Help with mechanical bring-up, fit checks, tolerance analysis, and iteration",
    ],
    requirements: [
      "Studying Mechanical, Mechatronic, or Industrial Engineering, or equivalent self-taught background",
      "Comfortable in at least one CAD tool; bonus for FEA or simulation experience",
      "Share your CV, portfolio, and any parts or assemblies you've designed and built",
    ],
  },
  {
    title: "Firmware Engineer (Intern)",
    team: "Olyxee Robotics",
    location: "Remote",
    type: "internship",
    description: "Write the low-level code that brings our robots to life. Work on bare-metal and RTOS firmware for sensors, motor control, and on-device intelligence.",
    responsibilities: [
      "Develop and debug firmware in C/C++ on STM32, NXP, or similar MCUs",
      "Bring up new sensors and peripherals over I2C, SPI, UART, CAN, and Ethernet",
      "Work with the EE team on board bring-up and the AI team on edge inference",
    ],
    requirements: [
      "Strong C/C++ fundamentals and comfort with embedded toolchains and debuggers",
      "Experience with at least one MCU family or RTOS (FreeRTOS, Zephyr) is a plus",
      "Share your CV, GitHub, and any embedded projects you've built",
    ],
  },
  {
    title: "Product Designer (Intern)",
    team: "Design",
    location: "Remote",
    type: "internship",
    description: "Shape how Olyxee products look, feel, and behave. Work on UI, interaction, and visual design across Ordo, Addup, and the marketing site.",
    responsibilities: [
      "Design flows, components, and full screens in Figma alongside engineers",
      "Run quick prototypes and usability checks to validate ideas",
      "Help evolve our design system and visual language across surfaces",
    ],
    requirements: [
      "Strong portfolio showing product thinking, not just polished screens",
      "Fluency in Figma; bonus for motion (Rive, Lottie, After Effects) or front-end coding",
      "Share your portfolio, CV, and a short note on a design decision you're proud of",
    ],
  },
  {
    title: "Brand & Visual Designer (Intern)",
    team: "Design",
    location: "Remote",
    type: "internship",
    description: "Help craft how Olyxee shows up in the world, from launch visuals to social, decks, and product marketing assets.",
    responsibilities: [
      "Design brand assets across web, social, decks, and event materials",
      "Produce illustrations, diagrams, and motion pieces that explain complex AI ideas",
      "Help maintain and evolve the Olyxee brand system",
    ],
    requirements: [
      "Strong visual portfolio across brand, type, and layout",
      "Fluency in Figma plus at least one of Illustrator, After Effects, or Blender",
      "Share your portfolio, CV, and one piece you would have done differently",
    ],
  },
  {
    title: "Product Management (Intern)",
    team: "Product & Business",
    location: "Remote",
    type: "internship",
    description: "Work directly with founders and engineers to scope, ship, and measure features across Ordo and Addup. Own small surfaces end to end.",
    responsibilities: [
      "Talk to users, distill insights, and turn them into crisp product specs",
      "Coordinate engineering, design, and GTM to ship features on a clear timeline",
      "Define success metrics and instrument the product to track them",
    ],
    requirements: [
      "Sharp written communication and structured thinking",
      "Comfort with data tools (SQL, spreadsheets, analytics) and writing technical specs",
      "Share your CV and a write-up of a product or project you've shipped",
    ],
  },
  {
    title: "Developer Relations (Intern)",
    team: "Developer Relations",
    location: "Remote",
    type: "internship",
    description: "Help developers love using Olyxee. Build sample apps, write tutorials, run office hours, and bring real feedback back into the product.",
    responsibilities: [
      "Build reference projects and SDK examples that ship in our docs",
      "Write technical tutorials, changelogs, and API guides",
      "Engage with our developer community and feed insights back to product",
    ],
    requirements: [
      "Strong writing and the ability to explain technical concepts simply",
      "Comfort coding in at least one of Python, TypeScript, or Go",
      "Share your CV, GitHub, blog, or any community work you've done",
    ],
  },
  {
    title: "Technical Writer (Intern)",
    team: "Developer Relations",
    location: "Remote",
    type: "internship",
    description: "Make our docs the best part of using Olyxee. Own tutorials, references, and concept guides across Ordo, Addup, and our APIs.",
    responsibilities: [
      "Write clear, accurate developer documentation for APIs, SDKs, and CLIs",
      "Audit existing docs, fix gaps, and own information architecture",
      "Pair with engineers and DevRel to turn product changes into great docs",
    ],
    requirements: [
      "Excellent writing samples in technical or developer-facing contexts",
      "Comfort reading code in at least one language and using Markdown / Git",
      "Share your CV and three writing samples (links or PDFs)",
    ],
  },
  {
    title: "Data Engineer (Intern)",
    team: "Data & AI Support",
    location: "Remote",
    type: "internship",
    description: "Build the data pipelines that power our AI evaluation, product analytics, and customer-facing reports.",
    responsibilities: [
      "Design and maintain ETL pipelines that feed model evaluation and product analytics",
      "Model data warehouses for product, finance, and ML use cases",
      "Improve data quality, lineage, and observability across pipelines",
    ],
    requirements: [
      "Strong SQL and Python; experience with at least one of dbt, Airflow, Spark, or BigQuery",
      "Comfort working with messy real-world data and untangling it",
      "Share your CV, GitHub, and any data projects you've worked on",
    ],
  },
  {
    title: "Security Engineer (Intern)",
    team: "Security & Trust",
    location: "Remote",
    type: "internship",
    description: "Help us harden Olyxee from day one. Work across application security, infrastructure, and AI-specific risks.",
    responsibilities: [
      "Review code and infrastructure for security issues and propose fixes",
      "Help build internal security tooling, automation, and threat models",
      "Investigate AI-specific risks: prompt injection, data exfiltration, model abuse",
    ],
    requirements: [
      "Strong fundamentals in web/app security or infrastructure security",
      "Comfort with at least one cloud (AWS, GCP, Azure) and reading code in Python or TS",
      "Share your CV, GitHub, CTF profiles, write-ups, or disclosed advisories",
    ],
  },
  {
    title: "Site Reliability Engineer (Intern)",
    team: "Engineering & AI",
    location: "Remote",
    type: "internship",
    description: "Keep Olyxee fast, reliable, and observable. Work on the infrastructure and tooling that lets every other team ship safely.",
    responsibilities: [
      "Improve CI/CD, deploys, observability, and on-call tooling",
      "Build and maintain Kubernetes-based infrastructure across cloud and edge",
      "Run incident drills and contribute to postmortems and reliability targets",
    ],
    requirements: [
      "Comfort with Linux, Docker, Kubernetes, and at least one cloud platform",
      "Some experience with IaC (Terraform, Pulumi) or observability stacks (Grafana, OTel)",
      "Share your CV and any infra, SRE, or DevOps work you've done",
    ],
  },
  {
    title: "Growth Marketer (Intern)",
    team: "Marketing & Growth",
    location: "Remote",
    type: "internship",
    description: "Help more of the right people find Olyxee. Run experiments across SEO, lifecycle, and content to grow Ordo and Addup.",
    responsibilities: [
      "Run growth experiments across landing pages, ads, lifecycle, and SEO",
      "Write briefs, copy, and analyze experiment results end to end",
      "Build dashboards to track funnels, activation, and retention",
    ],
    requirements: [
      "Strong written communication and a numerate, experiment-driven mindset",
      "Comfort with analytics tools (GA, Mixpanel, PostHog) and basic spreadsheets/SQL",
      "Share your CV and one growth experiment, campaign, or essay you're proud of",
    ],
  },
  {
    title: "Customer Engineer (Intern)",
    team: "Growth & Operations",
    location: "Remote",
    type: "internship",
    description: "Be the bridge between our customers and engineering. Help teams onboard, debug, and get the most out of Ordo and Addup.",
    responsibilities: [
      "Work directly with early customers to scope and integrate Olyxee",
      "Triage technical issues, file high-quality bug reports, and ship small fixes",
      "Capture customer feedback and turn it into product and docs improvements",
    ],
    requirements: [
      "Comfortable reading code in at least one language and writing clear messages",
      "Empathy, patience, and an instinct for unblocking people",
      "Share your CV and any technical, support, or community work you've done",
    ],
  },
];

export const teams = Array.from(new Set(roles.map((r) => r.team)));

export function findRoleByTitle(title: string): Role | undefined {
  const t = title.trim();
  return roles.find((r) => r.title === t);
}
