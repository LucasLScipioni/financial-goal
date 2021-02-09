export function getVariableString(value: string, args: string[]): string {
  let text = value;
  let i = 0;

  if (args) {
    while (text.includes("${v}") && i < args.length) {
      const replacementTextIndex = text.indexOf("${v}");
      const textFirstHalf = text.substring(0, replacementTextIndex);
      const textLastHalf = text.substring(
        replacementTextIndex + 4,
        text.length
      );

      text = `${textFirstHalf}${args[i]}${textLastHalf}`;
      i++;
    }
  }

  return text;
}
