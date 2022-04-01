hash=$1
echo $hash
curl -H 'project_id: testnet7yHbEpE8tPf15bJ3j8A5BFrFCbNiNFCs' https://cardano-testnet.blockfrost.io/api/v0/txs/$hash/metadata