class zhDate {
  constructor() {
    this.date = new Date();
  }
  // 获取自 UTC 1970 年 1 月 1 日零时开始经过的毫秒数
  getTime() {
    return this.date.getTime();
  }
  // 获取格式化的时间
  getFormatTime() {
    if (typeof Date.prototype.toLocaleString === 'function') {
      return this.date.toLocaleDateString() + ' ' + this.date.toLocaleTimeString();
    } else {
      return this.compatibleFormat(this.date);
    }
  }
  // 获取年
  getYear() {
    return this.date.getFullYear() + '年';
  }
  // 获取月
  getMonth() {
    return (this.date.getMonth()/1+1) + '月';
  }
  // 获取日
  getDate() {
    return this.date.getDate() + '日';
  }
  // 获取星期
  getDay() {
    let day = '';
    switch(this.date.getDay()) {
      case 0:
        day = '星期天';
        break;
      case 1:
        day = '星期一';
        break;
      case 2:
        day = '星期二';
        break;
      case 3:
        day = '星期三';
        break;
      case 4:
        day = '星期四';
        break;
      case 5:
        day = '星期五';
        break;
      case 6:
        day = '星期六';
        break;
      default:
        day = '未知';
        break;
    }
    return day;
  }
  // 获取时
  getHour(standard) {
    if (standard === 12) {
      return this.date.getHours() <= 12 ? '上午' + this.date.getHours() + '时' : '下午' + this.date.getHours()%12 + '时';
    } else {
      return this.date.getHours() + '时';
    }
  }
  // 获取分
  getMinute() {
    return this.date.getMinutes() + '分';
  }
  // 获取秒
  getSecond() {
    return this.date.getSeconds() + '秒';
  }
  // 获取毫秒
  getMilliSecond() {
    return Math.floor(this.date.getMilliseconds()/10) + '毫秒';
  }
  // 兼容 getFormatTime
  compatibleFormat(date) {
    let year = date.getFullYear();
    let month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    let hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    let minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    let second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    let dateStr = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
    return dateStr;
  }
}

let date = new zhDate();