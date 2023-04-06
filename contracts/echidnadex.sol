// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./dex.sol";

contract EchidnaDex {
  Dex dex;
  SwappableToken token1;
  SwappableToken token2;

    /* ================================================================
       Events used for debugging or showing information.
       ================================================================ */
    event Value(string reason, uint256 val);
    event LogErr(bytes error);
    event Debug(int128, int128);
    event Addy(address);

  // setup
  constructor() {
    dex = new Dex();
    token1 = new SwappableToken(address(dex), 'token1', 'tk1', 110);
    token2 = new SwappableToken(address(dex), 'token2', 'tk2', 110);
    
    dex.setTokens(address(token1), address(token2));
    token1.approve(address(this), address(this), 100);
    token1.transferFrom(address(this), address(dex), 100);

    token2.approve(address(this), address(this), 100);
    token2.transferFrom(address(this), address(dex), 100);
    dex.renounceOwnership();
  }

  function testSwapToken1Token2(uint _amount) public{
    // Pre conditions, let from and to always be token1, token2 or vice versa
    // make sure amount isn't bigger than our balance
    SwappableToken from;
    SwappableToken to;
    if(_amount % 2 == 0) {
      from = token1;
      to = token2;
    }
    else {
      from = token2;
      to = token1;
    }

    uint256 amount = 1 + (_amount % from.balanceOf(address(this)));
    emit Addy(address(from));
    emit Value('amount: ', amount);
    // Action
    from.approve(address(this), address(dex), amount);
    try dex.swap(address(from), address(to), amount) {
      // test the respect of the product constant with a flexibility of 5%
       // assert(from.balanceOf(address(dex)) * to.balanceOf(address(dex)) >= 9500);
       assert(from.balanceOf(address(dex)) + to.balanceOf(address(dex)) > 150);
    } catch (bytes memory err) {
      assert(false);
    }
  }
}
