// Given two non-negative integers num1 and num2 represented as string, return the sum of num1 and num2.

// Note:
//     The length of both num1 and num2 is < 5100.
//     Both num1 and num2 contains only digits 0-9.
//     Both num1 and num2 does not contain any leading zero.
//     You must not use any built-in BigInteger library or convert the inputs to integer directly.

const ZeroCode = 48;

const charToNum = (char: string) => char.charCodeAt(0) - ZeroCode;

export function addStrings(n1: string, n2: string): string {
  const maxLen = Math.max(n1.length, n2.length);
  n1 = n1.padStart(maxLen, '0');
  n2 = n2.padStart(maxLen, '0');
  let result = '';
  let nextCache = 0;

  for (let i = n1.length - 1; i >= 0; i -= 1) {
    const sum = charToNum(n1[i]) + charToNum(n2[i]) + nextCache;
    nextCache = sum >= 10 ? 1 : 0;
    result = (sum % 10) + result;
  }

  return result;
}

// Demo:
const r = addStrings('123', '4009'); // 4132
console.log(r);
