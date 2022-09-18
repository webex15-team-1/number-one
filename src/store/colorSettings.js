import { createStore } from "vuex"
import createPersistedState from "vuex-persistedstate"
export const colorSettings = createStore({
  plugins: [createPersistedState()],
  state() {
    return {
      colors: [
        {
          name: "デフォルト",
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
          name: "朝焼け",
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
          name: "base3",
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
          name: "base4",
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
          name: "base5",
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
          name: "base6",
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
          name: "base7",
          price: 60,
          // タイトル(左上)
          titleBackgroundColor: "#D0ECF2",
          titleColor: "#D9958F",
          // タイトル以外の文字色
          generalTextColor: "#D9958F",
          // フッター,ハンバーガーボタンの色
          generalBackgroundColor: "#D0ECF2",
          // ハンバーガーメニューのタイトル文字
          hamburgerTitleColor: "#D9958F",
          // ハンバーガーメニューの背景色
          hamburgerBackgroundColor: "#D0ECF2",
        },
        {
          name: "base8",
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
          name: "base9",
          price: 60,
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
          name: "base5+1",
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
