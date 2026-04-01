import { FC, useState, useRef, useCallback } from "react";
import SEO from "../components/SEO";
import Header from "../components/header";
import Footer from "../components/footer";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Shield, Brain, Eye, Activity, Lock, Sparkles, Play, ExternalLink } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const videos = [
  {
    id: "aircAruvnKk",
    title: "How AI Could Empower Any Business",
    speaker: "Andrew Ng, TED",
    description: "Why making AI accessible and reliable matters for businesses of all sizes.",
    tag: "Accessibility",
  },
  {
    id: "J6Mdq3n6kgk",
    title: "How AI Thinks and Learns",
    speaker: "CGP Grey",
    description: "A visual explanation of how machine learning works under the hood.",
    tag: "Explainer",
  },
  {
    id: "hfMk-kjRv4c",
    title: "The Danger of AI is Weirder Than You Think",
    speaker: "Janelle Shane, TED",
    description: "Why AI fails in unexpected ways, and why understanding failure modes matters.",
    tag: "AI Safety",
  },
];

function VideoCard({ video, index }: { video: typeof videos[0]; index: number }) {
  const [playing, setPlaying] = useState(false);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      custom={index}
      variants={fadeUp}
      className="group"
    >
      <div className="rounded-2xl overflow-hidden border border-neutral-200/80 bg-neutral-50 hover:shadow-lg hover:shadow-neutral-200/40 transition-all duration-300">
        <div className="relative aspect-video bg-neutral-900">
          {playing ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
              title={video.title}
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              className="absolute inset-0 w-full h-full"
            />
          ) : (
            <button
              onClick={() => setPlaying(true)}
              className="absolute inset-0 w-full h-full cursor-pointer group/play"
              aria-label={`Play ${video.title}`}
            >
              <img
                src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                alt={video.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 group-hover/play:bg-black/40 transition-colors" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center group-hover/play:scale-110 transition-transform shadow-lg">
                  <Play className="w-6 h-6 text-neutral-900 ml-1" fill="currentColor" />
                </div>
              </div>
            </button>
          )}
        </div>
        <div className="p-5 sm:p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider bg-neutral-100 px-2 py-0.5 rounded-full">{video.tag}</span>
            <span className="text-[11px] text-neutral-400">{video.speaker}</span>
          </div>
          <h3 className="text-base sm:text-lg font-semibold text-neutral-900 mb-2 leading-snug">{video.title}</h3>
          <p className="text-sm text-neutral-500 leading-relaxed font-light">{video.description}</p>
        </div>
      </div>
    </motion.div>
  );
}

function DemoVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = useCallback(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          setIsPlaying(false);
        });
      }
    }
  }, [isPlaying]);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      custom={0}
      variants={fadeUp}
      className="mb-10 sm:mb-14"
    >
      <div className="rounded-2xl sm:rounded-3xl overflow-hidden border border-neutral-200/80 shadow-xl shadow-neutral-200/30 relative bg-neutral-900">
        <div className="relative aspect-video">
          <video
            ref={videoRef}
            src="/videos/demo.mp4"
            className="w-full h-full object-cover"
            playsInline
            controls={isPlaying}
            onEnded={() => setIsPlaying(false)}
            onPause={() => setIsPlaying(false)}
            onPlay={() => setIsPlaying(true)}
          />
          {!isPlaying && (
            <button
              onClick={togglePlay}
              className="absolute inset-0 w-full h-full flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors cursor-pointer group"
              aria-label="Play demo video"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl">
                <Play className="w-7 h-7 sm:w-8 sm:h-8 text-neutral-900 ml-1" fill="currentColor" />
              </div>
            </button>
          )}
        </div>
        <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
          <div className="bg-white/80 backdrop-blur-md rounded-xl px-4 py-3 sm:px-5 sm:py-3.5 border border-white/40 shadow-lg">
            <p className="text-xs sm:text-sm font-semibold text-neutral-900">See How AI Verification Works</p>
            <p className="text-[11px] sm:text-xs text-neutral-500 mt-0.5">A quick look at the challenges we are solving</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const About: FC = () => {
  return (
    <div className="min-h-screen bg-white text-neutral-900 relative">
      <SEO title="About" description="Learn about Olyxee's mission to build reliable AI infrastructure. Our team is dedicated to AI safety, verification, and making deployment trustworthy." path="/about" />
      <div className="grain" />
      <Header />

      <section className="relative pt-28 sm:pt-44 pb-16 sm:pb-28 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/gradient-pastel.png" alt="" fill sizes="100vw" aria-hidden="true" priority className="object-cover opacity-30" />
          <div className="absolute inset-0 bg-white/80" />
        </div>
        <div className="max-w-5xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mb-14"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-100 text-neutral-500 rounded-full text-xs font-medium mb-6 uppercase tracking-widest"
            >
              About Olyxee
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-serif text-3xl sm:text-5xl lg:text-6xl text-neutral-900 tracking-tight leading-[1.1]"
            >
              We are building the trust layer
              <br />
              <em className="text-neutral-400">for artificial intelligence.</em>
            </motion.h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-base sm:text-xl text-neutral-500 leading-relaxed max-w-3xl font-light"
          >
            AI systems are growing more powerful, but not more trustworthy. Olyxee exists to change that.
          </motion.p>
        </div>
      </section>

      <section className="py-16 sm:py-24 lg:py-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={0}
              variants={fadeUp}
              className="rounded-2xl relative overflow-hidden"
            >
              <div className="absolute inset-0">
                <Image src="/images/gradient-blue-pink.png" alt="" fill sizes="(max-width: 1024px) 100vw, 50vw" aria-hidden="true" className="object-cover" />
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm" />
              </div>
              <div className="relative p-7 sm:p-12">
                <div className="w-10 h-10 rounded-xl bg-neutral-900 flex items-center justify-center mb-6">
                  <Eye className="w-5 h-5 text-white" />
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl tracking-tight mb-6">The Problem</h2>
                <div className="space-y-4 text-[15px] text-neutral-600 leading-relaxed font-light">
                  <p>
                    AI works in the lab. In production, it hallucinates, drifts, and fails unpredictably.
                  </p>
                  <p>
                    There is no standard way to verify AI before deployment or catch failures after. That gap is where most AI projects stall.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={1}
              variants={fadeUp}
              className="rounded-2xl relative overflow-hidden"
            >
              <div className="absolute inset-0">
                <Image src="/images/gradient-yellow-green.png" alt="" fill sizes="(max-width: 1024px) 100vw, 50vw" aria-hidden="true" className="object-cover" />
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm" />
              </div>
              <div className="relative p-7 sm:p-12">
                <div className="w-10 h-10 rounded-xl bg-neutral-900 flex items-center justify-center mb-6">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <h2 className="font-serif text-2xl sm:text-4xl tracking-tight mb-5 sm:mb-6">Our Answer</h2>
                <div className="space-y-4 text-[15px] text-neutral-600 leading-relaxed font-light">
                  <p>
                    Verification-first infrastructure. Test before deployment, monitor after.
                  </p>
                  <p>
                    We focus on hallucination detection, behavioral consistency, and automated evaluation.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 lg:py-32 bg-neutral-50 border-y border-neutral-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={0}
            variants={fadeUp}
            className="mb-10 sm:mb-14"
          >
            <p className="text-xs font-semibold text-neutral-400 uppercase tracking-[0.2em] mb-4">Watch & Learn</p>
            <h2 className="font-serif text-3xl sm:text-5xl tracking-tight text-neutral-900 mb-4 sm:mb-5">
              Understand our mission <em className="text-neutral-400">visually</em>
            </h2>
            <p className="text-base sm:text-lg text-neutral-500 font-light leading-relaxed max-w-2xl">
              AI safety and verification explained simply. No technical background needed.
            </p>
          </motion.div>

          <DemoVideo />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {videos.map((video, idx) => (
              <VideoCard key={video.id} video={video} index={idx + 1} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-neutral-950" />
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent blur-3xl" />
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={0}
            variants={fadeUp}
            className="mb-16 sm:mb-20"
          >
            <p className="text-xs font-semibold text-neutral-500 uppercase tracking-[0.2em] mb-4">What We Build</p>
            <h2 className="font-serif text-3xl sm:text-5xl tracking-tight text-white">
              Verification-first
              <br />
              <em className="text-neutral-500">AI infrastructure</em>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {[
              { icon: Shield, title: "Pre-deployment Testing", description: "Test AI outputs for accuracy, consistency, and safety before production." },
              { icon: Eye, title: "Hallucination Detection", description: "Identify when models fabricate information, with confidence scoring." },
              { icon: Brain, title: "Behavioral Evaluation", description: "Measure AI consistency across rephrasings and edge cases." },
              { icon: Activity, title: "Production Monitoring", description: "Detect quality degradation, drift, and failure patterns in real time." },
              { icon: Lock, title: "Compliance & Audit", description: "Audit trails for regulated industries. Every decision tracked." },
              { icon: Sparkles, title: "Open Research", description: "We publish findings and open-source tools. Safety is a shared foundation." },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  custom={idx}
                  variants={fadeUp}
                  className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-6 sm:p-8 hover:bg-white/[0.06] hover:border-white/[0.1] transition-all duration-300"
                >
                  <Icon className="w-5 h-5 text-neutral-500 mb-5" />
                  <h3 className="text-lg font-semibold text-white mb-3">{item.title}</h3>
                  <p className="text-sm text-neutral-400 leading-relaxed font-light">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 lg:py-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-start">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={0}
              variants={fadeUp}
              className="lg:col-span-2"
            >
              <p className="text-xs font-semibold text-neutral-400 uppercase tracking-[0.2em] mb-4">Our Position</p>
              <h2 className="font-serif text-3xl sm:text-5xl tracking-tight text-neutral-900 mb-5 sm:mb-6">
                Where we fit in the <em className="text-neutral-400">AI stack</em>
              </h2>
              <p className="text-neutral-500 text-[15px] leading-relaxed font-light mb-8">
                Others build bigger models. We make sure those models actually work when they reach real users.
              </p>
              <Link href="/research" className="group inline-flex items-center gap-2 text-sm font-medium text-neutral-900 hover:text-neutral-600 transition-colors">
                Read our research <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={1}
              variants={fadeUp}
              className="lg:col-span-3"
            >
              <div className="rounded-2xl overflow-hidden border border-neutral-200/80 shadow-lg shadow-neutral-200/30">
                <Image
                  src="/images/Olyxee_Position.png"
                  alt="Diagram showing Olyxee's position in the AI infrastructure stack, sitting between model development and production deployment"
                  width={800}
                  height={500}
                  className="w-full h-auto"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 lg:py-32 bg-neutral-50 border-y border-neutral-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={0}
            variants={fadeUp}
            className="mb-10 sm:mb-16"
          >
            <p className="text-xs font-semibold text-neutral-400 uppercase tracking-[0.2em] mb-4">Our Principles</p>
            <h2 className="font-serif text-3xl sm:text-5xl tracking-tight text-neutral-900">
              What drives <em className="text-neutral-400">us</em>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {[
              { title: "Reliability over novelty", description: "Better AI comes from making models more reliable, not just bigger.", icon: Shield },
              { title: "Transparency by default", description: "Every deployment explainable. Every failure traceable.", icon: Eye },
              { title: "Safety is not optional", description: "We design for the most demanding use cases first.", icon: Lock },
              { title: "Open foundations", description: "We publish research and open-source our tools. Safety is a shared foundation.", icon: Sparkles },
            ].map((value, idx) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  custom={idx}
                  variants={fadeUp}
                  className="rounded-2xl bg-white border border-neutral-200/80 p-6 sm:p-10 hover:shadow-lg hover:shadow-neutral-200/40 transition-all duration-300"
                >
                  <div className="w-9 h-9 rounded-lg bg-neutral-100 flex items-center justify-center mb-5">
                    <Icon className="w-4.5 h-4.5 text-neutral-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-3">{value.title}</h3>
                  <p className="text-sm text-neutral-500 leading-relaxed font-light">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 lg:py-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-start">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={0}
              variants={fadeUp}
              className="lg:col-span-3"
            >
              <div className="rounded-2xl overflow-hidden border border-neutral-200/80 shadow-lg shadow-neutral-200/30">
                <Image
                  src="/images/workflow.png"
                  alt="Olyxee verification workflow showing the pipeline from AI testing to production monitoring"
                  width={800}
                  height={450}
                  className="w-full h-auto"
                />
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={1}
              variants={fadeUp}
              className="lg:col-span-2"
            >
              <p className="text-xs font-semibold text-neutral-400 uppercase tracking-[0.2em] mb-4">Our Founder's Note</p>
              <blockquote className="font-serif text-xl sm:text-3xl text-neutral-900 leading-snug mb-6 sm:mb-8 italic">
                "The companies that win in AI will be the ones whose systems actually work."
              </blockquote>
              <p className="text-[15px] text-neutral-500 leading-relaxed font-light mb-5">
                We are not building another model. We are building the foundation every model needs.
              </p>
              <p className="text-[15px] text-neutral-500 leading-relaxed font-light">
                Rigorous enough for safety-critical applications. Simple enough for any team to adopt.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28 lg:py-36 bg-neutral-950 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-gradient-to-tl from-indigo-500/10 to-transparent blur-3xl" />
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            custom={0}
            variants={fadeUp}
            className="text-center"
          >
            <Image
              src="/Logo/Olyxee_Logo.png"
              alt="Olyxee"
              width={40}
              height={40}
              className="mx-auto mb-8 opacity-30 invert"
            />
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl tracking-tight mb-5 sm:mb-6">
              Join us in building
              <br />
              <em className="text-neutral-500">trustworthy AI</em>
            </h2>
            <p className="text-base sm:text-lg text-neutral-400 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed font-light">
              Researchers and engineers solving hard problems in AI safety and verification.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/careers" className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-neutral-900 rounded-full font-medium hover:bg-neutral-100 transition-all text-sm tracking-wide">
                View Open Roles <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-white border border-white/20 rounded-full font-medium hover:bg-white/10 transition-all text-sm tracking-wide">
                Get in Touch
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
