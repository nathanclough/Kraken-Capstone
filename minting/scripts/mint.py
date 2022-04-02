import subprocess
import sys
import json

utxo = sys.argv[1]
id = 0

# update id 
with open(".index","r+") as file:
    id = int(file.read())
    file.seek(0)
    file.truncate()
    file.write(str(id+1))


# Import the enviroment variables
subprocess.run(["./env.sh"])

policyRes=subprocess.run(["./generatePolicy.sh",utxo,"1","KrakNFT"],capture_output=True)

policy = str.strip(str(policyRes.stdout, 'utf-8'))

metadata = {
    "721": {
        policy:{
            "KrakNFT": {
                "description": "Leader of the kraken pirates",
                "name": "Captain Kraken",
                "id": id,
                "image": "ipfs://QmQP7nndxMcdD6ZZwui3be97wRmFEXAvobh1wbN6rnwY5q",
                "collection" : "Pirates",
                "color": "Blue",
                "date": "4/2/2022",
                "Rarity":"Legendary"
            }
        }
    }
}

with open("metadata.json", "w") as outfile:
    outfile.write(json.dumps(metadata))

print(subprocess.run(["./mint-token-cli.sh",utxo,"1","KrakNFT","../01.addr","../01.skey",policy],capture_output=True).stderr)
