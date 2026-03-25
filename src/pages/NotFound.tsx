import { FC } from "react";
import Lottie from "lottie-react";
import constructionAnimation from "@/assets/animations/site under construction.json";

const NotFound: FC = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-white text-gray-900 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl text-center space-y-8">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold">
          Resources Coming Soon
        </h2>
        <p className="text-gray-600 text-base sm:text-lg lg:text-xl">
          This section is under construction. All links currently redirect here.
        </p>
        <div className="w-64 sm:w-80 lg:w-96 mx-auto">
          <Lottie animationData={constructionAnimation} loop={true} />
        </div>
        <p className="text-gray-500 text-sm sm:text-base lg:text-lg leading-relaxed">
          Check back later for full resources including tutorials, community links, and updates.
        </p>
      </div>
    </div>
  );
};

export default NotFound;
