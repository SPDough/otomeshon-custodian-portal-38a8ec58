
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";

const About = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex flex-1 flex-col bg-gradient-to-b from-white to-purple-50 px-4 py-20">
          <div className="container mx-auto">
            <h1 className="mb-8 text-4xl font-extrabold text-purple-600">About Otomeshon</h1>
            
            <div className="space-y-8">
              <div className="rounded-lg border border-purple-200 bg-white p-8 shadow-sm">
                <h2 className="mb-4 text-2xl font-bold text-purple-700">Our Mission</h2>
                <p className="text-gray-600">
                  At Otomeshon, we're dedicated to transforming how financial professionals access and utilize custodial data. 
                  Our mission is to provide seamless, intelligent access to global custodian data, empowering asset managers 
                  and pension funds to make better investment decisions and improve operational efficiency.
                </p>
              </div>
              
              <div className="rounded-lg border border-purple-200 bg-white p-8 shadow-sm">
                <h2 className="mb-4 text-2xl font-bold text-purple-700">Our Platform</h2>
                <p className="mb-4 text-gray-600">
                  The Otomeshon platform combines cutting-edge technology with deep financial expertise to deliver:
                </p>
                <ul className="ml-6 list-disc space-y-2 text-gray-600">
                  <li>Comprehensive access to global custodian data</li>
                  <li>Advanced portfolio analytics and risk assessment tools</li>
                  <li>ESG integration capabilities</li>
                  <li>Automated settlement and confirmation workflows</li>
                  <li>Corporate action processing and management</li>
                  <li>Performance measurement and attribution analysis</li>
                </ul>
              </div>
              
              <div className="rounded-lg border border-purple-200 bg-white p-8 shadow-sm">
                <h2 className="mb-4 text-2xl font-bold text-purple-700">Contact Us</h2>
                <p className="text-gray-600">
                  Interested in learning more about how Otomeshon can help your organization? 
                  Contact our team at info@otomeshon.com or call us at +1 (555) 123-4567.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default About;
