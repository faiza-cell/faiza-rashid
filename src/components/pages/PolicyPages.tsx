import React, { useState } from 'react';
import { ChevronDown, Truck, RotateCcw, ShieldCheck, HelpCircle } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

interface PolicyProps {
  type: 'shipping' | 'returns' | 'faq' | 'privacy' | 'terms';
}

export const PolicyPages: React.FC<PolicyProps> = ({ type }) => {
  const { navigateTo } = useStore();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How long does delivery take across Pakistan?',
      a: 'Standard orders within Lahore, Karachi, and Islamabad are typically delivered in 2–3 business days. For other nationwide cities and remote areas, delivery takes 3–5 business days via TCS or Leopards Courier.',
    },
    {
      q: 'Do you offer Cash on Delivery (COD)?',
      a: 'Yes! We proudly offer Cash on Delivery across 200+ cities and tehsils in Pakistan with no extra surcharge. You simply pay the delivery rider in cash upon receiving your branded DESI DRIP box.',
    },
    {
      q: 'What is your size exchange policy?',
      a: 'We offer a hassle-free 14-day exchange policy. If your stitched suit or kurta does not fit perfectly, notify our customer care team on WhatsApp (+92 300 1234567) or via email to arrange a replacement in your preferred size.',
    },
    {
      q: 'How do I know my exact size before ordering?',
      a: 'We provide an accurate Size Guide with detailed measurements for Shoulder, Chest, Waist, Hip, and Shirt Length in both Inches and Centimeters. You can open the Size Guide modal from any product page.',
    },
    {
      q: 'Are your fabrics colorfast and preshrunk?',
      a: 'Yes, all DESI DRIP combed lawn, pure raw silk, and micro-velvet textiles undergo stringent pre-treatment and color-fastness washing to guarantee zero shrinkage and radiant longevity.',
    },
  ];

  return (
    <div className="w-full bg-[#F7EFE5] min-h-screen py-12 px-4 sm:px-6 lg:px-8 text-[#21130F]">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Navigation Switcher */}
        <div className="flex flex-wrap gap-2 pb-4 border-b border-[#E8D8C8] text-xs font-semibold uppercase tracking-wider">
          <button
            onClick={() => navigateTo('shipping-policy')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              type === 'shipping' ? 'bg-[#651B17] text-white' : 'text-[#21130F]/60 hover:text-[#21130F]'
            }`}
          >
            Shipping Policy
          </button>
          <button
            onClick={() => navigateTo('return-exchange')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              type === 'returns' ? 'bg-[#651B17] text-white' : 'text-[#21130F]/60 hover:text-[#21130F]'
            }`}
          >
            Return & Exchange
          </button>
          <button
            onClick={() => navigateTo('faq')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              type === 'faq' ? 'bg-[#651B17] text-white' : 'text-[#21130F]/60 hover:text-[#21130F]'
            }`}
          >
            FAQs
          </button>
          <button
            onClick={() => navigateTo('terms-conditions')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              type === 'terms' ? 'bg-[#651B17] text-white' : 'text-[#21130F]/60 hover:text-[#21130F]'
            }`}
          >
            Terms & Conditions
          </button>
          <button
            onClick={() => navigateTo('privacy-policy')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              type === 'privacy' ? 'bg-[#651B17] text-white' : 'text-[#21130F]/60 hover:text-[#21130F]'
            }`}
          >
            Privacy Policy
          </button>
        </div>

        {/* Content Box */}
        <div className="bg-[#FBF6EE] rounded-3xl p-6 sm:p-10 border border-[#E8D8C8] shadow-sm space-y-6">
          
          {type === 'shipping' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#EFE4D6] flex items-center justify-center text-[#651B17]">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h1 className="font-serif-display text-3xl font-bold text-[#1B0E0A]">
                    Shipping Policy
                  </h1>
                  <p className="text-xs text-[#21130F]/60">Pakistan Nationwide Logistics</p>
                </div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-[#21130F]/80 leading-relaxed font-light">
                <p>
                  At <strong>DESI DRIP</strong>, we are committed to delivering your luxury pret and stitched collections swiftly and securely to your doorstep anywhere in Pakistan.
                </p>
                <h4 className="font-semibold text-sm text-[#1B0E0A]">1. Domestic Shipping Rates:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Standard Delivery:</strong> PKR 250 across all cities in Pakistan.</li>
                  <li><strong>Free Delivery:</strong> Automatically applied to all orders above PKR 5,000.</li>
                  <li><strong>Express Air Cargo:</strong> PKR 450 for urgent 24–48 hour delivery in Karachi, Lahore, and Islamabad/Rawalpindi.</li>
                </ul>

                <h4 className="font-semibold text-sm text-[#1B0E0A]">2. Delivery Timelines:</h4>
                <p>
                  Orders are processed and verified from our Lahore studio within 24 hours of placement. Standard transit takes 2–4 business days depending on destination location.
                </p>

                <h4 className="font-semibold text-sm text-[#1B0E0A]">3. Courier Partners & Tracking:</h4>
                <p>
                  We partner exclusively with premier logistics couriers including <strong>TCS Express</strong>, <strong>Leopards Courier</strong>, and <strong>Call Courier</strong>. Upon dispatch, a live tracking ID is messaged to your phone.
                </p>
              </div>
            </div>
          )}

          {type === 'returns' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#EFE4D6] flex items-center justify-center text-[#651B17]">
                  <RotateCcw className="w-5 h-5" />
                </div>
                <div>
                  <h1 className="font-serif-display text-3xl font-bold text-[#1B0E0A]">
                    Return & Exchange Policy
                  </h1>
                  <p className="text-xs text-[#21130F]/60">14-Day Worry-Free Guarantee</p>
                </div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-[#21130F]/80 leading-relaxed font-light">
                <p>
                  Your complete satisfaction is our priority. If you receive an item with incorrect sizing or a rare defect, we offer an effortless 14-day exchange process.
                </p>

                <h4 className="font-semibold text-sm text-[#1B0E0A]">Eligibility for Exchange:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>The item must be unused, unwashed, and with all original DESI DRIP tags intact.</li>
                  <li>Return request must be raised within 14 days of delivery receipt.</li>
                  <li>Proof of purchase (Order Number) must be provided.</li>
                </ul>

                <h4 className="font-semibold text-sm text-[#1B0E0A]">How to Initiate an Exchange:</h4>
                <p>
                  Contact our WhatsApp customer care at <strong>+92 300 1234567</strong> or email <strong>care@desidrip.com</strong> with your order ID and reason. Our courier partner will pick up the parcel from your home.
                </p>
              </div>
            </div>
          )}

          {type === 'faq' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#EFE4D6] flex items-center justify-center text-[#651B17]">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div>
                  <h1 className="font-serif-display text-3xl font-bold text-[#1B0E0A]">
                    Frequently Asked Questions
                  </h1>
                  <p className="text-xs text-[#21130F]/60">Everything you need to know about shopping with DESI DRIP</p>
                </div>
              </div>

              <div className="divide-y divide-[#E8D8C8]">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="py-4">
                    <button
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="w-full flex items-center justify-between text-left font-semibold text-xs sm:text-sm text-[#1B0E0A] hover:text-[#651B17] transition-colors cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#C96852] transition-transform duration-200 ${
                          openFaq === idx ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {openFaq === idx && (
                      <p className="mt-2.5 text-xs text-[#21130F]/80 leading-relaxed font-light animate-in fade-in">
                        {faq.a}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {type === 'terms' && (
            <div className="space-y-4 text-xs sm:text-sm text-[#21130F]/80 leading-relaxed font-light">
              <h1 className="font-serif-display text-3xl font-bold text-[#1B0E0A]">
                Terms & Conditions
              </h1>
              <p>
                Welcome to DESI DRIP. By accessing or purchasing from our platform, you agree to comply with Pakistani retail trade regulations and our intellectual property guidelines. All designs, zardozi embroidery motifs, and photography are copyrighted by DESI DRIP.
              </p>
              <h4 className="font-semibold text-sm text-[#1B0E0A]">Pricing & Availability:</h4>
              <p>
                All prices are listed in Pakistani Rupees (PKR) and include relevant domestic sales taxes. While we strive to maintain accurate inventory, in case an item oversells before stock synchronization, our care team will contact you for an immediate refund or alternative piece.
              </p>
            </div>
          )}

          {type === 'privacy' && (
            <div className="space-y-4 text-xs sm:text-sm text-[#21130F]/80 leading-relaxed font-light">
              <h1 className="font-serif-display text-3xl font-bold text-[#1B0E0A]">
                Privacy Policy
              </h1>
              <p>
                DESI DRIP treats your personal information with absolute confidentiality. We collect only necessary details (Name, Shipping Address, Phone Number, Email) strictly to fulfill your order and send courier delivery updates.
              </p>
              <p>
                We never sell, rent, or disclose customer contact lists to unauthorized third-party advertisers. All online card payments are handled securely through Level-1 PCI-DSS compliant banking gateways.
              </p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
