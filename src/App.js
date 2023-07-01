import { useEffect, useState } from 'react';
import './App.css';
import TradingPosts from './data/tradingposts.json';
import TradingPost from './TradingPost';
import { Tab } from '@headlessui/react'

function App() {
  let posts = [];
  for (const post in TradingPosts){
    posts.push(post);
  }

  const getExperation = () => {
    // Get the current date in local timezone
    let date = new Date();
    // you know what... This is it... this is all I'm doing. No need for a professional or polished approach
    let startOfWeek = new Date(new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()) - date.getUTCDay() * 24 * 60 * 60 * 1000);
    // I fucking hate timezones - so let's be lazy
    return new Date(startOfWeek.valueOf() +  6*24*60*60*1000  + 14*60*60*1000 - startOfWeek.getTimezoneOffset()*60*1000);
  }  
  

  const [completedItems, setCompletedItems] = useState(() => {
    let completedItems = JSON.parse(localStorage.getItem('completedItems'));
    if (completedItems == null) return {};
    if (Date.now() > new Date(completedItems["expires"])){
      return {}
    }
    return completedItems;
  })
  
  useEffect( () => {
    localStorage.setItem('completedItems', JSON.stringify(completedItems))
  }, [completedItems])

  let completeItem = (item) => {
    const newCompletedItems = {...completedItems};
    if (newCompletedItems[item]){
      newCompletedItems[item] = false;
    } else {
      newCompletedItems[item] = true;
    }
    newCompletedItems["expires"] = getExperation();
    console.log(newCompletedItems)
    setCompletedItems(newCompletedItems);
  }

  const uniqueClass = {
    "Karu Forest": 'w-full bg-green-200 rounded-lg py-2.5 text-sm font-medium leading-5 text-green-700 ring-white ring-opacity-60 ring-offset-2 ring-offset-green-400 focus:outline-none focus:ring-2',
    "Connous Oasis": 'w-full bg-orange-200 rounded-lg py-2.5 text-sm font-medium leading-5 text-orange-700 ring-white ring-opacity-60 ring-offset-2 ring-offset-orange-400 focus:outline-none focus:ring-2',
    "Lake Calida": 'w-full bg-blue-200 rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
    "Pera Volcano": 'w-full bg-red-200 rounded-lg py-2.5 text-sm font-medium leading-5 text-red-700 ring-white ring-opacity-60 ring-offset-2 ring-offset-red-400 focus:outline-none focus:ring-2'
  }

  return (
    <div className='grid h-screen place-items-center bg-stone-900'>
    <div className='w-full max-w-md px-2 py-2 sm:px-2 rounded-xl shadow-xl bg-gray-100'>
      <Tab.Group>
        <Tab.List className='flex space-x-1 rounded-xl p-1'>
          {posts.map( (post) => {
            return <Tab className={
              uniqueClass[post] ? uniqueClass[post] :
              'w-full bg-slate-200 rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
            }>{post}</Tab>
          })}
        </Tab.List>
        <Tab.Panels>
          {posts.map( (post) => {
            return <Tab.Panel><TradingPost name={post} items={TradingPosts[post]} completeItem={completeItem} completedItems={completedItems}/></Tab.Panel>
          })}
        </Tab.Panels>
      </Tab.Group>
    </div>
    </div>
  );
}

export default App;