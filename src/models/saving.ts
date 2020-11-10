export interface Saving {
  id: string;
  name: string;
  icon?: string;
  totalAmount?: string;
  reachGoal?: string;
}

export const Savings: Saving[] = [
  {
    id: "01",
    name: "Go to College",
  },
  {
    id: "02",
    name: "Take a Vacation",
  },
  {
    id: "03",
    name: "Buy a Car",
  },
  {
    id: "04",
    name: "Throw a Wedding Party",
  },
  {
    id: "05",
    name: "Build an Emergency fund",
  },
  {
    id: "06",
    name: "Have a Baby",
  },
];
