import './App.css';
import TradingPosts from './data/tradingposts.json';
import TradingPost from './TradingPost';

let posts = [];
for (const post in TradingPosts){
  posts.push(post);
}


function App() {
  return (
    <div className="App">
      <header className="App-header">
        {posts.map((post,index)=>{
         return <TradingPost name={post} items={TradingPosts[post]}/>
        })}      
      </header>
    </div>
  );
}

export default App;
