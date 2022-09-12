import { ref } from "vue"
export const colorSettings = ref({
  colors: [
    {
      name: "いつもの朝",
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
      hamburgerBackgroundColor: "#F3D8B7",
    },
    {
      name: "夕暮れの空",
      price: 10,
      // タイトル(左上)
      titleBackgroundColor: "#F5F5F5",
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
    // {
    //   name:"あけぼのの海",

    // }
  ],
  activeColorSet: 0,
})
