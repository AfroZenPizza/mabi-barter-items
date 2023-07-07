import { faAdd, faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const ProfileAdder = (props) => {
    const {addProfile, toggleAddingProfile} = props;
    const [name, setName] = useState("New Profile")
    let handleAdd = ()=>{
        addProfile(name);
    }

    let updateName = (event) => {
        let name = event.target.value;
        setName(name);
    }

    let handleKeyDown = (event) => {
        if (event.key == "Enter") addProfile(name);
    }

    return (<div className="mt-3">
        <input onKeyDown={handleKeyDown} className='font-medium pl-2 h-10 w-40 rounded-lg' type="textbox" onChange={updateName} value={name}/>
        <button className="w-10 ml-2 mx-auto h-10 text-center bg-green-800 hover:bg-green-600 font-medium rounded-lg text-white" onClick={handleAdd}><FontAwesomeIcon icon={faAdd}/></button>
        <button onClick={toggleAddingProfile} className="w-40 mx-auto h-10 text-center bg-red-800 hover:bg-red-600 font-medium rounded-lg text-white float-right">Cancel</button>
    </div>)
}

export default ProfileAdder;