// Function to simulate calculate interest on a given balance asynchronously
export function calculateInterest(balance, rate, callback) {
  setTimeout(() => {
    // Calculate interest based on balance and rate, fixed to 2 decimal places
    const interest = (balance * rate).toFixed(2);

    // Pass the calculated interest to the provided callback function
    callback(interest);
  }, 1000); // Simulated delay of 1 second to mimic asynchronous operation (e.g. network or database delay)
}
