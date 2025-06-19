// Import the Bank instance to manage account operations
import Bank from "./scripts/modules/bank.js";

// Import interest calculation function
import { calculateInterest } from "./utils/calculateInterest.js";

// Import custom logging utility
import { log } from "./utils/logger.js";

// Create two demo accounts: Alice (savings) and Bob (checking)
const alice = Bank.createAccount("Alice", "savings");
const bob = Bank.createAccount("Bob", "checking");

// Deposit $1000 into Alice's account
alice.deposit(1000);

// Register an event listener to log transfer events using the event bus
Bank.bus.on("transfer", ({ fromId, toId, amount }) =>
  log(`Transferred $${amount} from ${fromId} → ${toId}`, "info")
);

// Perform the transfer and interest calculation asynchronously
(async () => {
  try {
    // Attempt to transfer $200 from Alice to Bob
    const msg = await Bank.validateAndTransfer(alice.id, bob.id, 200);
    log(msg, "info"); // Log the transfer success message

    // Simulate interest calculation on Alice's remaining balance at a 2% rate
    calculateInterest(alice.balance, 0.02, (interest) => {
      log(`Interest credited to Alice: $${interest}`); // Log the interest earned
    });
  } catch (err) {
    // Catch and log any errors (e.g., invalid accounts, insufficient funds)
    log(`❌ ${err}`, "error");
  }
})();
