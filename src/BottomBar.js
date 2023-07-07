import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faClose, faMinus, faWarning } from '@fortawesome/free-solid-svg-icons';
const BottomBar = (props) => {
    const {enableRemove, removeProfile, changeProfile, activeProfile, profileList, toggleAddingProfile, addingProfile, clearItems} = props;
    return (
    <div>
        <select onChange={changeProfile} defaultValue={activeProfile} className='font-medium mt-2 pl-2 h-10 w-40 rounded-lg'>
        {profileList.map( (profile) => {
          return <option key={profile}>{profile}</option>
        })}
      </select>
      <button onClick={toggleAddingProfile} className="w-10 ml-2  mx-auto mt-2 h-10 text-center bg-green-800 hover:bg-green-600 font-medium rounded-lg text-white"><FontAwesomeIcon icon={addingProfile ? faClose :faAdd} /></button>
      {enableRemove && <button onClick={removeProfile} className="w-10 ml-2  mx-auto mt-2 h-10 text-center bg-red-800 hover:bg-red-600 font-medium rounded-lg text-white"><FontAwesomeIcon icon={faMinus} /></button>}
      <button className="w-40 float-right mx-auto mt-2 h-10 text-center bg-red-800 hover:bg-red-600 font-medium rounded-lg text-white" onClick={clearItems}>
        <FontAwesomeIcon icon={faWarning}/> Clear</button>
    </div>
    )

}

export default BottomBar;