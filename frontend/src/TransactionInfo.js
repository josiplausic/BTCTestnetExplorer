import React, { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import { useParams, Link } from "react-router-dom";

function BlockInfo(){
    let { value } = useParams();
    const [transactionInfo, setTransactionInfo] = useState({})
    const [fee, setFee] = useState (0)
    const [amountTransacted , setAmountTransacted] = useState (0)
    const [coinbase, setCoinbase] = useState(false)

    /**useEffect(() => {
        Promise.all([
            fetch("http://localhost:3001/transactionInfo/" + value),
            fetch("http://localhost:3001/rawTransactionInfo/" + value)
        ])
            .then(([dataTransaction, dataRawTransaction]) => {
                setTransactionInfo(dataTransaction);
                setRawTransactionInfo(dataRawTransaction);
            });
        },  []);*/
    
    useEffect(() => {
        fetch("http://127.0.0.1:3001/rawTransactionInfo/" + value)
        .then((response) => response.json())
        .then((result) => {
            console.log(result)
            setTransactionInfo(result.rawTransaction)
            setAmountTransacted(result['amountTransacted']);
            setFee(Number(result.fee));
            
            if(result.rawTransaction.vin[0].hasOwnProperty("coinbase")){
                setCoinbase(true)
            }
        })
    }, [value, fee]);

    return(
        <>
            <SearchBar />
            <div className="container">
                <br></br>
                <h1>{coinbase ? "Coinbase transakcija" : "Transakcija"}</h1>
                <h3>{transactionInfo.txid}</h3>
                <br></br>
                <div className="row text-white bg-dark">
                    <div className="col">Transaction Fee</div>
                    <div className="col">{fee} BTC</div>
                    <div className="w-100"></div>
                </div>
                <div className="row text-white bg-dark">
                    <div className="col">Amount transacted</div>
                    <div className="col">{amountTransacted.toFixed(8)} BTC</div>
                    <div className="w-100"></div>
                </div>
                <div className="row text-white bg-dark">
                    <div className="col">Transaction ID</div>
                    <div className="col">{transactionInfo.txid}</div>
                    <div className="w-100"></div>
                </div>
                <div className="row text-white bg-dark">
                    <div className="col">Transaction hash</div>
                    <div className="col">{transactionInfo.hash}</div>
                    <div className="w-100"></div>
                </div>
                <div className="row text-white bg-dark">
                    <div className="col">Block hash</div>
                    <div className="col"><Link to={'/blockInfo/'+transactionInfo.blockhash }>{transactionInfo.blockhash}</Link></div>
                    <div className="w-100"></div>
                </div>
                <div className="row text-white bg-dark">
                    <div className="col">Verzija</div>
                    <div className="col">{transactionInfo.version}</div>
                    <div className="w-100"></div>
                </div>
                <div className="row text-white bg-dark">
                    <div className="col">Velicina</div>
                    <div className="col">{transactionInfo.size} B</div>
                    <div className="w-100"></div>
                </div>
                <div className="row text-white bg-dark">
                    <div className="col">Virtualna velicina</div>
                    <div className="col">{transactionInfo.vsize} vB</div>
                    <div className="w-100"></div>
                </div>
                <div className="row text-white bg-dark">
                    <div className="col">Težina</div>
                    <div className="col">{transactionInfo.weight}</div>
                    <div className="w-100"></div>
                </div>
                <br></br>
                
                {coinbase ? <></> : <h2>Ulazi transakcije</h2>}
                <br></br>
                {coinbase ? <></> : 
                transactionInfo.vin?.map(vin => {
                    return (    
                        <div className="row text-white bg-dark" key={vin.txid}>                
                        <div className="col">TxId</div>
                        <div className="col"><Link to={'/transactionInfo/'+vin.txid}>{vin.txid}</Link></div>
                        <div className="col">Vout: {vin.vout}</div>
                        </div> 
                    )
                })
                }
                <br></br>
                {coinbase ? <></> : <h2>Izlazi transakcije</h2>}
                <br></br>
                {coinbase ? <></> : 
                    transactionInfo.vout?.map(vout => {
                        return (    
                            <div className="row text-white bg-dark" key={vout.scriptPubKey.addresses}>                
                            <div className="col">Address: {vout.scriptPubKey.addresses}</div>
                            <div className="col">Value:  {vout.value} BTC</div>
                            </div> 
                        )
                    })
                }
                <br></br>
            </div>
            <br></br>
        </>
    );
}
export default BlockInfo;