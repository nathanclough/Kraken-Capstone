#!/bin/bash
pid=$1 #c8b21d0e3825ac82db8add095b926d0a1be026a1cd0de4e752a87a16
amt=$2 #1 
hexName=$3 #4b72616b4e4654
txIn=$4 #8e6fa542b4a1c7c891c98d70fcf18ccc2fe168dc7cc6bdc176af4d9880047629#1
fromAddrFile=$5  #01.addr
skeyFile=$6 #01.skey
toAddr=$7 #addr_test1qpktv6mrl7ktkumrm0wdpk0u0gq9exrufptw4kjyd6jvyxcjw0mcjw26ajl2lk33maemq65zkq9ujcvhxuc27u7rfc8syg596a


fromAddr=$(cat $fromAddrFile)

unsignedFile=testnet/tx.unsigned
signedFile=testnet/tx.signed

cardano-cli transaction build \
    $MAGIC \
    --tx-in $txIn \
    --tx-in 39604807295e91ba499d49cfd773a2b57a01e8c2deccbaad624853990b2e3556#0 \
    --tx-in-collateral $txIn \
    --tx-out "$toAddr + 1400000 lovelace + $amt $pid.$hexName" \
    --change-address $fromAddr \
    --out-file $unsignedFile \

cardano-cli transaction sign \
    --tx-body-file $unsignedFile \
    --signing-key-file $skeyFile \
    $MAGIC \
    --out-file $signedFile

cardano-cli transaction submit \
    $MAGIC \
    --tx-file $signedFile

