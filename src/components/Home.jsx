import GetData from "./GetData";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";


const Home = ({ items, setItems }) => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row">
        <Sidebar />
        <div className="container bg-sky-800 h-[calc(100vh-118px)]   px-4 py-4 flex-grow overflow-y-auto max-h-80vh">
          {
            items.length > 0 ? <GetData items={items} setItems={setItems} /> : (
              <div className="flex flex-col justify-center items-center h-full text-white text-3xl sm:text-1xl">
              <h3 className="mb-4 text-center">Please refresh the page after 30s 🙏</h3>
              <p className="text-center">Or there's no Data</p>
            </div>
            )
          }

        </div>
      </div>
    </>

  );
};

export default Home;
