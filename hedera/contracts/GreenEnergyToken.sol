// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract GreenEnergyToken is ERC20 {
    address public owner;
    mapping(address => uint256) public energyTokens;

    constructor() ERC20("Green Energy Token", "GC") {
        owner = msg.sender;
    }

    // Fonction pour que le propriétaire du contrat puisse distribuer des tokens GC basés sur l'énergie solaire capturée
    function mint(address account, uint256 amount) public {
        require(msg.sender == owner, "Only owner can mint tokens");
        _mint(account, amount);
        energyTokens[account] += amount;
    }

    // Fonction pour permettre à un utilisateur de brûler (burn) ses tokens GC
    function burn(uint256 amount) public {
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");
        _burn(msg.sender, amount);
        energyTokens[msg.sender] -= amount;
    }
}
