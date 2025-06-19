// Importing the Account factory to create new account instances
import { AccountFactory } from ".scripts/modules/accountFactory.js";

// Importing a custom event emitter to broadcast events like account creation or transfers
import { EventBus } from ".scripts/modules/observer.js";

// Bank class manages multiple accounts and emits events for key actions
class Bank {
  constructor() {
    this.accounts = new Map(); // Stores all accounts using account IDs as keys
    this.bus = new EventBus(); // EventBus instance for broadcasting events
  }

  // Creates a new account, stores it, and emits an 'accountCreated' event
  createAccount(holder, type = "savings") {
    const acc = AccountFactory.create(holder, type); // Use factory to create account
    this.accounts.set(acc.id, acc); // Store account in map using its ID
    this.bus.emit("accountCreated", acc); // Notify listeners that account was created
    return acc; // Return the created account
  }

  // Retrieves an account by its unique ID
  getAccount(id) {
    return this.accounts.get(id);
  }

  // Validates and performs a transfer asynchronously with delay to simulate latency
  async validateAndTransfer(fromId, toId, amount) {
    const from = this.accounts.get(fromId); // Get sender account
    const to = this.accounts.get(toId); // Get receiver account
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!from || !to) return reject("Invalid account(s)"); // Ensure both accounts exist
        if (from.balance < amount) return reject("Insufficient funds"); // Check available balance
        from.withdraw(amount); // Execute withdrawal
        to.deposit(amount); // Execute deposit
        this.bus.emit("transfer", { fromId, toId, amount }); // Emit transfer event
        resolve("Transfer complete"); // Notify transfer success
      }, 700); // Artificial delay (700ms) for simulating processing time
    });
  }
}

// Export a singleton instance of Bank for application-wide use
export default new Bank();
