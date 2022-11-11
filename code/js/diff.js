// 新列表 1,3,2
const newList = [{
  key: '1',
  val: '1'
},
{
  key: '3',
  val: '3'
},
{
  key: '2',
  val: '2'
}
];
// 旧列表 1,3
const oldList = [{
  key: '1',
  val: '1'
},
{
  key: '3',
  val: '3'
}];

// 真实数据：1,3
const list = [{
  key: '1',
  val: '1'
},
{
  key: '3',
  val: '3'
}];

let oldListKeyIdxMap;

// 更新列表
function updateList () {
  let newS = 0;
  let newE = newList.length - 1;
  let oldS = 0;
  let oldE = oldList.length - 1;

  while (newS <= newE && oldS <= oldE) {
    if (newList[newS] === oldList[oldS]) {
      newS++;
      oldS++;
    } else if (newList[newE] === oldList[oldE]) {
      newE--;
      oldE--;
    } else if (newList[newE] === oldList[oldS]) {
      // 将oldS指向的节点移动到oldE节点的后面
      moveElement(oldList[oldS].key, oldList[oldE].key, 'after');
      newE--;
      oldS++;
    } else if (newList[newS] === oldList[oldE]) {
      // 将oldE指向的节点移动到oldS对应节点的前面
      moveElement(oldList[oldE].key, oldList[oldS].key, 'before');
      oldE--;
      newS++;
    } else {
      const newStartIdx = oldListKeyIdxMap[newList[newS].key];
      if (!newStartIdx) {
        appendItem();
      } else {
        const oldNode = oldList[newStartIdx];
        oldList[newStartIdx] = undefined;
        appendItem();
      }
      newS++;
    }
  }

  if (oldS > oldE) {
    addNodes(newS, newE);
  } else if (newS > newE) {
    removeNodes(oldS, oldE);
  }
}

/**
 * 下一个元素的key
 * @param {} key
 * @param {*} nextKey
 */
function moveElement (key, posEleKey, pos = 'before') {
  const moveIdx = list.findIndex(item => item.key === key);
  const item = list.splice(moveIdx, 1);
  const targetPos = list.findIndex(item => item.key === posEleKey);
  if (pos === 'before') {
    list.splice(targetPos - 1, 0, item);
  } else {
    list.splice(targetPos, 0, item);
  }
}

function createKeyIdxMap () {
  const len = oldList.length;
  for (let i = 0; i < len; i++) {
    if (oldList[i].key) {
      oldListKeyIdxMap[oldList[i].key] = i;
    }
  }
}

function appendItem () {

}

function addNodes () {}
function removeNodes () {}
