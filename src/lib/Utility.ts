/**
 * Turns "myPascalCase" to "My Pascal Case"
 * @param input The string in pascal case
 */
export function pascalToWords(input: string): string {
  return (
    input
      // Split when an upper case letter follows a lower case letter
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      // Set first letter of input to upper case
      .replace(/^./, (c) => c.toUpperCase())
  );
}

export function pascalToUnderscoreCase(input: string): string {
  return input
    .replace(/\.?([A-Z])/g, (x, y) => {
      return "_" + y.toLowerCase();
    })
    .replace(/^_/, "");
}
