import './App.css';
import TradingPosts from './data/tradingposts.json';
import TradingPost from './TradingPost';
import { Tab } from '@headlessui/react'


let posts = [];
for (const post in TradingPosts){
  posts.push(post);
}

function App() {
  return (
    <div className='grid h-screen place-items-center'>
    <div className='w-full max-w-md px-2 py-16 sm:px-0'>
      <Tab.Group>
        <Tab.List className='flex space-x-1 rounded-xl p-1'>
          {posts.map( (post) => {
            return <Tab className='w-full bg-slate-200 rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'>{post}</Tab>
          })}
        </Tab.List>
        <Tab.Panels>
          {posts.map( (post) => {
            return <Tab.Panel><TradingPost name={post} items={TradingPosts[post]}/></Tab.Panel>
          })}
        </Tab.Panels>
      </Tab.Group>
    </div>
    </div>
  );
}

export default App;
