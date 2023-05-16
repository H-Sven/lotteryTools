export default defineAppConfig({
  pages: [
    'pages/index/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  // tabBar: {
  //   list: [
  //     {
  //       iconPath: 'images/icon_tab_home.png',
  //       selectedIconPath: 'images/icon_tab_home_select.png',
  //       pagePath: 'pages/index/index',
  //       text: '首页',
  //     },
  //     {
  //       iconPath: 'images/icon_tab_mine.png',
  //       selectedIconPath: 'images/icon_tab_mine_select.png',
  //       pagePath: 'pages/mine/index',
  //       text: '我的',
  //     },
  //   ],
  //   color: '#8A8B8B',
  //   selectedColor: '#2B2C2D',
  //   backgroundColor: '#fff',
  //   borderStyle: 'white',
  // }
})
