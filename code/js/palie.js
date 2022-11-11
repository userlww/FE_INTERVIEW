function quanpailie (nums) {
  const result = [];

  const path = [];

  const backTrack = function (used = []) {
    if (path.length === nums.length) {
      result.push(Array.from(path));
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      if (used[i]) {
        continue;
      }
      used[i] = true;
      path.push(nums[i]);
      backTrack(used);
      path.pop();
      used[i] = false;
    }
  };
  backTrack([]);
  return result;
}

console.log(quanpailie([1, 3, 3, 4]));
