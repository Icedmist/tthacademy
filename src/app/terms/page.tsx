
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <Card className="bg-card/60 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="text-3xl font-headline">Terms of Use</CardTitle>
          <p className="text-sm text-muted-foreground">Tech Trade Hub Academy (A Subsidiary of Tech Trade Hub)</p>
        </CardHeader>
        <CardContent className="space-y-6 text-muted-foreground">
            <div>
                <p><strong>Effective Date: July 06, 2025</strong></p>
                <p className="mt-2">Welcome to Tech Trade Hub Academy (“we,” “us,” or “our”), a subsidiary of Tech Trade Hub. These Terms of Use (“Terms”) govern your access to and use of our website, mobile application, and related services (collectively, the “Service”). By accessing or using the Service, you agree to be bound by these Terms. If you do not agree, please do not use the Service.</p>
            </div>
            
            <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">1. Acceptance of Terms</h3>
                <ul className="list-disc list-inside pl-4 space-y-2 mt-2">
                    <li>By using the Service, you confirm that you are at least 13 years old and have the legal capacity to enter into this agreement.</li>
                    <li>These Terms may be updated periodically, with changes posted here and an updated Effective Date. Continued use after changes constitutes acceptance.</li>
                </ul>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">2. Description of Service</h3>
                 <ul className="list-disc list-inside pl-4 space-y-2 mt-2">
                    <li>Tech Trade Hub Academy provides online educational courses in Futures Trading, Web3, Crypto, Tech Skills, and AI & Machine Learning, accessible via a website and planned mobile application.</li>
                    <li>The Service includes course content, progress tracking, assessments, and certificates, supported by Firebase authentication.</li>
                </ul>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">3. User Accounts</h3>
                 <ul className="list-disc list-inside pl-4 space-y-2 mt-2">
                    <li>You must register with a valid email, phone number, or social media account (e.g., Google, X) to access certain features.</li>
                    <li>You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.</li>
                    <li>Notify us immediately at support@techtradehubacademy.com if you suspect unauthorized use.</li>
                </ul>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">4. Use of the Service</h3>
                <p><strong>Permitted Use</strong>: Use the Service for personal, educational purposes as intended.</p>
                <p className='mt-2'><strong>Prohibited Use</strong>: You may not:</p>
                <ul className="list-disc list-inside pl-4 space-y-2 mt-2">
                    <li>Violate laws, infringe on intellectual property, or engage in fraudulent activities.</li>
                    <li>Reverse-engineer, modify, or distribute the Service’s content without permission.</li>
                    <li>Use bots, scrapers, or other automated tools to access the Service.</li>
                    <li>Harass, defame, or harm other users or Co-Founders.</li>
                </ul>
                <p className="mt-2">We reserve the right to suspend or terminate access for violations.</p>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">5. Intellectual Property</h3>
                 <ul className="list-disc list-inside pl-4 space-y-2 mt-2">
                    <li>All content, including courses and materials, is owned by Tech Trade Hub Academy or its licensors.</li>
                    <li>You may not reproduce, distribute, or create derivative works without written consent, except for personal use within the Service.</li>
                    <li>Course completion certificates are for personal use and may not be altered or misrepresented.</li>
                </ul>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">6. Third-Party Links and Services</h3>
                 <ul className="list-disc list-inside pl-4 space-y-2 mt-2">
                    <li>The Service may contain links to third-party websites or services (e.g., YouTube for course videos).</li>
                    <li>We are not responsible for the content, privacy practices, or availability of these third parties. Their terms and policies apply when you interact with them.</li>
                    <li>Use of third-party services is at your own risk.</li>
                </ul>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">7. Payment and Pricing</h3>
                 <ul className="list-disc list-inside pl-4 space-y-2 mt-2">
                    <li>Courses are offered at the following prices:
                        <ul className="list-disc list-inside pl-4 space-y-1 mt-1">
                            <li>Beginner: ₦2,500 each, with up to 25% bundle discount.</li>
                            <li>Intermediate: ₦5,000 each, with up to 25% bundle discount.</li>
                            <li>Advanced: ₦7,000 each, with up to 25% bundle discount.</li>
                        </ul>
                    </li>
                    <li>Payments are processed via third-party gateways (e.g., Paystack, Stripe), subject to their terms.</li>
                    <li>All fees are non-refundable unless required by law.</li>
                </ul>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">8. Course Completion and Assessments</h3>
                 <ul className="list-disc list-inside pl-4 space-y-2 mt-2">
                    <li>Progress is tracked based on time spent (minimum 90% of module duration) and logged via Firebase.</li>
                    <li>Modules include up to 10 multiple-choice questions (60% pass mark); the final assessment has 25 questions (70% minimum for graduation).</li>
                    <li>Certificates are issued upon successful completion, subject to verification.</li>
                </ul>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">9. Limitation of Liability</h3>
                 <ul className="list-disc list-inside pl-4 space-y-2 mt-2">
                    <li>The Service is provided “as is” without warranties of any kind, to the extent permitted by law.</li>
                    <li>We are not liable for indirect damages (e.g., lost profits) arising from your use of the Service, except as required by Nigerian law.</li>
                    <li>Total liability shall not exceed the amount you paid for the Service in the past 12 months.</li>
                </ul>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">10. Indemnification</h3>
                <p>You agree to indemnify and hold harmless Tech Trade Hub Academy, Tech Trade Hub, and their affiliates from claims, damages, or expenses arising from your misuse of the Service or violation of these Terms.</p>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">11. Termination</h3>
                 <ul className="list-disc list-inside pl-4 space-y-2 mt-2">
                    <li>We may terminate or suspend your access at our discretion, with or without notice, for breach of these Terms.</li>
                    <li>Upon termination, your right to use the Service ceases, and unvested Co-Founder equity (if applicable) is forfeited.</li>
                </ul>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">12. Governing Law and Dispute Resolution</h3>
                 <ul className="list-disc list-inside pl-4 space-y-2 mt-2">
                    <li>These Terms are governed by the laws of the Federal Republic of Nigeria.</li>
                    <li>Disputes shall be resolved through mediation. If unresolved, they will be subject to the jurisdiction of [Insert Jurisdiction, e.g., Gombe, Nigeria] courts.</li>
                </ul>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">13. Changes to the Service</h3>
                <p>We may modify, suspend, or discontinue the Service (or any part) at any time without liability.</p>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">14. Contact Us</h3>
                <p>For questions or concerns, reach us at:</p>
                <ul className="list-none list-inside pl-4 space-y-1 mt-2">
                    <li><strong>Email</strong>: support@techtradehubacademy.com</li>
                    <li><strong>Address</strong>: [Insert Address, e.g., [Your Address], Gombe, Nigeria]</li>
                    <li><strong>Phone</strong>: [Insert Phone Number]</li>
                </ul>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Additional Notes and Refinements</h3>
                <ul className="list-disc list-inside pl-4 space-y-2 mt-2">
                    <li><strong>NDPR Alignment</strong>: While this is a general Terms of Use, it references NDPR compliance indirectly (e.g., age restriction, data use). Add a clause linking to the Privacy Policy for data-specific rights.</li>
                    <li><strong>Consumer Protection</strong>: Include a refund policy if required by Nigerian Consumer Protection Council (CPC) rules, even if fees are non-refundable.</li>
                    <li><strong>Force Majeure</strong>: Add a clause excusing performance delays due to unforeseen events (e.g., natural disasters).</li>
                    <li><strong>Digital Signatures</strong>: Specify that electronic acceptance (e.g., clicking “I Agree”) constitutes agreement if implemented.</li>
                    <li><strong>Co-Founder Terms</strong>: Note that Co-Founders are subject to a separate Independent Contractor Agreement.</li>
                </ul>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
