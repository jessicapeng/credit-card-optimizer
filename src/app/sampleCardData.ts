export type CardCategory = "Groceries" | "Dining" | "Flight" | "Electronics" | "Gas" | "Other" | "Travel" | "Online Shopping" | "Drugstores" | "Streaming" | "Entertainment";

export interface CreditCard {
  id: string;
  name: string;
  rewards: {
    [category in CardCategory]?: {
      multiplier: number;
      type: "Points" | "Cash Back" | "Travel Rewards";
    };
  };
}

export const sampleCards: CreditCard[] = [
  {
    id: "chase-sapphire-reserve",
    name: "Chase Sapphire Reserve",
    rewards: {
      Dining: { multiplier: 3, type: "Points" },
      Travel: { multiplier: 3, type: "Points" },
      Flight: { multiplier: 3, type: "Points" },
      Other: { multiplier: 1, type: "Points" },
    },
  },
  {
    id: "chase-sapphire-preferred",
    name: "Chase Sapphire Preferred",
    rewards: {
      Dining: { multiplier: 3, type: "Points" },
      Travel: { multiplier: 2, type: "Points" },
      Flight: { multiplier: 2, type: "Points" },
      Other: { multiplier: 1, type: "Points" },
    },
  },
  {
    id: "amex-gold",
    name: "Amex Gold",
    rewards: {
      Groceries: { multiplier: 4, type: "Points" },
      Dining: { multiplier: 4, type: "Points" },
      Flight: { multiplier: 3, type: "Points" },
      Other: { multiplier: 1, type: "Points" },
    },
  },
  {
    id: "amex-platinum",
    name: "Amex Platinum",
    rewards: {
      Flight: { multiplier: 5, type: "Points" },
      Travel: { multiplier: 5, type: "Points" },
      Dining: { multiplier: 1, type: "Points" },
      Other: { multiplier: 1, type: "Points" },
    },
  },
  {
    id: "citi-custom-cash",
    name: "Citi Custom Cash",
    rewards: {
      Groceries: { multiplier: 5, type: "Cash Back" },
      Gas: { multiplier: 5, type: "Cash Back" },
      Dining: { multiplier: 5, type: "Cash Back" },
      Other: { multiplier: 1, type: "Cash Back" },
    },
  },
  {
    id: "citi-double-cash",
    name: "Citi Double Cash",
    rewards: {
      Other: { multiplier: 2, type: "Cash Back" },
    },
  },
  {
    id: "capital-one-venture",
    name: "Capital One Venture",
    rewards: {
      Travel: { multiplier: 2, type: "Travel Rewards" },
      Flight: { multiplier: 2, type: "Travel Rewards" },
      Other: { multiplier: 2, type: "Travel Rewards" },
    },
  },
  {
    id: "capital-one-savor",
    name: "Capital One Savor",
    rewards: {
      Dining: { multiplier: 4, type: "Cash Back" },
      Entertainment: { multiplier: 4, type: "Cash Back" },
      Groceries: { multiplier: 2, type: "Cash Back" },
      Other: { multiplier: 1, type: "Cash Back" },
    },
  },
  {
    id: "discover-it",
    name: "Discover It",
    rewards: {
      Groceries: { multiplier: 5, type: "Cash Back" },
      Gas: { multiplier: 5, type: "Cash Back" },
      Other: { multiplier: 1, type: "Cash Back" },
    },
  },
  {
    id: "chase-freedom-flex",
    name: "Chase Freedom Flex",
    rewards: {
      Groceries: { multiplier: 5, type: "Points" },
      Gas: { multiplier: 5, type: "Points" },
      Other: { multiplier: 1, type: "Points" },
    },
  },
]; 