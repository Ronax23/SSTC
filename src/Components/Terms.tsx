import HeaderReusable from '../assets/Reusable/HeaderReusable'
import type { TermsProps,PolicySection } from '../assets/Loading/Types';

const termsAndConditions:PolicySection[] = [
  {
    id: 1,
    title: "Quality Assurance & Standards",
    description: "Our workshop operates under strict quality control protocols to ensure every component meets the industrial requirements of the power generation and tooling sectors.",
    bullets: [
      "All raw materials are inspected for metallurgical integrity before machining.",
      "Final products undergo a 3-step tolerance verification process.",
      "Material test certificates (MTC) can be provided upon prior request."
    ]
  },
  {
    id: 2,
    title: "Project Timelines & Delivery",
    description: "We strive to meet every deadline; however, precision engineering requires specific environmental and mechanical conditions that may affect scheduling.",
    bullets: [
      "Delivery dates are estimates starting from the date of advance payment.",
      "The company is not liable for delays caused by power grid failures or transit issues.",
      "Expedited 'Urgent' orders will incur a 20% surcharge on the total labor cost."
    ]
  },{
    id: 3,
    title: "Payment Terms & Delay Interest",
    description: "To maintain our supply chain and operational efficiency, we require strict adherence to payment schedules outlined in the Proforma Invoice.",
    bullets: [
      "Payments must be cleared within 7 business days of invoice generation.",
      "A delayed payment interest of 2% per month (calculated daily) will be applied to all overdue balances.",
      "Work on subsequent project phases will be paused until outstanding dues are settled."
    ]
  },
  {
    id: 4,
    title: "Storage & Component Rental",
    description: "Completed components must be collected or scheduled for delivery immediately upon notification of completion. Our workshop space is optimized for active production.",
    bullets: [
      "A grace period of 5 business days is provided after the 'Ready for Collection' notice.",
      "Post-grace period, a storage rental fee of ₹500 per component per day (or 0.5% of order value, whichever is higher) will apply.",
      "The company is not liable for minor surface oxidation (rust) on components left in storage for over 15 days without specialized coating."
    ]
  }
];
const privacyPolicy:PolicySection[] = [
{
      id: 1,
      title: "Information We Collect",
  description: "We collect information to provide better services to our clients and engineering partners. This includes:", 
   bullets: [
    "Contact Information: Name, email address, and phone number provided through our lead generation forms.",
    "Contact Information: Name, email address, and phone number provided through our lead generation forms.",
    "Technical Data: IP addresses and browser types collected via our Node.js backend to ensure server security and performance."
  ]
},
{
    id: 2,
      title: "How We Use Information",
  description: "Your data is used strictly for industrial and business purposes:",

   bullets: [
    "To provide quotes and technical consultations",

"To maintain the performance of our Dynamic Industrial Catalog",

"To communicate updates regarding your engineering projects",

"We do not sell your personal data to third parties"
   ]},
   {
    id: 3,
    title:"Data Storage & Security",
    description:"We implement robust security measures to protect your data.",
    bullets:[
      "Server Security: Our backend infrastructure utilizes secure protocols to prevent unauthorized access",

"Cookies: We use functional cookies to enhance your experience (e.g., remembering your preferences in the workshop catalog)"
    ]
   },
   {
    id:4,
    title:"Your Rights",
    description:"You have control over your personal data:",
    bullets:[
      "Access & Correction: You can request access to your data and correct any inaccuracies by contacting us.",

"Data Deletion: You may request the deletion of your personal data, subject to legal and operational constraints."
    ]
   }
   ,{
    id:5,
    title:"Changes to This Policy",
    description:"We may update this privacy policy periodically to reflect changes in our practices or legal requirements.",
    bullets:[
      "Notification: Significant changes will be communicated via email or prominent notices on our website.",

"Review: We encourage you to review this policy regularly to stay informed about how we protect your data."
    ]
   },
   {
    id:6,
    title:"Third-Party Services",
    description:"We may employ third-party companies to facilitate our services, such as hosting and data analysis.",
    bullets:[
      "These third parties are obligated to protect your data and are prohibited from using it for any other purpose.",
      
      "We do not share your personal information with advertisers or marketers."
    ]
   },
   {
    id:7,
    title:"Contact Us",
    description:"If you have any questions or concerns about this privacy policy or our data practices"    
    
   }

];
function Terms({ term }:TermsProps) {

const terms=term?termsAndConditions:privacyPolicy;
const term_img=`/Headers/${term?"t&c.jpg":"privacy.jpg"}`;
  return (
    <>
    <HeaderReusable title={term?"Terms and Conditions":"Privacy Policy"} image={term_img}/>
      <div id="termsofterm">
        <div className="container py-5">
          <div className="row">
            <div className="col-12">
              <h2 className='mb-5 h1 text-center'>{term?"Terms and Conditions":"Privacy Policy"} <i className="bi bi-bluesky"></i></h2>
              {terms.map((term) => (
                <div key={term.id} className="mb-4">
                  <h2 className='term-col'>{term.title} <i className="bi bi-bluesky"></i></h2>
                  <p>{term.description}</p>
                  {term?.bullets && (
                    <ul>
                      {term.bullets.map((bullet, index) => (
                        <li key={index}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    
    </>
  )
}

export default Terms