<template>
  <view class="lottery-page">
    <view class="today">今天是 <text class="strong">{{getToday().todayString}}</text> <text class="strong">{{getToday().todayWeek}}</text></view>
    <view class="today" v-if="typeName">
      今日规则为 <text class="strong">{{typeName}}</text>
      <text class="tips">20:00截止</text>
    </view>
    <view class="today">
      <view class="ball-container">
        <view class="list-title">
          请在以下数字中选择{{redBallLength}}个数字，作为<text class="red">{{isDoubleColorBallLotto ? '红球':'前区号码'}}</text>
        </view>
        <view class="balllist-box">
          <view
            v-for="(item, index) in redBallList"
            :key="index"
            class="ball-item red-ball-item"
            :class="{'active': currentOptional.red.includes(item)}"
            @tap="handleSelectRed(item)"
          >
          {{item}}
        </view>
        </view>
      </view>
      <view class="ball-container">
        <view class="list-title">
          请在以下数字中选择{{blueBallLength}}个数字，作为<text class="blue">{{isDoubleColorBallLotto ? '蓝球':'后区号码'}}</text>
        </view>
        <view class="balllist-box">
          <view
            v-for="(item, index) in blueBallList"
            :key="index"
            class="ball-item blue-ball-item"
            :class="{'active': currentOptional.blue.includes(item)}"
            @tap="handleSelectBlue(item)"
          >
          {{item}}
        </view>
        </view>
      </view>
      <view class="footer-btn">
        <view class="btn random-optional" @tap="randomOptional">随机一组</view>
        <view class="btn add-optional" @tap="addOptional">添加到自选</view>
      </view>
      <view class="my-optional">
        <view class="optional-title">
          我的自选
          <text class="tips" v-if="myOptionalList.length">都是骗人的...</text>
        </view>
        <view class="optional-list">
          <view v-for="(item, index) in myOptionalList" :key="index" class="item">
            <view class="number-box">
              <view v-for="number in item.red" :key="number" class="number red-number">{{number}}</view>
              <view v-for="number in item.blue" :key="number" class="number blue-number">{{number}}</view>
            </view>
            <view class="delete" @tap="handleDelete(index)">删除</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { getLotteryName, lotteryTypeInfo, createRedBallList, createBlueBallList, getToday, pushValue, getArrayItems } from "../../utils/index";
import dayjs from "dayjs";
import './index.scss'
import Taro, { useShareAppMessage,useShareTimeline } from '@tarojs/taro'


const todayDate = dayjs().format('YYYY-MM-DD')
const isDoubleColorBallLotto = lotteryTypeInfo().value === 'doubleColorBallLotto'
const redBallLength = isDoubleColorBallLotto ? 6 : 5
const blueBallLength = isDoubleColorBallLotto ? 1 : 2
const redBallList = createRedBallList()
const blueBallList = createBlueBallList()
const typeName = ref('')
const getTypeName = async () => {
  const res = await getLotteryName(lotteryTypeInfo().value)
  typeName.value = res
}
getTypeName()

const myOptionalList = ref([])

const currentOptional = reactive({
  red: [],
  blue: []
})

const handleSelectRed = (value) => {
  currentOptional.red = pushValue(value, currentOptional.red, redBallLength)
}
const handleSelectBlue = (value) => {
  currentOptional.blue = pushValue(value, currentOptional.blue, blueBallLength)
}

const addOptional = () => {
  if (currentOptional.red.length !== redBallLength) {
    Taro.showToast({title: `${isDoubleColorBallLotto ? '红球':'前区号码'}至少选择${redBallLength}个`, icon: 'none'})
  }else if (currentOptional.blue.length !== blueBallLength) {
    Taro.showToast({title: `${isDoubleColorBallLotto ? '蓝球':'后区号码'}至少选择${blueBallLength}个`, icon: 'none'})
  } else {
    myOptionalList.value = JSON.parse(JSON.stringify([currentOptional, ...myOptionalList.value]))
    currentOptional.red = []
    currentOptional.blue = []
  }
}

const randomOptional = () => {
  currentOptional.red = getArrayItems(redBallList, redBallLength)
  currentOptional.blue = getArrayItems(blueBallList, blueBallLength)
}

const handleDelete = (index) => {
  myOptionalList.value.splice(index,1)
}

useShareAppMessage((res) => {
  return {
    title: '给你分享一个选号助手',
    path: '/pages/index/index',
  }
})
useShareTimeline(() => {
  console.log('onShareTimeline')
})

</script>
