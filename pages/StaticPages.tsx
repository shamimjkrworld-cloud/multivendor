
import React from 'react';

const PageWrapper: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="max-w-4xl mx-auto px-4 py-16">
    <h1 className="text-4xl font-black text-gray-900 mb-8">{title}</h1>
    <div className="prose prose-orange max-w-none text-gray-600 leading-relaxed space-y-6">
      {children}
    </div>
  </div>
);

export const AboutUs = () => (
  <PageWrapper title="About Tracketo Shop">
    <p>Tracketo Shop is Bangladesh's premier multivendor platform, founded in 2024 with a mission to bring high-quality local products to your doorstep. From our headquarters in Lalmatia, Dhaka, we work with thousands of verified vendors to ensure authenticity and speed.</p>
    <h2 className="text-2xl font-bold text-gray-800">Our Vision</h2>
    <p>To digitize every small shop in Bangladesh and connect them with millions of consumers who value quality and reliability.</p>
  </PageWrapper>
);

export const PrivacyPolicy = () => (
  <PageWrapper title="Privacy Policy">
    <p>At Tracketo Shop, we value your privacy. This policy describes how we collect and use your personal data.</p>
    <ul className="list-disc pl-5">
      <li>We collect your name, email, and address to process orders.</li>
      <li>Your payment information is encrypted and never stored on our servers.</li>
      <li>We use cookies to improve your shopping experience.</li>
    </ul>
  </PageWrapper>
);

export const TermsConditions = () => (
  <PageWrapper title="Terms & Conditions">
    <p>By using Tracketo Shop, you agree to comply with our platform policies.</p>
    <h3 className="font-bold">Ordering</h3>
    <p>Orders are subject to availability. Prices are displayed in BDT including VAT where applicable.</p>
    <h3 className="font-bold">Vendor Responsibility</h3>
    <p>Vendors are responsible for the accuracy of their product descriptions and quality.</p>
  </PageWrapper>
);

export const HelpCenter = () => (
  <PageWrapper title="Help Center">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="p-6 bg-white border rounded-3xl shadow-sm">
        <h3 className="font-bold text-orange-600 mb-2">My Account</h3>
        <p>Manage your profile, track orders, and view your points.</p>
      </div>
      <div className="p-6 bg-white border rounded-3xl shadow-sm">
        <h3 className="font-bold text-orange-600 mb-2">Orders & Delivery</h3>
        <p>Everything you need to know about your package.</p>
      </div>
      <div className="p-6 bg-white border rounded-3xl shadow-sm">
        <h3 className="font-bold text-orange-600 mb-2">Payments</h3>
        <p>How to use bKash, Nagad, and Cash on Delivery.</p>
      </div>
      <div className="p-6 bg-white border rounded-3xl shadow-sm">
        <h3 className="font-bold text-orange-600 mb-2">Vendors</h3>
        <p>How to sell your products on our platform.</p>
      </div>
    </div>
  </PageWrapper>
);

export const ContactUs = () => (
  <PageWrapper title="Contact Us">
    <p>Have a question? We are here to help 24/7.</p>
    <div className="bg-orange-50 p-8 rounded-3xl border border-orange-100">
      <p className="font-bold">Hotline: +880 1700-123456</p>
      <p>Email: support@tracketo.com.bd</p>
      <p>Office: House 42, Road 7, Lalmatia, Dhaka 1207</p>
    </div>
  </PageWrapper>
);

export const ReturnsRefunds = () => (
  <PageWrapper title="Returns & Refunds">
    <p>We offer a hassle-free 7-day return policy for most products.</p>
    <h3 className="font-bold">Conditions for Return</h3>
    <p>The product must be unused, in the original packaging, and with tags attached.</p>
  </PageWrapper>
);

export const HowToBuy = () => (
  <PageWrapper title="How to Buy">
    <ol className="list-decimal pl-5 space-y-4">
      <li>Search for your desired product or browse by category.</li>
      <li>Add items to your shopping cart.</li>
      <li>Proceed to checkout and enter your shipping address.</li>
      <li>Select a payment method (COD or bKash).</li>
      <li>Receive your confirmation call and wait for delivery!</li>
    </ol>
  </PageWrapper>
);

export const AffiliateProgram = () => (
  <PageWrapper title="Affiliate Program">
    <p>Earn commissions by sharing Tracketo Shop products with your network.</p>
    <h3 className="font-bold">Why Join?</h3>
    <ul className="list-disc pl-5">
      <li>Up to 10% commission on every sale.</li>
      <li>Transparent tracking and monthly payouts.</li>
      <li>Exclusive marketing materials.</li>
    </ul>
  </PageWrapper>
);

export const SellOnTracketo = () => (
  <PageWrapper title="Sell on Tracketo">
    <p>Reach millions of customers and grow your business today.</p>
    <div className="mt-8 flex flex-col md:flex-row gap-8">
      <div className="flex-1 p-8 bg-orange-600 text-white rounded-3xl shadow-xl">
        <h3 className="text-xl font-bold mb-4">Merchant Dashboard</h3>
        <p>Advanced tools to manage your inventory and sales.</p>
      </div>
      <div className="flex-1 p-8 bg-gray-900 text-white rounded-3xl shadow-xl">
        <h3 className="text-xl font-bold mb-4">Fast Payouts</h3>
        <p>Get your money in your bank account or bKash within 3 days.</p>
      </div>
    </div>
  </PageWrapper>
);
