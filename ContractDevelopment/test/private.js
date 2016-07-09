contract('Private', function(accounts){


  it("Checks the owner is set correctly",function(done){
    var priv = Private.deployed();
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



  it("checks Flags toggle correctly",function(done){
    var priv = Private.deployed();
    priv.building.call().then(function(flag){
      assert.equal(flag,false, "building not initialised false");
      return  priv.toggleBuilding.sendTransaction({from:accounts[0]}).then(function(){
                return priv.building.call();
              });
    }).then(function(changed){
        assert.equal(changed, true, "building did not toggle");
        return priv.recruiting.call();
    }).then(function(flag){
      assert.equal(flag,false, "recruiting not initalised to false");
      return priv.toggleRecruiting.sendTransaction({from:accounts[0]}).then(function(){
              return priv.recruiting.call();
            });
    }).then(function(changed){
      assert.equal(changed, true, " recruiting did not toggle");
      return priv.production.call();
    }).then(function(flag){
      assert.equal(flag,false, "production not initalised to false");
      return priv.toggleProduction.sendTransaction({from:accounts[0]}).then(function(){
            return priv.production.call();
          });
    }).then(function(changed){
      assert.equal(changed, true, " production did not toggle");
      return priv.investment.call();
    }).then(function(flag){
      assert.equal(flag,false, "investment not initalised to false");
      return priv.toggleSharesIssue.sendTransaction({from:accounts[0]}).then(function(){
          return priv.investment.call();
        });
    }).then(function(changed){
        assert.equal(changed, true, "investment did not toggle");
    }).then(done).catch(done);
  });





  it("Checks shares allocation is correct",function(done){
    Private.new({from:accounts[0]}).then(function(priv){
      var account_zero = accounts[0];
      var account_one = accounts[1];
      var account_two = accounts[2];

      var total= 0;

      priv.toggleSharesIssue.sendTransaction({from:account_zero})
      .then(function(tx){
        return priv.investment.call();
      }).then(function(result){
        assert.equal(result,true,"Cannot create shares");
      }).then(function(){
        var amount = parseInt(web3.toWei(10, 'Ether'));
        for(var i =1 ; i<3; i++){
          priv.createShares.sendTransaction({from:accounts[i],value:amount}).catch(function(e){
            console.log("Error in creating shares");
            console.log(e);
        });
          total += amount;
          amount+= parseInt(web3.toWei(10, 'Ether'));
        }
        return priv.totalSupply.call() ;
      }).then(function(supply){
        assert.equal(supply.toNumber(), total, "total does not match")
      }).then(function(){
        return priv.transfer.sendTransaction(accounts[0], parseInt(web3.toWei(5,'Ether')),{from:accounts[2]}).then(function(){
            return priv.getShares.call();
        });
      }).then(function(sh){
        var expected = parseInt(web3.toWei(5,'Ether'));
        assert.equal(sh.toNumber(),expected, "Did not transfer correctly");
      }).then(done).catch(done);
    }).catch(done);
  });





it("Checks payment is distributed correctly", function(done){
  Private.new({from:accounts[0]}).then(function(priv){
    var account_zero = accounts[0];
    var account_one = accounts[1];
    var account_two = accounts[2];

    var account_one_starting_balance;
    var account_one_ending_balance;


    priv.toggleSharesIssue.sendTransaction({from:account_zero}).then(function(tx){
      var amount = parseInt(web3.toWei(10, 'Ether'));
      for(var i =1 ; i<3; i++){
        priv.createShares.sendTransaction({from:accounts[i],value:amount}).catch(function(e){
          console.log("Error in creating shares");
          console.log(e);
      });

        amount+= parseInt(web3.toWei(10, 'Ether'));
      }
    }).then(function(){
      return priv.changeDividends.sendTransaction(50,{from:account_zero})
            .then(function(){
              return priv.percentDividends.call();
            });
    }).then(function(div){
      assert.equal(50,div.toNumber(),"dividends percent not set properly");
    }).then(function(){
      account_one_starting_balance= web3.eth.getBalance(account_one);
      console.log("account one starting balance");
      console.log(account_one_starting_balance.toNumber());
    }).then(function(){
      var pay = parseInt(web3.toWei(400,'ether'));
      priv.receivePayment.sendTransaction({from:accounts[3],value:pay});
    }).then(function(){
      account_one_ending_balance =web3.eth.getBalance(account_one);
      console.log("account one ending balance");
      console.log(account_one_ending_balance.toNumber());
    }).then(done).catch(done);
  }).catch(done);

});










});
