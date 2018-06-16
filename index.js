class zhDate {
  constructor(opt = { standar: 24 }) {
    this.date = new Date();
    this.standard = opt.standard;
  }
  // 获取自 UTC 1970 年 1 月 1 日零时开始经过的毫秒数
  getTime() {
    return this.date.getTime();
  }
  // 获取格式化的时间
  getFormatTime() {
    if (typeof Date.prototype.toLocaleString === 'function') {
      if (this.standard === 12) {
        return this.date.toLocaleDateString('zh-CN') + ' ' + this.date.toLocaleTimeString('zh-CN', { hour12: true });
      } else {
        return this.date.toLocaleDateString('zh-CN') + ' ' + this.date.toLocaleTimeString('zh-CN', { hour12: false });
      }
    } else {
      return this._compatibleFormat(this.date);
    }
  }
  // 获取中文版时间
  getChineseTime() {
    return this.getYear() + this.getMonth() + this.getDate() + ' ' + this.getDay() + ' ' + this.getHour() + this.getMinute() + this.getSecond();
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
  getHour() {
    if (this.standard === 12) {
      return this.date.getHours() < 12 ? '上午' + this.date.getHours() + '时' : '下午' + this.date.getHours()%12 + '时';
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
  _compatibleFormat(date) {
    let year = date.getFullYear();
    let month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    let hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    if (this.standard === 12) {
      hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours() < 12 ? date.getHours() : date.getHours()%12;
    }
    let minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    let second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    let dateStr = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
    if (this.standard === 12) {
      dateStr += ' ' + this._getAmAndPm();
    }
    return dateStr;
  }
  _getAmAndPm() {
    return this.date.getHours() < 12 ? 'AM' : 'PM';
  }
}

console.log(new zhDate().getFormatTime());
console.log(new zhDate().getChineseTime());

module.exports = zhDate;