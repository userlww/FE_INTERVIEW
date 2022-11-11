const sort = function (nums) {
  if (nums.length < 2) {
    return nums;
  }
  quickSort(nums, 0, nums.length);
  return nums;
};

const quickSort = function (nums, start, end) {
  if (start > end) {
    return;
  }
  const pivot = nums[end];
  let movedIdx = start;
  for (let i = start; i < end; i++) {
    if (nums[i] < pivot) {
      [nums[i], nums[movedIdx]] = [nums[movedIdx], nums[i]];
      movedIdx++;
    }
  }
  [nums[movedIdx], nums[end]] = [nums[end], nums[movedIdx]];
  quickSort(nums, start, movedIdx - 1);
  quickSort(nums, movedIdx + 1, end);
};
