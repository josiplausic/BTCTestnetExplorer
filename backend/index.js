const express = require("express");
const Client = require('bitcoin-core');
const cors = require('cors');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.get("/api", (req, res) =>{
    res.json({ message: "Hello from backend!"});
});


const client = new Client({ 
  host: 'blockchain.oss.unist.hr', 
  username: 'student', 
  password: 'IhIskjGukNz9bRpWJL0FBNXmlSBd1pS5AtJdG1zfavLaICBuP4VDPEPMu67ql7U3', 
  port: 8332 
});

app.get("/blockchainInfo", (req, res) => {
  client.getBlockchainInfo()
  .then((err, respone) => {
    if(err){
      res.send(err)
    }
    else{
      return res.json(respone)
    }
  })
})

app.get("/blockInfo/:value", (req, res) => {
  if(req.params.value.length < 8){
    client.getBlockHash(parseInt(req.params.value))
    .then((respone) => {
      client.getBlock(respone)
      .then((blockInfo) => {
          client.getBlockStats(respone)
          .then((blockInfoExt) =>{
              console.log(blockInfoExt)
              console.log(blockInfo)
            return res.json({blockInfo, blockInfoExt})
          })
          
        })
      })
  }
  else{
    client.getBlock(req.params.value)
      .then((blockInfo) => {
        client.getBlockStats(req.params.value)
          .then((blockInfoExt) =>{
              console.log(blockInfoExt)
              console.log(blockInfo)
            return res.json({blockInfo, blockInfoExt})
          })
      })
  }
})

app.get('/transactionInfo/:txId', (req, res) => {
  client.getRawTransaction(req.params.txId)
  .then((rawTransaction) => {
    client.decodeRawTransaction(rawTransaction)
    .then((err, decoded) => {
      if(err){
        res.send(err);
      }
      else{
        return res.json(decoded);
      }
    })
  })
})

app.get('/rawTransactionInfo/:txId', (req, res) => {
  var rawTransaction;
  var primljeno = 0;
  var poslano = 0;

  client.getRawTransaction(req.params.txId, true)
  .then(respone => rawTransaction = respone)
  .then(async () => {
    if(rawTransaction.vin[0].coinbase == null){
      for (let i = 0; i < rawTransaction.vin.length; i++){
        await client.getRawTransaction(rawTransaction.vin[i]['txid'], true)
        .then((rp) => {
          //console.log(rp.vout[rawTransaction.vin[i]['vout']]['value'])
          primljeno += parseFloat(rp.vout[rawTransaction.vin[i]['vout']]['value']);
        })
      }
      for (let i = 0; i < rawTransaction.vout.length; i++){
        poslano += parseFloat(rawTransaction.vout[i].value);
      }
    }
  })
  .then(() => {return res.json({rawTransaction, 'amountTransacted': poslano , 'fee' :  (primljeno - poslano).toFixed(8)})})
});


/*client.getRawTransaction('b61cedd63c52742c9c39fd78325d6a279cba925ad31b7398133323de48fcdde1', true)
.then(respone => console.log(respone))*/

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});