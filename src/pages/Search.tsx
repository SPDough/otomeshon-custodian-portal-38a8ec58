
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import Sidebar from "@/components/Sidebar";

const Search = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex flex-1 flex-col items-center bg-gradient-to-b from-white to-purple-50 px-4 py-20">
          <div className="mb-16 text-center">
            <h1 className="mb-2 text-4xl font-extrabold text-purple-600">Custodial Data Search</h1>
            <p className="text-lg text-gray-600">Access global custodian data for asset managers and pension funds</p>
          </div>
          <SearchBar className="mb-10" />
          <div className="text-center text-gray-500">
            <p className="mb-2">Try searching for:</p>
            <div className="flex flex-wrap justify-center gap-2">
              <span className="rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-700">
                portfolio holdings
              </span>
              <span className="rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-700">
                quarterly performance
              </span>
              <span className="rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-700">
                asset allocation
              </span>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Search;
