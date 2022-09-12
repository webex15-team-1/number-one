<template>
  <div class="palette">
    <h3>ポイントでページの色を変えよう！</h3>
    <h4>現在の所持ポイント: {{ shopPoints }}pt</h4>
    <div class="button_container">
      <button
        v-for="(colorSet, index) in colorSettings.colors"
        :key="index"
        :disabled="colorSettings.activeColorSet === index"
        @click="updateColorSettings(index)"
      >
        {{ colorSet.name }} {{ price(index) }}
      </button>
    </div>
  </div>
</template>
<script>
import { getAuth, onAuthStateChanged } from "firebase/auth"
import {
  doc,
  updateDoc,
  getDoc,
  // increment,
  arrayUnion,
  onSnapshot,
} from "firebase/firestore"
import { db } from "@/firebase"
import { colorSettings } from "@/store/colorSettings"
export default {
  data() {
    return {
      colorSettings: colorSettings,
      shopPoints: 0,
      unsubscribeUser: null,
      purchasedColor: [0],
      uid: null,
    }
  },
  methods: {
    /**
     * 表示価格を返す
     * @param {Number} colorIndex
     */
    price(colorIndex) {
      return this.purchasedColor.findIndex((value) => value === colorIndex) !==
        -1
        ? "(購入済み)"
        : "(" + this.colorSettings.colors[colorIndex].price + "pt)"
    },
    /**
     * 色を変更する
     * 未購入の色だった場合は購入手続きに移る
     * @param {Number} colorIndex
     */
    updateColorSettings(colorIndex) {
      if (this.price(colorIndex) === "(購入済み)") {
        this.colorSettings.activeColorSet = colorIndex
      } else {
        this.purchaseColorSet(colorIndex)
      }
    },
    /**
     * 色の購入手続き
     * @param {Number} colorIndex
     */
    async purchaseColorSet(colorIndex) {
      const colorPrice = this.colorSettings.colors[colorIndex].price
      if (colorPrice <= this.shopPoints) {
        // 残高が足りているので購入手続き
        // 購入済みリストに買った色の番号を加え,
        // 現在の色設定を変更するとともに残高から金額を引く
        const docRef = doc(db, "users", this.uid)
        const userDoc = await getDoc(docRef)
        if (userDoc.exists()) {
          await updateDoc(docRef, {
            purchasedColor: arrayUnion(colorIndex),
          })
          this.colorSettings.activeColorSet = colorIndex
          this.shopPoints -= colorPrice
        }
      } else {
        alert("ポイントが不足しています！")
      }
    },
  },

  async mounted() {
    const auth = getAuth()
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        this.uid = user.uid
        // ログイン済みのユーザー情報があるかをチェック
        //usersコレクションで確認している
        const docRef = doc(db, "users", this.uid)
        const userDoc = await getDoc(docRef)
        if (userDoc.exists()) {
          // ユーザーが存在するときsnapshotを定義し,
          // shopPointsとpurchasedColorを追跡する
          this.unsubscribeUser = onSnapshot(docRef, async (doc) => {
            this.shopPoints = doc.get("shopPoints") || 0
            // 購入履歴が存在しないときはデフォルト色のみ購入した履歴を作る
            const purchasedColor = doc.get("purchasedColor")
            if (typeof purchasedColor !== "undefined") {
              this.purchasedColor = purchasedColor
            } else {
              this.purchasedColor = [0]
              await updateDoc(docRef, {
                purchasedColor: [0],
              })
            }
          })
        } else {
          console.error("User " + this.uid + " does not exist!")
        }
      }
    })
  },
}
</script>
<style>
.button_container {
  height: 10em;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
</style>
