
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";

const Search = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex flex-1 flex-col items-center bg-gradient-to-b from-white to-blue-50 px-4 py-20">
        <div className="mb-16 text-center">
          <h1 className="mb-2 text-4xl font-extrabold text-blue-600">DataGrid</h1>
          <p className="text-lg text-gray-600">Search and organize your data</p>
        </div>
        <SearchBar className="mb-10" />
        <div className="text-center text-gray-500">
          <p className="mb-2">Try searching for:</p>
          <div className="flex flex-wrap justify-center gap-2">
            <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
              stock prices
            </span>
            <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
              weather data
            </span>
            <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
              market trends
            </span>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Search;
