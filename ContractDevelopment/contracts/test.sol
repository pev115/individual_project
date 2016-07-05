contract owned {
address public owner;
function owned() {
        owner = msg.sender;
    }

    modifier onlyOwner {
        if (msg.sender != owner) throw;
        _
    }

    function transferOwnership(address newOwner) onlyOwner {
        owner = newOwner;
    }
}


contract SharesManager {
/*TODO: Implement the token trading facility
        What if someone wants to sell?
        check if I want to delete shareholders if they get to 0 funds.
        Think of how shareholders can see their funds
        Check, there might be a bug where if you do not send any ether with the creation of the
        DAO you cannot create any shares*/

  address public DAO;
  uint256 public totalSupply;
  address[] public shareholders;
  mapping (address => uint256) balances;


  /* This generates a public event on the blockchain that will notify clients */
  event Transfer(address indexed from, address indexed to, uint256 value);

  /* Initializes contract with initial supply tokens to the creator of the contract */
  function SharesManager() {
  DAO = 0;
  totalSupply = 0;
  msg.sender.send(msg.value);                        /* Send back any ether sent accidentally*/
  }

  function setDAO(address _DAO){
    if (DAO != 0){
      throw;
    }
    DAO = _DAO;
  }

  function createShares(address beneficiary) returns (bool success){
    if(msg.sender != DAO){
      throw;
    }
    uint shareholderID = shareholders.length++;
    shareholders[shareholderID]=beneficiary;
    balances[beneficiary]=msg.value;
    totalSupply += msg.value;

    return true;

  }

/* Send coins */
function transfer(address _to, uint256 _value) {
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


contract Private is owned {

    /* Contract Variables and events */
    Proposal[] public proposals;
    uint public numProposals;
    SharesManager public sharesTokenAddress;
    bool public allowShareCreation;
    Dividend[] public dividends;

    event ProposalAdded(uint proposalID, address recipient, uint amount, string description);
    event ProposalExecuted(uint proposalNumber);
    event Voted(uint proposalID, bool position, address voter);
    event DividendPayout(uint time, uint amount, uint unit, uint ID);

    struct Proposal {
        address recipient;
        uint amount;
        string description;
        bool executed;
        bytes32 proposalHash;
        uint yes;
        uint no;
        Vote[] votes;
        mapping (address=>bool) voted;
    }

    struct Vote{
    bool inSupport;
    address voter;
    }

    struct Dividend{
      uint time;
      uint amount;
      uint unit;
      uint ID;

    }

    modifier onlyShareholders {
          if (sharesTokenAddress.balances(msg.sender) == 0) throw;
          _
      }

    /* First time setup */
    function Private(address _owner, SharesManager sharesAddress) {
      if(_owner != 0){
        owner = _owner;
      }
      allowShareCreation =false;
      sharesTokenAddress = SharesManager(sharesAddress);

    }

    function switchSharesIssue() onlyOwner returns(bool allowSharesIssue) {
      if(allowShareCreation){
        allowShareCreation=false;
        return false;
      }else{
        allowShareCreation = true;
        return true;
      }
    }

    function createShares() returns (bool success){
      if(!allowShareCreation){
        throw;
      }
      bool created = sharesTokenAddress.createShares(msg.sender).value(msg.value);
      return created;
    }

    function distributeDividents(uint totalDividend) onlyOwner returns (bool success){
      if(totalDividend > this.balance){
        throw;
      }
      uint distributedUnit = totalDividend/sharesTokenAddress.totalSupply();
      uint nbShareholders = sharesTokenAddress.shareholders.length;

      for (uint i=0; i<nbShareholders; ++i){
        address holder = sharesTokenAddress.shareholders[i];
        holder.send(distributedUnit);

      }


      uint dividendID = dividends.length; /*TODO: Check if i need to put ++: how does lenght work*/
      dividends[dividendID]=Dividend({time:now,amount:totalDividend,unit:distributedUnit,ID:dividendID});
      DividendPayout(now,totalDividend,distributedUnit,dividendID);
      return true;

    }

    /* Function to create a new proposal */
    function newProposal( address beneficiary, uint etherAmount,
                        string JobDescription, bytes transactionBytecode
                         ) onlyOwner returns (uint proposalID)
    {
        proposalID = proposals.length++;
        Proposal p = proposals[proposalID];
        p.recipient = beneficiary;
        p.amount = etherAmount;
        p.description = JobDescription;
        p.proposalHash = sha3(beneficiary, etherAmount, transactionBytecode);
        p.executed = false;
        p.yes =0;
        p.no=0;
        ProposalAdded(proposalID, beneficiary, etherAmount, JobDescription);
        numProposals = proposalID+1;
    }

    /* function to check if a proposal code matches */
    function checkProposalCode(
        uint proposalNumber,
        address beneficiary,
        uint etherAmount,
        bytes transactionBytecode
    )
        constant
        returns (bool codeChecksOut)
    {
        Proposal p = proposals[proposalNumber];
        return p.proposalHash == sha3(beneficiary, etherAmount, transactionBytecode);
    }


    function vote(uint proposalNumber, bool supportsProposal)
        onlyShareholders
        returns (uint voteID)
    {
        Proposal p = proposals[proposalNumber];
        if (p.voted[msg.sender] == true) throw;

        voteID = p.votes.length++;
        p.votes[voteID] = Vote({inSupport: supportsProposal, voter: msg.sender});
        p.voted[msg.sender] = true;
        Voted(proposalNumber,  supportsProposal, msg.sender);
    }


    function countVotes(uint proposalNumber){
    Proposal p = proposals[proposalNumber];

    for (uint i = 0; i <  p.votes.length; ++i) {
        Vote v = p.votes[i];
        uint voteWeight = sharesTokenAddress.balances(v.voter);
        if (v.inSupport) {
            p.yes += voteWeight;
        } else {
            p.no += voteWeight;
        }
    }




    }
    function executeProposal(uint proposalNumber, bytes transactionBytecode) onlyOwner returns (int result) {
        Proposal p = proposals[proposalNumber];
        /* Check if the proposal can be executed */
        if ( p.executed        /* has it been already executed? */
            ||  p.proposalHash != sha3(p.recipient, p.amount, transactionBytecode)) /* Does the transaction code match the proposal? */
            throw;

            p.executed = true;
            if (!p.recipient.call.value(p.amount * 1 ether)(transactionBytecode)) {
                throw;
            }

        // Fire Events
        ProposalExecuted(proposalNumber);
    }
}