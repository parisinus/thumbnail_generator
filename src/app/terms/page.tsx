import Navbar from "@/components/main/nav/navbar"
import Link from "next/link"

export const metadata = {
  title: "Terms of Service – Thumbgen",
  description: "Terms of Service for Thumbgen AI-Powered YouTube Thumbnail Generator",
}

const sections = [
  {
    title: "Acceptance of Terms",
    content: [
      "By accessing or using Thumbgen, you agree to be bound by these Terms of Service.",
      "If you do not agree to these terms, please do not use the service.",
      "We reserve the right to update these terms at any time. Continued use of the service constitutes acceptance of the updated terms.",
    ],
  },
  {
    title: "Description of Service",
    content: [
      "Thumbgen is an AI-powered YouTube thumbnail generation service that uses Google Gemini to create images based on your prompts.",
      "The service includes a credit-based system where credits are consumed per image generated.",
      "We offer Free, Pro, and Ultra subscription tiers with varying credit allocations.",
      "Features and credit amounts may change over time with reasonable notice.",
    ],
  },
  {
    title: "User Accounts",
    content: [
      "You must sign in with a valid Google account to use Thumbgen.",
      "You are responsible for maintaining the security of your account.",
      "You may not share your account with others or use another person's account.",
      "We reserve the right to suspend or terminate accounts that violate these terms.",
    ],
  },
  {
    title: "Credits & Subscriptions",
    content: [
      "New accounts receive a set number of free credits upon registration.",
      "Credits are consumed each time an image is successfully generated. Failed generations are refunded.",
      "Subscription credits are added to your account upon successful payment and do not expire.",
      "Subscriptions are managed through Polar and can be canceled at any time via the Customer Portal.",
      "Refunds for subscription payments are handled at our discretion in accordance with Polar's refund policy.",
    ],
  },
  {
    title: "Acceptable Use",
    content: [
      "You may only use Thumbgen for lawful purposes and in accordance with these terms.",
      "You may not use the service to generate content that is illegal, harmful, threatening, abusive, or violates any third-party rights.",
      "You may not attempt to circumvent credit limits, reverse-engineer the service, or use automated scripts to abuse the platform.",
      "You may not generate content that infringes copyrights, trademarks, or other intellectual property rights.",
      "We reserve the right to refuse service or remove content that violates these guidelines.",
    ],
  },
  {
    title: "Intellectual Property",
    content: [
      "**Your Content**: You retain ownership of the prompts you submit and the thumbnails generated from them.",
      "**License to Us**: By using the service, you grant us a limited license to process your content solely for the purpose of providing the service.",
      "**Our Platform**: The Thumbgen platform, including its code, design, and branding, is owned by us and protected by intellectual property laws.",
      "**AI-Generated Images**: You are responsible for ensuring your use of generated images complies with applicable laws and platform policies (e.g., YouTube's terms).",
    ],
  },
  {
    title: "Disclaimers & Limitation of Liability",
    content: [
      "Thumbgen is provided \"as is\" without warranties of any kind, express or implied.",
      "We do not guarantee that AI-generated thumbnails will achieve any specific performance metrics (e.g., click-through rate improvements).",
      "We are not liable for any indirect, incidental, special, or consequential damages arising from your use of the service.",
      "Our total liability to you shall not exceed the amount you paid for the service in the past 12 months.",
      "We are not responsible for the availability, accuracy, or content of third-party services we integrate with.",
    ],
  },
  {
    title: "Termination",
    content: [
      "You may stop using the service and delete your account at any time.",
      "We may suspend or terminate your access if you violate these terms or for any other reason at our discretion.",
      "Upon termination, your right to use the service ceases immediately.",
      "Unused credits are non-refundable upon account termination unless required by law.",
    ],
  },
  {
    title: "Governing Law",
    content: [
      "These terms are governed by applicable law without regard to conflict of law principles.",
      "Any disputes arising from these terms or your use of Thumbgen shall be resolved through binding arbitration where permitted by law.",
    ],
  },
]

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="max-w-3xl mx-auto px-6 pt-32 pb-24">

        {/* Header */}
        <div className="mb-12">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-violet-600 bg-violet-50 px-3 py-1.5 rounded-full mb-4">
            Legal
          </span>
          <h1 className="text-4xl font-bold text-slate-900 mb-3">Terms of Service</h1>
          <p className="text-slate-500 text-sm">Last updated: March 21, 2026</p>
          <div className="mt-6 p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <p className="text-slate-600 text-sm leading-relaxed">
              Please read these Terms of Service carefully before using Thumbgen. These terms govern
              your use of our AI-powered YouTube thumbnail generation service.
            </p>
          </div>
        </div>

        {/* Sections */}
        <div className="flex flex-col gap-10">
          {sections.map((section, i) => (
            <div key={i}>
              <h2 className="text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 text-white text-xs flex items-center justify-center font-bold shrink-0">
                  {i + 1}
                </span>
                {section.title}
              </h2>
              <ul className="flex flex-col gap-2">
                {section.content.map((item, j) => (
                  <li key={j} className="flex gap-2 text-slate-600 text-sm leading-relaxed">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0" />
                    <span dangerouslySetInnerHTML={{
                      __html: item.replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-800 font-medium">$1</strong>')
                    }} />
                  </li>
                ))}
              </ul>
              {i < sections.length - 1 && (
                <div className="mt-10 h-px bg-slate-100" />
              )}
            </div>
          ))}
        </div>

        {/* Contact */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-violet-50 border border-blue-100">
          <h3 className="text-base font-semibold text-slate-900 mb-1">Questions?</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            If you have any questions about these Terms of Service, please contact us at{" "}
            <a href="mailto:legal@thumbgen.com" className="text-violet-600 hover:underline font-medium">
              legal@thumbgen.com
            </a>
          </p>
        </div>

        {/* Footer links */}
        <div className="mt-10 flex items-center gap-4 text-sm text-slate-400">
          <Link href="/" className="hover:text-slate-600 transition-colors">Home</Link>
          <span>·</span>
          <Link href="/privacy" className="hover:text-slate-600 transition-colors">Privacy Policy</Link>
        </div>

      </main>
    </div>
  )
}
