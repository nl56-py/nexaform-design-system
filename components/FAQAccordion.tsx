'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

type FAQItem = {
  question: string;
  answer: string;
};

const faqs: FAQItem[] = [
  {
    question: 'How long does a typical project take?',
    answer:
      'Timeline varies by scope, but most projects move from discovery to launch in 3-6 months. We focus on clear milestones and predictable delivery.',
  },
  {
    question: 'What is your approach to ongoing support?',
    answer:
      'We offer maintenance plans that include updates, monitoring, and feature improvements so your system keeps working well over time.',
  },
  {
    question: 'Can you work with existing teams and tools?',
    answer:
      'Yes. We integrate with existing workflows and systems while providing clear documentation and collaboration processes.',
  },
];

export function FAQAccordion({ className }: { className?: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className={`space-y-4 ${className ?? ''}`}>
      {faqs.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.question} className="rounded-2xl border border-border bg-panel p-5 shadow-panel">
            <button
              type="button"
              className="flex w-full items-start justify-between gap-4 text-left"
              onClick={() => setOpenIndex(isOpen ? null : index)}
            >
              <div>
                <p className="text-base font-semibold text-textPrimary">{item.question}</p>
                <p className="mt-2 text-sm text-textSecondary">
                  {isOpen ? item.answer : `${item.answer.slice(0, 100)}...`}
                </p>
              </div>
              <ChevronDown
                className={`h-5 w-5 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}
              />
            </button>
          </div>
        );
      })}
    </div>
  );
}
