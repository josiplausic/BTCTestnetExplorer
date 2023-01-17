import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';

function HomePage(){
    const [blockchainInfo, setBlockshainInfo] = useState({})

    useEffect(() => {
        fetch("http://127.0.0.1:3001/blockchainInfo/")
        .then((response) => response.json())
        .then((result) => {
            //console.log(result)
            setBlockshainInfo(result)
        })
    }, []);

    return(
        <>
            <SearchBar />
            <div className="container">
                <br></br>
                <h1>Blockchain Info</h1>
                <br></br>
                <div className="row text-white bg-dark">
                    <div className="col">Broj blokova</div>
                    <div className="col">{blockchainInfo.blocks}</div>
                    <div className="w-100"></div>
                </div>
                <div className="row text-white bg-dark">
                    <div className="col">Best blockhash</div>
                    <div className="col">{blockchainInfo.bestblockhash}</div>
                    <div className="w-100"></div>
                </div>
                <div className="row text-white bg-dark">
                    <div className="col">Difficulty</div>
                    <div className="col">{parseInt(blockchainInfo.difficulty)}</div>
                    <div className="w-100"></div>
                </div>
                <div className="row text-white bg-dark">
                    <div className="col">Chain</div>
                    <div className="col">{blockchainInfo.chain}</div>
                    <div className="w-100"></div>
                </div>
                <div className="row text-white bg-dark">
                    <div className="col">Chainwork</div>
                    <div className="col">{blockchainInfo.chainwork}</div>
                    <div className="w-100"></div>
                </div>
                <div className="row text-white bg-dark">
                    <div className="col">Size on disk</div>
                    <div className="col">{blockchainInfo.size_on_disk} Bytes</div>
                    <div className="w-100"></div>
                </div>
            </div>
        </>
    );
}
export default HomePage;