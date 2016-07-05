import "owned.sol";

import "SharesManager.sol";

/*TODO:
Implement the agreement hash and change system
ask:is it bad to import all SharesManager even if not using all of it?#
What happens with dividion of integers?*/


contract Private is owned, SharesManager {

    /* Contract Variables and events */
    Proposal[] public proposals;
    uint public numProposals;
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
          if (balances[msg.sender] == 0) throw;
          _
      }

    /* First time setup */
    function Private(address _owner, SharesManager sharesAddress) {
      if(_owner != 0){
        owner = _owner;
      }
      allowShareCreation =false;
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

    function issueShares() returns (bool success){
      if(!allowShareCreation){
        throw;
      }
      bool created = createShares(msg.sender).value(msg.value);
      return created;
    }

    function distributeDividents(uint totalDividend) onlyOwner returns (bool success){
      if(totalDividend > this.balance){
        throw;
      }
      uint distributedUnit = totalDividend/totalSupply();
      uint nbShareholders = shareholders.length;

      for (uint i=0; i<nbShareholders; ++i){
        address holder = shareholders[i];
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
