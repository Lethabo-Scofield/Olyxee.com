import { FC } from "react";
import LegalLayout, { LegalSection } from "../components/LegalLayout";

const sections: LegalSection[] = [
  {
    title: "1. Framework Alignment",
    content: "Olyxee aligns its security and privacy program with industry-recognized frameworks including SOC 2, ISO/IEC 27001, and the NIST Cybersecurity Framework. Formal attestations are pursued in accordance with our roadmap and are made available to customers and prospects under NDA."
  },
  {
    title: "2. Data Protection Laws",
    content: "We process personal data in accordance with applicable data protection laws, including:\n\n• EU General Data Protection Regulation (GDPR)\n• UK General Data Protection Regulation (UK GDPR)\n• California Consumer Privacy Act (CCPA) and CPRA, where applicable\n\nFor cross-border transfers, we rely on Standard Contractual Clauses (SCCs) and supplementary measures where required."
  },
  {
    title: "3. AI Governance",
    content: "Olyxee maintains internal AI governance policies aligned with emerging regulatory expectations, including the EU AI Act and NIST AI Risk Management Framework. Our governance covers risk classification, model documentation, evaluation requirements, human oversight, and incident response specific to AI systems."
  },
  {
    title: "4. Data Processing Agreements",
    content: "A Data Processing Agreement (DPA) is available for customers acting as data controllers. Our DPA incorporates the EU SCCs and addresses obligations under GDPR, UK GDPR, and other applicable laws. Contact compliance@olyxee.com to request the current DPA."
  },
  {
    title: "5. Subprocessors",
    content: "Olyxee uses a limited set of vetted subprocessors for hosting, analytics, and operational tooling. Each subprocessor is subject to security and privacy diligence and contractually bound to obligations consistent with our customer commitments. A current list of subprocessors is available on request."
  },
  {
    title: "6. Vendor Due Diligence",
    content: "Enterprise customers and prospects can request:\n\n• Security questionnaire responses (SIG, CAIQ)\n• Architecture and data-flow overviews\n• Pen test summary letters\n• Insurance certificates\n• DPA and SCCs\n\nThese materials are made available under NDA."
  },
  {
    title: "7. Audit and Logging",
    content: "Olyxee maintains comprehensive audit logging for administrative and customer-facing actions. Logs are retained in accordance with policy and made available to enterprise customers via supported export interfaces."
  },
  {
    title: "8. Regulatory Cooperation",
    content: "Olyxee cooperates with regulatory authorities as required by law and works in good faith with customers to support their own compliance obligations, including responding to data subject requests and supervisory authority inquiries."
  },
  {
    title: "9. Contact",
    content: "For compliance inquiries, including DPAs, security reviews, and audit support, contact compliance@olyxee.com."
  },
];

const Compliance: FC = () => (
  <LegalLayout
    documentTitle="Compliance"
    documentNumber="OLX-CMP-001"
    version="1.6"
    effectiveDate="May 2026"
    description="Olyxee's compliance posture: frameworks, data protection, and AI governance."
    path="/compliance"
    intro="An overview of Olyxee's compliance program, the frameworks we align with, and how we support customer obligations under applicable law."
    sections={sections}
    downloadFilename="Olyxee_Compliance.txt"
    contactEmail="compliance@olyxee.com"
  />
);

export default Compliance;
