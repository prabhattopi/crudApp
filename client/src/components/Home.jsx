import GetData from "./GetData";
import Sidebar from "./Sidebar";


const Home = ({ items, setItems }) => {
  return (
    <div className="flex flex-col md:flex-row bg-sky-800">
    <Sidebar />
    <div className="container mx-auto px-4 my-4 md:ml-4 flex-grow">
        <GetData items={items} setItems={setItems} />
      </div>
    </div>
  );
};

export default Home;
