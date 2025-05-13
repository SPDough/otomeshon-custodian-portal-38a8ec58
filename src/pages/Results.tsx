
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import ResultsTable from "@/components/ResultsTable";
import { toast } from "sonner";

interface ResultData {
  id: number;
  [key: string]: any;
}

const Results = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<ResultData[]>([]);

  // Column definitions for the table
  const columns = [
    { id: "title", header: "Title" },
    { id: "category", header: "Category" },
    { id: "price", header: "Price" },
    { id: "rating", header: "Rating" },
    { id: "stock", header: "Stock" },
  ];

  useEffect(() => {
    if (!query) {
      navigate("/search");
      return;
    }

    // Simulate fetching data from an API
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // In a real app, you'd fetch data from an actual API
        // This is just mock data for demonstration
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Generate mock data based on the query
        const mockData = Array.from({ length: 20 }, (_, i) => ({
          id: i + 1,
          title: `${query} Result ${i + 1}`,
          category: ["Technology", "Finance", "Health", "Education", "Entertainment"][
            Math.floor(Math.random() * 5)
          ],
          price: `$${(Math.random() * 100).toFixed(2)}`,
          rating: (Math.random() * 5).toFixed(1),
          stock: Math.floor(Math.random() * 100),
        }));
        
        setResults(mockData);
      } catch (error) {
        console.error("Error fetching results:", error);
        toast.error("Failed to fetch results. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [query, navigate]);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex flex-1 flex-col px-4 py-8">
        <div className="container mx-auto">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-2xl font-bold text-gray-900">
              Search Results for "{query}"
            </h1>
            <SearchBar />
          </div>

          {isLoading ? (
            <div className="flex h-64 items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
              <span className="ml-3 text-gray-600">Loading results...</span>
            </div>
          ) : (
            <div className="rounded-lg border border-gray-200 bg-white shadow">
              <ResultsTable data={results} columns={columns} />
              <div className="flex items-center justify-between border-t border-gray-200 p-4">
                <p className="text-sm text-gray-600">
                  Showing {results.length} results
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm" disabled>
                    Next
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Results;
