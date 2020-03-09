/**
 * 格式化日期，参数为日期格式,默认为yyyy-MM-dd
 * @param style  格式化前的日期
 * */
Date.prototype.format = function (style) {
    if (!style || !(style = style.toString().trim())) style = 'yyyy-MM-dd hh:mm:ss';
    var o = {
        'M+': this.getMonth() + 1, //month
        'd+': this.getDate(),      //day
        'h+': this.getHours(),     //hour
        'm+': this.getMinutes(),   //minute
        's+': this.getSeconds(),   //second
        'q+': Math.floor((this.getMonth() + 3) / 3), //quarter
        'S': this.getMilliseconds() //millisecond
    };
    if (/(y+)/.test(style))
        style = style.replace(RegExp.$1, this.getFullYear().toString().substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp('(' + k + ')').test(style))
            style = style.replace(RegExp.$1, RegExp.$1.length == 1
                ? o[k]
                : ('00' + o[k]).substr(o[k].toString().length));
    return style;
}

//用法：
//   console.log(new Date().format('yyyy-MM-dd hh:mm:ss'));  //2019-06-03 12:10:08
//   console.log(new Date('1992/09/06').format('yyyy-MM-dd'));  //1991-09-06

/**********************************************************************************/
//localStorage的存储、获取、删除
/**
 * 存储
 * @param key 键
 * @param value 值
 **/
function setLocalStorage(key, value) {
    value = typeof value != "object" ? value : JSON.stringify(value);
    window.localStorage.setItem(key, value);
};

/**
 * 获取
 * @params key 键
 **/
function getLocalStorage(key) {
    var obj = window.localStorage.getItem(key);
    return obj && (obj.indexOf('{') === 0 || obj.indexOf("[") === 0) ? eval("(" + obj + ")") : obj;
};

/**
 * 删除
 * @param key: 键
 * 不传参数则清除所有
 **/
function deleteLocalStorage(key) {
    key ? window.localStorage.removeItem(key) : window.localStorage.clear();
}

/**********************************************************************************/
//sessionStorage的存储、获取、删除

/**
* 存储
* @param key 键
* @param value 值
**/
function setSessionStorage(key, value) {
    value = typeof value !== "object" ? value : JSON.stringify(value);
    window.sessionStorage.setItem(key, value);
}

/**
 * 获取
 * @param key 键
 **/
function getSessionStorage(key) {
    var obj = window.sessionStorage.getItem(key);
    return obj && (obj.indexOf("{") === 0 || obj.indexOf("[") === 0) ? eval("(" + obj + ")") : obj;
}

/**
 * 删除
 * @param key: 键
 * 不传参数则清除所有
 **/
function deleteSessionStorage(key) {
    key ? window.sessionStorage.removeItem(key) : window.sessionStorage.clear();
};

/**********************************************************************************/
//cookie的存储、获取、删除
/**
* 存储
* @param key 键
* @param value 值
* @param days 时间，单位为天，为0或者为空时不设定过期时间，浏览器关闭时cookie自动消失
**/
function setCookie(key, value, days, otherParams) {
    var str = key + '=' + escape(value) + ';path=/';
    var nowTime = new Date().getTime();
    var addDate = new Date(nowTime + days * 24 * 60 * 60 * 1000)
    if (!isNaN(days) && days > 0) str += '; expires=' + addDate.toGMTString();
    if (otherParams && typeof otherParams === 'object')
        for (var i in otherParams) str += ';' + i + '=' + otherParams[i];
    document.cookie = str;
}

/**
 * 获取
 * @param key 键
 * */
function getCookie(key) {
    var arr = document.cookie.match(new RegExp('(^| )' + key + '=([^;]*)(;|$)'));
    if (!arr || !arr.length) return null;
    return unescape(arr[2]);
}

/**
* 删除
* @param key 键
* */
function deleteCookie(key) {
    document.cookie = key + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/';
}

/**********************************************************************************/
//手机号中间四位显示星号

/**
* @param value 手机号
* */
function handelMobile(value) {
    if (!value) return '';
    if (typeof value !== 'string') value = value.toString();
    return value.replace(/^(\d{3})\d*(\d{4})$/, '$1****$2');
}


/**********************************************************************************/
//对象和数组类型的判断
/**
 * 是否对象
 * @param value 值
 * */
function isObj(value) {
    return Object.prototype.toString.call(value).slice(8, -1) === 'Object'
}

/**
 * 是否数组
 * @param value值
 * */
function isArray(value) {
    return Object.prototype.toString.call(value).slice(8, -1) === 'Array'
}


/**********************************************************************************/
//获取指定月份的天数
/**
* 判断是否是闰年
* @param year 当前年份
* */
function isRunNian(year) {
    if ((!(year % 4) && year % 100) || !(year % 400)) return true;
    return false;
}

/**
 * 获取指定月份的天数
 * @param year  当前年份
 * @param month 当前月份
 * */
function getDaysForMonth(year, month) {
    var datesDate = [31, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (month === 2 && isRunnian(year)) return 29;
    return datesDate[month];
}


/**********************************************************************************/
//数组去重
/**
* 数组去重
* @param arr 值
* */
function deWeight(arr) {
    if (Array.hasOwnProperty('from')) return Array.from(new Set(arr));
    var newArr = [];
    var flag = true
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] !== arr[i]) {
            if (flag && newArr.indexOf(arr[i]) === -1) {
                newArr.push(arr[i])
                flag = false
            }
        } else {
            if (newArr.indexOf(arr[i]) === -1) newArr.push(arr[i])
        }
    }
    return newArr;
}


/**********************************************************************************/
/**
* 将阿拉伯数字翻译成中文的大写数字
* @param num 数字
* */
function numberToChinese(num) {
    var AA = new Array("零", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十");
    var BB = new Array("", "十", "百", "仟", "萬", "億", "点", "");
    var a = ("" + num).replace(/(^0*)/g, "").split("."),
        k = 0,
        re = "";
    for (var i = a[0].length - 1; i >= 0; i--) {
        switch (k) {
            case 0:
                re = BB[7] + re;
                break;
            case 4:
                if (!new RegExp("0{4}//d{" + (a[0].length - i - 1) + "}$")
                    .test(a[0]))
                    re = BB[4] + re;
                break;
            case 8:
                re = BB[5] + re;
                BB[7] = BB[5];
                k = 0;
                break;
        }
        if (k % 4 == 2 && a[0].charAt(i + 2) != 0 && a[0].charAt(i + 1) == 0)
            re = AA[0] + re;
        if (a[0].charAt(i) != 0)
            re = AA[a[0].charAt(i)] + BB[k % 4] + re;
        k++;
    }

    if (a.length > 1) // 加上小数部分(如果有小数部分)
    {
        re += BB[6];
        for (var i = 0; i < a[1].length; i++)
            re += AA[a[1].charAt(i)];
    }
    if (re == '一十')
        re = "十";
    if (re.match(/^一/) && re.length == 3)
        re = re.replace("一", "");
    return re;
}


/**********************************************************************************/
/**
 * 将数字转换为大写金额
 * @param Num 数值
 * */
function changeToChinese(Num) {
    //判断如果传递进来的不是字符的话转换为字符
    if (typeof Num === "number") Num = new String(Num);
    Num = Num.replace(/,/g, "") //替换tomoney()中的“,”
    Num = Num.replace(/ /g, "") //替换tomoney()中的空格
    Num = Num.replace(/￥/g, "") //替换掉可能出现的￥字符
    if (isNaN(Num)) return "";
    //字符处理完毕后开始转换，采用前后两部分分别转换
    var part = String(Num).split(".");
    var newchar = "";
    //小数点前进行转化
    for (var i = part[0].length - 1; i >= 0; i--) {
        if (part[0].length > 10) return "";
        var tmpnewchar = ""
        var perchar = part[0].charAt(i);
        switch (perchar) {
            case "0":
                tmpnewchar = "零" + tmpnewchar;
                break;
            case "1":
                tmpnewchar = "壹" + tmpnewchar;
                break;
            case "2":
                tmpnewchar = "贰" + tmpnewchar;
                break;
            case "3":
                tmpnewchar = "叁" + tmpnewchar;
                break;
            case "4":
                tmpnewchar = "肆" + tmpnewchar;
                break;
            case "5":
                tmpnewchar = "伍" + tmpnewchar;
                break;
            case "6":
                tmpnewchar = "陆" + tmpnewchar;
                break;
            case "7":
                tmpnewchar = "柒" + tmpnewchar;
                break;
            case "8":
                tmpnewchar = "捌" + tmpnewchar;
                break;
            case "9":
                tmpnewchar = "玖" + tmpnewchar;
                break;
        }
        switch (part[0].length - i - 1) {
            case 0:
                tmpnewchar = tmpnewchar + "元";
                break;
            case 1:
                if (perchar != 0) tmpnewchar = tmpnewchar + "拾";
                break;
            case 2:
                if (perchar != 0) tmpnewchar = tmpnewchar + "佰";
                break;
            case 3:
                if (perchar != 0) tmpnewchar = tmpnewchar + "仟";
                break;
            case 4:
                tmpnewchar = tmpnewchar + "万";
                break;
            case 5:
                if (perchar != 0) tmpnewchar = tmpnewchar + "拾";
                break;
            case 6:
                if (perchar != 0) tmpnewchar = tmpnewchar + "佰";
                break;
            case 7:
                if (perchar != 0) tmpnewchar = tmpnewchar + "仟";
                break;
            case 8:
                tmpnewchar = tmpnewchar + "亿";
                break;
            case 9:
                tmpnewchar = tmpnewchar + "拾";
                break;
        }
        var newchar = tmpnewchar + newchar;
    }
    //小数点之后进行转化
    if (Num.indexOf(".") != -1) {
        if (part[1].length > 2) {
            // alert("小数点之后只能保留两位,系统将自动截断");
            part[1] = part[1].substr(0, 2)
        }
        for (i = 0; i < part[1].length; i++) {
            tmpnewchar = ""
            perchar = part[1].charAt(i)
            switch (perchar) {
                case "0":
                    tmpnewchar = "零" + tmpnewchar;
                    break;
                case "1":
                    tmpnewchar = "壹" + tmpnewchar;
                    break;
                case "2":
                    tmpnewchar = "贰" + tmpnewchar;
                    break;
                case "3":
                    tmpnewchar = "叁" + tmpnewchar;
                    break;
                case "4":
                    tmpnewchar = "肆" + tmpnewchar;
                    break;
                case "5":
                    tmpnewchar = "伍" + tmpnewchar;
                    break;
                case "6":
                    tmpnewchar = "陆" + tmpnewchar;
                    break;
                case "7":
                    tmpnewchar = "柒" + tmpnewchar;
                    break;
                case "8":
                    tmpnewchar = "捌" + tmpnewchar;
                    break;
                case "9":
                    tmpnewchar = "玖" + tmpnewchar;
                    break;
            }
            if (i == 0) tmpnewchar = tmpnewchar + "角";
            if (i == 1) tmpnewchar = tmpnewchar + "分";
            newchar = newchar + tmpnewchar;
        }
    }
    //替换所有无用汉字
    while (newchar.search("零零") != -1)
        newchar = newchar.replace("零零", "零");
    newchar = newchar.replace("零亿", "亿");
    newchar = newchar.replace("亿万", "亿");
    newchar = newchar.replace("零万", "万");
    newchar = newchar.replace("零元", "元");
    newchar = newchar.replace("零角", "");
    newchar = newchar.replace("零分", "");
    if (newchar.charAt(newchar.length - 1) == "元") {
        newchar = newchar + "整"
    }
    return newchar;
}


/**********************************************************************************/
//获取url链接参数
/**
* 指定key获取
* @param name 键
* */
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = decodeURI(window.location.search).substr(1).match(reg);
    if (r != null) return r[2]; return null;
}

/**
 * 获取全部url参数,并转换成对象
 * */
function getUrlParams(url) {
    var url = url ? url : window.location.href;
    var _pa = url.substring(url.indexOf('?') + 1),
        _arrS = _pa.split('&'),
        _rs = {};
    for (var i = 0, _len = _arrS.length; i < _len; i++) {
        var pos = _arrS[i].indexOf('=');
        if (pos == -1) {
            continue;
        }
        var name = _arrS[i].substring(0, pos),
            value = window.decodeURIComponent(_arrS[i].substring(pos + 1));
        _rs[name] = value;
    }
    return _rs;
}