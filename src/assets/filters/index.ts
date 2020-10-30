export function currency(value: string) {
  if (!+value) {
    return +value === 0 ? `$0` : "";
  }
  return `$${value}`;
}

export function momentFilter(value: moment.Moment, arg: string) {
  return value.format(arg);
}
