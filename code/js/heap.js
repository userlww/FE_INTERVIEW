const heapSort = function(nums) {
  let length = nums.length;
  maxHeapBuild(nums,length)
  for(let i = length -1; i >=0;i--) {
    swap(nums,0,length -1);
    length--;
    maxHeapBuild(nums,length);
  }
  return nums;
}

const maxHeapBuild = function(nums,length) {
  for(let i = Math.floor(length / 2) -1; i>= 0;i--) {
    maxHeapAdjust(nums,i,length);
  }
}

const maxHeapAdjust = function(nums,i,length) {
  const left = i * 2 + 1;
  const right = i * 2 + 2;
  let maxIdx = i;
  if(left < length && nums[left] > nums[maxIdx]) {
    maxIdx = left;
  } 
  if(right < length && nums[right] > nums[maxIdx]) {
    maxIdx = right;
  }
  if(maxIdx !== i) {
    swap(nums,i,maxIdx);
    maxHeapAdjust(nums,maxIdx,length);
  }
}

const swap = function (nums,i,j) {
  [nums[i],nums[j]] = [nums[j],nums[i]];
}


const list = [1,3,2,9,8,11]

console.log(heapSort(list))
