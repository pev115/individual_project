contract testingSol{
uint public testInt;
uint[] public arrayInt;


function testingSol(uint integer){
  testInt = integer;
}

function divide(uint divisor) returns (uint result){
 result = testInt/divisor;

}

function testDend(address receiver, uint divisor, uint amount) returns (uint leftovers){
  uint unit = amount/divisor;
  receiver.send(unit);
  leftovers = amount-unit;
  this.send(amount-unit);

}

function addInt(uint addition){
var len = arrayInt.length;
arrayInt[len]=addition;
}

function getLen() returns (uint){
  return arrayInt.length;
}

}
