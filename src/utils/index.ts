
// 判断终端函数
export const isMobile = () => {
  if (window.navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)) {
    return true;  // 移动端
  }
  return false;  // PC端
}

export const truncation = (num: string | number, decimal = 4) => {
  const a = String(num);
  const i = a.indexOf('.');
  if (i > -1) {
    if (decimal === 0) {
      return a.split('.')[0]
    }
    return a.substring(0, i + decimal + 1);
  }
  return a;
}

export const tip = (txt: string) => {
  let div = document.createElement("div")
  let tip = document.createElement("span")
  div.classList.add('alertDiv');
  tip.classList.add('alertTXT');
  tip.innerText = txt;
  div.appendChild(tip);
  document.body.appendChild(div);
  setTimeout(() => {
    document.body.removeChild(div);
  }, 1500);
}