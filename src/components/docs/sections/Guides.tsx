import { FC, useState } from "react";
import { Play, ExternalLink, BookOpen } from "lucide-react";

const Guides: FC = () => {
    const [loadedVideos, setLoadedVideos] = useState<Set<number>>(new Set());

    const steps = [
        {
            title: "1. Upload Your Model",
            description:
                "Select your AI model (ONNX, PyTorch, or TensorFlow) and upload it to the Olyxee platform. We automatically detect the framework and version.",
            videoUrl: "https://www.youtube.com/embed/P54zzvqnVLk?autoplay=0&mute=1&controls=1",
            thumbnail: "https://img.youtube.com/vi/P54zzvqnVLk/maxresdefault.jpg",
            duration: "3 min",
        },
        {
            title: "2. Containerize & Optimize",
            description:
                "Olyxee packages your model into a secure container and applies optimizations like quantization and hardware-specific tuning to ensure maximum performance.",
            videoUrl: "https://www.youtube.com/embed/P54zzvqnVLk?autoplay=0&mute=1&controls=1",
            thumbnail: "https://img.youtube.com/vi/P54zzvqnVLk/maxresdefault.jpg",
            duration: "5 min",
        },
        {
            title: "3. Deploy to Edge Devices",
            description:
                "Deploy your model to any supported edge device, such as Jetson, Raspberry Pi, or Arduino boards, with a single click.",
            videoUrl: "https://www.youtube.com/embed/P54zzvqnVLk?autoplay=0&mute=1&controls=1",
            thumbnail: "https://img.youtube.com/vi/P54zzvqnVLk/maxresdefault.jpg",
            duration: "4 min",
        },
        {
            title: "4. Monitor & Verify",
            description:
                "The platform provides real-time verification and monitoring to ensure your model is running efficiently and correctly on the device.",
            videoUrl: "https://www.youtube.com/embed/P54zzvqnVLk?autoplay=0&mute=1&controls=1",
            thumbnail: "https://img.youtube.com/vi/P54zzvqnVLk/maxresdefault.jpg",
            duration: "4 min",
        },
    ];

    const handlePlayVideo = (idx: number) => {
        setLoadedVideos(new Set(loadedVideos).add(idx));
    };

    return (
        <div className="w-full px-4 sm:px-6 lg:px-8 py-16 bg-white text-gray-900">
            <div className="max-w-7xl mx-auto space-y-20">
                {/* Header Section */}
                <div className="text-center lg:text-left space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium mb-4">
                        <BookOpen className="w-4 h-4" />
                        <span>Step-by-Step Tutorials</span>
                    </div>
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                        Guides & Tutorials
                    </h2>
                    <p className="text-gray-600 text-lg sm:text-xl lg:text-2xl max-w-3xl mx-auto lg:mx-0 leading-relaxed">
                        Learn how Olyxee works, step by step. From uploading your AI model to deployment and monitoring on edge devices, these guides will help you get started quickly.
                    </p>
                </div>

                {/* Steps */}
                {steps.map((step, idx) => (
                    <section
                        key={idx}
                        className="w-full rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100"
                        style={{
                            background: idx % 2 === 0 
                                ? 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)' 
                                : 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)'
                        }}
                    >
                        <div
                            className={`p-8 sm:p-10 lg:p-16 flex flex-col ${
                                idx % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                            } items-center gap-10 lg:gap-16`}
                        >
                            {/* Text Content */}
                            <div className="flex-1 space-y-6 text-center lg:text-left">
                                <div className="inline-block px-3 py-1 bg-white rounded-full text-xs font-semibold text-gray-500 shadow-sm">
                                    {step.duration}
                                </div>
                                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                                    {step.title}
                                </h3>
                                <p className="text-gray-600 text-base sm:text-lg lg:text-xl leading-relaxed">
                                    {step.description}
                                </p>
                                <button className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg">
                                    <span>View Full Guide</span>
                                    <ExternalLink className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Video Container */}
                            <div className="flex-1 w-full">
                                <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-500 hover:scale-[1.02] hover:shadow-3xl bg-gray-900">
                                    {!loadedVideos.has(idx) ? (
                                        // Thumbnail with Play Button
                                        <button
                                            onClick={() => handlePlayVideo(idx)}
                                            className="absolute inset-0 w-full h-full group cursor-pointer"
                                            aria-label={`Play video: ${step.title}`}
                                        >
                                            <img
                                                src={step.thumbnail}
                                                alt={step.title}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="w-20 h-20 flex items-center justify-center rounded-full bg-white/95 shadow-2xl transform transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-600">
                                                    <Play className="w-10 h-10 text-gray-900 group-hover:text-white ml-1 transition-colors duration-300" fill="currentColor" />
                                                </div>
                                            </div>
                                            <div className="absolute bottom-4 left-4 right-4 text-white">
                                                <p className="text-sm font-medium drop-shadow-lg">Click to watch tutorial</p>
                                            </div>
                                        </button>
                                    ) : (
                                        // Loaded Video
                                        <iframe
                                            className="absolute top-0 left-0 w-full h-full"
                                            src={step.videoUrl}
                                            title={step.title}
                                            frameBorder="0"
                                            allow="autoplay; encrypted-media; picture-in-picture"
                                            allowFullScreen
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>
                ))}

                {/* Footer CTA */}
                <section className="text-center px-4 py-12 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl border border-blue-100">
                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                        Ready to Get Started?
                    </h3>
                    <p className="text-gray-600 text-base sm:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed mb-8">
                        Follow these steps to see how easy it is to deploy AI models on edge devices with Olyxee. Each guide is interactive and updated with the latest platform features.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                            Start Your First Deployment
                        </button>
                        <button className="px-8 py-4 bg-white hover:bg-gray-50 text-gray-900 rounded-xl font-semibold transition-all duration-300 border-2 border-gray-200 hover:border-gray-300">
                            Browse Documentation
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Guides;