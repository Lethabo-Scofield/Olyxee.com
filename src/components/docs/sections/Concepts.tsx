import { FC } from "react";
import Image from "next/image";
import containerIllustration from "public/images/Conternazation.png";
import optimizationIllustration from "public/images/Quantization.png";
import workflowDiagram from "public/images/workflow.png";

const Concepts: FC = () => {
    const sections = [
        {
            title: "Containerization & Verification",
            description:
                "Models are packaged into secure containers just like Docker, but optimized for AI. Each container is verified before deployment to guarantee stability, performance, and hardware compatibility.",
            image: containerIllustration,
            alt: "Containerization Illustration",
        },
        {
            title: "Quantization & Performance Optimization",
            description:
                "Olyxee automatically reduces model size and accelerates computation without losing accuracy. The process ensures that even low-power hardware can run advanced AI models in real time.",
            image: optimizationIllustration,
            alt: "Quantization & Optimization",
        },
        {
            title: "Deployment Workflow",
            description:
                "The full Olyxee pipeline follows a clear and automated process:",
            subDescription: "Model → Containerize → Deploy → Verify → Run",
            extraDescription:
                "Each stage is tracked, reproducible, and optimized for developer control.",
            image: workflowDiagram,
            alt: "Deployment Workflow",
        },
    ];

    return (
        <div className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 bg-white text-gray-900">
            <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16 lg:space-y-20">
                <div className="text-center lg:text-left">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
                        Key Concepts
                    </h2>
                    <p className="text-gray-700 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto lg:mx-0">
                        These concepts define how Olyxee makes AI deployment on the edge simple, reliable, and fully automated. Each part of the system plays a role in making your models run anywhere.
                    </p>
                </div>

                <section className="w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-md">
                    <div className="relative w-full aspect-video">
                        <iframe
                            className="absolute top-0 left-0 w-full h-full rounded-xl"
                            src="https://www.youtube.com/embed/Z6aYwU8xnsA?autoplay=1&mute=1&controls=0&loop=1&playlist=Z6aYwU8xnsA&modestbranding=1&rel=0"
                            title="Edge AI Deployment Video"
                            frameBorder={0}
                            allow="autoplay; encrypted-media; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                </section>

                {sections.map((section, idx) => (
                    <section
                        key={idx}
                        className="w-full bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-md"
                    >
                        <div className="p-6 sm:p-8 lg:p-12 text-center lg:text-left">
                            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-3 sm:mb-4 text-gray-900">
                                {section.title}
                            </h3>
                            <p className="text-gray-700 text-sm sm:text-base lg:text-lg mb-4 sm:mb-6 leading-relaxed max-w-3xl mx-auto lg:mx-0">
                                {section.description}
                            </p>
                            {section.subDescription && (
                                <p className="text-gray-900 font-semibold text-base sm:text-lg lg:text-xl mb-4 sm:mb-6">
                                    {section.subDescription}
                                </p>
                            )}
                            {section.extraDescription && (
                                <p className="text-gray-700 text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 leading-relaxed max-w-3xl mx-auto lg:mx-0">
                                    {section.extraDescription}
                                </p>
                            )}
                            <div className="flex justify-center">
                                <Image
                                    src={section.image}
                                    alt={section.alt}
                                    className="w-full max-w-4xl rounded-xl object-cover"
                                />
                            </div>
                        </div>
                    </section>
                ))}

                <section className="text-center px-4 py-8 sm:py-12">
                    <p className="text-gray-500 text-sm sm:text-base lg:text-lg max-w-3xl mx-auto leading-relaxed">
                        Soon, interactive visualizations will show live model deployment, verification, and optimization in real time, making Olyxee's process even more transparent for developers.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default Concepts;
