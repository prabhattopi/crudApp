import GetData from "./GetData";


const Home = ({ items, setItems }) => {
  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 gap-8">
        <GetData items={items} setItems={setItems} />
      </div>
    </div>
  );
};

export default Home;
