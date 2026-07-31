import { Link } from "wouter";
import { useLang } from "@/contexts/LanguageContext";
import { usePageTracker } from "@/hooks/usePageTracker";
import { useSEO } from "@/hooks/useSEO";
import { Shield, ArrowLeft } from "lucide-react";

export default function Privacy() {
  useSEO({
    title: "Privacy Policy – IntelligentForce",
    description: "Privacy Policy for IntelligentForce AS. Learn how we collect, use and protect your personal data in compliance with GDPR.",
    canonical: "https://intelligentforce.ai/privacy",
  });
  usePageTracker("/privacy");
  const { lang } = useLang();
  const isNo = lang === "no";
  const lastUpdated = "31 July 2026";

  return (
    <div className="min-h-screen pt-20 pb-24">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="mb-10">
          <Link href="/legal" className="inline-flex items-center gap-2 text-muted-foreground hover:text-white transition-colors text-sm mb-6">
            <ArrowLeft size={16} /> {isNo ? "Tilbake til juridisk oversikt" : "Back to Legal Overview"}
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
              <Shield className="w-5 h-5 text-cyan-400" />
            </div>
            <span className="text-cyan-400 text-sm font-medium uppercase tracking-widest">
              {isNo ? "Juridisk dokument" : "Legal Document"}
            </span>
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-3">
            {isNo ? "Personvernerklæring" : "Privacy Policy"}
          </h1>
          <p className="text-muted-foreground">{isNo ? `Sist oppdatert: ${lastUpdated}` : `Last updated: ${lastUpdated}`}</p>
        </div>

        <div className="space-y-10 text-muted-foreground leading-relaxed">
          {isNo ? (
            <>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">1. Behandlingsansvarlig</h2>
                <p>IntelligentForce AS er behandlingsansvarlig for personopplysningene som samles inn via intelligentforce.ai og vår plattform. Kontakt oss på <a href="mailto:hello@intelligentforce.ai" className="text-cyan-400 hover:underline">hello@intelligentforce.ai</a> for spørsmål om personvern.</p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">2. Hvilke opplysninger vi samler inn</h2>
                <p>Vi samler inn følgende kategorier av personopplysninger:</p>
                <ul className="list-disc pl-6 mt-3 space-y-2">
                  <li><strong className="text-white">Kontaktopplysninger:</strong> Navn, e-postadresse, telefonnummer og stillingstittel som du oppgir via skjemaer, chatboten ALEX eller e-post.</li>
                  <li><strong className="text-white">Kontoopplysninger:</strong> Brukernavn, passord (kryptert) og betalingsinformasjon for abonnenter.</li>
                  <li><strong className="text-white">Bruksdata:</strong> IP-adresse, nettlesertype, besøkte sider, tid brukt på siden og andre tekniske data samlet inn automatisk.</li>
                  <li><strong className="text-white">Forretningsdata:</strong> Informasjon du deler med oss i forbindelse med Business Health Check eller implementeringsprosjekter.</li>
                  <li><strong className="text-white">Kommunikasjonsdata:</strong> Innholdet i meldinger du sender oss via e-post, kontaktskjema eller ALEX-chatboten.</li>
                </ul>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">3. Formål og rettslig grunnlag</h2>
                <p>Vi behandler personopplysninger for følgende formål:</p>
                <ul className="list-disc pl-6 mt-3 space-y-2">
                  <li><strong className="text-white">Levering av tjenester</strong> (Avtale): For å levere, administrere og forbedre plattformen og tjenestene.</li>
                  <li><strong className="text-white">Kundeservice</strong> (Berettiget interesse): For å besvare henvendelser og yte support.</li>
                  <li><strong className="text-white">Markedsføring</strong> (Samtykke): For å sende nyhetsbrev og markedsføringskommunikasjon til deg som har samtykket til dette.</li>
                  <li><strong className="text-white">Analyse og forbedring</strong> (Berettiget interesse): For å analysere bruk av nettstedet og forbedre tjenestene.</li>
                  <li><strong className="text-white">Rettslige forpliktelser</strong> (Lovpålagt): For å overholde gjeldende lover og forskrifter.</li>
                </ul>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">4. Deling av opplysninger</h2>
                <p>Vi selger aldri personopplysningene dine. Vi kan dele opplysninger med:</p>
                <ul className="list-disc pl-6 mt-3 space-y-2">
                  <li><strong className="text-white">Tjenesteleverandører:</strong> Tredjeparter som hjelper oss med å levere tjenestene (f.eks. skyinfrastruktur, betalingsbehandling, e-posttjenester). Disse behandler data kun etter våre instruksjoner.</li>
                  <li><strong className="text-white">Juridiske krav:</strong> Dersom vi er pålagt å utlevere opplysninger i henhold til lov, rettslig kjennelse eller myndighetskrav.</li>
                  <li><strong className="text-white">Virksomhetsoverdragelse:</strong> I forbindelse med fusjon, oppkjøp eller salg av virksomheten, med forbehold om at mottakeren overholder denne personvernerklæringen.</li>
                </ul>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">5. Overføring til tredjeland</h2>
                <p>Dersom personopplysninger overføres til land utenfor EØS, sikrer vi at overføringen er beskyttet av egnede garantier, som EUs standardkontraktsbestemmelser (SCC) eller tilsvarende mekanismer i henhold til GDPR artikkel 46.</p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">6. Oppbevaringstid</h2>
                <p>Vi oppbevarer personopplysninger så lenge det er nødvendig for formålene de ble samlet inn for, eller så lenge det kreves ved lov. Kontoopplysninger slettes 30 dager etter at en konto avsluttes. Kommunikasjonsdata oppbevares i inntil 3 år. Regnskapsdata oppbevares i 5 år i henhold til norsk bokføringslov.</p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">7. Dine rettigheter (GDPR)</h2>
                <p>Som registrert har du følgende rettigheter:</p>
                <ul className="list-disc pl-6 mt-3 space-y-2">
                  <li><strong className="text-white">Innsyn:</strong> Rett til å få bekreftet om vi behandler opplysninger om deg og å motta en kopi.</li>
                  <li><strong className="text-white">Retting:</strong> Rett til å få uriktige opplysninger rettet.</li>
                  <li><strong className="text-white">Sletting:</strong> Rett til å få opplysninger slettet («retten til å bli glemt»), med visse unntak.</li>
                  <li><strong className="text-white">Begrensning:</strong> Rett til å kreve at behandlingen begrenses i visse situasjoner.</li>
                  <li><strong className="text-white">Dataportabilitet:</strong> Rett til å motta opplysningene i et strukturert, maskinlesbart format.</li>
                  <li><strong className="text-white">Innsigelse:</strong> Rett til å protestere mot behandling basert på berettiget interesse.</li>
                  <li><strong className="text-white">Trekke samtykke:</strong> Rett til å trekke tilbake samtykke til enhver tid uten at dette påvirker lovligheten av behandling før tilbaketrekkingen.</li>
                </ul>
                <p className="mt-3">For å utøve dine rettigheter, kontakt oss på <a href="mailto:hello@intelligentforce.ai" className="text-cyan-400 hover:underline">hello@intelligentforce.ai</a>. Vi besvarer henvendelser innen 30 dager. Du har også rett til å klage til Datatilsynet (datatilsynet.no).</p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">8. Sikkerhet</h2>
                <p>Vi implementerer tekniske og organisatoriske sikkerhetstiltak for å beskytte personopplysningene dine mot uautorisert tilgang, endring, utlevering eller sletting. Dette inkluderer kryptering av data i overføring og lagring, tilgangskontroll, og regelmessige sikkerhetsrevisjoner. Dersom det oppstår et sikkerhetsbrudd som påvirker dine rettigheter og friheter, vil vi varsle deg og Datatilsynet innen 72 timer der det er påkrevd.</p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">9. Informasjonskapsler</h2>
                <p>Vi bruker informasjonskapsler og lignende teknologier på nettstedet vårt. Se vår <Link href="/cookies" className="text-cyan-400 hover:underline">informasjonskapselpolicy</Link> for detaljert informasjon om hvilke informasjonskapsler vi bruker og hvordan du kan administrere dem.</p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">10. Endringer i personvernerklæringen</h2>
                <p>Vi kan oppdatere denne personvernerklæringen fra tid til annen. Vesentlige endringer varsles via e-post eller på nettstedet. Den oppdaterte datoen øverst på siden angir når erklæringen sist ble revidert.</p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">11. Kontakt</h2>
                <div className="bg-card border border-border rounded-xl p-5 space-y-1">
                  <p className="text-white font-semibold">IntelligentForce AS — Personvernansvarlig</p>
                  <p>E-post: <a href="mailto:hello@intelligentforce.ai" className="text-cyan-400 hover:underline">hello@intelligentforce.ai</a></p>
                  <p>Datatilsynet: <a href="https://www.datatilsynet.no" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">datatilsynet.no</a></p>
                </div>
              </section>
            </>
          ) : (
            <>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">1. Data Controller</h2>
                <p>IntelligentForce AS is the data controller for personal data collected via intelligentforce.ai and our platform. Contact us at <a href="mailto:hello@intelligentforce.ai" className="text-cyan-400 hover:underline">hello@intelligentforce.ai</a> for privacy-related enquiries.</p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">2. Data We Collect</h2>
                <p>We collect the following categories of personal data:</p>
                <ul className="list-disc pl-6 mt-3 space-y-2">
                  <li><strong className="text-white">Contact information:</strong> Name, email address, phone number and job title provided via forms, ALEX chatbot or email.</li>
                  <li><strong className="text-white">Account information:</strong> Username, password (encrypted) and payment information for subscribers.</li>
                  <li><strong className="text-white">Usage data:</strong> IP address, browser type, pages visited, time on site and other technical data collected automatically.</li>
                  <li><strong className="text-white">Business data:</strong> Information you share in connection with the Business Health Check or implementation projects.</li>
                  <li><strong className="text-white">Communication data:</strong> Content of messages sent via email, contact form or ALEX chatbot.</li>
                </ul>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">3. Purposes and Legal Basis</h2>
                <p>We process personal data for the following purposes:</p>
                <ul className="list-disc pl-6 mt-3 space-y-2">
                  <li><strong className="text-white">Service delivery</strong> (Contract): To deliver, manage and improve the platform and services.</li>
                  <li><strong className="text-white">Customer service</strong> (Legitimate interest): To respond to enquiries and provide support.</li>
                  <li><strong className="text-white">Marketing</strong> (Consent): To send newsletters and marketing communications to those who have consented.</li>
                  <li><strong className="text-white">Analytics and improvement</strong> (Legitimate interest): To analyse website usage and improve services.</li>
                  <li><strong className="text-white">Legal obligations</strong> (Legal requirement): To comply with applicable laws and regulations.</li>
                </ul>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">4. Sharing of Data</h2>
                <p>We never sell your personal data. We may share data with service providers who help us deliver services (e.g. cloud infrastructure, payment processing, email services), who process data only on our instructions; with authorities where required by law; and in connection with a business transfer, subject to the recipient complying with this Privacy Policy.</p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">5. International Transfers</h2>
                <p>Where personal data is transferred to countries outside the EEA, we ensure the transfer is protected by appropriate safeguards, such as EU Standard Contractual Clauses (SCCs) or equivalent mechanisms under GDPR Article 46.</p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">6. Retention</h2>
                <p>We retain personal data for as long as necessary for the purposes for which it was collected, or as required by law. Account data is deleted 30 days after account closure. Communication data is retained for up to 3 years. Accounting data is retained for 5 years under Norwegian accounting law.</p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">7. Your Rights (GDPR)</h2>
                <p>As a data subject you have the right to: access your data; rectify inaccurate data; erasure ("right to be forgotten") subject to certain exceptions; restriction of processing; data portability; object to processing based on legitimate interest; and withdraw consent at any time without affecting the lawfulness of prior processing.</p>
                <p className="mt-3">To exercise your rights, contact us at <a href="mailto:hello@intelligentforce.ai" className="text-cyan-400 hover:underline">hello@intelligentforce.ai</a>. We respond within 30 days. You also have the right to lodge a complaint with the Norwegian Data Protection Authority (Datatilsynet).</p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">8. Security</h2>
                <p>We implement technical and organisational security measures to protect your personal data against unauthorised access, alteration, disclosure or deletion, including encryption in transit and at rest, access controls and regular security audits. In the event of a data breach affecting your rights and freedoms, we will notify you and the supervisory authority within 72 hours where required.</p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">9. Cookies</h2>
                <p>We use cookies and similar technologies on our website. See our <Link href="/cookies" className="text-cyan-400 hover:underline">Cookie Policy</Link> for detailed information on which cookies we use and how to manage them.</p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">10. Changes to This Policy</h2>
                <p>We may update this Privacy Policy from time to time. Material changes will be notified via email or on the website. The updated date at the top of this page indicates when the policy was last revised.</p>
              </section>
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">11. Contact</h2>
                <div className="bg-card border border-border rounded-xl p-5 space-y-1">
                  <p className="text-white font-semibold">IntelligentForce AS — Data Protection</p>
                  <p>Email: <a href="mailto:hello@intelligentforce.ai" className="text-cyan-400 hover:underline">hello@intelligentforce.ai</a></p>
                  <p>Datatilsynet: <a href="https://www.datatilsynet.no" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">datatilsynet.no</a></p>
                </div>
              </section>
            </>
          )}
        </div>

        <div className="mt-16 pt-10 border-t border-border">
          <h3 className="text-white font-bold mb-4">{isNo ? "Andre juridiske dokumenter" : "Other Legal Documents"}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: isNo ? "Vilkår for bruk" : "Terms of Service", href: "/terms", desc: isNo ? "Regler for bruk av plattformen" : "Rules governing use of our platform" },
              { label: isNo ? "Informasjonskapselpolicy" : "Cookie Policy", href: "/cookies", desc: isNo ? "Hvordan vi bruker informasjonskapsler" : "How we use cookies" },
              { label: isNo ? "Juridisk oversikt" : "Legal Overview", href: "/legal", desc: isNo ? "Ansvarsfraskrivelser og juridisk informasjon" : "Disclaimers and legal information" },
            ].map((doc) => (
              <Link key={doc.href} href={doc.href} className="bg-card border border-border rounded-xl p-5 hover:border-cyan-500/40 transition-colors group">
                <div className="text-white font-bold text-base mb-1 group-hover:text-cyan-300 transition-colors">{doc.label}</div>
                <div className="text-muted-foreground text-sm">{doc.desc}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
