

/*
contract('PrivateWithVotes', function(accounts){
  it("Checks the owner is set correctly",function(done){
    var priv = PrivateWithVotes.deployed();
    priv.owner.call().then(function(owner){
      assert.equal(owner,accounts[0],"Default constructor failing");
    }).then(function(){
      Private.new(accounts[2],{from:accounts[1]}).then(function(instance){
        instance.owner.call().then(function(newOwner){
          assert.equal(newOwner,accounts[2],"Constructor parameter failing");
        }).then(done).catch(done);
      }).catch(done);
    }).catch(done);
  });

  it("Checks: normal shares creation workflow and dividend distribution",function(done){
    var TestRPC = require("ethereumjs-testrpc");

    var accountConfig=[{balance:100},{balance:100}];

    web3.setProvider(TestRPC.provider({accounts:accountConfig}));

    var priv = PrivateWithVotes.deployed();


    var account_zero = accounts[0];
    var account_one = accounts[1];
    var account_two = accounts[2];
    var account_three = accounts[3];

      console.log('Testing Balances');
      console.log(web3.eth.getBalance(account_one).toNumber());






    var account_one_starting_balance;
    var account_two_starting_balance;
    var account_three_starting_balance;
    var account_one_ending_balance;
    var account_two_ending_balance;
    var account_three_ending_balance;

    var total_dividend = 12;

    priv.switchSharesIssue({from:account_zero}).catch(function(e){
      console.log("Error in switching the SharesIssue");
      console.log(e);
    });

    priv.allowShareCreation.call().then(function(result){
      console.log("Can I issue shares?");
      console.log(result);
    });

    var amount = 5;
    for(var i =1 ; i<4; i++){
      priv.createShares({from:accounts[i],value:amount}).catch(function(e){
        console.log("Error in creating shares");
        console.log(e);
      })
      amount+=10;
    }
    console.log("TEST1")
    priv.totalSupply.call().then(function(total){
      console.log("This is the total:");
      console.log(total);
    });

    account_one_starting_balance = web3.eth.getBalance(account_one).toNumber();
    account_two_starting_balance = web3.eth.getBalance(account_two).toNumber();
    account_three_starting_balance = web3.eth.getBalance(account_three).toNumber();



    var watcher = priv.allEvents();







web3.eth.sendTransaction({from:account_one,to:account_zero,value:web3.eth.getBalance(account_one).toNumber()});
account_one_starting_balance = web3.eth.getBalance(account_one).toNumber();
console.log('here is the balance')
console.log(account_one_starting_balance);



    console.log("TEST2");
    priv.distributeDividends(total_dividend,{from:account_zero}).then(function(tx_id){
     account_one_ending_balance = web3.eth.getBalance(account_one).toNumber();


      console.log("TEST3");
      return watcher.get();
    }).then(function(events){
      console.log("TEST4");
      console.log(events.length);
      console.log(events[0].args.totDiv.toNumber());
      assert.notEqual(account_one_starting_balance,account_one_ending_balance,
                      "The account 1 balances are equal");

    }).catch(function(e){
      console.log("we have an error");
      console.log(e);}).then(done).catch(done);

  });
});




*/













/*contract('MetaCoin', function(accounts) {
  it("should put 10000 MetaCoin in the first account", function(done) {
    var meta = MetaCoin.deployed();

    meta.getBalance.call(accounts[0]).then(function(balance) {
      assert.equal(balance.valueOf(), 10000, "10000 wasn't in the first account");
    }).then(done).catch(done);
  });
  it("should call a function that depends on a linked library  ", function(done){
    var meta = MetaCoin.deployed();
    var metaCoinBalance;
    var metaCoinEthBalance;

    meta.getBalance.call(accounts[0]).then(function(outCoinBalance){
      metaCoinBalance = outCoinBalance.toNumber();
      return meta.getBalanceInEth.call(accounts[0]);
    }).then(function(outCoinBalanceEth){
      metaCoinEthBalance = outCoinBalanceEth.toNumber();

    }).then(function(){
      assert.equal(metaCoinEthBalance,2*metaCoinBalance,"Library function returned unexpeced function, linkage may be broken");

    }).then(done).catch(done);
  });
  it("should send coin correctly", function(done) {
    var meta = MetaCoin.deployed();

    // Get initial balances of first and second account.
    var account_one = accounts[0];
    var account_two = accounts[1];

    var account_one_starting_balance;
    var account_two_starting_balance;
    var account_one_ending_balance;
    var account_two_ending_balance;

    var amount = 10;

    meta.getBalance.call(account_one).then(function(balance) {
      account_one_starting_balance = balance.toNumber();
      return meta.getBalance.call(account_two);
    }).then(function(balance) {
      account_two_starting_balance = balance.toNumber();
      return meta.sendCoin(account_two, amount, {from: account_one});
    }).then(function() {
      return meta.getBalance.call(account_one);
    }).then(function(balance) {
      account_one_ending_balance = balance.toNumber();
      return meta.getBalance.call(account_two);
    }).then(function(balance) {
      account_two_ending_balance = balance.toNumber();

      assert.equal(account_one_ending_balance, account_one_starting_balance - amount, "Amount wasn't correctly taken from the sender");
      assert.equal(account_two_ending_balance, account_two_starting_balance + amount, "Amount wasn't correctly sent to the receiver");
    }).then(done).catch(done);
  });
});
*/
