export default function accNumValidator(accNum) {
  if (!accNum) return "Account Number can't be empty.";
  if (accNum.length < 12) return "Account Number must be of atleast 12-digits.";
  return "";
}
