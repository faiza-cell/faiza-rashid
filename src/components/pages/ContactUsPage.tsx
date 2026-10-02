import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, CheckCircle2 } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const ContactUsPage: React.FC = () => {
  const { settings, showToast } = useStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Order Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
    showToast('Message Received', 'Our Lahore customer care team will respond within 24 hours.', 'success');
  };

  return (
    <div className="w-full bg-[#F7EFE5] min-h-screen py-12 px-4 sm:px-6 lg:px-8 text-[#21130F]">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Title */}
        <div className="text-center space-y-2">
          <p className="text-xs font-semibold tracking-[0.25em] text-[#C96852] uppercase">
            WE ARE HERE FOR YOU
          </p>
          <h1 className="font-serif-display text-4xl sm:text-5xl font-bold text-[#1B0E0A]">
            Contact DESI DRIP
          </h1>
          <p className="text-xs sm:text-sm text-[#21130F]/70 max-w-md mx-auto">
            Have questions regarding sizing, custom stitching, bridal orders, or delivery status? Get in touch with our specialists.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Contacts (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#FBF6EE] p-6 sm:p-8 rounded-3xl border border-[#E8D8C8] shadow-sm space-y-6">
              <h3 className="font-serif-display text-2xl font-bold text-[#1B0E0A]">
                Studio & Flagship
              </h3>

              <div className="space-y-4 text-xs sm:text-sm text-[#21130F]/80">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#651B17] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#1B0E0A]">Lahore Flagship Studio:</strong>
                    <p>{settings.storeAddress}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#651B17] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#1B0E0A]">Telephone Helpline:</strong>
                    <p>{settings.contactPhone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#651B17] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#1B0E0A]">Email Inquiries:</strong>
                    <p>{settings.contactEmail}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#651B17] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#1B0E0A]">Operating Hours:</strong>
                    <p>Monday – Saturday: 11:00 AM – 10:00 PM (PKT)</p>
                    <p>Sunday: 2:00 PM – 9:00 PM</p>
                  </div>
                </div>
              </div>

              {/* WhatsApp Quick Action */}
              <div className="pt-2">
                <a
                  href={`https://wa.me/923001234567?text=Hi%20DESI%20DRIP,%20I%20have%20an%20inquiry`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#1B0E0A] hover:bg-[#651B17] text-white py-3 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-md"
                >
                  <MessageCircle className="w-4 h-4 text-green-400" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-[#FBF6EE] p-6 sm:p-8 rounded-3xl border border-[#E8D8C8] shadow-sm">
            <h3 className="font-serif-display text-2xl font-bold text-[#1B0E0A] mb-2">
              Send a Message
            </h3>
            <p className="text-xs text-[#21130F]/60 mb-6">
              Fill in your details below and our team will get back to you promptly.
            </p>

            {submitted ? (
              <div className="py-12 text-center space-y-3 bg-white/70 rounded-2xl border border-green-200 p-6">
                <div className="w-12 h-12 rounded-full bg-green-100 text-green-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-serif-display text-xl font-bold text-[#1B0E0A]">
                  Thank You, {name}!
                </h4>
                <p className="text-xs text-[#21130F]/70 max-w-sm mx-auto">
                  Your message regarding &ldquo;{subject}&rdquo; has been sent to our care desk. Expect a call or email from us shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 text-xs font-semibold text-[#651B17] hover:underline"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#21130F] mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Zainab Tariq"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-white border border-[#E8D8C8] rounded-xl px-3 py-2.5 text-xs text-[#1B0E0A] focus:outline-none focus:border-[#651B17]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#21130F] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="zainab@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white border border-[#E8D8C8] rounded-xl px-3 py-2.5 text-xs text-[#1B0E0A] focus:outline-none focus:border-[#651B17]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#21130F] mb-1">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      placeholder="0300-1234567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-white border border-[#E8D8C8] rounded-xl px-3 py-2.5 text-xs text-[#1B0E0A] focus:outline-none focus:border-[#651B17]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#21130F] mb-1">
                      Subject
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full bg-white border border-[#E8D8C8] rounded-xl px-3 py-2.5 text-xs text-[#1B0E0A] focus:outline-none focus:border-[#651B17] cursor-pointer"
                    >
                      <option value="Order Inquiry">Order Inquiry / Tracking</option>
                      <option value="Size Consultation">Size & Fit Consultation</option>
                      <option value="Exchange or Return">Exchange or Return Request</option>
                      <option value="Bridal & Custom Pret">Bridal & Bespoke Inquiry</option>
                      <option value="General Feedback">General Feedback</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#21130F] mb-1">
                    Your Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us how we can assist you..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-white border border-[#E8D8C8] rounded-xl p-3 text-xs text-[#1B0E0A] focus:outline-none focus:border-[#651B17]"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-[#651B17] hover:bg-[#2A120D] text-white py-3 px-8 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
