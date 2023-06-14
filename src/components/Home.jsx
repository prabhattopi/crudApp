import GetData from "./GetData";
import Sidebar from "./Sidebar";


const Home = ({ items, setItems }) => {
  return (
    <div className="flex flex-col md:flex-row">
  <Sidebar />
  <div className="container bg-sky-800 h-[calc(100vh-62px)]   px-4 py-4 flex-grow overflow-y-auto max-h-80vh">
    <GetData items={items} setItems={setItems} />
  </div>
</div>

  );
};

export default Home;
