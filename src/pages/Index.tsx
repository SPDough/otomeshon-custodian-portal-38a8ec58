
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
        <section className="flex flex-1 flex-col items-center justify-center bg-gradient-to-b from-white to-blue-50 px-4 py-20 text-center">
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            <span className="text-blue-600">Search</span> Meets{" "}
            <span className="text-blue-600">Spreadsheet</span>
          </h1>
          <p className="mb-10 max-w-2xl text-xl text-gray-600">
            Discover the perfect blend of Google's search simplicity with Excel's
            organized data presentation.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button size="lg" onClick={() => navigate("/search")}>
              Start Searching
            </Button>
            <Button variant="outline" size="lg" onClick={() => navigate("/about")}>
              Learn More
            </Button>
          </div>
          
          <div className="mt-16 w-full max-w-5xl rounded-lg border border-gray-200 bg-white p-4 shadow-lg">
            <img 
              src="/placeholder.svg" 
              alt="DataGrid Demo" 
              className="mx-auto h-64 w-full object-cover opacity-75"
            />
            <p className="mt-4 text-sm text-gray-500">Experience powerful search with intuitive data organization</p>
          </div>
        </section>
        
        <section className="bg-white px-4 py-16">
          <div className="container mx-auto">
            <div className="grid gap-10 md:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 rounded-full bg-blue-100 p-4">
                  <Search className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Simple Search</h3>
                <p className="text-gray-600">
                  Enter your query in a clean, distraction-free interface.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 rounded-full bg-blue-100 p-4">
                  <Table className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Organized Results</h3>
                <p className="text-gray-600">
                  View your data in a familiar spreadsheet-like format.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 rounded-full bg-blue-100 p-4">
                  <SortAsc className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Sort & Filter</h3>
                <p className="text-gray-600">
                  Manipulate your results to find exactly what you need.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

// Import icons in the component to avoid possible errors
import { Search, SortAsc, Table } from "lucide-react";

export default Index;
