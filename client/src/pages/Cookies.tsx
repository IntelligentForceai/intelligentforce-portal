import { usePageTracker } from "@/hooks/usePageTracker";
import { Cookie } from "lucide-react";

export default function Cookies() {
  usePageTracker("/cookies");
  return (
    <div className="min-h-screen pt-16">
      <div className="container max-w-3xl py-16">
        <div className="flex items-center gap-3 mb-8">
          <Cookie size={32} className="text-cyan-400" />
          <div>
            <p className="text-muted-foreground text-sm">Last updated: July 1, 2026</p>
            <h1 className="text-4xl font-extrabold text-white">Cookie Policy</h1>
          </div>
        </div>
        <p className="text-muted-foreground text-lg leading-relaxed mb-4 border-l-4 border-cyan-500 pl-5">
          This Cookie Policy explains how IntelligentForce AS uses cookies and similar tracking technologies on intelligentforce.ai. It explains what these technologies are, why we use them, and your rights to control their use.
        </p>

        <div className="space-y-10 mt-10">
          {[
            {
              title: "1. What Are Cookies?",
              body: `Cookies are small text files placed on your device when you visit a website. They are widely used to make websites work efficiently, to remember your preferences, and to provide information to website owners about how their site is being used. Cookies can be "persistent" (remaining on your device until they expire or are deleted) or "session" cookies (deleted when you close your browser).`,
            },
            {
              title: "2. Cookies We Use",
              body: `We use the following categories of cookies on intelligentforce.ai. Strictly necessary cookies are essential for the website to function and cannot be switched off. They are typically set in response to actions you take, such as setting your language preference or logging in. Analytics cookies allow us to count visits and understand how visitors interact with our website, helping us improve its performance and content. These cookies collect information in an anonymised form. Preference cookies enable the website to remember choices you make, such as your language preference, to provide a more personalised experience. We do not currently use advertising or targeting cookies.`,
            },
            {
              title: "3. Third-Party Cookies",
              body: `We use a small number of trusted third-party services that may set cookies on your device. These include analytics providers that help us understand website usage. These third parties are contractually required to use cookies only for the purposes we specify and to comply with applicable data protection laws.`,
            },
            {
              title: "4. Your Cookie Choices",
              body: `You can control and manage cookies in several ways. Most browsers allow you to refuse or delete cookies through their settings. Please note that disabling strictly necessary cookies may affect the functionality of our website. You can also opt out of analytics tracking by using browser extensions designed for this purpose. Because we respect your privacy, we provide a cookie preference centre on our website where you can review and adjust your choices at any time.`,
            },
            {
              title: "5. Cookie Retention",
              body: `Session cookies are deleted when you close your browser. Persistent cookies remain on your device for varying periods depending on their purpose. Analytics cookies typically expire after 13 months. Preference cookies typically expire after 12 months. You can delete cookies at any time through your browser settings.`,
            },
            {
              title: "6. Changes to This Policy",
              body: `We may update this Cookie Policy from time to time to reflect changes in the cookies we use or for other operational, legal, or regulatory reasons. Please revisit this page periodically to stay informed about our use of cookies.`,
            },
            {
              title: "7. Contact",
              body: `If you have questions about our use of cookies, contact us at hello@intelligentforce.ai or write to IntelligentForce AS, Oslo, Norway.`,
            },
          ].map((section, i) => (
            <div key={i}>
              <h2 className="text-2xl font-bold text-white mb-4">{section.title}</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">{section.body}</p>
            </div>
          ))}

          {/* Cookie table */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-5">Cookie Reference Table</h2>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-base">
                <thead>
                  <tr className="bg-card border-b border-border">
                    <th className="text-left text-white font-semibold p-4">Name</th>
                    <th className="text-left text-white font-semibold p-4">Type</th>
                    <th className="text-left text-white font-semibold p-4">Purpose</th>
                    <th className="text-left text-white font-semibold p-4">Expiry</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["lang_pref", "Preference", "Stores your language preference (EN/NO)", "12 months"],
                    ["theme", "Preference", "Stores your theme preference", "12 months"],
                    ["_ga", "Analytics", "Google Analytics – distinguishes users", "13 months"],
                    ["_ga_*", "Analytics", "Google Analytics – session state", "13 months"],
                    ["session_id", "Strictly Necessary", "Maintains your login session", "Session"],
                  ].map(([name, type, purpose, expiry], i) => (
                    <tr key={i} className="border-b border-border/50 hover:bg-card/50 transition-colors">
                      <td className="p-4 text-cyan-400 font-mono text-sm">{name}</td>
                      <td className="p-4 text-muted-foreground">{type}</td>
                      <td className="p-4 text-muted-foreground">{purpose}</td>
                      <td className="p-4 text-muted-foreground">{expiry}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
