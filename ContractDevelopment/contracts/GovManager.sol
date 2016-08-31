contract GovManager {
  address public owner;
  /*Constructor*/
  function GovManager() {
          owner = msg.sender;
      }

  /*Governance Modifier*/
  modifier onlyOwner {
    
    if (msg.sender != owner){
      throw;
    }
    _
  }

}
