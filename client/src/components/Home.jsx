import GetData from "./GetData";
import PostData from "./PostData";

const Home = ({ items, setItems }) => {
  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 gap-8">
        <PostData />
        <GetData items={items} setItems={setItems} />
      </div>
    </div>
  );
};

export default Home;
