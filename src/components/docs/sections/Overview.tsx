import { FC, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Rocket, BookOpen, Zap, Clipboard } from "lucide-react";
import { Highlight } from "prism-react-renderer";
import { motion } from "framer-motion";
import copy from "copy-to-clipboard";
import { useInView } from "react-intersection-observer";

// Light theme for Prism
const theme = {
    plain: { color: "#333", backgroundColor: "#f5f5f5" },
    styles: [
        { types: ["comment"], style: { color: "#6a9955" } },
        { types: ["string"], style: { color: "#a31515" } },
        { types: ["number"], style: { color: "#098658" } },
        { types: ["keyword"], style: { color: "#0000ff" } },
        { types: ["function"], style: { color: "#795e26" } },
    ],
};

const Overview: FC = () => {
    const codeExample = `#include <Olyxee.h>

OlyxeeModel model;

void setup() {
  Serial.begin(115200);
  
  // Initialize model on Jetson Nano
  model.load("/models/my_model.onnx");
  
  // Run inference on a sample input
  float result = model.predict({1.0, 2.0, 3.0});
  
  Serial.println("Prediction result: " + String(result));
}

void loop() {
  // Optional: continuous monitoring or deployment tasks
}`;

    const [typedCode, setTypedCode] = useState("");
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
    const [showCursor, setShowCursor] = useState(true);

    useEffect(() => {
        if (!inView) return;
        let current = 0;
        const interval = setInterval(() => {
            current++;
            setTypedCode(codeExample.slice(0, current));
            if (current >= codeExample.length) clearInterval(interval);
        }, 20);
        return () => clearInterval(interval);
    }, [inView]);

    useEffect(() => {
        const cursorInterval = setInterval(() => {
            setShowCursor((prev) => !prev);
        }, 500);
        return () => clearInterval(cursorInterval);
    }, []);

    const handleCopy = () => {
        copy(codeExample);
        alert("Code copied to clipboard!");
    };

    const featureCards = [
        { title: "Fast Deployment", description: "Deploy models to edge devices in minutes with automated optimization" },
        { title: "Hardware Agnostic", description: "Works across Jetson, Raspberry Pi, and other edge platforms" },
        { title: "Production Ready", description: "Built-in verification and monitoring for reliable deployments" },
    ];

    return (
        <div className="w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-10 lg:py-12 bg-white text-gray-900">
            <div className="max-w-7xl mx-auto space-y-10 sm:space-y-14 lg:space-y-16">
                <div className="space-y-4 sm:space-y-6">
                    <h1 className="text-4xl sm:text-5xl lg:text-4xl font-bold leading-tight">Overview</h1>
                    <p className="text-gray-700 text-base sm:text-lg lg:text-xl leading-relaxed max-w-4xl">
                        Welcome to Olyxee. Deploy AI models to edge devices quickly and reliably using WAVE, our unified deployment platform.
                    </p>
                </div>

                {/* Quickstart Section */}
                <section className="bg-gray-50 border border-gray-200 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-md">
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">
                        <div className="flex-1 space-y-5 sm:space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-gray-100 rounded-lg"><Rocket className="w-6 h-6 sm:w-7 sm:h-7 text-gray-800" /></div>
                                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900">Open Olyxee Platform</h2>
                            </div>

                            <div className="space-y-3 sm:space-y-4">
                                <h3 className="text-xl sm:text-2xl font-medium text-gray-800 flex items-center gap-2">
                                    <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" /> Developer Quickstart
                                </h3>
                                <p className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed">
                                    Deploy your first AI model on an edge device in minutes. This example shows a simple Arduino-like deployment to a Jetson or similar edge hardware.
                                </p>
                            </div>

                            <div className="pt-2">
                                <motion.div whileHover={{ scale: 1.05, boxShadow: "0 8px 20px rgba(0,0,0,0.1)" }} transition={{ type: "spring", stiffness: 300 }}>
                                    <a href="https://calendly.com/scofieldx911/30min" target="_blank" rel="noopener noreferrer" className="inline-block">
                                        <Button size="lg" className="bg-gray-900 text-white hover:bg-gray-800 transition-all duration-200 text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 shadow-md">
                                            Get Started
                                        </Button>
                                    </a>
                                </motion.div>
                            </div>
                        </div>

                        <div className="flex-1 w-full min-w-0 relative" ref={ref}>
                            <motion.div whileHover={{ scale: 1.02, boxShadow: "0 12px 40px rgba(0,0,0,0.08)" }} transition={{ type: "spring", stiffness: 200 }} className="rounded-xl sm:rounded-2xl overflow-hidden shadow-md border border-gray-200 bg-gray-50">
                                <div className="px-4 py-2 border-b border-gray-200 flex items-center justify-between">
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                    </div>
                                    <span className="text-gray-500 text-xs ml-2">main.cpp</span>
                                    <button onClick={handleCopy} className="flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-200 transition">
                                        <Clipboard className="w-4 h-4 text-gray-600" /><span className="text-gray-600 text-xs">Copy</span>
                                    </button>
                                </div>

                                <Highlight code={typedCode + (showCursor ? "|" : "")} language="cpp" theme={theme}>
                                    {({ className, style, tokens, getLineProps, getTokenProps }) => (
                                        <pre className={`${className} p-4 sm:p-5 overflow-x-auto text-xs sm:text-sm leading-relaxed max-h-[400px] overflow-y-auto`} style={style}>
                                            {tokens.map((line, i) => (
                                                <div key={i} {...getLineProps({ line, key: i })}>
                                                    {line.map((token, key) => (
                                                        <span key={key} {...getTokenProps({ token, key })} />
                                                    ))}
                                                </div>
                                            ))}
                                        </pre>
                                    )}
                                </Highlight>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Next Steps */}
                <section className="bg-gray-50 border border-gray-200 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-md">
                    <div className="space-y-5 sm:space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-gray-100 rounded-lg"><BookOpen className="w-6 h-6 sm:w-7 sm:h-7 text-gray-800" /></div>
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900">Next Steps</h2>
                        </div>
                        <p className="text-gray-700 text-sm sm:text-base lg:text-lg leading-relaxed max-w-4xl">
                            Explore the sidebar to quickly navigate concepts, guides, API references, and resources. Use the Live Assistant for quick guidance.
                        </p>
                    </div>
                </section>

                {/* Feature Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {featureCards.map((card, idx) => (
                        <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5, delay: idx * 0.15 }} whileHover={{ scale: 1.03, boxShadow: "0 12px 24px rgba(0,0,0,0.08)" }} className="bg-gray-50 border border-gray-200 rounded-xl sm:rounded-2xl p-5 sm:p-6 transition-all duration-300">
                            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">{card.title}</h3>
                            <p className="text-gray-700 text-sm sm:text-base">{card.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Overview;
