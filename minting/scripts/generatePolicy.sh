#!/bin/sh
oref=$1
amt=$2
tn=$3

policyFile=../testnet/token.plutus
cabal exec token-policy $policyFile $oref $amt $tn
pid=$(cardano-cli transaction policyid --script-file $policyFile)
echo "$pid"
