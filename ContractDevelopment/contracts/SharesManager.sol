contract SharesManager {

  uint public totalSupply;
  address[] public shareholders;
  mapping (address => uint) balances;
  bool public investment;



  function SharesManager() {
  totalSupply = 0;
  msg.sender.send(msg.value);
  }


  function createShares() returns (bool success){
    if(!investment){
      throw;
    }

    if(balances[msg.sender]==0){
      uint shareholderID = shareholders.length++;
      shareholders[shareholderID]=msg.sender;
    }

    balances[msg.sender]+=msg.value;
    totalSupply += msg.value;
    return true;
  }

  function getShares() returns (uint shares){
    return balances[msg.sender];
  }


  function transfer(address _to, uint _value) {
    if(balances[_to]==0){
      uint shareholderID = shareholders.length++;
      shareholders[shareholderID]= _to;
    }
    
    if (balances[msg.sender] < _value){
      throw;
    }

    if (balances[_to] + _value < balances[_to]){
       throw;
    }

    balances[msg.sender] -= _value;
    balances[_to] += _value;
  }



}
