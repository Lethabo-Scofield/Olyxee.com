import { Fragment } from "react";
import Image from "next/image";
import AudioPlayer from "../AudioPlayer";

const STORY = `# Why Olyxee Exists

*The conviction behind our founding, and the symbol that carries it.*

## A Conviction About Progress

Olyxee was founded on the conviction that meaningful progress in artificial intelligence requires more than continuously improving existing models.

Major advances in computing have historically emerged from fundamental scientific research. New mathematics, new ways of representing information and new understanding of what computation can do have repeatedly changed what machines are able to do.

We want to pursue similarly foundational questions about intelligence and computation.

## What We Investigate

Our long-term research interests include the mathematical foundations of intelligence, learning and adaptive computation, novel computational architectures, information theory and the physical principles of computation, and new mechanisms for intelligent systems.

These are research interests, not claims that we have solved these problems. We believe some of the most important discoveries in intelligent computing remain ahead of us.

## Two Ways of Working

We work in two complementary ways.

**Research for tomorrow.** Investigating fundamental questions that could contribute to future computing paradigms.

**Engineering for today.** Building useful technologies, including Orgni and Freightics, while strengthening the organisation's technical capabilities.

Our products are practical engineering work. They are not themselves fundamental scientific breakthroughs, and they do not define the limits of what we are trying to understand.

## The Meaning Behind Our Symbol

Our symbol expresses a belief about intelligence through a simple geometric idea.

At its centre are **two circles of unequal size**.

![Hand-drawn sketch of the Olyxee mark: two dots held within open arcs](/images/two-dots-sketch.webp)

They represent the uneven distribution of knowledge. Intelligence is not uniform. Different individuals, systems, and models possess different capabilities, perspectives, and amounts of information.

The larger circle does not imply superiority, nor does the smaller circle imply insignificance. Their difference represents diversity in knowledge and the possibility that each contributes something the other lacks.

Surrounding them are **open, incomplete circular forms**.

![Hand-drawn sketch of the Olyxee mark: two open half-circles around two dots](/images/half-circles-sketch.webp)

These are deliberately important to the meaning of our identity.

A closed circle suggests completeness. Our symbol remains open because we do not believe understanding is ever entirely complete.

The openings represent the ability to receive new information, encounter unfamiliar ideas, and incorporate knowledge that originates outside an existing system.

Despite their openness, the forms maintain a coherent geometric structure. The symbol is constructed through carefully proportioned circles and arcs, reflecting our commitment to mathematics, precision, and scientific reasoning.

**The two unequal dots represent knowledge in its different forms. The open circles represent the possibility of discovering what is not yet known.**

## The Future We Are Working Toward

We believe the next generation of computing will depend on deeper discoveries about intelligence, learning and computation.

Much like our symbol, we believe the future of computing remains open. There is knowledge yet to be discovered, mathematical problems yet to be solved, and computational capabilities yet to be realised.

That openness is not a limitation.

**It is the reason Olyxee exists.**`;

// Only the emphasis used in this fixed story is supported; text stays escaped.
function emphasis(text: string) {
  return text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|https?:\/\/\S+)/g).map((part, index) => {
    if (part.startsWith("**")) {
      return <strong key={index} className="font-semibold text-neutral-900">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("*")) return <em key={index}>{part.slice(1, -1)}</em>;
    if (/^https?:\/\//.test(part)) {
      return <a key={index} href={part} target="_blank" rel="noopener noreferrer" className="break-all font-medium text-neutral-900 underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-900">{part.replace(/^https?:\/\/(www\.)?/, "")}</a>;
    }
    return <Fragment key={index}>{part}</Fragment>;
  });
}

export default function OurStory() {
  return (
    <article className="max-w-[40rem] mx-auto text-[1.0625rem] sm:text-[1.1875rem] text-neutral-700 leading-[1.8] antialiased">
      {STORY.split("\n\n").map((block, index) => {
        if (block.startsWith("# ")) {
          return (
            <Fragment key={index}>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-[3.5rem] text-neutral-900 tracking-tight leading-[1.08] mb-6 text-balance">{block.slice(2)}</h2>
              <AudioPlayer
                src="/audio/olyxee-blueprint-for-organizational-intelligence.m4a"
                title="Listen to the Olyxee story"
              />
            </Fragment>
          );
        }
        if (block.startsWith("## ")) {
          return (
            <h3 key={index} className="font-serif text-2xl sm:text-[2rem] text-neutral-900 tracking-tight leading-[1.2] mt-20 sm:mt-24 mb-7 pt-8 border-t border-neutral-200 text-balance">
              {block.slice(3)}
            </h3>
          );
        }
        if (block.startsWith("### ")) {
          return <h4 key={index} className="font-serif text-xl sm:text-2xl text-neutral-900 tracking-tight leading-snug mt-12 mb-4">{block.slice(4)}</h4>;
        }
        const img = block.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
        if (img) {
          return (
            <figure key={index} className="my-8 flex justify-center">
              <Image src={img[2]} alt={img[1]} width={1257} height={1257} sizes="(min-width: 640px) 240px, 60vw" className="h-auto w-full max-w-[15rem]" />
            </figure>
          );
        }
        if (/^https?:\/\/\S+$/.test(block)) {
          return <p key={index} className="mb-6"><a href={block} target="_blank" rel="noopener noreferrer" className="break-all font-medium text-neutral-900 underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-900">{block.replace(/^https?:\/\/(www\.)?/, "")}</a></p>;
        }
        if (block === "---") return <hr key={index} className="border-neutral-200 mt-16 mb-10" />;
        if (/^\*[^*]+\*$/.test(block)) {
          return <p key={index} className="mb-10 text-xl sm:text-[1.375rem] leading-relaxed text-neutral-500 font-serif italic">{block.slice(1, -1)}</p>;
        }
        if (/^\*\*[^*]+\*\*$/.test(block)) {
          return (
            <blockquote key={index} className="my-10 border-l-2 border-neutral-900 pl-6 font-serif text-2xl sm:text-[1.75rem] leading-snug text-neutral-900">
              {block.slice(2, -2)}
            </blockquote>
          );
        }
        if (/^".+"$/.test(block)) {
          return (
            <blockquote key={index} className="my-10 border-l-2 border-neutral-900 pl-6 font-serif text-2xl sm:text-[1.75rem] leading-snug text-neutral-900">
              &ldquo;{block.slice(1, -1)}&rdquo;
            </blockquote>
          );
        }
        if (block.includes("\n")) {
          return <p key={index} className="mb-6 -mt-4">{block.split("\n").map((line, i) => <Fragment key={i}>{i > 0 && <br />}{emphasis(line)}</Fragment>)}</p>;
        }
        return <p key={index} className="mb-6">{emphasis(block)}</p>;
      })}
    </article>
  );
}
