
import GetData from "./GetData";
import PostData from "./PostData";

const Home = ({items,setItems}) => {
  return (
  <>
    <PostData/>
     <GetData items={items} setItems={setItems}/>
  </>
  )
}

export default Home