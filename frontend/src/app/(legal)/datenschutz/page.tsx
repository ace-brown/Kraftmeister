import type { Metadata } from "next";
import { TypographyH1, TypographyP } from "@/components/ui/Typography";
import { LegalSection } from "@/features/legal/components/LegalSection";
import { LegalContactBlock } from "@/features/legal/components/LegalContactBlock";
import { LEGAL_LAST_UPDATED } from "@/features/legal/types/legal.types";

export const metadata: Metadata = { title: "Datenschutzerklärung – Kraftmeister" };

/** Datenschutzerklärung (GDPR privacy policy) listing every service that processes visitor or account data. */
export default function DatenschutzPage() {
  return (
    <>
      <TypographyH1>Datenschutzerklärung</TypographyH1>

      <LegalSection title="1. Verantwortlicher">
        <TypographyP>Verantwortlich für die Datenverarbeitung auf dieser Website ist:</TypographyP>
        <LegalContactBlock />
      </LegalSection>

      <LegalSection title="2. Allgemeines">
        <TypographyP>
          Kraftmeister ist ein privates Portfolio-Projekt. Personenbezogene Daten werden nur verarbeitet, soweit dies
          für den Betrieb der Anwendung erforderlich ist oder Sie die jeweilige Funktion aktiv nutzen. Es werden keine
          Daten verkauft und keine Werbe-Tracker eingesetzt.
        </TypographyP>
      </LegalSection>

      <LegalSection title="3. Hosting und Server-Logfiles">
        <TypographyP>
          Die Anwendung wird auf Servern der Hetzner Online GmbH, Industriestr. 25, 91710 Gunzenhausen, Deutschland,
          betrieben. Mit Hetzner besteht ein Vertrag zur Auftragsverarbeitung (Art. 28 DSGVO).
        </TypographyP>
        <TypographyP>
          Beim Aufruf der Website verarbeitet der Webserver automatisch technische Daten, insbesondere:
        </TypographyP>
        <ul>
          <li>IP-Adresse</li>
          <li>Datum und Uhrzeit des Zugriffs</li>
          <li>aufgerufene Seite bzw. Datei</li>
          <li>Referrer-URL (zuvor besuchte Seite)</li>
          <li>Browser und Betriebssystem (User-Agent)</li>
        </ul>
        <TypographyP>
          Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Das berechtigte Interesse liegt im sicheren und stabilen
          Betrieb der Website sowie in der Abwehr von Angriffen.
        </TypographyP>
      </LegalSection>

      <LegalSection title="4. Registrierung und Nutzerkonto">
        <TypographyP>
          Bei der Registrierung werden Firmenname, E-Mail-Adresse und Passwort verarbeitet. Das Passwort wird
          ausschließlich als kryptografischer Hash (bcrypt) gespeichert und ist für niemanden im Klartext einsehbar.
        </TypographyP>
        <TypographyP>
          Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Bereitstellung des Nutzerkontos). Die Daten werden
          gespeichert, bis Sie die Löschung Ihres Kontos verlangen. Eine formlose E-Mail an die oben genannte Adresse
          genügt.
        </TypographyP>
      </LegalSection>

      <LegalSection title="5. Von Ihnen eingegebene Inhalte">
        <TypographyP>
          In der Anwendung können Sie Kunden, Aufträge, Angebote, Rechnungen, Firmendaten (z. B. Anschrift,
          USt-IdNr., Bankverbindung) sowie Fotos speichern. Diese Daten werden in einer Datenbank bzw. einem
          Dateispeicher auf dem oben genannten Server in Deutschland abgelegt und nur zur Bereitstellung der
          jeweiligen Funktion verwendet.
        </TypographyP>
        <TypographyP>
          Wenn Sie personenbezogene Daten Dritter (z. B. Ihrer Kunden) eingeben, sind Sie dafür verantwortlich, dass
          Sie hierzu berechtigt sind. Da es sich um ein Portfolio-Projekt handelt, empfehlen wir, ausschließlich
          fiktive Daten zu verwenden.
        </TypographyP>
      </LegalSection>

      <LegalSection title="6. Demo-Zugang">
        <TypographyP>
          Der Demo-Zugang wird von allen Besuchern gemeinsam genutzt. Alle dort eingegebenen Daten sind für andere
          Besucher sichtbar und können jederzeit zurückgesetzt werden. Bitte geben Sie im Demo-Zugang keine echten
          personenbezogenen Daten ein.
        </TypographyP>
      </LegalSection>

      <LegalSection title="7. Anmeldung und lokale Speicherung">
        <TypographyP>
          Nach der Anmeldung werden Sitzungs-Tokens im lokalen Speicher Ihres Browsers (localStorage) sowie in einem
          Cookie (&bdquo;access_token&ldquo;) gespeichert. Ein Erneuerungs-Token wird zusätzlich für bis zu 7 Tage auf
          unserem Server gespeichert. Diese Speicherung ist für die Anmeldung technisch unbedingt erforderlich
          (§ 25 Abs. 2 Nr. 2 TDDDG) und erfordert daher keine Einwilligung. Beim Abmelden werden die Tokens gelöscht.
        </TypographyP>
        <TypographyP>Es werden keine Cookies zu Analyse- oder Werbezwecken gesetzt.</TypographyP>
      </LegalSection>

      <LegalSection title="8. KI-Funktionen">
        <TypographyP>
          Die Anwendung bietet optionale KI-Funktionen (Sprachnotizen, Positionsvorschläge, Fotoanalyse,
          KI-Assistent). Nur wenn Sie eine dieser Funktionen aktiv nutzen, werden die dafür erforderlichen Inhalte an
          folgende Anbieter übermittelt:
        </TypographyP>
        <ul>
          <li>
            <strong>Anthropic PBC</strong>, 548 Market St, San Francisco, CA 94104, USA – Verarbeitung von Texten,
            Fotos und Anfragen an den KI-Assistenten.
          </li>
          <li>
            <strong>OpenAI, L.L.C.</strong>, 1455 3rd Street, San Francisco, CA 94158, USA – Umwandlung von
            Sprachaufnahmen in Text.
          </li>
        </ul>
        <TypographyP>
          Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Bereitstellung der von Ihnen angeforderten Funktion). Die
          Übermittlung in die USA erfolgt auf Grundlage des EU-US Data Privacy Framework bzw. der
          EU-Standardvertragsklauseln. Nach Angaben der Anbieter werden über die API übermittelte Daten nicht zum
          Training ihrer Modelle verwendet.
        </TypographyP>
      </LegalSection>

      <LegalSection title="9. Fehlerüberwachung (Sentry)">
        <TypographyP>
          Zur Erkennung und Behebung technischer Fehler wird der Dienst Sentry der Functional Software, Inc., 45
          Fremont Street, 8th Floor, San Francisco, CA 94105, USA, eingesetzt. Im Fehlerfall werden technische Daten
          wie Fehlermeldung, aufgerufene Seite, Browser, Betriebssystem und IP-Adresse übermittelt. Sentry setzt
          keine Cookies.
        </TypographyP>
        <TypographyP>
          Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Das berechtigte Interesse liegt in einer stabilen,
          fehlerfreien Anwendung. Die Übermittlung in die USA erfolgt auf Grundlage des EU-US Data Privacy Framework
          bzw. der EU-Standardvertragsklauseln.
        </TypographyP>
      </LegalSection>

      <LegalSection title="10. Webanalyse (Umami)">
        <TypographyP>
          Zur statistischen Auswertung der Besuche wird Umami Cloud der Umami Software, Inc. eingesetzt. Umami
          arbeitet ohne Cookies und speichert keine Informationen auf Ihrem Endgerät. Erfasst werden aufgerufene
          Seiten, Referrer, Browser, Betriebssystem, Gerätetyp und Land sowie einzelne Klicks (z. B. auf
          &bdquo;Demo ansehen&ldquo;). Die IP-Adresse wird nicht gespeichert; zur Zählung eindeutiger Besucher wird
          ein täglich wechselnder, anonymisierter Wert verwendet. Eine Identifizierung einzelner Personen ist nicht
          möglich.
        </TypographyP>
        <TypographyP>
          Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Das berechtigte Interesse liegt in der Auswertung, wie die
          Website genutzt wird.
        </TypographyP>
      </LegalSection>

      <LegalSection title="11. Schriftarten">
        <TypographyP>
          Die verwendeten Schriftarten werden direkt von unserem Server ausgeliefert. Es findet keine Verbindung zu
          Servern von Google oder anderen Schriftanbietern statt.
        </TypographyP>
      </LegalSection>

      <LegalSection title="12. Ihre Rechte">
        <TypographyP>Sie haben jederzeit das Recht auf:</TypographyP>
        <ul>
          <li>Auskunft über Ihre gespeicherten Daten (Art. 15 DSGVO)</li>
          <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
          <li>Löschung Ihrer Daten (Art. 17 DSGVO)</li>
          <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
          <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
          <li>
            Widerspruch gegen Verarbeitungen auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO (Art. 21 DSGVO)
          </li>
        </ul>
        <TypographyP>
          Wenden Sie sich dazu formlos an die oben genannte E-Mail-Adresse. Außerdem haben Sie das Recht, sich bei
          einer Datenschutz-Aufsichtsbehörde zu beschweren, insbesondere in dem Bundesland Ihres Wohnsitzes.
        </TypographyP>
      </LegalSection>

      <TypographyP className="text-xs text-zinc-500">Stand: {LEGAL_LAST_UPDATED}</TypographyP>
    </>
  );
}
