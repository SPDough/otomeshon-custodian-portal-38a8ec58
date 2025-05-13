
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex flex-1 flex-col">
        <section className="bg-blue-600 px-4 py-16 text-white">
          <div className="container mx-auto text-center">
            <h1 className="mb-4 text-4xl font-extrabold sm:text-5xl">About DataGrid</h1>
            <p className="mx-auto mb-6 max-w-2xl text-xl">
              Combining the simplicity of search with the power of spreadsheets.
            </p>
          </div>
        </section>
        
        <section className="bg-white px-4 py-16">
          <div className="container mx-auto">
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-6 text-3xl font-bold">Our Story</h2>
              <p className="mb-6 text-gray-700">
                DataGrid was founded with a simple mission: to make data search and exploration as 
                intuitive as possible. We recognized that while search engines are excellent at finding 
                information, they often lack the organization capabilities that spreadsheets offer.
              </p>
              <p className="mb-6 text-gray-700">
                Our team of data enthusiasts and user experience experts came together to build a 
                solution that offers the best of both worlds. With DataGrid, you get the simplicity of 
                a search engine with the organizational power of a spreadsheet.
              </p>
              
              <div className="my-12 aspect-video overflow-hidden rounded-lg bg-gray-100">
                <img 
                  src="/placeholder.svg" 
                  alt="DataGrid Team" 
                  className="h-full w-full object-cover"
                />
              </div>
              
              <h2 className="mb-6 text-3xl font-bold">Our Values</h2>
              <div className="mb-10 space-y-6">
                <div>
                  <h3 className="mb-2 text-xl font-semibold text-blue-600">Simplicity</h3>
                  <p className="text-gray-700">
                    We believe that powerful tools don't need to be complicated. Our interface is
                    designed to be intuitive and distraction-free.
                  </p>
                </div>
                
                <div>
                  <h3 className="mb-2 text-xl font-semibold text-blue-600">Organization</h3>
                  <p className="text-gray-700">
                    Information is only useful when it's well-organized. We make it easy to sort,
                    filter, and make sense of your data.
                  </p>
                </div>
                
                <div>
                  <h3 className="mb-2 text-xl font-semibold text-blue-600">Accessibility</h3>
                  <p className="text-gray-700">
                    We're committed to making data exploration accessible to everyone, regardless of
                    their technical background.
                  </p>
                </div>
              </div>
              
              <h2 className="mb-6 text-3xl font-bold">Contact Us</h2>
              <p className="mb-6 text-gray-700">
                Have questions or feedback? We'd love to hear from you!
              </p>
              <div className="mb-10 rounded-lg border border-gray-200 bg-gray-50 p-6">
                <p className="mb-2 font-medium">DataGrid Inc.</p>
                <p className="mb-2 text-gray-700">123 Data Avenue</p>
                <p className="mb-2 text-gray-700">Spreadsheet City, SH 10101</p>
                <p className="mb-2 text-gray-700">Email: info@datagrid.example</p>
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
