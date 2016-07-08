
contract SharesManager {
/*TODO: Implement the token trading facility
        What if someone wants to sell?
        check if I want to delete shareholders if they get to 0 funds.
        Think of how shareholders can see their funds*/

  uint256 public totalSupply;
  address[] public shareholders;
  mapping (address => uint256) balances;
  bool public allowShareCreation;

  /* This generates a public event on the blockchain that will notify clients */
  event Transfer(address indexed from, address indexed to, uint256 value);


  /* Initializes contract with initial supply tokens to the creator of the contract */
  function SharesManager() {
  totalSupply = 0;
  msg.sender.send(msg.value);                        /* Send back any ether sent accidentally*/
  }


  function createShares() returns (bool success){
    if(!allowShareCreation){
      throw;
    }

    if(balances[msg.sender]==0){  /*TODO: Verify that this is a possible way*/
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

/* Send coins */
function transfer(address _to, uint256 _value) {
if(balances[_to]==0){
  uint shareholderID = shareholders.length++;
  shareholders[shareholderID]= _to;
}
if (balances[msg.sender] < _value) throw;           /* Check if the sender has enough*/
if (balances[_to] + _value < balances[_to]) throw; /* Check for overflows */
balances[msg.sender] -= _value;                     /* Subtract from the sender */
balances[_to] += _value;                            /* Add the same to the recipient */
Transfer(msg.sender, _to, _value);                   /* Notify anyone listening that this transfer took place*/
}


/* This unnamed function is called whenever someone tries to send ether to it */
function () {
throw;     /* Prevents accidental sending of ether*/
}
}
