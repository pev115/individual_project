contract TestingSol{
uint public testInt;
uint[] public arrayInt;


function TestingSol(uint integer){
  testInt = integer;
}

function divide(uint divisor) returns (uint result){
uint result = testInt/divisor;
return result;
}

function testDend(address receiver, uint divisor, uint amount) returns (uint lefovers){
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
