import { usePageTracker } from "@/hooks/usePageTracker";
import { Shield } from "lucide-react";

export default function Privacy() {
  usePageTracker("/privacy");
  return (
    <div className="min-h-screen pt-16">
      <div className="container max-w-3xl py-16">
        <div className="flex items-center gap-3 mb-8">
          <Shield size={32} className="text-cyan-400" />
          <div>
            <p className="text-muted-foreground text-sm">Last updated: July 1, 2026</p>
            <h1 className="text-4xl font-extrabold text-white">Privacy Policy</h1>
          </div>
        </div>
        <p className="text-muted-foreground text-lg leading-relaxed mb-4 border-l-4 border-cyan-500 pl-5">
          IntelligentForce ("IntelligentForce", "we", "us", or "our") is committed to protecting your personal data. This Privacy Policy explains how we collect, use, store, and share information when you use our website at intelligentforce.ai and our AI-powered business automation platform.
        </p>

        <div className="space-y-10 mt-10">
          {[
            {
              title: "1. Who We Are",
              body: `IntelligentForce is a business operating under the trading name IntelligentForce, with the legal entity IntelligentForce AS currently pending registration with the Norwegian Register of Business Enterprises (Brønnøysundregistrene). We operate the intelligentforce.ai website and provide AI-driven business automation services to mid-market and enterprise clients worldwide. For questions about this policy, contact us at hello@intelligentforce.ai.`,
            },
            {
              title: "2. What Data We Collect",
              body: `We collect information you provide directly to us, such as your name, email address, company name, and job title when you fill out forms, request a Business Health Check, subscribe to our newsletter, or contact us. We also collect technical data automatically when you visit our website, including your IP address, browser type, pages visited, time spent on pages, and referring URLs. This technical data is collected through cookies and similar technologies as described in our Cookie Policy.`,
            },
            {
              title: "3. How We Use Your Data",
              body: `We use your personal data to provide and improve our services, respond to your inquiries, send you relevant communications you have opted into, conduct the Business Health Check assessment, and analyse website usage to improve user experience. We do not sell your personal data to third parties. We do not use your data for automated decision-making that produces legal or similarly significant effects without human oversight.`,
            },
            {
              title: "4. Legal Basis for Processing",
              body: `We process your personal data on the following legal bases under the General Data Protection Regulation (GDPR): your consent, where you have given it; the performance of a contract, where processing is necessary to provide our services; our legitimate interests, such as improving our platform and communicating with prospective clients; and compliance with legal obligations.`,
            },
            {
              title: "5. Data Retention",
              body: `We retain your personal data for as long as necessary to fulfil the purposes for which it was collected, including for the purposes of satisfying any legal, accounting, or reporting requirements. Contact data is retained for up to 3 years from your last interaction with us. You may request deletion of your data at any time by contacting hello@intelligentforce.ai.`,
            },
            {
              title: "6. Data Sharing",
              body: `We may share your data with trusted third-party service providers who assist us in operating our website and delivering our services, including cloud hosting providers, email delivery platforms, and analytics tools. All third parties are contractually required to protect your data and use it only for the purposes we specify. We may also disclose your data if required by law or to protect our legal rights.`,
            },
            {
              title: "7. International Transfers",
              body: `Some of our service providers are located outside the European Economic Area (EEA). Where we transfer data internationally, we ensure appropriate safeguards are in place, such as Standard Contractual Clauses approved by the European Commission.`,
            },
            {
              title: "8. Your Rights",
              body: `Under the GDPR, you have the right to access the personal data we hold about you, request correction of inaccurate data, request deletion of your data, object to or restrict our processing of your data, and request a portable copy of your data. To exercise any of these rights, contact us at hello@intelligentforce.ai. You also have the right to lodge a complaint with the Norwegian Data Protection Authority (Datatilsynet) at www.datatilsynet.no.`,
            },
            {
              title: "9. Security",
              body: `We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, alteration, disclosure, or destruction. These measures include encryption in transit and at rest, access controls, and regular security reviews.`,
            },
            {
              title: "10. Changes to This Policy",
              body: `We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the new policy on this page with an updated date. Your continued use of our services after any changes constitutes your acceptance of the revised policy.`,
            },
            {
              title: "11. Contact",
              body: `For any questions or concerns about this Privacy Policy or our data practices, please contact us at hello@intelligentforce.ai or write to IntelligentForce AS, Oslo, Norway.`,
            },
          ].map((section, i) => (
            <div key={i}>
              <h2 className="text-2xl font-bold text-white mb-4">{section.title}</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">{section.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
