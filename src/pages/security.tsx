import { FC } from "react";
import LegalLayout, { LegalSection } from "../components/LegalLayout";

const sections: LegalSection[] = [
  {
    title: "1. Our Security Posture",
    content: "Security is a first-class primitive at Olyxee. Our program covers infrastructure, application, data, and the AI lifecycle itself. We design defensively, default to least privilege, and assume that any layer can fail."
  },
  {
    title: "2. Defense in Depth",
    content: "We operate multiple, independent layers of protection across our infrastructure, application, and data planes. No single control is relied upon for the security of customer data, and controls are continuously tested through automated assessments and red-team exercises."
  },
  {
    title: "3. Encryption",
    content: "All customer data is encrypted in transit using TLS 1.2 or higher (TLS 1.3 preferred) and at rest using AES-256. Cryptographic keys are managed through hardened key management systems with strict access policies. Customer-managed keys (CMK) are available for enterprise deployments."
  },
  {
    title: "4. Identity and Access",
    content: "Access to production systems is governed by strong identity controls:\n\n• Single Sign-On (SSO) and SCIM provisioning\n• Role-Based Access Control (RBAC) with least-privilege defaults\n• Mandatory hardware-backed multi-factor authentication for personnel\n• Short-lived credentials and just-in-time access for sensitive operations\n• Comprehensive audit logging of all administrative actions"
  },
  {
    title: "5. Infrastructure Security",
    content: "Workloads run on hardened, isolated infrastructure with automated patching, vulnerability scanning, and immutable images. Network segmentation, private connectivity, and least-privilege firewall policies are enforced across all environments."
  },
  {
    title: "6. Monitoring and Response",
    content: "Olyxee maintains continuous monitoring across logs, network telemetry, and runtime behavior. Security events are triaged 24/7 by an on-call response team. Incident response playbooks are tested regularly and customers are notified of incidents that materially affect their data, in line with contractual and legal obligations."
  },
  {
    title: "7. Application Security",
    content: "Our software development lifecycle includes mandatory peer review, automated static and dynamic analysis, dependency scanning, and pre-deployment security gates. High-risk changes receive additional architectural review."
  },
  {
    title: "8. Data Handling",
    content: "Customer data is segregated by tenant, encrypted, and accessed only as necessary to deliver the service. Production data is not used in development or test environments. Backups are encrypted and retention policies follow customer agreements and regulatory obligations."
  },
  {
    title: "9. AI Lifecycle Security",
    content: "Models, prompts, and verification artifacts are treated as sensitive assets. We protect against model exfiltration, prompt injection, and unauthorized model modification through input validation, output verification (Orgni), provenance tracking, and access controls scoped to model artifacts."
  },
  {
    title: "10. Responsible Disclosure",
    content: "We welcome reports from security researchers. If you believe you have found a vulnerability, please report it to info@olyxee.com. We commit to acknowledging reports promptly, working in good faith on remediation, and recognizing valid disclosures. Please act in good faith, avoid privacy violations, and do not disrupt our services."
  },
  {
    title: "11. Contact",
    content: "Security inquiries: info@olyxee.com\nVulnerability reports: info@olyxee.com (PGP key on request)"
  },
];

const Security: FC = () => (
  <LegalLayout
    documentTitle="Security"
    documentNumber="OLX-SEC-001"
    version="2.0"
    effectiveDate="May 2026"
    description="How Olyxee secures customer data, models, and infrastructure."
    path="/security"
    intro="An overview of Olyxee's technical and organizational security controls. This document is intended for security teams evaluating or operating Olyxee in production environments."
    sections={sections}
    downloadFilename="Olyxee_Security.txt"
    contactEmail="info@olyxee.com"
  />
);

export default Security;
