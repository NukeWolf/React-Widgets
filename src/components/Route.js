import {useEffect,useState} from 'react'
const Route = ({path,children}) =>{
    const [location,setLocation] = useState(window.location.pathname);
    useEffect( () =>{
        const onLocationChange = () => {
            setLocation(window.location.pathname)
        }
        window.addEventListener('popstate', onLocationChange);
        return () => {
            window.removeEventListener('popstate',onLocationChange)
        };
    },[]);

    return location === path ? children : null
};
export default Route