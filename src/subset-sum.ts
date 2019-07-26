// Given a set of non-negative integers, and a value sum,
// determine if there is a subset of the given set with sum equal to given sum.

// Input:  set[] = {3, 34, 4, 12, 5, 2}, sum = 9
// Output:  True  //There is a subset (4, 5) with sum 9.

// Note: There is a better solution

function remove(set: number[], idx: number) {
  const r = set.slice();
  r.splice(idx, 1);
  return r;
};

function move(remaining: number[], set: number[], sum: number): boolean {
  const currSum = set.reduce((a: number, b: number) => a + b);
  let result = false;

  if (currSum === sum) {
    return true;
  } else if (currSum < sum) {
    for (let i = 0; i < remaining.length; i += 1) {
      const c = set.slice();
      c.push(remaining[i]);
      result = result || move(remove(remaining, i), c, sum);
    }
  }

  return result;
}

export function subsetSum(set: number[], sum: number): boolean {
  let result = false;

  for (let i = 0; i < set.length; i += 1) {
    result = result || move(remove(set, i), [set[i]], sum);
  }

  return result;
}

// Demo:
const r = subsetSum([3, 34, 4, 12, 5, 2], 9);
console.log(r); // There are more than one subsets
