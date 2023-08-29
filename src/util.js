// this is a utility function that will take in a price in cents
// and return a string with a dollar sign and the price in dollars
export const priceDisplay = priceInCents => {
  return `$${priceInCents / 100}`;
};
