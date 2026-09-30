import Image from "next/image";

export default function CareerRoleBanner({ title }: { title: string }) {
  return (
    <div className="relative flex min-h-[240px] w-full items-end overflow-hidden rounded-2xl bg-neutral-900 sm:min-h-[300px] lg:min-h-[340px]">
      <Image
        src="/images/careers-event.jpeg"
        alt="An Olyxee presentation with an audience seated in front of the stage."
        fill
        priority
        unoptimized
        sizes="(max-width: 640px) calc(100vw - 40px), (max-width: 1024px) calc(100vw - 64px), 960px"
        className="object-cover object-[center_52%]"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/5" />
      <h1 className="relative z-10 max-w-4xl break-words p-6 text-3xl font-medium leading-[1.08] tracking-[-0.04em] text-white sm:p-8 sm:text-5xl lg:p-10 lg:text-6xl">
        {title}
      </h1>
    </div>
  );
}