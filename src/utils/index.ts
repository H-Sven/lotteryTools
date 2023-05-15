import dayjs from "dayjs";
import Taro from '@tarojs/taro'

export const getToday = () => {
  const todayString = dayjs().format('YYYY-MM-DD')
  let todayWeek = ''
  switch (dayjs().day()) {
    case 1:
      todayWeek = '星期一'
      break;
    case 2:
      todayWeek = '星期二'
      break;
    case 3:
      todayWeek = '星期三'
      break;
    case 4:
      todayWeek = '星期四'
      break;
    case 5:
      todayWeek = '星期五'
      break;
    case 6:
      todayWeek = '星期六'
      break;
    case 7:
      todayWeek = '星期日'
      break;
  }
  return {
    todayString,
    todayWeek
  }
}

export const getLotteryName = async (type) => {
  const res = await Taro.request({
    url: 'https://www.fastmock.site/mock/cdab8e4efc448083855845a42a2ba97e/lottery/lottery/type', //仅为示例，并非真实的接口地址
  })
  const { data: { data } } = res
  return data[type]
}





export const lotteryTypeInfo = () => {
  const todayWeek = dayjs().day()
  if ([2,4,7].includes(todayWeek)) {
    return {
      value: 'doubleColorBallLotto',
      lable: 'Double Color Ball Lotto'
    }
  }else if([1,3,6].includes(todayWeek)) {
    return {
      value: 'superLotto',
      lable: 'Super Lotto'
    }
  } else {
    return {
      value: '',
      lable: ''
    }
  }
}

export const createNumberList = (lenght: number) => {
  return Array.from(Array(lenght).keys(), n => n + 1)
}

export const createRedBallList = () => {
  if (lotteryTypeInfo().value === 'UnionLotto') {
    return createNumberList(33)
  }else {
    return createNumberList(35)
  }
}

export const createBlueBallList = () => {
  if (lotteryTypeInfo().value === 'UnionLotto') {
    return createNumberList(16)
  }else {
    return createNumberList(12)
  }
}

export const pushValue = (value, list, maxLength) => {
  if (list.includes(value)) {
    list = list.filter(item=>item !== value)
  } else if (list.length < maxLength) {
    list.push(value)
  }
  return list
}

export const getArrayItems = (arr, num) => {
  var temp_array = new Array()
  for (var index in arr) {
    temp_array.push(arr[index])
  }
  var return_array = new Array()
  for (var i = 0; i<num; i++) {
    if (temp_array.length>0) {
      var arrIndex = Math.floor(Math.random() * temp_array.length)
      return_array[i] = temp_array[arrIndex]
      temp_array.splice(arrIndex, 1)
    } else {
      break
    }
  }
  return return_array
}