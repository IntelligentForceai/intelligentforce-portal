import { usePageTracker } from "@/hooks/usePageTracker";
import { Link } from "wouter";
import { Scale } from "lucide-react";

export default function Legal() {
  usePageTracker("/legal");
  return (
    <div className="min-h-screen pt-16">
      <div className="container max-w-3xl py-16">
        <div className="flex items-center gap-3 mb-8">
          <Scale size={32} className="text-cyan-400" />
          <div>
            <p className="text-muted-foreground text-sm">Last updated: July 1, 2026</p>
            <h1 className="text-4xl font-extrabold text-white">Legal Information</h1>
          </div>
        </div>
        <p className="text-muted-foreground text-lg leading-relaxed mb-4 border-l-4 border-cyan-500 pl-5">
          This page provides legal information about IntelligentForce AS, including company details, disclaimers, and links to our full legal documentation.
        </p>

        <div className="space-y-10 mt-10">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Company Information</h2>
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-5 mb-5">
              <p className="text-amber-400 font-semibold text-sm mb-1">Registration Notice</p>
              <p className="text-muted-foreground text-base leading-relaxed">
                IntelligentForce is currently in the process of formal company registration in Norway. The legal entity <strong className="text-white">IntelligentForce AS</strong> is pending registration with the Norwegian Register of Business Enterprises (Brønnøysundregistrene). All commercial activities are conducted in anticipation of and in preparation for the completion of this registration. The operator of this website and platform is the founding individual behind IntelligentForce, acting in a pre-incorporation capacity. Upon completion of registration, all rights, obligations, and agreements entered into during this period will be assumed by the registered entity.
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6 space-y-3">
              {[
                ["Trading name", "IntelligentForce"],
                ["Legal entity", "IntelligentForce AS (registration pending)"],
                ["Country", "Norway"],
                ["Registered office", "Oslo, Norway"],
                ["Website", "intelligentforce.ai"],
                ["General enquiries", "hello@intelligentforce.ai"],
                ["Investor & partnership enquiries", "alex@intelligentforce.ai"],
              ].map(([label, value]) => (
                <div key={label} className="flex flex-col sm:flex-row sm:gap-4">
                  <span className="text-muted-foreground text-base w-56 shrink-0">{label}</span>
                  <span className="text-white text-base font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {[
            {
              title: "Website Disclaimer",
              body: `The information on intelligentforce.ai is provided for general informational purposes only. While we make every effort to ensure the accuracy and completeness of the information presented, IntelligentForce AS makes no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the information, products, services, or related graphics contained on the website. Any reliance you place on such information is therefore strictly at your own risk.`,
            },
            {
              title: "AI and Automation Disclaimer",
              body: `IntelligentForce provides AI-powered automation services designed to improve business efficiency. The outputs of our AI agents are intended to support — not replace — human judgment and decision-making. Business results vary depending on the specific context, quality of input data, and implementation. Statistics and performance figures cited on this website represent results achieved by clients under specific conditions and do not constitute a guarantee of future performance for any particular client.`,
            },
            {
              title: "Investment and Financial Information",
              body: `Nothing on this website constitutes financial, investment, or legal advice. Information about IntelligentForce's business, growth, and investment opportunities is provided for informational purposes only. Any investment decision should be made based on your own independent assessment and, where appropriate, with the advice of qualified financial and legal advisors. IntelligentForce does not make public offerings of securities. Partnership and investment discussions are conducted on a private, confidential basis.`,
            },
            {
              title: "Third-Party Links",
              body: `Our website may contain links to third-party websites. These links are provided for your convenience only. IntelligentForce has no control over the content of those sites and accepts no responsibility for them or for any loss or damage that may arise from your use of them.`,
            },
            {
              title: "Intellectual Property",
              body: `All content on intelligentforce.ai — including text, graphics, logos, images, and software — is the property of IntelligentForce AS or its content suppliers and is protected by Norwegian and international intellectual property laws. Reproduction, distribution, or use of any content without express written permission from IntelligentForce AS is prohibited.`,
            },
            {
              title: "Governing Law",
              body: `This website and its content are governed by the laws of Norway. Any disputes relating to the use of this website shall be subject to the exclusive jurisdiction of the courts of Oslo, Norway.`,
            },
          ].map((section, i) => (
            <div key={i}>
              <h2 className="text-2xl font-bold text-white mb-4">{section.title}</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">{section.body}</p>
            </div>
          ))}

          {/* Links to other legal pages */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-5">Our Legal Documents</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: "Privacy Policy", href: "/privacy", desc: "How we collect and use your data" },
                { label: "Terms of Service", href: "/terms", desc: "Rules governing use of our platform" },
                { label: "Cookie Policy", href: "/cookies", desc: "How we use cookies on our website" },
              ].map((doc) => (
                <Link key={doc.href} href={doc.href} className="bg-card border border-border rounded-xl p-5 hover:border-cyan-500/40 transition-colors group">
                  <div className="text-white font-bold text-base mb-1 group-hover:text-cyan-300 transition-colors">{doc.label}</div>
                  <div className="text-muted-foreground text-sm">{doc.desc}</div>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Contact</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              For legal enquiries, please contact us at <a href="mailto:hello@intelligentforce.ai" className="text-cyan-400 hover:underline">hello@intelligentforce.ai</a>. We aim to respond to all legal correspondence within 5 business days.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
