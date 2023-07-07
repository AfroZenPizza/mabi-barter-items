import { useEffect, useState } from 'react';
import './App.css';
import TradingPosts from './data/tradingposts.json';
import TradingPost from './TradingPost';
import Footer from './Footer'
import ProfileAdder from './ProfileAdder'
import BottomBar from './BottomBar';
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
    let endOfWeek = new Date(startOfWeek.valueOf() +  6*24*60*60*1000  + 14*60*60*1000 - startOfWeek.getTimezoneOffset()*60*1000);
    if (date > endOfWeek) endOfWeek = new Date(endOfWeek.valueOf() + 7*24*60*60*1000);
    return endOfWeek;
  }  
  
  const [activeTab, setActiveTab] = useState( () => {
    let activeTab = JSON.parse(localStorage.getItem('activeTab'));
    if (activeTab == null) return 0;
    console.log(activeTab)
    return activeTab;
  })

  const [addingProfile, setAddingProfile] = useState(false);

  const [activeProfile, setActiveProfile] = useState( ()=>{
    let activeProfile = localStorage.getItem("activeProfile");
    console.log(activeProfile);
    if (activeProfile == null) activeProfile = "Default";
    return activeProfile;
  })

  const [completedItems, setCompletedItems] = useState(() => {
    let completedItems = JSON.parse(localStorage.getItem('completedItems'));
    if (completedItems == null) return {"expires": getExperation()};
    if (Date.now() > new Date(completedItems["expires"])){
      return {"expires": getExperation()}
    }
    return completedItems;
  })
  
  useEffect( () => {
    localStorage.setItem('completedItems', JSON.stringify(completedItems))
  }, [completedItems])

  useEffect( () => {
     localStorage.setItem('activeTab', JSON.stringify(activeTab))
  }, [activeTab])

  let completeItem = (item) => {
    const newCompletedItems = {...completedItems};
    if (newCompletedItems[item]){
      newCompletedItems[item] = false;
    } else {
      newCompletedItems[item] = true;
    }
    setCompletedItems(newCompletedItems);
  }

  let clearItems = () => {
    setCompletedItems({"expires": getExperation()})
  }

  let changeProfile = (event) => {
    const profileName = event.target.value;
    let profiles = JSON.parse(localStorage.getItem("profiles"));
    if (profiles == null) profiles = {};
    profiles[activeProfile] = completedItems;
    let items = {"expires": getExperation()};
    if (profiles[profileName]){
      items = profiles[profileName];
    }
    localStorage.setItem("profiles", JSON.stringify(profiles));
    localStorage.setItem("activeProfile", profileName)
    setCompletedItems(items);
    setActiveProfile(profileName);
  }

  let addProfile = (newProfile) => {
    let profiles = JSON.parse(localStorage.getItem("profiles"));
    if (profiles == null) profiles = {};
    if (profiles[newProfile]){
      console.log("Profile Already Exists");
      return;
    }
    profiles[activeProfile] = completedItems;
    let items = {"expires": getExperation()};
    profiles[newProfile] = items;
    localStorage.setItem("profiles", JSON.stringify(profiles));
    localStorage.setItem("activeProfile", newProfile)
    setCompletedItems(items);
    setActiveProfile(newProfile);
    setAddingProfile(false);
  }

  let removeProfile = () => {
    let profile = activeProfile;
    let profiles = JSON.parse(localStorage.getItem("profiles"));
    if (profiles == null){
      console.log("Profiles not in use");
      return;
    }
    console.log("Removing " + activeProfile)
    if (Object.keys(profiles).length <= 1) {
      console.log("Error: Cannot remove only profile");
      return;
    }
    let index = Object.keys(profiles).indexOf(profile);
    index--;
    if (index < 0) index = 0;
    delete profiles[profile];
    let targetProfile = Object.keys(profiles)[index];
    localStorage.setItem("profiles", JSON.stringify(profiles));
    localStorage.setItem("activeProfile", targetProfile)
    setActiveProfile(targetProfile)
  }

  let toggleAddingProfile = () => {
    setAddingProfile(prevAdding => !prevAdding);
  }
  let profileList = [];
  {
    let profiles = JSON.parse(localStorage.getItem("profiles"));
    for (let profile in profiles) {
      profileList.push(profile)
    }
    if (!(profileList.includes(activeProfile))) profileList.push(activeProfile);
  }

  let enableRemove = false;
  {
    let profiles = JSON.parse(localStorage.getItem("profiles"));
    if (profiles == null) return;
    if (Object.keys(profiles).length > 1) enableRemove = true;
  }

  const uniqueClass = {
    "Karu Forest": 'w-full bg-green-200 rounded-lg py-2.5 text-sm font-medium leading-5 text-green-700 ring-white ring-opacity-60 ring-offset-2 ring-offset-green-400',
    "Connous Oasis": 'w-full bg-orange-200 rounded-lg py-2.5 text-sm font-medium leading-5 text-orange-700 ring-white ring-opacity-60 ring-offset-2 ring-offset-orange-400',
    "Lake Calida": 'w-full bg-blue-200 rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400',
    "Pera Volcano": 'w-full bg-red-200 rounded-lg py-2.5 text-sm font-medium leading-5 text-red-700 ring-white ring-opacity-60 ring-offset-2 ring-offset-red-400'
  }

  return (
    <>
    <div className='grid h-screen place-items-center bg-stone-900'>
    <div className='w-full max-w-md px-2 py-2 sm:px-2'>
      <Tab.Group onChange={(index) => setActiveTab(index)} defaultIndex={activeTab}>
        <Tab.List className='flex space-x-1 rounded-xl p-1'>
          {posts.map( (post, i) => {
            return <Tab key={post} className={ ()=> {
              let classes = uniqueClass[post] ? uniqueClass[post] :
              'w-full bg-slate-200 rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400'
              if (i != activeTab) classes += " opacity-50";
              return classes;
            }}>{post}</Tab>
          })}
        </Tab.List>
        <Tab.Panels>
          {posts.map( (post) => {
            return <Tab.Panel key={post} className="bg-slate-200 rounded-lg m-1 mt-2 pb-2"><TradingPost name={post} items={TradingPosts[post]} completeItem={completeItem} completedItems={completedItems}/></Tab.Panel>
          })}
        </Tab.Panels>
      </Tab.Group>

      {!addingProfile && <BottomBar enableRemove={enableRemove} removeProfile={removeProfile} changeProfile={changeProfile} activeProfile={activeProfile} profileList={profileList} toggleAddingProfile={toggleAddingProfile} addingProfile={addingProfile} clearItems={clearItems}/>}
      {addingProfile && <ProfileAdder addProfile={addProfile} toggleAddingProfile={toggleAddingProfile} />}
    </div>
    </div>
    <Footer />
    </>
  );
}

export default App;
