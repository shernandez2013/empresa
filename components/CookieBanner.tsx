"use client";

import { useState, useEffect } from "react";
import { Cookie, X, ShieldCheck } from "lucide-react";

type CookieBannerDict = {
  title: string;
  description: string;
  acceptAll: string;
  essentialOnly: string;
  privacyLink: string;
};

export default function CookieBanner({ dict, lang }: { dict: CookieBannerDict; lang: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!consent) setVisible(true);
  }, []);

  const handleAccept = (type: "all" | "essential") => {
    localStorage.setItem("cookie-consent", type);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-2xl shadow-slate-900/10 p-5 sm:p-6">
        <div className="flex gap-4">
          <div className="flex-shrink-0 w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
            <Cookie className="w-5 h-5 text-blue-600" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4 mb-2">
              <h3 className="font-bold text-slate-900 text-sm">{dict.title}</h3>
            </div>
            <p className="text-slate-500 text-xs leading-relaxed mb-4">
              {dict.description}{" "}
              <a href={`/${lang}/privacy`} className="text-blue-600 hover:underline">{dict.privacyLink}</a>.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => handleAccept("all")}
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                {dict.acceptAll}
              </button>
              <button
                onClick={() => handleAccept("essential")}
                className="inline-flex items-center justify-center text-xs font-medium text-slate-500 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 px-5 py-2.5 rounded-xl transition-colors"
              >
                {dict.essentialOnly}
              </button>
            </div>
          </div>
          <button
            onClick={() => handleAccept("essential")}
            className="flex-shrink-0 text-slate-400 hover:text-slate-600 transition-colors"
            aria-label="Cerrar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
