'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Header from "@/components/header";
import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

export default function NRNArticle() {
    const keyMetrics = [
        { label: "Explainability Score", value: "92%" },
        { label: "Edge Deployment Efficiency", value: "87%" },
        { label: "Multi-Path Feature Coverage", value: "95%" },
        { label: "Model Debug Time Reduction", value: "45%" },
    ];

    return (
        <article className="w-full min-h-screen bg-white text-gray-900 font-mono">
            <Header />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-5xl mx-auto px-6 py-16 flex flex-col gap-16"
            >
                <header className="flex flex-col gap-8">
                    <h1 className="text-5xl sm:text-6xl font-extrabold text-black leading-tight">
                        Neural Reality Network (NRN) by Olyxee
                    </h1>
                    <p className="text-gray-700 text-lg sm:text-xl max-w-3xl">
                        NRN is a next-generation interpretable AI system for multi-path feature analysis,
                        delivering real-time insights into AI decision-making. Designed for edge deployment
                        and research, it bridges the gap between raw neural computation and human-understandable reasoning.
                    </p>

                    <div className="mt-8">
                        <h2 className="text-2xl sm:text-3xl font-semibold mb-3 inline-block px-2 py-1 bg-pink-400/40 rounded">
                            Without NRN
                        </h2>
                        <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden">
                            <Image
                                src="/products/nrn/image.png"
                                alt="Without NRN"
                                fill
                                className="object-contain"
                            />
                        </div>
                    </div>

                    <div className="mt-8">
                        <h2 className="text-2xl sm:text-3xl font-semibold mb-3 inline-block px-2 py-1 bg-pink-400/40 rounded">
                            With NRN
                        </h2>
                        <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden">
                            <Image
                                src="/products/nrn/NRN_Archi.png"
                                alt="With NRN"
                                fill
                                className="object-contain"
                            />
                        </div>
                    </div>

                </header>

                {/* Introduction */}
                <section className="flex flex-col gap-4">
                    <h2 className="text-3xl font-semibold text-black">Introduction</h2>
                    <p className="text-gray-700 text-base leading-relaxed">
                        Modern AI systems excel at prediction but often fail at explainability. NRN introduces
                        interpretable pathways that highlight the reasoning behind each decision.
                        Unlike traditional neural networks, NRN traces feature contributions at multiple levels,
                        providing actionable insights for developers, researchers, and end-users.
                    </p>
                </section>

                {/* How NRN Works */}
                <section className="flex flex-col gap-4">
                    <h2 className="text-3xl font-semibold text-black">How NRN Works</h2>
                    <p className="text-gray-700 text-base leading-relaxed">
                        NRN processes input data through a multi-path neural architecture. Each path evaluates
                        distinct features and computes intermediate explanations. The outputs are then
                        aggregated into an interpretable summary without compromising performance.
                    </p>
                    <div className="relative w-full h-120 overflow-hidden">
                        <Image
                            src="/Products/nrn/nrn_system_digram.png"
                            alt="NRN Architecture"
                            fill
                            className="object-cover"
                        />
                    </div>
                </section>

                {/* Key Metrics */}
                <section className="flex flex-col gap-4">
                    <h2 className="text-3xl font-semibold text-black">Key Metrics</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {keyMetrics.map((metric) => (
                            <div key={metric.label} className="bg-gray-50 p-4 rounded-lg text-center border border-gray-200">
                                <p className="text-gray-600 text-sm">{metric.label}</p>
                                <p className="text-black font-bold text-lg mt-1">{metric.value}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Example Calculation */}
                <section className="flex flex-col gap-4">
                    <h2 className="text-3xl font-semibold text-black">Example Calculations</h2>
                    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 space-y-4">
                        <p className="text-gray-800 text-sm">
                            Total features detected in input: <InlineMath math="N_{total} = 120" />
                        </p>
                        <p className="text-gray-800 text-sm">
                            Features contributing to decision path: <InlineMath math="N_{used} = 114" />
                        </p>
                        <p className="text-gray-800 text-sm">
                            Interpretability ratio: <BlockMath math="\text{IR} = \frac{N_{used}}{N_{total}} = \frac{114}{120} \approx 0.95" />
                        </p>
                        <p className="text-gray-800 text-sm">
                            Explainability Score: <BlockMath math="ES = IR \times 100 = 0.95 \times 100 = 95\%" />
                        </p>
                        <p className="text-gray-800 text-sm">
                            Edge Deployment Efficiency (example): <BlockMath math="EDE = \frac{Model_{Runtime\_Edge}}{Model_{Runtime\_Base}} \times 100 = \frac{0.87s}{1.0s} \times 100 \approx 87\%" />
                        </p>
                    </div>
                </section>

                {/* Deployment & Research */}
                <section className="flex flex-col gap-4">
                    <h2 className="text-3xl font-semibold text-black">Deployment & Research</h2>
                    <p className="text-gray-700 text-base leading-relaxed">
                        NRN is optimized for edge devices including NVIDIA Jetson, Raspberry Pi, and IoT boards.
                        Its interpretable architecture allows rapid debugging and model verification, making it
                        ideal for research applications and production environments.
                    </p>
                </section>

                {/* Call-to-Action */}
                <section className="flex gap-4 mt-6">
                    <button className="px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-900 transition-all">
                        Learn More
                    </button>
                    <button className="px-6 py-3 bg-gray-200 text-black rounded-lg font-semibold hover:bg-gray-300 transition-all">
                        Deploy NRN
                    </button>
                </section>
            </motion.div>
        </article>
    );
}
