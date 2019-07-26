// You are given two non-empty linked lists representing two non-negative integers.
// The digits are stored in reverse order and each of their nodes contain a single digit.
// Add the two numbers and return it as a linked list.

// You may assume the two numbers do not contain any leading zero, except the number 0 itself.

// Example:

// Input: (2 -> 4 -> 3) + (5 -> 6 -> 4)
// Output: 7 -> 0 -> 8
// Explanation: 342 + 465 = 807.

// ListNode from the task:
class ListNode {
  next: ListNode;

  constructor(public value: number) {}
}

function printList(l: ListNode) {
  let curr = l;
  let str = '';

  while (curr) {
    str += curr.value + (curr.next ? '->' : '');
    curr = curr.next;
  }

  console.log(str);
}

function lastNode(l: ListNode) {
  let curr = l;
  let stop = false;

  while (curr && !stop) {
    if (curr.next) {
      curr = curr.next;
    } else {
      stop = true;
    }
  }

  return curr;
}

function getSize(l: ListNode) {
  let size = 0;
  let curr = l;

  while (curr) {
    size += 1;
    curr = curr.next;
  }

  return size;
}

function padLeft(l: ListNode, size: number, value: number) {
  let last = lastNode(l);
  for (let i = 0; i < size; i += 1) {
    const node = new ListNode(value);
    last.next = node;
    last = node;
  }
}

export function addTwoNumbers(l1: ListNode, l2: ListNode) {
  const l1Size = getSize(l1);
  const l2Size = getSize(l2);

  const max = Math.max(l1Size, l2Size);
  padLeft(l1, max - l1Size, 0);
  padLeft(l1, max - l2Size, 0);

  let result;
  let resultLast;

  let currL1 = l1;
  let currL2 = l2;
  let nextCache = 0;

  while (currL1 && currL2) {
    const sum = currL1.value + currL2.value + nextCache;
    nextCache = sum >= 10 ? 1 : 0;

    const node = new ListNode(sum % 10);

    if (!result) {
      result = node;
    } else {
      resultLast.next = node;
    }
    resultLast = node;

    currL1 = currL1.next;
    currL2 = currL2.next;
  }

  return result;
}

// Demo:
const l1 = new ListNode(2);
l1.next = new ListNode(4);
l1.next.next = new ListNode(3);

const l2 = new ListNode(5);
l2.next = new ListNode(6);
l2.next.next = new ListNode(4);

const r1 = addTwoNumbers(l1, l2);
printList(r1); // 807 or 7->0->8

// Demo 2:
const l3 = new ListNode(5);
l3.next = new ListNode(1);

const l4 = new ListNode(5);
l4.next = new ListNode(3);
l4.next.next = new ListNode(1);

const r2 = addTwoNumbers(l3, l4);
printList(r2); // 150 or 0->5->1
