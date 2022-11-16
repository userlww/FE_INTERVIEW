import _ from 'lodash';
import './style.css';
import printMe from './print';
import icon from './images/berlin.jpg';
function component () {
  const element = document.createElement('div');
  // lodash（目前通过一个 script 引入）对于执行这一行是必需的
  // lodash 在当前 script 中使用 import 引入
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  // element.classList.add('hello');
  const btn = document.createElement('button');
  btn.innerHTML = 'Click me and check the console';
  btn.onclick = printMe;
  element.append(btn);
  return element;
}
document.body.appendChild(component());
