/*******************************************************************
While you are working on the following problems, it DEFINITELY HELPS to
visualize these things in action, so use the below arrays as example inputs.

const oddNums = [11, 12, 13, 14, 15, 16, 17, 18, 19]
const evenNums = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
const empty = [];
*******************************************************************/


/*******************************************************************
BINARY SEARCH VERSION 1:

Write a Recursive Binary Search that returns a Boolean value indicating if
targetNum is within the nums array.
*******************************************************************/

const recurBSearch = (nums, targetNum) => {
  // Base Case: if nums has no length, return false because we've run out of
  // items to search and haven't found targetNum
  if (nums.length === 0) {
    return false;
  }
  // determine the slice point (ie the 'middle' of the array).
  const slicePoint =  Math.floor(nums.length / 2)
  const middleNum = nums[slicePoint];

  let leftHalf = nums.slice(0, slicePoint);
  let rightHalf = nums.slice(slicePoint + 1);
  // console.log("left", leftHalf);
  // console.log("right", rightHalf);

  // create "left half" and "right half" arrays, not including the slice point.

  // if targetNum is less than the value in the array at slice point,
  // return this search on the left half
   if (targetNum < middleNum) {              //21 < 16 false
    return recurBSearch(leftHalf, targetNum);
  }

  // if targetNum is greater than the value in the array at slice point,
  //return this search on the right half
  if (targetNum > middleNum) {     //21 >= 15 true
    return recurBSearch(rightHalf, targetNum);
  }
  // if it's not greater than or less than (i.e. 'else'),
  // we know it's equal so return true

  return true;



}

// const oddNums = [11, 12, 13, 14, 15, 16, 17, 18, 19]
// const evenNums = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
// const empty = [];

// console.log(recurBSearch(evenNums, 1));
// console.log(recurBSearch(oddNums, 1));

/*******************************************************************
BINARY SEARCH VERSION 2:

Write an Iterative Binary Search that returns a Boolean value indicating if
targetNum is within the nums array.
*******************************************************************/

const iterBSearch = (nums, targetNum) => {
  // Save references to indices at the beginning, middle, and end of the array
  // into variables: lowerIdx, midIdx, and upperIdx
    let lowerIdx = nums[0];
    let midIdx = Math.floor(nums.length / 2);
    let upperIdx = nums[nums.length - 1];
  // while the lowerIdx is less than or equal to the upperIdx, there are still
  // values to be searched
  while (lowerIdx < upperIdx) {
    midIdx = (lowerIdx + upperIdx) / 2;
    if (targetNum > midIdx) {
      lowerIdx = midIdx;
    } else if (targetNum < midIdx) {
      upperIdx = midIdx;
    } else {
      return true;
    }
  }
  return false;
  // reassign the midIdx to the the middle of the new lower and upper indices
  // Hint: This is the sum of lower and upper, divided by 2

  // if targetNum is larger than the value in the middle, we know targetNum is
  // not between the current lower and current middle, so reassign the lowerIdx
  // to the middle (ie cut off the left half of the array)

  // if targetNum is less than the value in the middle, we know targetNum is not
  // between the current upper and current middle, so reassign the upperIdx
  // to the middle (ie cut off the right half of the array)

  // if it's not greater than or less than (ie 'else'), we have found our target
  // at the midIdx and can return true and stop iterating.

  // if we finish our while loop and haven't returned true, we've looked over
  // the entire array and didn't find targetNum, so return false
}


/*******************************************************************
BINARY SEARCH VERSION 3:

Write a Recursive Binary Search that returns the Index value of targetNum if it
is in the nums array, and -1 if it is not found.
*******************************************************************/

const recurBSearchIdx = (nums, targetNum) => {
  // this implementation is identical to version 1, except rather than
  // returning true/false, return the index where you found the item
  // (instead of true) or -1 (instead of false).

  // HINT: the index value you return should be the index in the ORIGINAL array
  // and not the index of the sliced array. You'll notice this problem arise
  // on the 'right half' recursion. in that, try saving the return value of the
  // recursive call into a variable, and adding it to the current stack-frame's
  // midIdx + 1.
  let count = 0;
  if (nums.length === 0) {
    return -1;
  }
  // determine the slice point (ie the 'middle' of the array).
  let slicePoint =  Math.floor(nums.length / 2)
  let middleNum = nums[slicePoint];

  let leftHalf = nums.slice(0, slicePoint);
  let rightHalf = nums.slice(slicePoint + 1);

  // create "left half" and "right half" arrays, not including the slice point.

  // if targetNum is less than the value in the array at slice point,
  // return this search on the left half
   if (targetNum < middleNum) {
    return recurBSearchIdx(leftHalf, targetNum, count + 1);
  }

  // if targetNum is greater than the value in the array at slice point,
  //return this search on the right half
  if (targetNum > middleNum) {

    const recur = recurBSearchIdx(rightHalf, targetNum, count + 1);
    return recur + slicePoint + 1;
  }

  return slicePoint;
}

const oddNums = [11, 12, 13, 14, 15, 16, 17, 18, 19]
const evenNums = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
const empty = [];

console.log(recurBSearchIdx(evenNums, 15));
console.log(recurBSearchIdx(oddNums, 1));

/*******************************************************************
BINARY SEARCH VERSION 4:

Write a Recursive Binary Search that returns the Index value of targetNum if it
is in the nums array, and -1 if it is not found.
*******************************************************************/

const recurBSearchIdxV2 = (nums, targetNum, low = null, hi = null) => {
  /*
  This implementation is recursive, but borrows the low/hi logic from Version 2
  to establish a different base case. Rather than shrinking the array until its
  length is 0, this implementation moves low and hi indices to determine
  what part of the original array is being searched. if they meet each other
  we know we have searched the entire array.(NOTE this function has FOUR params)

  Base Case:
  if low is equal to high and we haven't found targetNum, then return -1 to
  indicate that the value was not found.

  Determine the slice point (the sum of low and hi, divided by 2)

  If targetNum is less than nums[slicepoint], then
  return the binary search of nums where low is the beginning of the array, and
  hi is the middle of the array

  If targetNum is less than nums[slicepoint], then
  return the binary search of nums where low is the middle of the array, and hi
  is the end of the array

  If it's not greater and not less (i.e. 'else'), return the slice point because
  we have found our value!
  */
}


/*******************************************************************
BINARY SEARCH VERSION 5:

Write an Iterative Binary Search that returns the Index value of targetNum if
it is in the nums array, and -1 if it is not found.
*******************************************************************/

const iterBSearchIdx = (nums, targetNum) => {
  // this is identical to Version 2, but return the index or -1 rather than
  // true or false
}

module.exports = {
  recurBSearch,
  iterBSearch,
  recurBSearchIdx,
  recurBSearchIdxV2,
  iterBSearchIdx
};
