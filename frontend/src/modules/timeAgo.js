// function to get the formatted duration from a posted date to now...

const formatter = new Intl.RelativeTimeFormat(undefined, {
    numeric: "auto",
}); // first argument as UNDEFINED to use the default locale the user's browser is set to

const DIVISION = [
    { amount: 60, name: "seconds" },
    { amount: 60, name: "minutes" },
    { amount: 24, name: "hours" },
    { amount: 7, name: "days" },
    { amount: 4.34524, name: "weeks" },
    { amount: 12, name: "months" },
    { amount: Number.POSITIVE_INFINITY, name: "years" },
]

export default function formatTimeAgo(date) {
    let duration = (date - new Date()) / 1000;  // changing miliseconds to seconds...

    for (let i = 0; i <= DIVISION.length; i++) {
      const division = DIVISION[i];
      if (Math.abs(duration) < division.amount) {
        return formatter.format(Math.round(duration), division.name);   // returning the largest division possible in our formatted string...
      }
      duration /= division.amount;
    }
}