#!/bin/bash
hexName=4b72616b4e4654
txIn=2282d295a51117d7e93a2bcda3a23bdb6d44a0d9b27093dc14e7f0f326a6596f#1
nft1=c93b28e0c1419065072f1770308e124278f3c36c2cf61736e3330239.4b72616b4e4654

fromAddrFile=../01.addr
skeyFile=../01.skey
toAddr=addr_test1qpwcggve6uu9u9azerz5k76f2sg4u5lptt7ju40h6rhzlr89whfd98ermfunw8ejg6va62dmpt0phr290ph23uvhn0rsyf6kvc
amt=1

fromAddr=$(cat $fromAddrFile)

unsignedFile=../testnet/tx.unsigned
signedFile=../testnet/tx.signed

cardano-cli transaction build \
    $MAGIC \
    --tx-in $txIn \
    --tx-in f9486c235b57f0bcdd907fcacd826861615e27bd1c8f0d82e7e7f1cb598b39da#0 \
    --tx-in-collateral $txIn \
    --tx-out "$toAddr + 1400000 lovelace + $amt $nft1" \
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

