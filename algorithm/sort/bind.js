// 快排（递归）
function quickSort(arr) {
  // 终止条件
  if (arr.length <= 1) {
    return arr;
  }
  var middleIndex = Math.floor(arr.length / 2);
  var middleValue = arr.splice(middleIndex, 1)[0];
  // 这里导致空间复杂度很高
  var left = [];
  var right = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < middleValue) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  // 构造新数组时，重新加入中间值
  return quickSort(left).concat([middleValue], quickSort(right));
}

// 快排，递归、原地排序
async function qucikSort2(arr, left, right) {
  if (left < right) {
    let pivot = partition2(arr, left, right);
    // 这里去画柱状图
    await new Promise(resolve => {
      setTimeout(resolve, 2000);
    });
    drawBar(arr);
    qucikSort2(arr, left, pivot - 1);
    qucikSort2(arr, pivot + 1, right);
  }
  return arr;
}
// 传入一个数组，以一个基准进行大小区分，然后中间值的索引
function partition2(arr, left, right) {
  let pivot = arr[left];
  while (left < right) {
    while (left < right && arr[right] > pivot) {
      right--;
    }
    arr[left] = arr[right];
    while (left < right && arr[left] <= pivot) {
      left++;
    }
    arr[right] = arr[left];
  }
  arr[left] = pivot;
  return left;
}

// 快排(循环)，递归的瓶颈在于栈大小是有限的，比如chrome时10000多,如果一个数组的个数大于一万多个，则会出现超过最大调用栈大小的错误
// 用一个栈数据结构来模拟递归
function qucikSort3(arr) {
  let stack = [[0, arr.length - 1]];
  while (stack.length > 0) {
    let now = stack.pop();
    let [left, right] = now;
    if (left >= right) {
      continue;
    }
    let pivot = arr[left];
    while (left < right) {
      while (left < right && arr[right] > pivot) {
        right--;
      }
      arr[left] = arr[right];
      while (left < right && arr[left] <= pivot) {
        left++;
      }
      arr[right] = arr[left];
    }
    arr[left] = pivot;

    stack.push([now[0], left - 1]);
    stack.push([left + 1, now[1]]);
  }
}

// 数组每改变一次值，就动画一次
let divs = document.getElementsByClassName('common');
function drawBar(arr) {
  // 改变每个div高度、内容、top值
  for (let i = 0; i < arr.length; i++) {
    const value = arr[i];
    let divElement = divs.item(i);
    let divHeight = Math.ceil(height * (value / max));
    divElement.innerHTML = value;
    divElement.style.height = `${divHeight}px`;
    divElement.style.top = `${height - divHeight}px`;
  }
}

let arr = [35, 85, 24, 63, 70, 17, 31, 96, 50, 30, 15];
// 初始化画图
let wrapper;
let max;
let height;
let width;
function init(arr) {
  wrapper = document.getElementsByClassName('wrapper')[0];
  height = wrapper.clientHeight; //包括内容和padding，但是不包含水平滚动条的高度
  width = Math.floor(wrapper.clientWidth / arr.length);
  max = Math.max(...arr);
  for (let index = 0; index < arr.length; index++) {
    let divElement = document.createElement('div');
    let heightDiv = Math.floor(height * (arr[index] / max));
    divElement.style.height = `${heightDiv}px`;
    divElement.style.width = `${width}px`;
    divElement.innerHTML = arr[index];
    divElement.style.top = `${height - heightDiv}px`;
    divElement.classList.add('common');
    wrapper.appendChild(divElement);
  }
}
init(arr);

let result = qucikSort2(arr, 0, arr.length - 1);
