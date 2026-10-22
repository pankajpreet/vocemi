"use client";

import { useState } from "react";

export default function FaqList({
  faqs,
  idPrefix = "faq",
}: {
  faqs: { question: string; answer: string }[];
  idPrefix?: string;
}) {
  return (
    <div className="flex flex-col border-y border-ink/10">
      {faqs.map((faq, index) => (
        <FaqItem
          key={faq.question}
          question={faq.question}
          answer={faq.answer}
          index={index}
          idPrefix={idPrefix}
        />
      ))}
    </div>
  );
}

function FaqItem({
  question,
  answer,
  index,
  idPrefix,
}: {
  question: string;
  answer: string;
  index: number;
  idPrefix: string;
}) {
  const [open, setOpen] = useState(false);
  const buttonId = `${idPrefix}-question-${index}`;
  const panelId = `${idPrefix}-answer-${index}`;

  return (
    <div className="border-b border-ink/10 last:border-b-0">
      <button
        id={buttonId}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left font-display text-[17px] font-bold text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
      >
        <span>{question}</span>
        <span aria-hidden="true" className="text-brand text-xl leading-none">
          {open ? "–" : "+"}
        </span>
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={`grid transition-[grid-template-rows] duration-200 ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p className="text-[15.5px] leading-[1.65] text-ink/75 m-0 pb-5">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}
