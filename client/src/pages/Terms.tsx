import { usePageTracker } from "@/hooks/usePageTracker";
import { FileText } from "lucide-react";

export default function Terms() {
  usePageTracker("/terms");
  return (
    <div className="min-h-screen pt-16">
      <div className="container max-w-3xl py-16">
        <div className="flex items-center gap-3 mb-8">
          <FileText size={32} className="text-cyan-400" />
          <div>
            <p className="text-muted-foreground text-sm">Last updated: July 1, 2026</p>
            <h1 className="text-4xl font-extrabold text-white">Terms of Service</h1>
          </div>
        </div>
        <p className="text-muted-foreground text-lg leading-relaxed mb-4 border-l-4 border-cyan-500 pl-5">
          These Terms of Service ("Terms") govern your access to and use of the IntelligentForce website and platform. By accessing or using our services, you agree to be bound by these Terms. Please read them carefully. IntelligentForce is currently operating under a pre-incorporation structure while the legal entity IntelligentForce AS is pending registration in Norway.
        </p>

        <div className="space-y-10 mt-10">
          {[
            {
              title: "1. Acceptance of Terms",
              body: `By accessing intelligentforce.ai or using any IntelligentForce service, you confirm that you are at least 18 years old, have the authority to enter into these Terms on behalf of yourself or your organisation, and agree to comply with these Terms and all applicable laws and regulations.`,
            },
            {
              title: "2. Description of Services",
              body: `IntelligentForce is a business operating under the trading name IntelligentForce, with the legal entity IntelligentForce AS pending registration with the Norwegian Register of Business Enterprises (Brønnøysundregistrene). IntelligentForce provides AI-powered business automation services, including the deployment of specialised AI agents, business process analysis, integration services, and the Business Health Check assessment tool. The specific scope of services provided to each client is defined in a separate service agreement or statement of work.`,
            },
            {
              title: "3. Account Registration",
              body: `Certain features of our platform require you to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorised use of your account at hello@intelligentforce.ai.`,
            },
            {
              title: "4. Acceptable Use",
              body: `You agree to use our services only for lawful purposes and in accordance with these Terms. You must not use our services to violate any applicable law or regulation, transmit any harmful, offensive, or fraudulent content, attempt to gain unauthorised access to our systems or other users' accounts, or interfere with the proper functioning of our platform.`,
            },
            {
              title: "5. Intellectual Property",
              body: `All content, software, and technology on the IntelligentForce platform — including our AI agents, algorithms, interfaces, and documentation — are the exclusive property of IntelligentForce AS and are protected by applicable intellectual property laws. You are granted a limited, non-exclusive, non-transferable licence to use our services for your internal business purposes only.`,
            },
            {
              title: "6. Client Data",
              body: `You retain ownership of all data you provide to IntelligentForce in connection with our services ("Client Data"). By using our services, you grant us a limited licence to process Client Data solely for the purpose of delivering the services. We will handle Client Data in accordance with our Privacy Policy and any applicable data processing agreement.`,
            },
            {
              title: "7. Fees and Payment",
              body: `Fees for IntelligentForce services are set out in your service agreement. All fees are exclusive of applicable taxes unless otherwise stated. Payment terms are as specified in your service agreement. We reserve the right to suspend services for accounts with overdue payments after providing reasonable notice.`,
            },
            {
              title: "8. Disclaimers",
              body: `Our services are provided "as is" and "as available." While we work hard to ensure reliability and accuracy, we do not warrant that our services will be uninterrupted, error-free, or that results obtained through our AI agents will be accurate or complete in all circumstances. Business outcomes depend on many factors beyond our control, and past results do not guarantee future performance.`,
            },
            {
              title: "9. Limitation of Liability",
              body: `To the maximum extent permitted by applicable law, IntelligentForce shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services. Our total liability for any claim arising under these Terms shall not exceed the fees paid by you to IntelligentForce in the three months preceding the claim.`,
            },
            {
              title: "10. Termination",
              body: `Either party may terminate a service agreement in accordance with its terms. We reserve the right to suspend or terminate your access to our platform immediately if you breach these Terms or engage in conduct that we reasonably believe is harmful to IntelligentForce, other users, or third parties.`,
            },
            {
              title: "11. Governing Law",
              body: `These Terms are governed by the laws of Norway. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts of Oslo, Norway, unless otherwise agreed in a separate service agreement.`,
            },
            {
              title: "12. Changes to These Terms",
              body: `We may update these Terms from time to time. We will notify you of material changes by posting the updated Terms on this page with a revised date. Your continued use of our services after such changes constitutes your acceptance of the revised Terms.`,
            },
            {
              title: "13. Contact",
              body: `For questions about these Terms, contact us at hello@intelligentforce.ai or write to IntelligentForce AS, Oslo, Norway.`,
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
