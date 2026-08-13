import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import { Input } from '../components/common/Input';
import { Textarea } from '../components/common/Textarea';
import { Button } from '../components/common/Button';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const faqs = [
    {
      q: 'Is Smart Invoice Builder completely free?',
      a: 'Yes! The entire core invoice creation experience, 12 template designs, PDF export, and local saving are 100% free.',
    },
    {
      q: 'Where is my invoice data stored?',
      a: 'Your invoice data stays completely inside your web browser using HTML5 LocalStorage. No server stores your information.',
    },
    {
      q: 'Can I download multi-page invoices?',
      a: 'Yes! Our high-resolution PDF engine handles multiple pages automatically with page-break protection for item rows and totals.',
    },
    {
      q: 'Will changing templates erase my entered data?',
      a: 'Never. You can switch between any of the 12 templates at any time without losing a single character of customer or item data.',
    },
  ];

  return (
    <div className="container" style={{ paddingTop: '36px', paddingBottom: '48px', display: 'flex', flexDirection: 'column', gap: '36px' }}>
      <div style={{ textAlign: 'center', maxWidth: '580px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 800 }}>Contact & Support</h1>
        <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>
          Have questions, feedback, or template requests? We would love to hear from you.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', alignItems: 'start' }}>
        {/* Contact Form */}
        <div style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-xl)', padding: '24px', boxShadow: 'var(--shadow-sm)' }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '24px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
              <CheckCircle2 size={40} color="var(--color-success)" />
              <h3 style={{ fontSize: '18px', fontWeight: 700 }}>Message Sent!</h3>
              <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
                Thank you for reaching out. We will review your message shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700 }}>Send Us a Message</h3>
              <Input label="Your Name" placeholder="e.g. Najeeb Tahir" required />
              <Input label="Email Address" type="email" placeholder="name@example.com" required />
              <Textarea label="Message" rows={3} placeholder="How can we help you?" required />
              <Button variant="primary" size="md" rightIcon={<Send size={15} type="submit" />}>
                Send Message
              </Button>
            </form>
          )}
        </div>

        {/* FAQ Section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 700 }}>Frequently Asked Questions</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {faqs.map((faq, i) => (
              <div key={i} style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '16px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px', color: 'var(--color-text-primary)' }}>{faq.q}</h4>
                <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)', lineHeight: 1.45 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
