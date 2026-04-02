import { FC } from "react";
import Image from "next/image";

const Concepts: FC = () => {
  return (
    <div className="w-full max-w-3xl mx-auto px-6 sm:px-8 py-10 sm:py-14">
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-3">Key Concepts</h1>
        <p className="text-gray-500 text-lg leading-relaxed">
          Core concepts that define how Olyxee makes AI deployment reliable and automated.
        </p>
      </div>

      <div className="space-y-10 text-gray-700 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100">Containerization</h2>
          <p>
            Models are packaged into secure, self-contained units, similar to Docker containers but optimized for AI workloads. Each container includes the model, its dependencies, runtime configuration, and hardware-specific optimizations.
          </p>
          <p className="mt-3">
            Containers are verified before deployment to guarantee stability, performance, and hardware compatibility. This ensures that what you test is exactly what runs in production.
          </p>
          <div className="mt-6 rounded-xl overflow-hidden border border-gray-200">
            <Image
              src="/images/Conternazation.png"
              alt="Containerization process"
              width={800}
              height={400}
              className="w-full object-cover"
            />
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100">Quantization</h2>
          <p>
            Quantization reduces model size and accelerates inference by converting floating-point weights to lower-precision formats (FP16, INT8, INT4). Olyxee automatically selects the optimal quantization strategy for your target hardware.
          </p>
          <p className="mt-3">
            The process includes calibration using representative data to minimize accuracy loss, and verification to ensure the quantized model meets your accuracy requirements.
          </p>
          <div className="mt-6 rounded-xl overflow-hidden border border-gray-200">
            <Image
              src="/images/Quantization.png"
              alt="Quantization process"
              width={800}
              height={400}
              className="w-full object-cover"
            />
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100">Deployment pipeline</h2>
          <p>
            The full Olyxee pipeline follows a clear, automated process:
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2 text-sm font-medium">
            {["Model", "Containerize", "Optimize", "Verify", "Deploy", "Monitor"].map((step, i) => (
              <span key={step} className="flex items-center gap-2">
                <span className="bg-gray-100 border border-gray-200 rounded-lg px-3 py-1.5 text-gray-900">{step}</span>
                {i < 5 && <span className="text-gray-400">→</span>}
              </span>
            ))}
          </div>
          <p className="mt-4">
            Each stage is tracked, reproducible, and optimized for developer control. You can inspect the output of any stage, override defaults, and re-run individual steps.
          </p>
          <div className="mt-6 rounded-xl overflow-hidden border border-gray-200">
            <Image
              src="/images/workflow.png"
              alt="Deployment workflow"
              width={800}
              height={400}
              className="w-full object-cover"
            />
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-100">Hardware abstraction</h2>
          <p>
            Grysics provides a unified interface across all supported hardware targets. You write your deployment configuration once, and the platform handles device-specific details: driver compatibility, memory management, runtime selection, and performance tuning.
          </p>
          <p className="mt-3">
            This means the same model and configuration can target an NVIDIA Jetson, a Raspberry Pi, or an ESP32 microcontroller without changes to your code.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Concepts;
