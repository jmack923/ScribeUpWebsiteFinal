import React from "react";
import { motion } from "framer-motion";

export default function Terms() {
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
                Terms of Service
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
                <div className="pt-4">
                  <h2 className="legal-h2">INTRODUCTION</h2>
                  <p>
                    Welcome to ScribeUp Technologies Inc. (&quot;ScribeUp&quot;, &quot;we&quot;, &quot;us&quot; and &quot;our&quot;). ScribeUp provides subscription management solutions and makes these services available to users through an application (an &quot;Embedded App&quot;) hosted on the web platform or mobile application of ScribeUp&apos;s financial institution or consumer fintech platform clients and partners (&quot;Services Partners&quot;). These Terms of Service form a legal agreement (&quot;Terms of Service&quot;, &quot;Terms&quot;) between you (&quot;you&quot;, &quot;your&quot;, or &quot;user&quot;) and ScribeUp which sets forth the terms and conditions for your use of the ScribeUp website at https://www.scribeup.io (the &quot;Site&quot;), any Embedded App, and other products operated or powered by ScribeUp that reference these Terms (collectively, the &quot;Services&quot;). By visiting the Site or using an Embedded App or any other Services you agree to be bound by these Terms, including those additional terms and conditions and policies referenced herein (such as ScribeUp&apos;s Privacy Policy (the &quot;Privacy Policy&quot;)).
                  </p>
                  <p className="mt-4">
                    Please read these Terms carefully before accessing or using the Services. THESE TERMS INCLUDE PROVISIONS THAT LIMIT OUR LIABILITY AND REQUIRE INDIVIDUAL ARBITRATION FOR ANY POTENTIAL LEGAL DISPUTE. If you do not agree to all the terms and conditions of these Terms, then you may not access the Site or use the Services. By agreeing to these Terms, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use the Service.
                  </p>
                </div>

                <div className="pt-4">
                  <h2 className="legal-h2">AMENDMENTS</h2>
                  <p>
                    ScribeUp may amend the Terms at any time with notice that we deem to be reasonable under the circumstances (each a &quot;Revised Version&quot;) by (i) posting revised Terms on the Site and/or Embedded App (as applicable), and/or (ii) notifying you of the changes via email where practicable, and otherwise through reasonable means. The Revised Version will be effective as of the time it is communicated but will not apply retroactively. Your continued use of the Service after the posting of a Revised Version constitutes your acceptance of such Revised Version. Any dispute between the parties that arose before the effective date of a Revised Version is governed by the Terms (including the binding individual arbitration clause) that was in place when the dispute arose.
                  </p>
                  <p className="mt-4">
                    Our Services change from time to time and their form and functionality may change as we launch new products or features or make upgrades, patches or error corrections (&quot;Updates&quot;). We reserve the right to modify, suspend, discontinue or limit your access to or use of any part of the Services (including by limiting or discontinuing certain features of the Services), temporarily or permanently, without notice to you. These Terms will apply to any and all Updates to the Services. We will have no liability because of any Update to the Services or any suspension or termination of your access to or use of the Services.
                  </p>
                </div>

                <div className="pt-4">
                  <h2 className="legal-h2">SERVICES ACCESS AND RELATIONSHIPS</h2>
                  <p>
                    To access the Embedded App, you generally must be connected to ScribeUp through a Service Partner who is providing you online banking or other services (an &quot;Enrolled User&quot;). ScribeUp provides financial technology services to Services Partners on a service provider basis (&quot;Partner Services&quot;). Services Partners may automatically enroll you in the Embedded App when you sign up for the products and services of such Services Partners. Upon enrolling, an account will be established for you. If you enroll with us through a Services Partner you may be able to access your ScribeUp account directly or through your account with such Services Partner. Additionally, in some instances, while you may not have enrolled with us through a Services Partner, a Services Partner may sponsor your enrollment with us. &quot;Services Partner&quot; includes any third party that provides you with access to the Embedded App, including by sponsoring such access, or otherwise invites you to access or use the Embedded App and/or information contained on your credit report. Services Partners include credit unions, banks, mortgage lenders, credit card issuers, other financial institutions, insurance companies, technology service providers, and other parties. The services you receive from a Services Partner are governed by your agreements with the Service Provider and the Service Provider data that ScribeUp accesses to provide the Partner Services are governed by the Service Provider&apos;s privacy notice.
                  </p>
                  <p className="mt-4">
                    The Embedded App includes functionality that allows consumers to consolidate and automate their bill payment obligations to or otherwise transact with participating merchants (&quot;Merchants&quot;). In providing the Embedded App ScribeUp does not control the information displayed by Merchants and is not a re-seller or distributor of any products or services for any of these Merchants. All products or offers from Merchant with which you transact are priced and fulfilled or serviced by the applicable Merchants and not ScribeUp nor its Service Partners. Neither ScribeUp nor its Service Partners are responsible or liable for any liability claims, pricing errors, inaccurate descriptions, improper charges or other errors from the Merchants. Neither ScribeUp nor its Service Partners endorse, warrant or guarantee any Merchant&apos;s products or services displayed on the Embedded App. If you need to request a change, refund or cancellation of any purchase of a product or service provided by a Merchant or otherwise have a question related to such products or services, you must contact the Merchant directly.
                  </p>
                </div>

                <div className="pt-4">
                  <h2 className="legal-h2">MERCHANT ACCOUNT AND OTHER USER INFORMATION</h2>
                  <p>
                    To facilitate your use of the Embedded App, the Service Partner through which you connect to ScribeUp will share with ScribeUp personal and activity-related information which is maintained in your Merchant accounts (&quot;Merchant Account Data&quot;) and any other information necessary to facilitate your use of the Embedded App (collectively, &quot;User Information&quot;) and accordingly you direct ScribeUp to access and collect such User Information. This data may include your Merchant Account access credentials, contact information, and Merchant Account activity. You represent that you are a legal owner of, and that you are authorized to provide us with, all User Information.
                  </p>
                  <p className="mt-4">
                    We will use User Information to provide you with the Services you request and for our own internal business purposes, including to develop new products and services. By using the Services, you authorize ScribeUp to access this information maintained by Merchants and you expressly authorize such third parties to disclose your information to us. By consenting to these Terms, you are also agreeing that you are responsible for providing your Merchant authentication details to us so we can retrieve Merchant Account Data, and for keeping those credentials up to date in the Embedded App. ScribeUp does not review the Merchant Account Data or other User Information for accuracy, legality, or non-infringement, and ScribeUp is not responsible for the accuracy of your Merchant Account Data or products and services offered by or on third-party sites.
                  </p>
                  <p className="mt-4">
                    You acknowledge that any Merchant Account Data that is displayed through the Services will be the information we most recently accessed, and that this information may not reflect pending transactions or other recent activity.
                  </p>
                  <p className="mt-4">
                    By using the Services, you understand, agree, and request that ScribeUp access your Merchant Account Data in order to (1) facilitate your use of the Services; (2) improve and enhance the Services; and (3) research and develop new ScribeUp products and services.
                  </p>
                  <p className="mt-4">
                    In connection with the Services ScribeUp may use Plaid, Inc. (&quot;Plaid&quot;) to gather your data from financial institutions. By using the Services, you hereby grant ScribeUp and Plaid the right, power, and authority to act on your behalf to access and transmit your personal and financial information from the relevant financial institution. You agree to your personal and financial information being transferred, stored, and processed by Plaid in accordance with the Plaid Terms of Use and Plaid Privacy Policy.
                  </p>
                </div>

                <div className="pt-4">
                  <h2 className="legal-h2">THIRD PARTY LINKS</h2>
                  <p>
                    Third-party links on the Site or the Embedded App may direct you to third-party websites or services that are not affiliated with ScribeUp. We are not responsible for examining or evaluating the content or accuracy and we do not warrant and will not have any liability or responsibility for any third-party materials or websites, or for any other materials, products, or services of third parties.
                  </p>
                  <p className="mt-4">
                    We are not liable for any harm or damages related to the purchase or use of goods, services, resources, content, or any other transactions made in connection with any third-party websites. Please review carefully the third-party&apos;s policies and practices and make sure you understand them before you engage in any transaction. Complaints, claims, concerns, or questions regarding third-party products should be directed to the third-party.
                  </p>
                </div>

                <div className="pt-4">
                  <h2 className="legal-h2">DISCLAIMER OF THIRD-PARTY SPONSORSHIP</h2>
                  <p>
                    You acknowledge and agree that when ScribeUp is accessing and retrieving account information from third-party sites, ScribeUp is acting as your agent and not as the agent of or on behalf of the third party operating the third-party site. You understand and agree that the Services are not sponsored or endorsed by any third parties accessible through the Services. ScribeUp is not responsible for payment processing errors, fees, or other issues, including those that may arise from inaccurate account information.
                  </p>
                </div>

                <div className="pt-4">
                  <h2 className="legal-h2">PROHIBITED USES</h2>
                  <p>
                    You may not:
                  </p>
                  <ul className="mt-6 space-y-4 list-disc pl-5">
                    <li>Use the Services for any illegal, fraudulent, or unauthorized purposes.</li>
                    <li>Interfere with or disrupt the integrity or performance of the Services.</li>
                    <li>Reverse-engineer, decompile, or disassemble any part of the Services.</li>
                  </ul>
                  <p className="mt-6">
                    In addition to other prohibitions as set forth in the Terms of Service, you are prohibited from using the Services: (a) to solicit others to perform or participate in any unlawful acts; (b) to violate any international, federal, provincial or state regulations, rules, laws, or local ordinances; (c) to infringe upon or violate our intellectual property rights or the intellectual property rights of others; (d) to harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate based on gender, sexual orientation, religion, ethnicity, race, age, national origin, or disability; (e) to submit false or misleading information; (f) to upload or transmit viruses or any other type of malicious code that will or may be used in any way that will affect the functionality or operation of the Service or of any related website, other websites, or the Internet; (g) to collect or track the personal information of others; (h) to spam, phish, pharm, pretext, spider, crawl, or scrape; (i) for any obscene or immoral purpose; or (j) to circumvent the security features of the Service.
                  </p>
                </div>

                <div className="pt-4">
                  <h2 className="legal-h2">TERMINATION</h2>
                  <p>
                    These Terms are effective unless and until terminated by either you or us. You may terminate these Terms at any time by notifying us that you no longer wish to use our Services, or when you cease using the Services. We reserve the right, without notice or attendant liability, and in our sole discretion, to terminate or suspend your right to use the Services, including the Embedded App, and to block or prevent your future access to and use of the Embedded App or any other Services for any reason or no reason. If in our sole judgment you fail, or we suspect that you have failed, to comply with any term or provision of these Terms, we also may terminate or suspend your access to the services or terminate these Terms at any time without notice and you will remain liable for all amounts due up to and including the date of termination. Upon termination of your account, you agree that: (a) any use rights or licenses provided to you under these Terms will end, (b) except to the extent prohibited by applicable law or ScribeUp&apos;s agreements with Service Partners ScribeUp may (but have no obligation to) permanently destroy all information associated with your or your account stored on servers controlled by ScribeUp, and (c) those terms of these Terms that by their nature are intended to survive termination (such as intellectual property ownership, arbitration obligations, indemnification obligations, limitations of liability, and any amounts owed by you under these Terms) will survive.
                  </p>
                </div>

                <div className="pt-4">
                  <h2 className="legal-h2">ACCURACY OF WEB SITE</h2>
                  <p>
                    The material on ScribeUp&apos;s Site is provided for general information only and should not be relied upon or used as the sole basis for making decisions without consulting primary, more accurate, more complete or more timely sources of information. Any reliance on the material on the Site is at your own risk. We reserve the right to modify the contents of the Site at any time, but we have no obligation to update any information on the Site.
                  </p>
                </div>

                <div className="pt-4">
                  <h2 className="legal-h2">PRIVACY POLICY</h2>
                  <p>
                    ScribeUp maintains a Privacy Policy that describes how we process and protect personal information we obtain pursuant to these Terms. The Privacy Policy is incorporated into and made part of these Terms. We reserve the right to update the Privacy Policy at our discretion, and that any changes made to our Privacy Policy are effective when the updates are published.
                  </p>
                </div>

                <div className="pt-4">
                  <h2 className="legal-h2">DISCLAIMER OF WARRANTIES</h2>
                  <p>
                    THE EMBEDDED APP, SCRIBEUP.IO, AND THE SERVICES ARE PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS. TO THE FULLEST EXTENT PERMITTED BY LAW, SCRIBEUP AND ALL OF ITS SUCCESSORS, PARENTS, SUBSIDIARIES, AFFILIATES, OFFICERS, DIRECTORS, STOCKHOLDERS, INVESTORS, EMPLOYEES, AGENTS, REPRESENTATIVES, AND ATTORNEYS AND THEIR RESPECTIVE HEIRS, SUCCESSORS, ASSIGNS, LICENSORS, AND SUPPLIERS EXPRESSLY MAKE NO REPRESENTATIONS OR WARRANTIES OF ANY KIND, EXPRESS, STATUTORY, OR IMPLIED AS TO THE CONTENT OR OPERATION OF THE EMBEDDED APP, SCRIBEUP.IO, OR THE SERVICES. YOU EXPRESSLY AGREE THAT YOUR USE OF THE EMBEDDED APP, SCRIBEUP.IO, OR THE SERVICES IS AT YOUR SOLE RISK.
                  </p>
                  <p className="mt-4">
                    SCRIBEUP MAKES NO REPRESENTATIONS, WARRANTIES, OR GUARANTEES, EXPRESS OR IMPLIED, REGARDING THE ACCURACY, ADEQUACY, TIMELINESS, RELIABILITY, COMPLETENESS, OR USEFULNESS OF ANY OF THE INFORMATION OR CONTENT ON THE EMBEDDED APP, SCRIBEUP.IO, OR THE SERVICES AND EXPRESSLY DISCLAIMS ANY WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, OR TITLE.
                  </p>
                </div>

                <div className="pt-4">
                  <h2 className="legal-h2">LIMITATION OF LIABILITY</h2>
                  <p>
                    TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT RELATED TO YOUR ACCESS OR USE OF THE EMBEDDED APP OR THE SERVICES OR OTHERWISE RELATED TO THESE TERMS SHALL SCRIBEUP OR ITS SUBSIDIARIES, AFFILIATES, PARTNERS, OFFICERS, DIRECTORS, AGENTS, LICENSORS, AND EMPLOYEES (THE &quot;SCRIBEUP ENTITIES&quot;) BE LIABLE TO YOU OR ANY THIRD PARTY FOR (A) ANY INDIRECT, INCIDENTAL, SPECIAL, RELIANCE, EXEMPLARY, PUNITIVE, OR CONSEQUENTIAL DAMAGES OF ANY KIND WHATSOEVER; (B) LOSS OF PROFITS, REVENUE, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES; (C) DAMAGES RELATING TO YOUR INABILITY TO ACCESS OR USE THE SERVICES; (D) DAMAGES IN ANY MANNER RELATING TO ANY THIRD PARTY SERVICES ACCESSED VIA THE SERVICE; AND/OR (E) DAMAGES RELATING TO ANY UNAUTHORIZED ACCESS TO OR USE OF SCRIBEUP SYSTEMS OR ANY AND ALL PERSONAL INFORMATION OR FINANCIAL INFORMATION (IF APPLICABLE) STORED ON THOSE SYSTEMS.
                  </p>
                  <p className="mt-4">
                    IN NO EVENT WILL THE SCRIBEUP ENTITIES&apos; TOTAL LIABILITY TO YOU FOR ALL DAMAGES, LOSSES OR CAUSES OF ACTION RELATING TO THESE TERMS OR THE SERVICES EXCEED THE GREATER OF THE AGGREGATE AMOUNT YOU PAID TO THE SCRIBEUP ENTITIES FOR YOUR USE OF THE SERVICES AND USD $50 (FIFTY UNITED STATES DOLLARS).
                  </p>
                  <p className="mt-4">
                    TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, THE LIMITATIONS OF LIABILITY OF THIS SECTION APPLY TO ALL CLAIMS, WHETHER BASED ON WARRANTY, CONTRACT, TORT, OR ANY OTHER LEGAL THEORY, WHETHER OR NOT SCRIBEUP HAS BEEN INFORMED OF THE POSSIBILITY OF SUCH DAMAGE, AND FURTHER WHERE A REMEDY SET FORTH HEREIN IS FOUND TO HAVE FAILED ITS ESSENTIAL PURPOSE.
                  </p>
                  <p className="mt-4">
                    IF YOU ARE A RESIDENT OF CALIFORNIA: YOU WAIVE YOUR RIGHTS WITH RESPECT TO CALIFORNIA CIVIL CODE SECTION 1542, WHICH SAYS &quot;A GENERAL RELEASE DOES NOT EXTEND TO CLAIMS WHICH THE CREDITOR DOES NOT KNOW OR SUSPECT TO EXIST IN HIS FAVOR AT THE TIME OF EXECUTING THE RELEASE, WHICH, IF KNOWN BY HIM MUST HAVE MATERIALLY AFFECTED HIS SETTLEMENT WITH THE DEBTOR.&quot; TO THE FULLEST EXTENT ALLOWED UNDER APPLICABLE LAW, YOU ALSO WAIVE ANY PROTECTION THAT MAY EXIST UNDER ANY COMPARABLE OR SIMILAR STATUTES OR PRINCIPLES OF COMMON LAW APPLICABLE IN JURISDICTIONS OTHER THAN CALIFORNIA.
                  </p>
                </div>

                <div className="pt-4">
                  <h2 className="legal-h2">YOUR INDEMNIFICATION OF SCRIBEUP</h2>
                  <p>
                    To the fullest extent permitted by law, you agree to indemnify, defend and hold harmless the ScribeUp Entities from and against any and all claims, losses, expenses, demands or liabilities, including reasonable attorneys&apos; fees arising out of or relating to (i) your access to, use of or alleged use of the Embedded App, the Site or the Services; (ii) your violation of these Terms or any representation, warranty, or agreements referenced herein, or any applicable law or regulation; (iii) your violation of any third party right, including without limitation any intellectual property right, publicity, confidentiality, property or privacy right; or (iv) any disputes or issues between you and any third party. We reserve the right, at our own expense, to assume the exclusive defense and control of any matter otherwise subject to indemnification by you, and in such case, you agree to cooperate with our defense of such claim. You shall cooperate as fully as reasonably required in the defense of any such claim. ScribeUp reserves the right, at its own expense, to assume the exclusive defense and control of any matter subject to indemnification by you. You agree not to settle any matter without the prior written consent of ScribeUp.
                  </p>
                </div>

                <div className="pt-4">
                  <h2 className="legal-h2">INTELLECTUAL PROPERTY</h2>
                  <p>
                    The Services and the content residing thereon are owned by ScribeUp or its affiliates or business partners, or by third parties other than you. Such content includes the text, software, scripts, graphics, photos, sounds, interactive features, visual interfaces, design, compilation, information, data, computer code (including source code or object code), products, services, and the trademarks, service marks, trade names, and logos (&quot;Marks&quot;) contained in the Sites and Services (collectively, &quot;ScribeUp Content&quot;). Unless otherwise noted, the Site and ScribeUp Content included on the Site and Services, including images, illustrations, designs, icons, photographs, video clips and written and other materials, are subject to copyright, trademark, and other intellectual property rights under United States law, the law of the jurisdiction where you reside, and international conventions protected by United States and international copyright laws. All present and future rights in and to trade secrets, patents, copyrights, trademarks, service marks, know-how, and other proprietary rights of any type under the laws of any governmental authority, domestic or foreign, including rights in and to all applications and registrations relating to ScribeUp or the Site or Service will, as between you and ScribeUp, be and remain the sole and exclusive property of ScribeUp or other third parties. You may not display or reproduce the Marks in any manner without the prior written consent of ScribeUp, and you may not remove or otherwise modify in any manner any trademark notices from any content offered or received through the Site or Service.
                  </p>
                  <p className="mt-4">
                    The Service is licensed, not sold, to you for use only under these Terms. Subject to your compliance with these Terms, ScribeUp grants you a limited, revocable, non-transferable license to access and use the Service and ScribeUp Content.
                  </p>
                </div>

                <div className="pt-4">
                  <h2 className="legal-h2">ARBITRATION AGREEMENT</h2>
                  <p>
                    To the fullest extent permitted by applicable law, you and ScribeUp agree that any dispute between you and any of the ScribeUp Entities related to the Services (including the Embedded App) will be conducted only on an individual basis and not in a class, consolidated or representative action. Except where prohibited, you and we agree to submit to the personal and exclusive arbitration of disputes relating to your general use of the Service under the rules of the American Arbitration Association (&quot;AAA&quot;). Please visit www.adr.org for more information about arbitration.
                  </p>
                  <p className="mt-4">
                    Nothing in these Terms will be deemed to waive, preclude, or otherwise limit the right of either party to bring an individual action in small claims court. Further, you may choose to pursue a dispute in court and not by arbitration if you opt-out of these arbitration procedures within 30 days of the date you first consent to these Terms (the &quot;Opt-Out Period&quot;). You may opt-out by submitting the following information to support@scribeup.io: (1) your name; (2) your address; (3) a clear statement that you do not wish to resolve disputes with us through arbitration. Any opt-out request received after the Opt-Out Period will not be valid and you must pursue your dispute in arbitration or small claims court. Your decision to opt-out of arbitration will not adversely affect your relationship with us.
                  </p>
                  <p className="mt-4">
                    A party who intends to seek arbitration must first send a written notice of the dispute to the other party by certified mail, or by Federal Express (signature required) or, only if the other party has not provided a current physical address, then by electronic mail (&quot;Notice&quot;). The Notice must: (a) describe the nature and basis of the claim or dispute; and (b) set forth the specific relief sought (&quot;Demand&quot;). The parties will make good faith efforts to resolve the claim directly, but if the parties do not reach an agreement to do so within 30 days after the Notice is received, you or ScribeUp may commence an arbitration proceeding. During the arbitration, the amount of any settlement offer made by you or ScribeUp must not be disclosed to the arbitrator until after the arbitrator makes a final decision and award, if any.
                  </p>
                  <p className="mt-4">
                    Any arbitration hearing will take place at a location to be agreed upon in Los Angeles County, California, but if the claim is for $10,000 or less, you may choose whether the arbitration will be conducted: (a) solely on the basis of documents submitted to the arbitrator; (b) through a non-appearance based telephone hearing; or (c) by an in-person hearing as established by the AAA Rules in the county (or parish) of your billing address. If the arbitrator finds that either the substance of your claim or the relief sought in the Demand is frivolous or brought for an improper purpose (as measured by the standards in Federal Rule of Civil Procedure), then the payment of all fees will be governed by the AAA rules. In that case, you will reimburse ScribeUp for all monies previously disbursed by it that are otherwise your obligation to pay under the AAA rules. Regardless of how the arbitration is conducted, the arbitrator must issue a reasoned written decision sufficient to explain the essential findings and conclusions on which the decision and award, if any, are based. The arbitrator may make rulings and resolve disputes as to the payment and reimbursement of fees or expenses at any time during the proceeding and upon request from either party made within 14 days of the arbitrator&apos;s ruling on the merits.
                  </p>
                  <p className="mt-4">
                    You also acknowledge and understand that, with respect to any dispute between you and the ScribeUp Entities, including any claims relating in any way to these Terms or the Service, or any other aspect of our relationship: (a) You are giving up your right to have a trial by jury; (b) You are giving up your right to serve as a representative, as a private attorney general, or in any other representative capacity, or to participate as a member of a class of claimants, in any lawsuit involving any such dispute; and (c) any action or proceeding by you relating to such dispute must commence within one year after the cause of action accrues or it is forever barred.
                  </p>
                  <p className="mt-4">
                    If ScribeUp changes this arbitration provision, you may reject the change by sending ScribeUp written notice within 30 days of the change, in which case your right to use the Service may be immediately terminated and this arbitration provision, as in effect immediately prior to the changes you rejected will survive.
                  </p>
                  <p className="mt-4">
                    The arbitrator has exclusive authority to resolve any dispute relating to the interpretation, applicability, or enforceability of this binding arbitration agreement. If all or any part of this arbitration section is found to be unenforceable, then the remaining provisions of these Terms will remain in effect, and the exclusive jurisdiction and venue described above will govern any action arising out of or related to these Terms.
                  </p>
                  <p className="mt-4">
                    This agreement to arbitrate will not preclude you or ScribeUp from seeking provisional remedies in aid of arbitration, including without limitation orders to stay a court action, compel arbitration or confirm an arbitral award, from a court of competent jurisdiction. Furthermore, this agreement to arbitrate will not preclude you or ScribeUp from (i) applying to the appropriate court of competent jurisdiction for a temporary restraining order, preliminary injunction, or other interim or conservatory relief, as necessary, or (ii) seeking relief in any state or federal court for disputes related to a violation or possible violation of ScribeUp&apos;s intellectual property rights.
                  </p>
                  <p className="mt-4">
                    If this arbitration provision is found to be null and void or otherwise not governing as to the dispute, then all disputes arising under the Terms between us will be subject to the jurisdiction of the state and federal courts located in Los Angeles, California, and you and we hereby submit to the personal jurisdiction and venue of these courts. In the event of any litigation or arbitration arising from or related to these Terms, or the Service provided, the prevailing party shall be entitled to recover from the non-prevailing party all reasonable costs incurred including staff time, court costs, attorneys&apos; fees, and all other related expenses incurred in such litigation or arbitration.
                  </p>
                </div>

                <div className="pt-4">
                  <h2 className="legal-h2">CONTACT US</h2>
                  <p>
                    The provider of Services is: ScribeUp Technologies, Inc. (by email at support@scribeup.io). If you are a California resident, in accordance with Cal. Civ. Code §1789.3, you may report complaints to the Complaint Assistance Unit of the Division of Consumer Services of the California Department of Consumer Affairs by contacting them in writing at 1625 North Market Blvd., Suite N 112 Sacramento, CA 95834, or by telephone at (800) 952-5210.
                  </p>
                </div>

                <div className="pt-4">
                  <h2 className="legal-h2">COMMUNICATIONS</h2>
                  <p>
                    You hereby agree that we and our service providers may communicate with you regarding the Services by email as well as SMS, MMS, text message (&quot;Text Messages&quot;) or other electronic means to your mobile device and that certain information about your usage of the mobile services may be communicated to us.
                  </p>
                  <p className="mt-4">
                    Notwithstanding any current or prior election to opt in or opt out of receiving telemarketing calls, e-mails or Text Messages from us, our agents, representatives, affiliates, or anyone calling on our behalf, you expressly consent to be contacted by us, our agents, representatives, affiliates, or anyone calling on our behalf for any and all purposes arising out of or relating to your use of the Services at any telephone number, or physical or electronic address you provide with information or questions about your use of the Services. You agree we may contact you in any way, including Text Messages and telephone calls using prerecorded messages or artificial voice, and calls and messages delivered using auto telephone dialing system or an automatic texting system. Automated messages may be played when the telephone is answered, whether by you or someone else. We may listen to and/or record phone calls between you and our representatives without notice to you as permitted by applicable law. For example, we listen to and record calls for quality monitoring purposes.
                  </p>
              </div>

                <div className="pt-4">
                  <h2 className="legal-h2">GENERAL PROVISIONS</h2>
                  <p>
                    In the event that any provision of these Terms is determined to be unlawful, void or unenforceable, such provision shall nonetheless be enforceable to the fullest extent permitted by applicable law, and the unenforceable portion shall be deemed to be severed from these Terms, such determination shall not affect the validity and enforceability of any other remaining provisions. These Terms and any separate agreements whereby we provide you Services shall be governed by and construed in accordance with the laws of Delaware. These Terms and any policies or operating rules posted by us on this Site or in respect to the Services constitutes the entire agreement and understanding between you and us and govern your use of the Services (including the Embedded App), superseding any prior or contemporaneous agreements, communications and proposals, whether oral or written, between you and us (including, but not limited to, any prior versions of the Terms). The failure of us to exercise or enforce any right or provision of these Terms shall not constitute a waiver of such right or provision. You may not assign or transfer this Agreement or your rights hereunder, in whole or in part, by operation of law or otherwise, without our prior written consent. We may assign this Agreement or any of our rights or obligations under this Agreement at any time without notice.
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
