contract hasProposals{
  mapping (uint => proposal)  public proposals;

  struct proposal{
    uint ID;
    string  description;
    uint  reward;
    uint deposit;
    bool completed;
    bool appointed;
    address  contractor;
    bool finalised;
  }


}
