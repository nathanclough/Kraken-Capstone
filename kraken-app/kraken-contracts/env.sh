#!/bin/bash
export CARDANO_NODE_PATH=/home/nclough/cardano-node-1.34.1

alias cardano-cli=$CARDANO_NODE_PATH/cardano-cli

export CARDANO_NODE_SOCKET_PATH=$CARDANO_NODE_PATH/node-ipc/testnet/node.socket
export MAGIC='--testnet-magic 1097911063'
export ADDRESS=addr_test1vzlvca7cmsnyptrk50ql2hp5d54gwyq4hzt6d4m9c8y5llczh2rd6
export WALLETID=7cc75497535877261173ab585f5abb431f7ba484
