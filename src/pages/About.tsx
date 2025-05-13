
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex flex-1 flex-col">
        <section className="bg-purple-600 px-4 py-16 text-white">
          <div className="container mx-auto text-center">
            <h1 className="mb-4 text-4xl font-extrabold sm:text-5xl">About CustodialData</h1>
            <p className="mx-auto mb-6 max-w-2xl text-xl">
              Connecting asset managers and pension funds with global custodian data.
            </p>
          </div>
        </section>
        
        <section className="bg-white px-4 py-16">
          <div className="container mx-auto">
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-6 text-3xl font-bold">Our Mission</h2>
              <p className="mb-6 text-gray-700">
                CustodialData was founded to bridge the data gap between asset managers, pension funds, 
                and global custodians. We recognized that accessing and analyzing custodial data often 
                involves complex processes, multiple platforms, and inconsistent formats.
              </p>
              <p className="mb-6 text-gray-700">
                Our platform provides a unified interface to search, analyze, and report on custodial 
                data from multiple sources, empowering investment professionals with the insights they 
                need to make informed decisions.
              </p>
              
              <div className="my-12 aspect-video overflow-hidden rounded-lg bg-gray-100">
                <img 
                  src="/placeholder.svg" 
                  alt="CustodialData Team" 
                  className="h-full w-full object-cover"
                />
              </div>
              
              <h2 className="mb-6 text-3xl font-bold">Our Services</h2>
              <div className="mb-10 space-y-6">
                <div>
                  <h3 className="mb-2 text-xl font-semibold text-purple-600">Data Aggregation</h3>
                  <p className="text-gray-700">
                    We consolidate data from multiple global custodians into a single, searchable platform,
                    eliminating the need to navigate different portals and systems.
                  </p>
                </div>
                
                <div>
                  <h3 className="mb-2 text-xl font-semibold text-purple-600">Portfolio Analytics</h3>
                  <p className="text-gray-700">
                    Our powerful analytical tools help pension fund managers and asset managers gain insights
                    into holdings, performance, and risk across their entire portfolio.
                  </p>
                </div>
                
                <div>
                  <h3 className="mb-2 text-xl font-semibold text-purple-600">Compliance Reporting</h3>
                  <p className="text-gray-700">
                    Generate comprehensive reports for regulatory compliance, board meetings, and stakeholder
                    communications with just a few clicks.
                  </p>
                </div>
              </div>
              
              <h2 className="mb-6 text-3xl font-bold">Contact Us</h2>
              <p className="mb-6 text-gray-700">
                Looking to streamline your custodial data processes? Get in touch with our team.
              </p>
              <div className="mb-10 rounded-lg border border-purple-200 bg-purple-50 p-6">
                <p className="mb-2 font-medium">CustodialData Inc.</p>
                <p className="mb-2 text-gray-700">123 Financial Avenue</p>
                <p className="mb-2 text-gray-700">Investment City, IC 10101</p>
                <p className="mb-2 text-gray-700">Email: info@custodialdata.example</p>
                <p className="text-gray-700">Phone: (555) 123-4567</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
