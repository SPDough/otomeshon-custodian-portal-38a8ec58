
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Index = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex flex-1 flex-col">
        <section className="flex flex-1 flex-col items-center justify-center bg-gradient-to-b from-white to-purple-50 px-4 py-20 text-center">
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            <span className="text-purple-600">Custodial</span> Data{" "}
            <span className="text-purple-600">Solutions</span>
          </h1>
          <p className="mb-10 max-w-2xl text-xl text-gray-600">
            Access comprehensive custodial data for asset managers and pension funds with powerful search and analysis tools.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button size="lg" onClick={() => navigate("/search")}>
              Search Custodial Data
            </Button>
            <Button variant="outline" size="lg" onClick={() => navigate("/about")}>
              Learn More
            </Button>
          </div>
          
          <div className="mt-16 w-full max-w-5xl rounded-lg border border-purple-200 bg-white p-4 shadow-lg">
            <img 
              src="/placeholder.svg" 
              alt="Custodial Data Platform" 
              className="mx-auto h-64 w-full object-cover opacity-75"
            />
            <p className="mt-4 text-sm text-gray-500">Access global custodian data with advanced search and analysis capabilities</p>
          </div>
        </section>
        
        <section className="bg-white px-4 py-16">
          <div className="container mx-auto">
            <div className="grid gap-10 md:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 rounded-full bg-purple-100 p-4">
                  <Search className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Custodial Search</h3>
                <p className="text-gray-600">
                  Find specific custody data across multiple global custodians.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 rounded-full bg-purple-100 p-4">
                  <Table className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Portfolio Analysis</h3>
                <p className="text-gray-600">
                  View holdings and performance data in a familiar spreadsheet format.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 rounded-full bg-purple-100 p-4">
                  <ChartBar className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Reporting Tools</h3>
                <p className="text-gray-600">
                  Generate custom reports for pension funds and asset managers.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="bg-purple-50 px-4 py-16">
          <div className="container mx-auto">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-6 text-3xl font-bold">About Otomeshon</h2>
              <p className="mb-6 text-gray-700">
                Otomeshon is a leading provider of custodial data solutions for asset managers and pension funds.
                Our innovative platform connects financial professionals with the global custodian data they need,
                all in one streamlined interface.
              </p>
              <div className="flex items-center justify-center gap-6">
                <div className="flex items-center">
                  <Building className="mr-2 text-purple-600" />
                  <span>Founded 2023</span>
                </div>
                <div className="flex items-center">
                  <Users className="mr-2 text-purple-600" />
                  <span>Serving 100+ Clients</span>
                </div>
                <div className="flex items-center">
                  <BriefcaseBusiness className="mr-2 text-purple-600" />
                  <span>Global Coverage</span>
                </div>
              </div>
              <Button 
                variant="outline" 
                className="mt-8" 
                onClick={() => navigate("/about")}
              >
                Learn More About Us
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

// Import icons in the component to avoid possible errors
import { Search, ChartBar, Table, Building, Users, BriefcaseBusiness } from "lucide-react";

export default Index;
