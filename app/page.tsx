"use client";

import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  function validateEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function isFakeEmail(email: string): boolean {
    const fakePatterns = [
      "example.com",
      "test.com",
      "fake.com",
      "mailinator.com",
      "tempmail.com",
      "yopmail.com",
    ];
    return fakePatterns.some((pattern) => email.endsWith(`@${pattern}`));
  }

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateEmail(email) && !isFakeEmail(email)) {
      try {
        setIsSending(true);
        if (email) {
          const res = await fetch("/api/notify", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
          });
          if (res.ok) {
            setIsSubscribed(true);
            setEmail("");
          }
        }
      } catch (error: any) {
        console.error("Error:", error?.message || error);
        setIsSending(false);
      }
    } else {
      alert("Please enter a valid and real email address.");
    }
  };

  return (
    <main className="bg-white">
      <div className="min-h-screen container mx-auto max-w-7xl bg-white flex items-center justify-center p-8">
        <div className="w-full max-w-2xl mx-auto text-center space-y-12">
          {/* Main Heading */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-light text-gray-900 tracking-tight">
              paxhotels × Satybook
            </h1>
            <p className="text-lg md:text-xl text-gray-600 font-light">
              Where hospitality meets storytelling
            </p>
          </div>

          {/* Email Signup */}
          <div className="space-y-4">
            <p className="text-sm text-gray-400 font-light uppercase tracking-wider">
              Stay Updated
            </p>
            {!isSubscribed ? (
              <form
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto"
              >
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 px-4 py-3 border border-gray-200 focus:border-gray-400 focus:outline-none transition-colors duration-200 bg-white text-gray-900 placeholder:text-gray-400"
                />
                <button className="px-6 py-3 font-light transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white bg-transparent">
                  {isSending ? (
                    <div className="flex items-center justify-center">
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  ) : (
                    "→"
                  )}
                </button>
              </form>
            ) : (
              <p className="text-gray-600 font-light">
                Thank you. We'll be in touch.
              </p>
            )}
          </div>

          {/* Footer */}
          <div className="pt-8 border-t border-gray-100">
            <p className="text-xs text-gray-400 font-light">
              © {new Date().getFullYear()} paxhotels × Satybook. All rights
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
