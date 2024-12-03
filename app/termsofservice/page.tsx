import { Separator } from '@/components/ui/separator';

export default function termsofservice() {
    return (
        <div className="h-full px-4 py-6 lg:px-8">
            <div className="space-y-4">
                <>
                    <div className="flex items-center space-x-4">
                      <h1>Terms of Service</h1>
                      <p className='ml-auto'>Last updated: December 02, 2024</p>
                    </div>
                    <Separator className="my-4" />
                    <>
                        <h2>1. Acceptance of Terms</h2>
                            <p>Welcome to Offbrand spotify, a streaming platform. By accessing or using our services, you agree to be bound by these Terms of Service. If you do not agree to these Terms, please do not use our platform</p>
                        <h2>2. Eligibility</h2>
                            <p>You must be at least 13 years  old to use this website. By creating an account, you confrim that you meet this age requirement</p>
                        <h2>3. Service Provided</h2>
                            <p>Offbrand spotify provides a platform for streaming music. Users can create accounts, download music for offline use, and share their listening history and social media  links through public profiles.</p>
                        <h2>4. User Accounts</h2>
                        <ul>
                            <li><strong>Account Registration</strong>: To access certain features,  you must create an account using a valid email address and password.</li>
                            <li><strong>Account Security</strong>: You are responsible for maintaining the confidentiality of your account credentials. Notify us immediately if you suspect unauthorized access.</li>
                        </ul>
                        <h2>5. Privacy and Data Collection</h2>
                        <ul>
                            <li><strong>Information Collect</strong>:  We collect your email address and password to create and manage your account.</li>
                            <li><strong>Third-Party Services</strong>: We use Firebase for authentication and other backend services. By using our platform, you agree to Firebase&#39;s Terms of Service and Privacy Policy.</li>
                        </ul>
                        For more details, review our Privacy Policy
                        <h2>6. Prohibited Activties</h2>
                        You agree not to:
                        <ul>
                            <li>Use to platform for illegal or unauthorized purposes,</li>
                            <li>Attempt to access or manipulate non-public parts of the website.</li>
                            <li>Share or distribute copyrighted music outside the platform.</li>
                        </ul>
                        <h2>7. Limitation of Liability</h2>
                        offbrand spotify is provided on an &quot;as-is&quot; basis. We make no guarantees about the availability, accuracy, or functionality of the service. We are not liable for any issues or damages arising from the use of our platform.
                        <h2>8. Modifications to the Service</h2>
                        We reserve the right to modify or discontinue any part of the service without notice.
                        <h2 >9. Governing Law</h2>
                        These Terms are governed by the laws of the State of Texas, United States.
                        <h2>10. Contact Information</h2>
                        <ul>
                            <li>For questions or issues related to these Terms, contact us at sillyangel@hackclub.app.</li>
                        </ul>
                    </>
                </>
            </div>
            <br>
            </br>
            <br>
            </br>
        </div>
        
    )
}