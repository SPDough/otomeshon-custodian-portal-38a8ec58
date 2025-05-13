
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex flex-1 flex-col bg-gradient-to-b from-white to-purple-50 px-4 py-20">
          <div className="container mx-auto">
            <div className="mb-16 text-center">
              <h1 className="mb-4 text-4xl font-extrabold text-purple-600">Otomeshon</h1>
              <p className="text-xl text-gray-600">
                Access global custodian data for asset managers and pension funds
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col rounded-lg border border-purple-200 bg-white p-6 shadow-sm">
                <h2 className="mb-3 text-xl font-bold text-purple-700">Portfolio Analysis</h2>
                <p className="mb-4 flex-1 text-gray-600">
                  Analyze your portfolio holdings and performance metrics in one place
                </p>
                <button className="mt-auto w-full rounded-md bg-purple-600 py-2 text-white transition-colors hover:bg-purple-700">
                  Learn More
                </button>
              </div>
              <div className="flex flex-col rounded-lg border border-purple-200 bg-white p-6 shadow-sm">
                <h2 className="mb-3 text-xl font-bold text-purple-700">Risk Assessment</h2>
                <p className="mb-4 flex-1 text-gray-600">
                  Evaluate risk exposure and compliance across your investments
                </p>
                <button className="mt-auto w-full rounded-md bg-purple-600 py-2 text-white transition-colors hover:bg-purple-700">
                  Learn More
                </button>
              </div>
              <div className="flex flex-col rounded-lg border border-purple-200 bg-white p-6 shadow-sm">
                <h2 className="mb-3 text-xl font-bold text-purple-700">ESG Integration</h2>
                <p className="mb-4 flex-1 text-gray-600">
                  Incorporate environmental, social, and governance factors into your strategies
                </p>
                <button className="mt-auto w-full rounded-md bg-purple-600 py-2 text-white transition-colors hover:bg-purple-700">
                  Learn More
                </button>
              </div>
            </div>
            
            {/* About Section */}
            <div className="mt-20 rounded-lg border border-purple-200 bg-white p-8 shadow-sm">
              <h2 className="mb-6 text-3xl font-bold text-purple-600">About Otomeshon</h2>
              <p className="mb-4 text-gray-600">
                Otomeshon is a leading provider of custodial data solutions for asset managers and pension funds. 
                Our platform streamlines access to global custodian data, helping financial professionals make 
                informed investment decisions.
              </p>
              <p className="mb-4 text-gray-600">
                With powerful analytics tools and comprehensive data coverage, Otomeshon enables portfolio 
                managers, risk analysts, and compliance officers to gain valuable insights and improve operational efficiency.
              </p>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Index;
