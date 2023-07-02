import { faGithub, faTwitch } from "@fortawesome/free-brands-svg-icons";
import { faCoffee, faCrown, faMugHot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const BarterItem = (props) => {
    return (
        <div className="mx-auto py-2 fixed bottom-0 left-0 z-50 justify-between w-full bg-gray-700 text-gray-500">
           <p className="text-center mb-2">If you enjoy this tool, please consider supporting future development</p>
           <p className="flex justify-center">
            <span className="text-md inline-block px-4"><a href="https://ko-fi.com/afrozenpizza"><FontAwesomeIcon icon={faCoffee}/> KoFi</a></span>
            <span className="text-md inline-block px-4"><a href="https://twitch.tv/afrozenpizza"><FontAwesomeIcon icon={faTwitch}/> Twitch</a></span>
            <span className="text-md inline-block px-4"><a href="https://throne.com/afrozenpizza"><FontAwesomeIcon icon={faCrown}/> Throne</a></span>
           </p>
        </div>
    );
}

export default BarterItem;