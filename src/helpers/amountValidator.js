export default function amountValidator(amount, accBal) {
  if (!amount) return "Amount can't be empty.";
  if (amount > accBal) return "Not enough balance in account";
  return "";
}
