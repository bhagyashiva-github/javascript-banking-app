// Import the Account class from the external module
import { Account } from ".scripts/modules/account.js";

// Factory Pattern for creating Account instances
export const AccountFactory = {
  // Creates and returns a new Account instance
  create(holder, type) {
    return new Account(holder, type);
  },
};
