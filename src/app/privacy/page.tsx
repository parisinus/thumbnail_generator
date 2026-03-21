import Navbar from "@/components/main/nav/navbar"
import Link from "next/link"

export const metadata = {
  title: "Privacy Policy – Thumbgen",
  description: "Privacy Policy for Thumbgen AI-Powered YouTube Thumbnail Generator",
}

const sections = [
  {
    title: "Information We Collect",
    content: [
      "**Account Information**: When you sign in with Google, we receive your name, email address, and profile picture.",
      "**Usage Data**: We collect information about how you use Thumbgen, including prompts you submit, thumbnails you generate, and features you use.",
      "**Payment Information**: Subscription and billing information is handled securely by Polar. We do not store your credit card details.",
      "**Technical Data**: Log data, IP address, browser type, and device information collected automatically when you use the service.",
    ],
  },
  {
    title: "How We Use Your Information",
    content: [
      "To provide and maintain the Thumbgen service, including AI-powered thumbnail generation.",
      "To manage your account, credits, and subscription status.",
      "To communicate with you about updates, new features, or support requests.",
      "To improve our service and develop new features based on usage patterns.",
      "To comply with legal obligations and enforce our Terms of Service.",
    ],
  },
  {
    title: "Data Storage & Security",
    content: [
      "Your data is stored securely using Supabase, a trusted database infrastructure provider.",
      "Generated thumbnails are stored in Supabase Storage and accessible only to you.",
      "We use industry-standard encryption (TLS) to protect data in transit.",
      "Access to personal data is restricted to authorized personnel only.",
    ],
  },
  {
    title: "Third-Party Services",
    content: [
      "**Google OAuth**: Used for authentication. Subject to Google's Privacy Policy.",
      "**Google Gemini**: AI model used for image generation. Prompts may be processed by Google's systems.",
      "**Polar**: Payment processing and subscription management. Subject to Polar's Privacy Policy.",
      "**Supabase**: Database and storage infrastructure. Subject to Supabase's Privacy Policy.",
    ],
  },
  {
    title: "Your Rights",
    content: [
      "**Access**: You may request a copy of the personal data we hold about you.",
      "**Deletion**: You may request deletion of your account and associated data at any time.",
      "**Correction**: You may request correction of inaccurate personal information.",
      "**Portability**: You may request your data in a portable format.",
      "To exercise any of these rights, contact us at the email address below.",
    ],
  },
  {
    title: "Data Retention",
    content: [
      "We retain your account data for as long as your account is active.",
      "Generated thumbnails are stored until you delete them or close your account.",
      "Upon account deletion, we will remove your personal data within 30 days.",
      "Some data may be retained longer if required by law.",
    ],
  },
  {
    title: "Cookies",
    content: [
      "We use essential cookies to maintain your session and authentication state.",
      "No third-party advertising or tracking cookies are used.",
      "You can control cookie settings through your browser preferences.",
    ],
  },
  {
    title: "Changes to This Policy",
    content: [
      "We may update this Privacy Policy from time to time.",
      "We will notify you of significant changes via email or a notice on the service.",
      "Your continued use of Thumbgen after changes constitutes acceptance of the updated policy.",
    ],
  },
]

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="max-w-3xl mx-auto px-6 pt-32 pb-24">

        {/* Header */}
        <div className="mb-12">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-violet-600 bg-violet-50 px-3 py-1.5 rounded-full mb-4">
            Legal
          </span>
          <h1 className="text-4xl font-bold text-slate-900 mb-3">Privacy Policy</h1>
          <p className="text-slate-500 text-sm">Last updated: March 21, 2026</p>
          <div className="mt-6 p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <p className="text-slate-600 text-sm leading-relaxed">
              At Thumbgen, we take your privacy seriously. This policy explains what information we collect,
              how we use it, and your rights regarding your personal data.
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
          <h3 className="text-base font-semibold text-slate-900 mb-1">Contact Us</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            If you have any questions about this Privacy Policy, please contact us at{" "}
            <a href="mailto:privacy@thumbgen.com" className="text-violet-600 hover:underline font-medium">
              privacy@thumbgen.com
            </a>
          </p>
        </div>

        {/* Footer links */}
        <div className="mt-10 flex items-center gap-4 text-sm text-slate-400">
          <Link href="/" className="hover:text-slate-600 transition-colors">Home</Link>
          <span>·</span>
          <Link href="/terms" className="hover:text-slate-600 transition-colors">Terms of Service</Link>
        </div>

      </main>
    </div>
  )
}
