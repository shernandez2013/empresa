"use client";

import { useState } from "react";
import { Mail, MapPin, Send, MessageCircle, CheckCircle } from "lucide-react";

type ContactDict = {
  label: string;
  title: string;
  titleGradient: string;
  subtitle: string;
  infoTitle: string;
  infoSubtitle: string;
  emailLabel: string;
  whatsappLabel: string;
  locationLabel: string;
  location: string;
  officeHoursTitle: string;
  officeHours: { day: string; hours: string }[];
  form: {
    nameLabel: string;
    namePlaceholder: string;
    companyLabel: string;
    companyPlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    submitButton: string;
    sendingButton: string;
    privacyText: string;
    privacyLink: string;
    successTitle: string;
    successSubtitle: string;
    errorGeneric: string;
  };
};

interface FormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
}

export default function Contact({ dict, lang }: { dict: ContactDict; lang: string }) {
  const [form, setForm] = useState<FormData>({ name: "", company: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const contactInfo = [
    { icon: Mail, label: dict.emailLabel, value: "contacto@orbexasystems.com", href: "mailto:contacto@orbexasystems.com", color: "text-blue-600", bg: "bg-blue-50" },
    { icon: MessageCircle, label: dict.whatsappLabel, value: "+52 55 8600 9578", href: "https://wa.me/525586009578", color: "text-emerald-600", bg: "bg-emerald-50" },
    { icon: MapPin, label: dict.locationLabel, value: dict.location, href: "#", color: "text-violet-600", bg: "bg-violet-50" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || dict.form.errorGeneric);
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : dict.form.errorGeneric);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contacto" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-blue-600 font-semibold text-sm tracking-widest uppercase mb-4">
            {dict.label}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
            {dict.title}{" "}
            <span className="gradient-text">{dict.titleGradient}</span>
          </h2>
          <p className="text-lg text-slate-600">{dict.subtitle}</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{dict.infoTitle}</h3>
              <p className="text-slate-600 text-sm">{dict.infoSubtitle}</p>
            </div>
            <div className="space-y-4">
              {contactInfo.map((info) => {
                const Icon = info.icon;
                return (
                  <a key={info.label} href={info.href} className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 hover:border-blue-100 hover:shadow-md transition-all duration-200 group">
                    <div className={`w-11 h-11 ${info.bg} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                      <Icon className={`w-5 h-5 ${info.color}`} />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">{info.label}</div>
                      <div className="text-slate-700 font-medium text-sm">{info.value}</div>
                    </div>
                  </a>
                );
              })}
            </div>
            <div className="bg-slate-50 rounded-2xl p-5">
              <h4 className="font-bold text-slate-900 mb-3 text-sm">{dict.officeHoursTitle}</h4>
              <div className="space-y-2 text-sm text-slate-600">
                {dict.officeHours.map((oh) => (
                  <div key={oh.day} className="flex justify-between">
                    <span>{oh.day}</span>
                    <span className={`font-semibold ${oh.hours === "24/7" ? "text-emerald-600" : "text-slate-900"}`}>{oh.hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-12 text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{dict.form.successTitle}</h3>
                <p className="text-slate-600">{dict.form.successSubtitle}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5" htmlFor="name">
                      {dict.form.nameLabel} <span className="text-red-500">*</span>
                    </label>
                    <input id="name" name="name" type="text" required value={form.name} onChange={handleChange} placeholder={dict.form.namePlaceholder} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5" htmlFor="company">{dict.form.companyLabel}</label>
                    <input id="company" name="company" type="text" value={form.company} onChange={handleChange} placeholder={dict.form.companyPlaceholder} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5" htmlFor="email">
                      {dict.form.emailLabel} <span className="text-red-500">*</span>
                    </label>
                    <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} placeholder={dict.form.emailPlaceholder} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5" htmlFor="phone">{dict.form.phoneLabel}</label>
                    <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder={dict.form.phonePlaceholder} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5" htmlFor="message">
                    {dict.form.messageLabel} <span className="text-red-500">*</span>
                  </label>
                  <textarea id="message" name="message" required rows={5} value={form.message} onChange={handleChange} placeholder={dict.form.messagePlaceholder} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none text-sm" />
                </div>
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">{error}</div>
                )}
                <button type="submit" disabled={loading} className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:translate-y-0">
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      {dict.form.sendingButton}
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      {dict.form.submitButton}
                    </>
                  )}
                </button>
                <p className="text-xs text-slate-400 text-center">
                  {dict.form.privacyText}{" "}
                  <a href={`/${lang}/privacy`} className="text-blue-600 hover:underline">{dict.form.privacyLink}</a>.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
