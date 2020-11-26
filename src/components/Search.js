import axios from 'axios';
import React, {useState,useEffect} from 'react';

const Search = () => {
    const [term,setTerm] = useState("")
    const [results, setResults] = useState([]);
    useEffect( () => {
        const search = async () => {
            const {data} = await axios.get("https://en.wikipedia.org/w/api.php",{
                params: {
                    action: 'query',
                    list: 'search',
                    origin: '*',
                    format: 'json',
                    srsearch: term
                },
            });
            setResults(data.query.search);
        }
        const timeid = setTimeout( () =>{
            if (term){
                search();
            }
        },500);
        return  () =>{
            clearInterval(timeid)
        }
    }, [term]);



    const onInputChange = e =>{
        setTerm(e.target.value)
    }

    const renderedResults = results.map(result => {
        return (
            <div className ="item" key={result.pageid}>
                <div className="right floated content">
                    <a className="ui button"
                        href={`https://en.wikipedia.org?curid=${result.pageid}`}    
                    >
                        Go
                    </a>
                </div>
                <div className="content">
                    <div className="header">
                        {result.title}
                    </div>
                    <span dangerouslySetInnerHTML={{__html:result.snippet}}></span>
                </div>
            </div>
        )
    })
    return (
        <div>
            <div className="ui form">
                <div className="field">
                    <label>Enter Search Term</label>
                    <input onChange={e => onInputChange(e)} className="input" />
                </div>
            </div>
            <div className="ui celled list">
                {renderedResults}
            </div>
        </div>
    )
}

export default Search