#!/bin/bash
export CARDANO_NODE_PATH=/home/nclough/cardano-node-1.34.1
alias cardano-cli=$CARDANO_NODE_PATH/cardano-cli

export CARDANO_NODE_SOCKET_PATH=$CARDANO_NODE_PATH/node-ipc/testnet/node.socket
export MAGIC='--testnet-magic 1097911063'
export ADDRESS=addr_test1qzj356wpdmhdchvmc355xx6wel7cqvepyrlam84aygkvx9d04w7v8cu4fshxvv5ukfw05nyzh07zy427mf2eqkcd27aqax2r7e
export WALLETID=7cc75497535877261173ab585f5abb431f7ba484
