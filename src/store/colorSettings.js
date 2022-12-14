import { createStore } from "vuex"
import createPersistedState from "vuex-persistedstate"
export const colorSettings = createStore({
  plugins: [createPersistedState({ key: "morening-vuex" })],
  state() {
    return {
      colors: [
        {
          name: "すべての始まり",
          price: 0,
          // タイトル(左上)
          titleBackgroundColor: "#F2C48D",
          titleColor: "#022340",
          // タイトル以外の文字色
          generalTextColor: "#022340",
          // フッター,ハンバーガーボタンの色
          generalBackgroundColor: "#F2C48D",
          // ハンバーガーメニューのタイトル文字
          hamburgerTitleColor: "#022340",
          // ハンバーガーメニューの背景色
          hamburgerBackgroundColor: "#F2C48D",
        },
        {
          name: "朝焼けのまぶしさ",
          price: 30,
          // タイトル(左上)
          titleBackgroundColor: "#FFFFFF",
          titleColor: "#F28B50",
          // タイトル以外の文字色
          generalTextColor: "#FFFFFF",
          // フッター,ハンバーガーボタンの色
          generalBackgroundColor: "#F28B50",
          // ハンバーガーメニューのタイトル文字
          hamburgerTitleColor: "#FFFFFF",
          // ハンバーガーメニューの背景色
          hamburgerBackgroundColor: "rgba(242, 139, 80, 0.8)",
        },
        {
          name: '"あの日"見た風',
          price: 30,
          // タイトル(左上)
          titleBackgroundColor: "#03A6A6",
          titleColor: "#FFFFFF",
          // タイトル以外の文字色
          generalTextColor: "#FFFFFF",
          // フッター,ハンバーガーボタンの色
          generalBackgroundColor: "#03A6A6",
          // ハンバーガーメニューのタイトル文字
          hamburgerTitleColor: "#FFFFFF",
          // ハンバーガーメニューの背景色
          hamburgerBackgroundColor: "#03A6A6",
        },
        {
          name: "森の木々",
          price: 30,
          // タイトル(左上)
          titleBackgroundColor: "#0A6073",
          titleColor: "#FFFFFF",
          // タイトル以外の文字色
          generalTextColor: "#FFFFFF",
          // フッター,ハンバーガーボタンの色
          generalBackgroundColor: "#0A6073",
          // ハンバーガーメニューのタイトル文字
          hamburgerTitleColor: "#FFFFFF",
          // ハンバーガーメニューの背景色
          hamburgerBackgroundColor: "#0A6073",
        },
        {
          name: "潮風の香り",
          price: 30,
          // タイトル(左上)
          titleBackgroundColor: "#39A7BF",
          titleColor: "#FFFFFF",
          // タイトル以外の文字色
          generalTextColor: "#FFFFFF",
          // フッター,ハンバーガーボタンの色
          generalBackgroundColor: "#39A7BF",
          // ハンバーガーメニューのタイトル文字
          hamburgerTitleColor: "#FFFFFF",
          // ハンバーガーメニューの背景色
          hamburgerBackgroundColor: "#39A7BF",
        },
        {
          name: "起き抜けの水",
          price: 30,
          // タイトル(左上)
          titleBackgroundColor: "#FFFFFF",
          titleColor: "#04B2D9",
          // タイトル以外の文字色
          generalTextColor: "#FFFFFF",
          // フッター,ハンバーガーボタンの色
          generalBackgroundColor: "#04B2D9",
          // ハンバーガーメニューのタイトル文字
          hamburgerTitleColor: "#FFFFFF",
          // ハンバーガーメニューの背景色
          hamburgerBackgroundColor: "#04B2D9",
        },
        {
          name: "盛夏の湖",
          price: 30,
          // タイトル(左上)
          titleBackgroundColor: "#048ABF",
          titleColor: "#FFFFFF",
          // タイトル以外の文字色
          generalTextColor: "#FFFFFF",
          // フッター,ハンバーガーボタンの色
          generalBackgroundColor: "#048ABF",
          // ハンバーガーメニューのタイトル文字
          hamburgerTitleColor: "#FFFFFF",
          // ハンバーガーメニューの背景色
          hamburgerBackgroundColor: "#048ABF",
        },
        {
          name: "井戸の世界",
          price: 30,
          // タイトル(左上)
          titleBackgroundColor: "#627FD9",
          titleColor: "#FFFFFF",
          // タイトル以外の文字色
          generalTextColor: "#FFFFFF",
          // フッター,ハンバーガーボタンの色
          generalBackgroundColor: "#627FD9",
          // ハンバーガーメニューのタイトル文字
          hamburgerTitleColor: "#FFFFFF",
          // ハンバーガーメニューの背景色
          hamburgerBackgroundColor: "#627FD9",
        },
        {
          name: "藤の誇り",
          price: 30,
          // タイトル(左上)
          titleBackgroundColor: "#9D7EBF",
          titleColor: "#FFFFFF",
          // タイトル以外の文字色
          generalTextColor: "#FFFFFF",
          // フッター,ハンバーガーボタンの色
          generalBackgroundColor: "#9D7EBF",
          // ハンバーガーメニューのタイトル文字
          hamburgerTitleColor: "#FFFFFF",
          // ハンバーガーメニューの背景色
          hamburgerBackgroundColor: "#9D7EBF",
        },
        {
          name: "あけぼのの海",
          price: 60,
          // タイトル(左上)
          titleBackgroundColor: "#425B8C",
          titleColor: "#F2C1B6",
          // タイトル以外の文字色
          generalTextColor: "#F2C1B6",
          // フッター,ハンバーガーボタンの色
          generalBackgroundColor: "#425B8C",
          // ハンバーガーメニューのタイトル文字
          hamburgerTitleColor: "#F2C1B6",
          // ハンバーガーメニューの背景色
          hamburgerBackgroundColor: "#425B8C",
        },
        {
          name: "初夏の朝露",
          price: 60,
          // タイトル(左上)
          titleBackgroundColor: "#EDF2C2",
          titleColor: "#023E73",
          // タイトル以外の文字色
          generalTextColor: "#023E73",
          // フッター,ハンバーガーボタンの色
          generalBackgroundColor: "#EDF2C2",
          // ハンバーガーメニューのタイトル文字
          hamburgerTitleColor: "#023E73",
          // ハンバーガーメニューの背景色
          hamburgerBackgroundColor: "#EDF2C2",
        },
        {
          name: "早朝の空",
          price: 60,
          // タイトル(左上)
          titleBackgroundColor: "#D8EEFE",
          titleColor: "#D9958F",
          // タイトル以外の文字色
          generalTextColor: "#D9958F",
          // フッター,ハンバーガーボタンの色
          generalBackgroundColor: "#D8EEFE",
          // ハンバーガーメニューのタイトル文字
          hamburgerTitleColor: "#D9958F",
          // ハンバーガーメニューの背景色
          hamburgerBackgroundColor: "#D8EEFE",
        },
        {
          name: "闇夜の星明り",
          price: 90,
          // タイトル(左上)
          titleBackgroundColor: "#022340",
          titleColor: "#FED56B",
          // タイトル以外の文字色
          generalTextColor: "#FED56B",
          // フッター,ハンバーガーボタンの色
          generalBackgroundColor: "#022340",
          // ハンバーガーメニューのタイトル文字
          hamburgerTitleColor: "#FED56B",
          // ハンバーガーメニューの背景色
          hamburgerBackgroundColor: "#022340",
        },
        {
          name: "青の洞窟",
          price: 90,
          // タイトル(左上)
          titleBackgroundColor: "#024059",
          titleColor: "#88E8F2",
          // タイトル以外の文字色
          generalTextColor: "#88E8F2",
          // フッター,ハンバーガーボタンの色
          generalBackgroundColor: "#024059",
          // ハンバーガーメニューのタイトル文字
          hamburgerTitleColor: "#88E8F2",
          // ハンバーガーメニューの背景色
          hamburgerBackgroundColor: "#024059",
        },
        {
          name: "川辺の蛍",
          price: 90,
          // タイトル(左上)
          titleBackgroundColor: "#022601",
          titleColor: "#C0D904",
          // タイトル以外の文字色
          generalTextColor: "#C0D904",
          // フッター,ハンバーガーボタンの色
          generalBackgroundColor: "#022601",
          // ハンバーガーメニューのタイトル文字
          hamburgerTitleColor: "#C0D904",
          // ハンバーガーメニューの背景色
          hamburgerBackgroundColor: "#022601",
        },
      ],
      activeColorSet: 0,
    }
  },
  mutations: {
    updateColorSet(state, payload) {
      state.activeColorSet = payload.colorIndex
    },
  },
})
