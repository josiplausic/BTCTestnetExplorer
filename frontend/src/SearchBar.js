import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";

function SearchBar(){
    const options = [
        {value: "visinaBloka", 
        label: "Visina bloka" },
        {value: "blockHash", 
        label: "Blok hash" },
        {value: "transakcija", 
        label: "Transakcija" },
    ]
    const [searchBar, setSearchBar] = useState("");
    const [selectedOption, setSelectedOption] = useState(options[0].value);
    const navigate = useNavigate();

    function buttonClick(e){
        e.preventDefault();

        if (selectedOption == "visinaBloka" && searchBar != ""){
            navigate("/blockInfo/" + searchBar);
        }
        else if (selectedOption == "blockHash" && searchBar != ""){
            navigate("/blockInfo/" + searchBar);
        }
        else if (selectedOption == "transakcija" && searchBar != ""){
            navigate("/transactionInfo/" + searchBar);
        }

    }

    return(
        <div className="container">
            <Link to='/'><h2>BTC Testnet Explorer</h2></Link>
            <div className="input-group">
                <input type="text" value={searchBar} onChange={e => setSearchBar(e.target.value)}
                className="form-control rounded" placeholder="Pretražite transakcije, blokove po hashu i visini" aria-label="Search" aria-describedby="search-addon" />
                <select  value={selectedOption} onChange={e => setSelectedOption(e.target.value)} className="form-select" aria-label="Default select example">
                    {options.map(option => {
                        return <option key={option.value} value={option.value}>{option.label}</option>
                    })};
                </select>
                <button onClick={buttonClick} type="button" className="btn btn-outline-primary">Pretraži</button>
            </div>
        </div> 
    );
}

export default SearchBar;