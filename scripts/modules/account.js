// ES6+ Class for Bank Accounts
export class Account {
  // Private fields to store account balance and transaction history
  #balance = 0;
  #transactions = [];

  // Constructor initializes a unique account ID, account holder name, and account type
  constructor(holder, type = "savings") {
    this.id = crypto.randomUUID(); // Generate a unique ID using crypto API
    this.holder = holder; // Name of the account holder
    this.type = type; // Account type (default is "savings")
  }

  // Method to deposit a valid amount into the account
  deposit(amount) {
    if (amount <= 0) throw new Error("Deposit must be positive.");
    this.#balance += amount; // Add amount to current balance
    this.#transactions.push({
      type: "deposit",
      amount,
      timestamp: new Date(),
    }); // Log the transaction
    console.log(`[${this.id}] Deposit: $${amount}`); // Output for tracking
  }

  // Method to withdraw a valid amount if sufficient funds are available
  withdraw(amount) {
    if (amount <= 0 || amount > this.#balance)
      throw new Error("Invalid withdrawal.");
    this.#balance -= amount; // Deduct amount from current balance
    this.#transactions.push({
      type: "withdraw",
      amount,
      timestamp: new Date(),
    }); // Log the transaction
    console.log(`[${this.id}] Withdraw: $${amount}`); // Output for tracking
  }

  // Getter to access current account balance
  get balance() {
    return this.#balance;
  }

  // Returns a shallow copy of the transaction history to prevent direct modification
  getStatement() {
    return [...this.#transactions];
  }
}
