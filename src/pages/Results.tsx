
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ResultsTable from "@/components/ResultsTable";
import Sidebar from "@/components/Sidebar";

const Results = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex flex-1 flex-col bg-white px-4 py-10">
          <div className="container mx-auto">
            <h1 className="mb-2 text-3xl font-bold text-purple-600">Search Results</h1>
            <p className="mb-6 text-gray-600">
              Found 24 results related to your search query
            </p>
            <ResultsTable />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Results;
