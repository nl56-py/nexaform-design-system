'use client';

import { useState } from 'react';
import { PrimaryButton } from './PrimaryButton';

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  return (
    <form
      className="grid gap-6 rounded-2xl border border-border bg-panel p-8 shadow-panel"
      onSubmit={(event) => {
        event.preventDefault();
        setStatus('sending');
        setTimeout(() => setStatus('success'), 800);
      }}
    >
      <div className="space-y-3">
        <h3 className="text-xl font-semibold text-textPrimary">Tell us about your project</h3>
        <p className="text-sm text-textSecondary">
          Share the workflow, product idea, or operational challenge you want us to improve.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-sm text-textSecondary">
          <span className="font-medium text-textPrimary">Full Name</span>
          <input
            name="name"
            type="text"
            required
            placeholder="Jane Doe"
            className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-textPrimary outline-none placeholder:text-textSecondary focus:border-accentPrimary focus:ring-2 focus:ring-accentPrimary/15"
          />
        </label>
        <label className="grid gap-2 text-sm text-textSecondary">
          <span className="font-medium text-textPrimary">Email Address</span>
          <input
            name="email"
            type="email"
            required
            placeholder="hello@nexaform.com"
            className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-textPrimary outline-none placeholder:text-textSecondary focus:border-accentPrimary focus:ring-2 focus:ring-accentPrimary/15"
          />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-sm text-textSecondary">
          <span className="font-medium text-textPrimary">Company Name</span>
          <input
            name="company"
            type="text"
            placeholder="Acme Co."
            className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-textPrimary outline-none placeholder:text-textSecondary focus:border-accentPrimary focus:ring-2 focus:ring-accentPrimary/15"
          />
        </label>
        <label className="grid gap-2 text-sm text-textSecondary">
          <span className="font-medium text-textPrimary">Project Type</span>
          <select
            name="type"
            defaultValue=""
            required
            className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-textPrimary outline-none focus:border-accentPrimary focus:ring-2 focus:ring-accentPrimary/15"
          >
            <option value="" disabled>
              Select a type
            </option>
            <option value="software">Custom Software Development</option>
            <option value="web_apps">Web Application Development</option>
            <option value="uiux">UI and UX Design</option>
            <option value="backend">API and Backend Systems</option>
            <option value="cloud">Cloud, Deployment, and DevOps</option>
            <option value="ai_consulting">AI Automation Consulting</option>
            <option value="ai_agents">AI Agents / Workflow Automation</option>
            <option value="product_build">Product Development</option>
            <option value="support">Support and Optimization</option>
          </select>
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-sm text-textSecondary">
          <span className="font-medium text-textPrimary">Budget Range</span>
          <select
            name="budget"
            defaultValue=""
            required
            className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-textPrimary outline-none focus:border-accentPrimary focus:ring-2 focus:ring-accentPrimary/15"
          >
            <option value="" disabled>
              Select range
            </option>
            <option value="<$5k">Less than $5k</option>
            <option value="$5k-$15k">$5k - $15k</option>
            <option value="$15k-$40k">$15k - $40k</option>
            <option value=">$40k">More than $40k</option>
          </select>
        </label>
        <label className="grid gap-2 text-sm text-textSecondary">
          <span className="font-medium text-textPrimary">Project Timeline</span>
          <select
            name="timeline"
            defaultValue=""
            required
            className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-textPrimary outline-none focus:border-accentPrimary focus:ring-2 focus:ring-accentPrimary/15"
          >
            <option value="" disabled>
              Select timeline
            </option>
            <option value="0-1 month">0-1 month</option>
            <option value="1-3 months">1-3 months</option>
            <option value="3-6 months">3-6 months</option>
            <option value="6+ months">6+ months</option>
            <option value="flexible">Flexible</option>
          </select>
        </label>
      </div>

      <label className="grid gap-2 text-sm text-textSecondary">
        <span className="font-medium text-textPrimary">Message</span>
        <textarea
          name="message"
          rows={5}
          required
          placeholder="Tell us what should be built or improved, what systems you already use, and what outcome matters most."
          className="w-full resize-none rounded-2xl border border-border bg-white px-4 py-3 text-sm text-textPrimary outline-none placeholder:text-textSecondary focus:border-accentPrimary focus:ring-2 focus:ring-accentPrimary/15"
        />
      </label>

      <div className="flex flex-col items-start gap-4 rounded-xl border border-border bg-backgroundSecondary p-5 text-sm text-textSecondary">
        <p>
          Contact details:
          <span className="block text-textPrimary">Email: hello@nexaform.com</span>
          <span className="block text-textPrimary">Phone: +977 981-000-0000</span>
          <span className="block text-textPrimary">Location: Nepal, remote-friendly worldwide</span>
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <PrimaryButton type="submit">Request Consultation</PrimaryButton>
        {status === 'success' && (
          <p className="text-sm font-medium text-accentPrimary">Thank you! We&apos;ll be in touch soon.</p>
        )}
      </div>
    </form>
  );
}
