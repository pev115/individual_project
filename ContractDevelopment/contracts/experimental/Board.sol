contract Board{

/*
  address[] public Board;
  bool public appointed;
  boardChange[] changes;

  struct boardChange{
    address candidate;
    uint changeNumber;
    uint changeType;
    boardVote[] votes;
    bool decided;
    bool completed;
  }

  struct boardVote{
    bool inSupport;
    address voter;
    string justification;
  }

  function Board() {
    appointed = false;
  }

  modifier onlyBoard {
    if (Board[msg.sender] == 0) throw;
    _
  }

  function appointBoard(address[] members ){
    for (uint i=0; i<members.length;++i){
      Board[i]= members[i];
    }
    appointed = true;
  }


  function addBoardChange(address _candidate) onlyBoard {
    uint type;
    uint changeID;

    if (Board[_candidate]!= 0 ){
      type = 0;
    }


    if(Board[_candidate]==0){
      type = 1;
    }

    changeID = changes.length++;
    boardChange c = changes[changeID];
    c.candidate = _candidate;
    c.changeType =type;
    c.completed = false;
    c.changeNumber = changeID;
  }

  function transferOwnership(address newOwner) onlyOwner {
      owner = newOwner;
  }

  */
}
