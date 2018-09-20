# insight-lite-api-lcoin

A insight-lite-api replacement which utilize lcoin directly

## APIs:

### Block

- [ ] /insight-lite-api/block/[:hash]
- [ ] /insight-lite-api/block-index/[:height]

### Raw Block

- [ ] /insight-lite-api/rawblock/[:blockHash]
- [ ] /insight-lite-api/rawblock/[:blockHeight]

### Block Summaries

Get block summaries by date:

- [ ] /insight-lite-api/blocks?limit=3&blockDate=2016-04-22



### TX, raw TX

- [ ] /insight-lite-api/rawtx/[:rawid]
- [ ] /insight-lite-api/tx/[:txid]

### Addr

- [ ] /insight-lite-api/addr/[:addr][?noTxList=1][&from=&to=]

### Address Properties

- [ ] /insight-lite-api/addr/[:addr]/balance
- [ ] /insight-lite-api/addr/[:addr]/totalReceived
- [ ] /insight-lite-api/addr/[:addr]/totalSent
- [ ] /insight-lite-api/addr/[:addr]/unconfirmedBalance

### UTXO

- [ ] /insight-lite-api/addr/[:addr]/utxo


### UTXO for Multiple Addresses

GET/POST:

- [ ] /insight-lite-api/addrs/[:addrs]/utxo


### Transactions by Block

- [ ] /insight-lite-api/txs/?block=HASH

### Transactions by Address

- [ ] /insight-lite-api/txs/?address=ADDR

### Transactions for Multiple Addresses

GET/POST:

- [ ] /insight-lite-api/addrs/[:addrs]/txs[?from=&to=]


### Transaction Broadcasting

- [ ] /insight-lite-api/tx/send (POST)

### Historic Blockchain Data Sync Status

- [ ]/insight-lite-api/sync

### Live Network P2P Data Sync Status

- [ ] /insight-lite-api/peer

### Status of the Bitcoin Network

- [ ] /insight-lite-api/status?q=xxx
	- [ ] getInfo
	- [ ] getDifficulty
	- [ ] getBestBlockHash
	- [ ] getLastBlockHash

Where "xxx" can be:



### Utility Methods

- [ ] /insight-lite-api/utils/estimatefee[?nbBlocks=2]
