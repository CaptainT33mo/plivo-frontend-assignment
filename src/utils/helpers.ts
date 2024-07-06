import { SelectOption } from "../../types";

export function getInitialsFromName(name: string): string {
  // Regular expression to match the first letter of each word, with the Unicode flag
  const rgx = /(\p{L}{1})\p{L}+/gu;

  // Use Array.from to convert the iterator returned by matchAll to an array
  const initials = Array.from(name.matchAll(rgx));

  // Extract the first and last initials, or use an empty string if there are no matches
  const firstInitial = initials.shift()?.[1] || "";
  const lastInitial = initials.pop()?.[1] || "";

  // Combine the initials and convert to uppercase
  const combinedInitials = (firstInitial + lastInitial).toUpperCase();

  return combinedInitials;
}

export function capitalizeWords(str: string): string {
  return str
    .replace(/_/g, " ")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function enumToSelectOptions<T extends Record<string, string>>(
  enumObj: T
): SelectOption[] {
  return Object.values(enumObj).map((value) => ({
    value: value,
    label: capitalizeWords(value.toLowerCase()),
  }));
}
