import { Fragment } from "react";
import Image from "next/image";
import AudioPlayer from "../AudioPlayer";

const STORY = `# Olyxee: Intelligence Emerges Through Connection

*The story behind our founding, our symbol, and the future we believe is possible.*

## Why Olyxee Exists

There is something fascinating about intelligence. It rarely exists as a complete, isolated body of knowledge.

In organisations, knowledge is distributed across people, systems, data, mathematical models, and years of accumulated experience. Each holds a different part of a much larger picture.

A financial analyst may understand patterns that a compliance specialist does not. A mathematical model may identify relationships that are difficult for humans to recognise. A business policy may establish constraints that a neural network has never learned.

Each possesses something valuable. None necessarily possesses the whole.

Olyxee began with a question: **What if organisations could become smarter themselves, rather than simply using intelligent tools?**

That question led us beyond connecting information. It led us towards investigating how different forms of intelligence could interact, reason, and contribute to a deeper computational understanding of complex systems.

## The Meaning Behind Our Symbol

Our symbol expresses this belief through a simple geometric idea.

At its centre are **two circles of unequal size**.

![Hand-drawn sketch of the Olyxee mark: two dots held within open arcs](/images/two-dots-sketch.webp)

They represent the uneven distribution of knowledge. Intelligence is not uniform. Different individuals, systems, and models possess different capabilities, perspectives, and amounts of information.

The larger circle does not imply superiority, nor does the smaller circle imply insignificance. Their difference represents diversity in knowledge and the possibility that each contributes something the other lacks.

Surrounding them are **open, incomplete circular forms**.

![Hand-drawn sketch of the Olyxee mark: two open half-circles around two dots](/images/half-circles-sketch.webp)

These are deliberately important to the meaning of our identity.

A closed circle suggests completeness. Our symbol remains open because we do not believe understanding is ever entirely complete.

The openings represent the ability to receive new information, encounter unfamiliar ideas, and incorporate knowledge that originates outside an existing system.

The curved forms connect the central elements without enclosing them completely. They suggest that knowledge can move, relationships can develop, and understanding can expand as new evidence emerges.

Despite their openness, the forms maintain a coherent geometric structure. The symbol is constructed through carefully proportioned circles and arcs, reflecting our commitment to mathematics, precision, and scientific reasoning.

**The two unequal dots represent knowledge in its different forms. The open circles represent the possibility of discovering what is not yet known. Their relationship represents intelligence emerging through connection.**

This is the philosophy behind Olyxee.

Not the belief that every system must possess all knowledge, but that meaningful intelligence can emerge when different forms of knowledge interact within structures capable of accommodating new information.

## From Connection to Computational Understanding

Our founding idea has developed into a broader scientific ambition.

Artificial intelligence has demonstrated extraordinary progress in learning statistical relationships, recognising patterns, and interpreting information.

Yet intelligence involves more than identifying patterns.

It also involves reasoning about relationships, understanding constraints, evaluating consequences, and responding to changing circumstances.

This is why our research direction centres on **Neuro-Symbolic Intelligence and Autonomous Adaptive Systems**.

Neuro-symbolic intelligence brings statistical learning together with explicit knowledge, mathematical relationships, and logical reasoning.

Autonomous adaptive systems investigate how computational systems can respond to changing environments through feedback and decision-making.

Together, these fields provide a foundation for exploring how computational systems can develop richer representations of the environments in which they operate.

Our long-term ambition is to advance computational understanding and translate scientific progress into foundational software infrastructure.

## Beginning with Financial Computing

We are beginning with finance, a domain where statistical uncertainty and mathematical precision must coexist.

Our research initiative, **FinIR (Financial Intermediate Representation)**, explores how financial operations can be represented and executed through explicit computational structures rather than depending entirely on probabilistic AI outputs.

FinIR reflects an important principle in our research: learned intelligence and structured mathematical reasoning have distinct strengths, and their integration can provide a stronger foundation for computational systems.

Explore our research: https://www.olyxee.com/research/finir

## The Future We Believe Is Possible

We believe the next generation of computing will emerge from advances that bring learning, knowledge representation, reasoning, and autonomous adaptation closer together.

Our ambition extends beyond financial computing, beyond individual AI models, and beyond today's enterprise applications.

We envision infrastructure through which computational systems can work with increasingly sophisticated representations of complex environments, making new forms of intelligent software possible.

Much like our symbol, we believe the future of computing remains open.

There is knowledge yet to be discovered, mathematical problems yet to be solved, and computational capabilities yet to be realised.

That openness is not a limitation.

**It is the reason Olyxee exists.**

## A Message from Our Founder & CEO

"The greatest breakthroughs in AI computing are still ahead of us, and we intend to contribute to the science that makes them possible."

**Lethabo Innocent Makonto**
Founder & CEO, Olyxee`;

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
                title="Olyxee's Blueprint for Organizational Intelligence"
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
