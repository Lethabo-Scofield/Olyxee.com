import { FC } from "react";

const resourcesList = [
    {
        title: "Official Guides",
        description: "Step-by-step guides to deploying AI models on edge devices using Olyxee.",
        link: "*",
    },
    {
        title: "API Reference",
        description: "Detailed documentation for all Olyxee APIs and endpoints.",
        link: "*",
    },
    {
        title: "Community Forums",
        description: "Connect with other developers, ask questions, and share insights.",
        link: "*",
    },
    {
        title: "Tutorial Videos",
        description: "Watch videos on setting up, optimizing, and deploying models with Olyxee.",
        link: "*",
    },
    {
        title: "Release Notes",
        description: "Track updates, bug fixes, and new features for Olyxee platform.",
        link: "*",
    },
];

const Resources: FC = () => {
    return (
        <div className="w-full px-4 sm:px-6 lg:px-8 py-12 bg-white text-gray-900">
            <div className="max-w-7xl mx-auto space-y-12">
                <div className="text-center">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                        Resources
                    </h2>
                    <p className="text-gray-600 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto">
                        Explore guides, tutorials, API references, and community links to help you get the most out of Olyxee.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
                    {resourcesList.map((resource, idx) => (
                        <a
                            key={idx}
                            href={resource.link}
                            className="block bg-gray-50 rounded-2xl shadow-md p-6 sm:p-8 transition-all hover:scale-105 hover:shadow-lg"
                        >
                            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2">
                                {resource.title}
                            </h3>
                            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                                {resource.description}
                            </p>
                        </a>
                    ))}
                </div>

                <div className="text-center px-4 py-8 sm:py-12">
                    <p className="text-gray-500 text-sm sm:text-base lg:text-lg max-w-3xl mx-auto leading-relaxed">
                        More resources and tutorials coming soon. Stay tuned for updates!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Resources;
