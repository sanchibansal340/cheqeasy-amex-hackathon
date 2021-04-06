export default function pinValidator(pin) {
  if (!pin) return "PIN can't be empty.";
  if (pin.length < 6) return "PIN must be of 6-digits.";
  return "";
}
