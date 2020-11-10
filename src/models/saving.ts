export interface Saving {
  id: string;
  name: string;
  icon?: string;
  totalAmount?: string;
  reachGoal?: string;
}

const goToCollegeIcon = require("@/assets/icons/ic_go_to_college.svg");
const throwAWeddingPartyIcon = require("@/assets/icons/ic_throw_a_wedding_party.svg");
const haveABabyIcon = require("@/assets/icons/ic_have_a_baby.svg");
const takeAVacationIcon = require("@/assets/icons/ic_take_a_vacation.svg");
const buyACarIcon = require("@/assets/icons/ic_buy_a_car.svg");
const buyAHouseIcon = require("@/assets/icons/ic_buy_a_house.svg");
const buildAnEmergencyFundIcon = require("@/assets/icons/ic_build_an_emergency_fund.svg");

export const Savings: Saving[] = [
  {
    id: "01",
    name: "Go to College",
    icon: goToCollegeIcon,
  },
  {
    id: "02",
    name: "Take a Vacation",
    icon: takeAVacationIcon,
  },
  {
    id: "03",
    name: "Buy a Car",
    icon: buyACarIcon,
  },
  {
    id: "04",
    name: "Throw a Wedding Party",
    icon: throwAWeddingPartyIcon,
  },
  {
    id: "05",
    name: "Build an Emergency fund",
    icon: buildAnEmergencyFundIcon,
  },
  {
    id: "06",
    name: "Have a Baby",
    icon: haveABabyIcon,
  },
  {
    id: "07",
    name: "Buy a House",
    icon: buyAHouseIcon,
  },
];
