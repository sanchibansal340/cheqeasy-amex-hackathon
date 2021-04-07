export default function nameValidator(name, label) {
  if (!name) return `${label} can't be empty.`;
  return "";
}
