import { Account } from "../scripts/modules/account.js";

test("deposit adds funds", () => {
  const acc = new Account("Bhagya", "savings");
  acc.deposit(100);
  expect(acc.balance).toBe(100);
});

test("withdraw deducts from balance", () => {
  const acc = new Account("Test");
  acc.deposit(200);
  acc.withdraw(50);
  expect(acc.balance).toBe(150);
});

test("throws on overdraw", () => {
  const acc = new Account("Test");
  expect(() => acc.withdraw(100)).toThrow("Insufficient balance");
});
