import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <Card className="bg-card/60 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="text-3xl font-headline">Privacy Policy</CardTitle>
           <p className="text-sm text-muted-foreground">Tech Trade Hub Academy (A Subsidiary of Tech Trade Hub)</p>
        </CardHeader>
        <CardContent className="space-y-6 text-muted-foreground">
            <div>
                <p>
                    <strong>Effective Date: July 06, 2025</strong>
                </p>
                <p className="mt-2">
                    At Tech Trade Hub Academy (“we,” “us,” or “our”), a subsidiary of Tech Trade Hub, we are committed to protecting your privacy in compliance with the Nigerian Data Protection Regulation (NDPR) 2019. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information when you use our website, mobile application, or related services (collectively, the “Service”). By accessing or using the Service, you agree to the practices described herein.
                </p>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">1. Information We Collect</h3>
                <p>We may collect the following types of information:</p>
                <ul className="list-disc list-inside pl-4 space-y-2 mt-2">
                    <li>
                        <strong>Personal Information:</strong> Name, email address, phone number, home address, and social media handles (e.g., X, Telegram, Facebook) provided during registration or as a Co-Founder. Authentication data (e.g., Google, X, email/password) via Firebase.
                    </li>
                    <li><strong>Course Data:</strong> Progress tracking, assessment scores, and enrollment details.</li>
                    <li><strong>Usage Data:</strong> IP address, browser type, device information, and time spent on content, collected automatically.</li>
                    <li><strong>Communication Data:</strong> Messages sent via support channels.</li>
                    <li><strong>Payment Information:</strong> Transaction details if using payment gateways (e.g., Paystack, Stripe), processed securely by third-party providers.</li>
                </ul>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">2. How We Use Your Information</h3>
                <p>We use your information to:</p>
                <ul className="list-disc list-inside pl-4 space-y-1 mt-2">
                    <li>Provide, maintain, and improve the Service, including course delivery and progress tracking.</li>
                    <li>Process registrations, authenticate users, and manage Co-Founder equity stakes.</li>
                    <li>Communicate with you about updates, notifications, or promotional offers (with your consent).</li>
                    <li>Ensure security, detect fraud, and comply with legal obligations under the NDPR.</li>
                    <li>Analyze usage patterns to enhance user experience and platform performance.</li>
                </ul>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">3. Legal Basis for Processing</h3>
                <p>We process your data based on:</p>
                <ul className="list-disc list-inside pl-4 space-y-1 mt-2">
                    <li><strong>Consent:</strong> Where you provide explicit permission (e.g., marketing emails).</li>
                    <li><strong>Contractual Necessity:</strong> To fulfill our agreement to deliver educational services.</li>
                    <li><strong>Legitimate Interests:</strong> To improve the Service and ensure security, balanced with your rights, as permitted under NDPR Section 2.2.</li>
                </ul>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">4. Sharing Your Information</h3>
                <p>We do not sell your personal information. We may share it with:</p>
                <ul className="list-disc list-inside pl-4 space-y-1 mt-2">
                    <li><strong>Service Providers:</strong> Third parties (e.g., Firebase, Paystack) to operate the Service, under confidentiality agreements compliant with NDPR.</li>
                    <li><strong>Legal Authorities:</strong> If required by law or to protect our rights, in accordance with NDPR Section 4.1.</li>
                    <li><strong>Co-Founders:</strong> Limited data (e.g., usernames) for collaboration, with restricted access and NDPR-compliant safeguards.</li>
                    <li>Your information may be transferred outside Nigeria (e.g., to Firebase servers) only with appropriate safeguards, such as EU Standard Contractual Clauses or other mechanisms approved by the National Information Technology Development Agency (NITDA).</li>
                </ul>
            </div>

             <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">5. Data Security</h3>
                <ul className="list-disc list-inside pl-4 space-y-1 mt-2">
                    <li>We implement reasonable security measures (e.g., encryption, firewalls) to protect your data against unauthorized access, loss, or misuse, as required by NDPR Section 4.2.</li>
                    <li>Firebase handles authentication and storage with industry-standard security protocols.</li>
                    <li>In the event of a data breach, we will notify affected users and the NITDA within 72 hours, as mandated by NDPR Section 4.1(d).</li>
                </ul>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">6. Your Rights and Choices</h3>
                <p>Under the NDPR, you have the following rights:</p>
                <ul className="list-disc list-inside pl-4 space-y-1 mt-2">
                    <li><strong>Access:</strong> Request a copy of your personal information.</li>
                    <li><strong>Correction:</strong> Update inaccurate or incomplete data.</li>
                    <li><strong>Deletion:</strong> Request removal of your data, subject to legal retention requirements.</li>
                    <li><strong>Opt-Out:</strong> Unsubscribe from marketing communications via a provided link.</li>
                    <li><strong>Data Portability:</strong> Receive your data in a structured, commonly used format.</li>
                    <li>To exercise these rights, contact our Data Protection Officer at dpo@techtradehubacademy.com.</li>
                </ul>
            </div>
            
            <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">7. Data Retention</h3>
                 <ul className="list-disc list-inside pl-4 space-y-1 mt-2">
                    <li>We retain your data for as long as necessary to provide the Service, comply with NDPR retention obligations, or resolve disputes, typically not exceeding [e.g., 5 years] unless required by law.</li>
                    <li>Inactive accounts may be deleted after [e.g., 2 years] of inactivity.</li>
                </ul>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">8. Cookies and Tracking Technologies</h3>
                 <ul className="list-disc list-inside pl-4 space-y-1 mt-2">
                    <li>We use cookies and similar technologies to enhance functionality and analyze usage, in compliance with NDPR transparency requirements.</li>
                    <li>You can manage cookie preferences through your browser settings.</li>
                </ul>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">9. Third-Party Links</h3>
                 <ul className="list-disc list-inside pl-4 space-y-1 mt-2">
                    <li>The Service may contain links to third-party websites or services (e.g., YouTube for course videos). These third parties have their own privacy policies, and we are not responsible for their data practices.</li>
                    <li>We recommend reviewing the privacy policies of these third parties before interacting with their content.</li>
                </ul>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">10. Children’s Privacy</h3>
                <p>The Service is not intended for users under 13. We do not knowingly collect data from children. Parents or guardians should contact our Data Protection Officer to request deletion if applicable.</p>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">11. Changes to This Policy</h3>
                <p>We may update this Privacy Policy periodically. Changes will be posted here with an updated Effective Date. Continued use of the Service constitutes acceptance of the revised policy. Significant changes will be communicated via email or in-app notification.</p>
            </div>
            
            <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">12. Data Protection Officer</h3>
                <p>For data protection concerns, contact our Data Protection Officer:</p>
                <ul className="list-none list-inside pl-4 space-y-1 mt-2">
                    <li><strong>Email:</strong> dpo@techtradehubacademy.com</li>
                    <li><strong>Address:</strong> [Insert Address, e.g., [Your Address], Gombe, Nigeria]</li>
                    <li><strong>Phone:</strong> [+2348144049978]</li>
                </ul>
            </div>
            
            <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">13. Contact Us</h3>
                <p>For general inquiries, reach us at:</p>
                <ul className="list-none list-inside pl-4 space-y-1 mt-2">
                    <li><strong>Email:</strong> support@techtradehubacademy.com</li>
                    <li><strong>Address:</strong> [Insert Address, e.g., [Your Address], Gombe, Nigeria]</li>
                    <li><strong>Phone:</strong> [+2349061686106]</li>
                </ul>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">14. Governing Law</h3>
                <p>This Policy is governed by the laws of the Federal Republic of Nigeria, including the NDPR 2019, and any disputes shall be subject to the jurisdiction of Nigerian courts.</p>
            </div>

        </CardContent>
      </Card>
    </div>
  );
}
