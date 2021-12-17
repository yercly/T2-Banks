/* Class Bank */
function Bank (_bank_code, _bank_name) {
  /* Properties of Bank */
  this.bank_code = _bank_code;
  this.bank_name = _bank_name;
  this.accountCount = 0;
  this.accounts = {};
  this.revenue = 0;

  /* Methods of Bank */
  this.addAccount = function (_account) {
    this.accounts[_account.account_number] = _account;
    this.accountCount++;
    _account.associateBank(this);
  }

  this.getHoldings = function () {
    var total = 0;
    for (var account_number in this.accounts) {
      total += this.accounts[account_number].balance;
    }
    return total + this.revenue;
  }

  this.printHoldings = function () {
    console.log(this.bank_name + ' is holding $' + this.getHoldings() + '.');
  }

  this.isSameBank = function (another_bank) {
    return this.bank_code == another_bank.bank_code;
  }

}

/* Class Account */
function Account (_account_number, _account_owner) {
  /* Properties of Account */
  this.account_number = _account_number;
  this.account_owner = _account_owner;
  this.bank = null;
  this.balance = 0;

  /* Methods of Account */
  this.associateBank = function (_bank) {
    this.bank = _bank;
  }

  this.deposit = function (_amount) {
    if (_amount < 0) return false;
    this.balance += _amount;
  }

  this.withdraw = function (_amount) {
    if (_amount < 0) return false;
    this.balance -= _amount;
  }

  this.pay = function (_account, _amount) {
    if (_amount < 0) return false;
    if (this.bank != null && this.bank.isSameBank(_account.bank)) {
      // same bank, no fee
      // transfer
      this.balance -= _amount;
      _account.balance += _amount;
    } else {
      // different bank, $10 charge for each bank
      this.bank.revenue += 10;
      _account.bank.revenue += 10;

      // transfer
      this.balance -= (_amount + 10);
      _account.balance += (_amount - 10);
    }
  }

}

/**
 * Create a new Bank object called hsbc, with the name HSBC Limited.
 * And then create some Account objects, namely basic and ayer.
 * Each account contains account number and owner name information.
 * Add those accounts to the bank.
*/
var hsbc = new Bank('004', 'HSBC Limited');
var basic = new Account('004-123-123123-000', 'Basic Law');
var ayer = new Account('004-987-456456-022', 'Ayer Cheung');
hsbc.addAccount(basic);
hsbc.addAccount(ayer);

/* Similar actions to create sc and hase */
var sc = new Bank('003', 'Standard Chartered');
var carina = new Account('003-987-12345678', 'Carina Wu');
var david = new Account('003-357-99887766', 'David Wong');
sc.addAccount(carina);
sc.addAccount(david);

var hase = new Bank('024', 'Hang Seng Bank Limited');
var jimmy = new Account('024-293-005005007', 'Jimmy Chan');
hase.addAccount(jimmy);

/* Start playing with banks and accounts */

/* Task 1: deposit */
basic.deposit(1000);
ayer.deposit(1000);
carina.deposit(1000);
david.deposit(1000);
jimmy.deposit(1000);

console.log('Task 1 result:');
console.log(basic.balance);

/* Task 2: withdraw */
basic.withdraw(500);

console.log('Task 2 result:');
console.log(basic.balance);

/* Task 3: Calculate total holdings in bank */

console.log('Task 3 result:');
console.log(hsbc.getHoldings());
console.log(sc.getHoldings());
console.log(hase.getHoldings());

/* Task 4: Print total holdings in bank in a proper format in console */

console.log('Task 4 result:');
hsbc.printHoldings();

/* Task 5: Pay money between account */

basic.pay(ayer, 100);
console.log('Task 5 result:');
console.log('Basic: $' + basic.balance);
console.log('Ayer: $' + ayer.balance);
console.log('Carina: $' + carina.balance);
hsbc.printHoldings();
sc.printHoldings();

/* Task 6: Pay money between accounts in different banks ($10 fee will be charged for each bank) */

basic.pay(carina, 100);
console.log('Task 6 result:');
console.log('Basic: $' + basic.balance);
console.log('Ayer: $' + ayer.balance);
console.log('Carina: $' + carina.balance);
hsbc.printHoldings();
sc.printHoldings();
