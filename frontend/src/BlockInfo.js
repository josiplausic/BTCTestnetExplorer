import React, { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import { useParams, Link } from "react-router-dom";

function BlockInfo(){
    let { value } = useParams();
    const [blockInfo, setBlockInfo] = useState({})
    const [blockInfoExt, setBlockInfoExt] = useState({})

    useEffect(() => {
        fetch("http://127.0.0.1:3001/blockInfo/" + value)
        .then((response) => response.json())
        .then((result) => {
            //console.log(result)
            setBlockInfo(result['blockInfo'])
            setBlockInfoExt(result['blockInfoExt'])
        })
    }, [value]);

    return(
        <>
        <div>
            <SearchBar />
            <div className="container">
                <br></br>
                <h1>blok {blockInfo.height}</h1>
                <br></br>
                <div className="row text-white bg-dark">
                    <div className="col">Visina</div>
                    <div className="col">{blockInfo.height}</div>
                    <div className="w-100"></div>
                    <div className="col">Blockhash</div>
                    <div className="col">{blockInfo.hash}</div>
                    <div className="w-100"></div>
                    <div className="col">Total fee</div>
                    <div className="col">{blockInfoExt.totalfee} Satoshi</div>
                    <div className="w-100"></div>
                    <div className="col">Broj potvrda</div>
                    <div className="col">{blockInfo.confirmations}</div>
                    <div className="w-100"></div>
                    <div className="col">Veličina bloka</div>
                    <div className="col">{blockInfo.size} Bytes</div>
                    <div className="w-100"></div>
                    <div className="col">Merkle Root</div>
                    <div className="col">{blockInfo.merkleroot}</div>
                    <div className="w-100"></div>
                    <div className="col">Broj transakcija</div>
                    <div className="col">{blockInfo.nTx}</div>
                    <div className="w-100"></div>
                    <div className="col">Difficulty</div>
                    <div className="col">{parseInt(blockInfo.difficulty)}</div>
                    <div className="w-100"></div>
                    <div className="col">Nonce</div>
                    <div className="col">{blockInfo.nonce}</div>
                    <div className="w-100"></div>
                    <div className="col">Previous blockhash</div>
                    <div className="col"><Link to={'/blockInfo/'+blockInfo.previousblockhash }>{blockInfo.previousblockhash}</Link></div>
                    <div className="w-100"></div>
                    <div className="col">Next blockhash</div>
                    <div className="col"><Link to={'/blockInfo/'+blockInfo.nextblockhash }>{blockInfo.nextblockhash}</Link></div>
                    <div className="w-100"></div>
                </div>
            
                <br></br>
                <h1>{blockInfo.nTx} transakcija</h1>
                <br></br>
                
                {blockInfo.tx?.map(transaction => {
                    return (    
                        <div className="row text-white bg-dark" key={transaction}>                
                        <div className="col">TxId</div>
                        <div className="col"><Link to={'/transactionInfo/'+transaction}>{transaction}</Link></div>
                        <div className="w-100"></div>
                        </div> 
                    )
                })}
                
            </div>
        </div>
        </>
    );
}
export default BlockInfo;