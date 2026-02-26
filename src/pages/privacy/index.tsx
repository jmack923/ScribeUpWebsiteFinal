import React from "react";
import { motion } from "framer-motion";

export default function PrivacyPolicy() {
  return (
    <div className="w-full page-shell bg-white">
      <section className="relative border-b border-slate-200/70 overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 lavender-dot-fade noise-mask-bottom opacity-[0.05]" />
          <div className="absolute inset-0 distance-grid opacity-[0.02]" />
        </div>
        
        <div className="container-page page-hero-pad relative z-10">
          <div className="mx-auto w-full max-w-[980px]">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="wayfinder">Legal</p>
              <h1 className="mt-8 page-title tracking-[-0.06em] leading-[1.05]">
                Privacy Policy
              </h1>
              <p className="mt-6 text-slate-500 font-mono text-[10px] uppercase tracking-[0.18em]">
                Effective Date: February 3, 2025
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-16 prose prose-slate max-w-none px-1 sm:px-0"
            >
              <div className="space-y-10 text-slate-700 leading-relaxed text-[15px] md:text-[16px]">
                <p>
                  This Privacy Policy applies to personal information collected by ScribeUp Technologies Inc. (“ScribeUp,” “we”, “us” or “our”) from you and from third parties when you visit or use the scribeup.io web site (the “Site”), any Embedded App (defined below), and other products operated or powered by ScribeUp that reference this Privacy Policy (collectively, the “Services”).
                </p>

                <p>
                  ScribeUp provides subscription management solutions and makes these services available to users through an application (an “Embedded App”) hosted on the web platform or mobile application of ScribeUp’s financial institution or consumer fintech platform clients or partners (“Services Partners”). ScribeUp acts as a back end service provider to these Services Providers who are providing products and services to you. Your agreement with the Services Partner governs the products and services and any personal information we collect from you is subject to the applicable Services Partner privacy policy.
                </p>

                <p>
                  This Privacy Policy describes how your personal information is collected, used, stored and shared made available by, and your choices concerning our use of your data when you use our website or use our products and services. By interacting with us, or otherwise providing us with personal information, you agree to the terms and conditions of this Privacy Policy and any updates we make.
                </p>

                <div className="pt-4">
                  <h2 className="legal-h2">PERSONAL INFORMATION WE COLLECT</h2>
                  <p>
                    ScribeUp collects personal information when you use the Services. The types of personal information we collect and share depend on the product or service you have with us but the categories of personal information we collect through our Services may include the following:
                  </p>
                  <ul className="mt-6 space-y-4 list-disc pl-5">
                    <li><strong>Identity and profile information</strong> such as name, alias, postal address, IP address, email address, account name, phone number, date of birth, social security number, account preferences or account transactions or other similar identifiers;</li>
                    <li><strong>Financial information</strong> such as bank account numbers, bank account balances and transaction history, purchase history and payment history that you link to a Service Partner account or Merchant account or you give us when you use the Services. Before permitting you to use the Services, we may require you to provide certain information for identity verification purposes;</li>
                    <li><strong>Commercial information</strong>, including records of merchant services purchased, obtained, or considered, and purchasing histories;</li>
                    <li><strong>Internet and electronic network activity and device information</strong>, including details about your browser, operating system or device, (such as your MAC address, cookie identifiers, Internet protocol (IP) address, mobile advertising, and other unique identifiers, device ID, Internet service provider, mobile carrier, Internet service provider, location information (including inferred location based off of your IP address), actions that you take while using the Services, information about how you interact with the Services, including the frequency and duration of your activities, information about the links you click, and other information about how you use the Service;</li>
                    <li><strong>Geolocation data</strong> about your general or precise location (including the precise location of your device) when you access or use the Services, or other geolocation functionality on your device;</li>
                    <li><strong>Audio, electronic, visual or similar information.</strong></li>
                  </ul>
                </div>

                <div className="pt-4">
                  <h2 className="legal-h2">HOW WE COLLECT PERSONAL INFORMATION</h2>
                  <p>
                    We collect information from you and in certain cases from third parties. When you access ScribeUp’s Services through a ScribeUp Service Partner, the Service Partner provides ScribeUp with your personal information sufficient to permit ScribeUp to provide you with the requested Services. This information may include your name, address, and phone number. ScribeUp uses this information solely to provide services to you as a service provider to the ScribeUp Service Partner, and this personal information is governed by the ScribeUp Service Partner’s privacy policy and not this Privacy Policy.
                  </p>
                  <p className="mt-4">
                    In addition, when you use the Embedded App to connect your Merchant accounts, you authorize us to and we collect certain “Merchant Account Data” from the Merchant providing you with that online account. The Merchant Account Data may include the following types of personal information:
                  </p>
                  <ul className="mt-6 space-y-4 list-disc pl-5">
                    <li>Activity or items linked to your account based on usage or engagement,</li>
                    <li>Account information such as service or business name, account name, account type, and account number.</li>
                    <li>Saved payment methods such as the last 4 digits and expiration date of saved credit and debit cards.</li>
                    <li>Personal information including email addresses, phone numbers, and mailing addresses.</li>
                    <li>The Merchant Account Data we collect from your other accounts includes information from all your accounts that are connected to the online account credentials that you provide to us.</li>
                  </ul>
                  <p className="mt-6">
                    We may automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device. Additionally, we may track information about the individual web pages or products that you view or purchase, what websites or search terms referred you to the Service, and information about how you interact with the extension (such as “clicks”). This information collected automatically using technologies such as:
                  </p>
                  <ul className="mt-6 space-y-4 list-disc pl-5">
                    <li><strong>“Cookies”</strong> are data files that are placed on your device or computer and often include an anonymous unique identifier. For more information about cookies, and how to disable cookies, visit http://www.allaboutcookies.org.</li>
                    <li><strong>“Log files”</strong> track actions and collect data including your IP address, browser type, Internet service provider, referring/exit pages, and date/time stamps.</li>
                    <li><strong>“Web beacons,” “tags,” and “pixels”</strong> are electronic files used to record information about how you browse the Service.</li>
                  </ul>
                  <p className="mt-6">
                    ScribeUp and certain third-party companies (such as analytics providers) use cookies, log files and web beacons to provide and improve the Sites and Services, make them easier to use and to tailor them to our user’s needs and preferences. We may also use such technologies to track user trends and patterns to better understand and improve our Sites and Services. We also use Google Analytics to collect and process certain Service usage data. To learn more about Google Analytics and how to opt out, please visit https://www.google.com/intl/en/policies/privacy/ https://tools.google.com/dlpage/gaoptout.
                  </p>
                  <p className="mt-4">
                    Browser settings may be changed to block or delete cookies when accessing our Site through a web browser. However, this may affect the proper functioning of the Services. Please note that unless required by applicable law our Services do not respond to browser do-not-track signals.
                  </p>
                  <p className="mt-4">
                    You may be able to opt out of receiving personalized advertisements from advertisers, or other advertising networks who are members of the Network Advertising Initiative or who subscribe to the Digital Advertising Alliance’s Self-Regulatory Principles for Online Behavioral Advertising by visiting the opt-out options of each of those organizations: Network Advertising Initiative: http://www.networkadvertising.org/choices/ Digital Advertising Alliance: http://www.aboutads.info/choices/
                  </p>
                  <p className="mt-4">
                    Additionally, when you create an account, participate in a marketing or promotional activity, provide identity verification or engaging in a transaction on the Service or otherwise using the Service or otherwise communicate with us, we collect personal information from you, such as your name, email, billing address and birth date.
                  </p>
                </div>

                <div className="pt-4">
                  <h2 className="legal-h2">HOW WE USE YOUR PERSONAL INFORMATION</h2>
                  <p>
                    We use personal information that we collect generally to provide, support and monitor the Service and to inform you about other information or Services that we think will be of interest to you.
                  </p>
                  <p className="mt-4">
                    We also use personal information that we collect to help us screen for potential risk and fraud, and more generally to improve and optimize our Service (for example, by generating analytics about how our customers browse and interact with the Service, and to assess the success of our marketing and advertising campaigns). We may combine your information with information we collect from other companies and use it to improve and personalize your experience, including advertising. We may also use your information to facilitate and offer contests, sweepstakes and other promotions.
                  </p>
                  <p className="mt-4">
                    We may also use your information to comply with applicable law or in connection with a subpoena or inquiries from regulators, law enforcement agencies, or parties involved in litigation and as necessary for ScribeUp to protect and defend our rights and property, or the rights or safety of third parties, to protect the integrity of our Services, employees and users, to identify and prevent error, negligence, and crime, for audit functions, to enforce our agreements (such as ScripeUp’s Terms of Service and this Privacy Policy), and to resolve disputes.
                  </p>
                  <p className="mt-4">
                    We may also use your personal information to create aggregate data. Aggregate data are records which have been stripped of information potentially identifying customers, landing pages or end-users, and which have been manipulated or combined to provide generalized, anonymous information. Your identity and personal information will be kept anonymous in aggregated data. Aggregate data is used to help us understand consumer trends, needs, interests, and preferences so we can improve our products and services.
                  </p>
                </div>

                <div className="pt-4">
                  <h2 className="legal-h2">HOW WE SHARE YOUR PERSONAL INFORMATION</h2>
                  <p>
                    We may provide our affiliated companies and unaffiliated third parties with personal information to provide the Services and to help us market to customers and as otherwise permitted by applicable law, including as set forth below.
                  </p>
                  <p className="mt-4">
                    We also share personal information to with companies who provide services (such as hosting services and web analytics services) to assist us in performing operations and delivering the Services.
                  </p>
                  <p className="mt-4">
                    We may also share your personal information to comply with applicable laws and regulations, to respond to a subpoena, search warrant or other lawful request for information we receive, or to otherwise protect our rights.
                  </p>
                  <p className="mt-4">
                    We may elect to share your anonymized user data with third parties for various reasons, such as to provide customer insights and to help us understand how our customers use the Service, for example using Google Analytics.
                  </p>
                  <p className="mt-4">
                    Content you post through the Services such as reviews, commentary or blogs, may be accessible by other users and companies and may appear on other websites or web searches, and therefore this information could be read, collected, and used by others. We cannot ensure the privacy of any personal information included in such user generated content and we do not necessarily verify, endorse, or agree with any content posted in discussion forums.
                  </p>
                  <p className="mt-4">
                    Personal information may be disclosed or transferred as part of, or during negotiations of any purchase, sale, lease, merger, amalgamation, or any other type of acquisition, disposal, securitization or financing involving ScribeUp. In the event we go through a corporate transaction resulting in a structural change, such as a merger, sale of assets, acquisition by another company, bankruptcy, insolvency, or dissolution, to the extent permitted by applicable law personal information may be transferred to a third party as part of such event and thereby become subject to the privacy practices of that third party, which may materially different than those of us.
                  </p>
                  <p className="mt-4">
                    We will also share your personal information with other third parties when we have your consent to do and when you intentionally direct us to do so or when you use our Services to intentionally interact with third parties.
                  </p>
                </div>

                <div className="pt-4">
                  <h2 className="legal-h2">DATA SECURITY</h2>
                  <p>
                    We at ScribeUp take your data privacy and security seriously. ScribeUp maintains physical, electronic and procedural security measures to guard against unauthorized access to systems and uses safeguards such as firewalls and data encryption. However, no Internet or e-mail transmission is ever fully secure or error-free. In particular, e-mail sent to or from us may not be secure. Therefore, you should take special care in deciding what information you send to us via the Services or e-mail. Please keep this in mind when disclosing any personal information to ScribeUp via the Internet. If you have any questions on data privacy or security or would like to voice your opinion as a user on the matter, we ask you to reach out at info@scribeup.io.
                  </p>
                </div>

                <div className="pt-4">
                  <h2 className="legal-h2">DATA RETENTION</h2>
                  <p>
                    ScribeUp will retain your personal information for as long as is necessary to complete the purposes for which it was collected, or as may be required by law. Generally, we utilize the following criteria to determine the length of time for which we retain information:
                  </p>
                  <ul className="mt-6 space-y-4 list-disc pl-5">
                    <li>The business purposes for which the information is used, and the length of time for which the information is required to achieve those purposes;</li>
                    <li>Whether we are required to retain the information type in order to comply with legal obligations or contractual commitments, to defend against potential legal claims, or as otherwise necessary to investigate theft or other activities potentially in violation of ScribeUp’s policies and procedures applicable to you or against the law, to ensure a secure online environment, or to protect health and safety;</li>
                    <li>The privacy impact of ongoing retention on the consumer; and</li>
                    <li>The manner in which information is maintained and flows through our systems, and how best to manage the lifecycle of information in light of the volume and complexity of the systems in our infrastructure.</li>
                  </ul>
                  <p className="mt-6">
                    Individual pieces of personal information such as those listed above may exist in different systems that are used for different business or legal purposes. A different maximum retention period may apply to each use case of the information. Certain individual pieces of information may also be stored in combination with other individual pieces of information, and the maximum retention period may be determined by the purpose for which that information set is used.
                  </p>
                </div>

                <div className="pt-4">
                  <h2 className="legal-h2">LINKS TO OTHER SITES</h2>
                  <p>
                    This Privacy Policy only applies to ScribeUp Sites and Services and does not apply to any third party websites to which a link may be provided on the Service. We cannot control and are not responsible for the actions of third parties operating such sites.
                  </p>
                </div>

                <div className="pt-4">
                  <h2 className="legal-h2">MINORS</h2>
                  <p>
                    The Service is not intended for individuals under the age of 18. If you become aware that personal information about your child has been provided to us without your consent, please contact us. If we become aware that a child under 13 has provided us with personal information, we will take steps to delete the information, except where we are required by applicable law to keep it.
                  </p>
                </div>

                <div className="pt-4">
                  <h2 className="legal-h2">CHANGES</h2>
                  <p>
                    We may update this Privacy Policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal or regulatory reasons. Generally, the most current version of this Privacy Policy will be effective at the time it is posted or you are otherwise notified. By continuing to access or use the Services after those changes become effective, you agree to be bound by the revised Privacy Policy.
                  </p>
                </div>

                <div className="pt-4">
                  <h2 className="legal-h2">REGION SPECIFIC DISCLOSURES</h2>
                  <p>
                    1. Residents of the State of California have the right to request information from ScribeUp regarding other companies to whom the company has disclosed certain categories of information during the preceding year for the other companies' direct marketing purposes. If you are a California resident and would like to make such a request, contact us at support@scribeup.io.
                  </p>
                  <p className="mt-4">
                    The California Consumer Privacy Act ("CCPA") (as amended by the California Privacy Rights Act) provides California residents with the right to receive certain disclosures regarding the collection, use, and sharing of "Personal Information," as well as the right to know/access, delete, and limit sharing of Personal Information. The CCPA defines "Personal Information" to mean "information that identifies, relates to, describes, is reasonably capable of being associated with, or could reasonably be linked, directly or indirectly, with a particular consumer or household." Information we collect is subject to the CCPA if ScribeUp is deemed to be a business subject to the CCPA. Further personal information may be exempt from the CCPA because it is considered public information (e.g., it is made available by a government entity) or covered by a specific federal privacy law, such as the Gramm–Leach–Bliley Act, the Health Insurance Portability and Accountability Act, or the Fair Credit Reporting Act.
                  </p>
                  <p className="mt-4">
                    2. Residents of the State of Nevada have the right to opt out of the sale of certain pieces of their information to other companies who will sell or license their information to others. ScribeUp does not sell the personal information of its customers. However, if you are a Nevada resident and would like to make such a request, please email support@scribeup.io.
                  </p>
                </div>

                <div className="pt-4">
                  <h2 className="legal-h2">CONTACT US</h2>
                  <p>
                    For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by e-mail at info@scribeup.io. Persons with disabilities may obtain this notice in alternative format upon request by contacting us at support@scribeup.io.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        <div className="container-page">
          <div aria-hidden="true" className="hero-sep" />
        </div>
      </section>
    </div>
  );
}
