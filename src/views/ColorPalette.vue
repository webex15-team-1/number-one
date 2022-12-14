<template>
  <div class="palette">
    <h1>現在の所持ポイント: {{ shopPoints }}pt</h1>
    <div class="button_container">
      <button
        v-for="(colorSet, index) in colors"
        :key="index"
        :disabled="activeColorSet === index"
        @click="updateColorSettings(index)"
      >
        <div
          class="color-preview"
          :style="{
            color: colorSet.generalTextColor,
            backgroundColor: colorSet.generalBackgroundColor,
          }"
        >
          <Icon icon="bi:sun-fill" />
        </div>
        <div class="color-name">
          {{ colorSet.name }}
        </div>
        <div class="color-price">{{ price(index) }}</div>
      </button>
    </div>
  </div>
  <p class="description">
    ポイントを消費することでサイトの見た目を変えることができます。<br />
    ポイントは起床時間の記録や朝活タイマーの使用で貯めることができます。<br />
    ポイントの消費は累計ポイントの記録やランキングに影響しません。<br />
  </p>
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
  increment,
} from "firebase/firestore"
import { db } from "@/firebase"
import { Icon } from "@iconify/vue"
export default {
  data() {
    return {
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
        : "(" + this.colors[colorIndex].price + "pt)"
    },
    /**
     * 色を変更する
     * 未購入の色だった場合は購入手続きに移る
     * @param {Number} colorIndex
     */
    async updateColorSettings(colorIndex) {
      if (this.price(colorIndex) === "(購入済み)") {
        const docRef = doc(db, "users", this.uid)
        const userDoc = await getDoc(docRef)
        if (userDoc.exists()) {
          await updateDoc(docRef, {
            activeColorSet: colorIndex,
          })
        }
        this.$store.commit("updateColorSet", { colorIndex: colorIndex })
      } else {
        this.purchaseColorSet(colorIndex)
      }
    },
    /**
     * 色の購入手続き
     * @param {Number} colorIndex
     */
    async purchaseColorSet(colorIndex) {
      const colorPrice = this.colors[colorIndex].price
      if (colorPrice <= this.shopPoints) {
        // 残高が足りているので購入手続き
        // 購入済みリストに買った色の番号を加え,
        // 現在の色設定を変更するとともに残高から金額を引く
        const docRef = doc(db, "users", this.uid)
        const userDoc = await getDoc(docRef)
        if (userDoc.exists()) {
          await updateDoc(docRef, {
            purchasedColor: arrayUnion(colorIndex),
            shopPoints: increment(-colorPrice),
            activeColorSet: colorIndex,
          })
          this.$store.commit("updateColorSet", { colorIndex: colorIndex })
        }
      } else {
        alert("ポイントが不足しています！")
      }
    },
  },
  computed: {
    activeColorSet() {
      return this.$store.state.activeColorSet
    },
    currentSetting() {
      const colorIndex = this.$store.state.activeColorSet
      return this.$store.state.colors[colorIndex]
    },
    colors() {
      return this.$store.state.colors
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
          this.$router.push("/top")
        }
      }
    })
  },
  components: {
    Icon,
  },
}
</script>
<style>
h1 {
  font-size: 2em;
}
@media (min-width: 1001px) {
  .button_container {
    left: 10vw;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 2vh 5vw;
    gap: 1em;
  }
  .button_container > button {
    background-color: transparent;
    border: none;
    width: 15em;
    height: 10em;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0;
    padding: 0;
  }
  .color-preview {
    width: 4rem;
    height: 4rem;
    font-weight: bold;
    border-radius: 50%;
  }
  .color-preview svg {
    display: inline-block;
    height: 4rem;
    width: 4rem;
    font-size: 4rem;
  }
  .color-name,
  .color-price {
    font-size: 1.5em;
  }
  .description {
    font-size: 1.5em;
    line-height: 1.8em;
  }
}
@media (max-width: 1000px) {
  .button_container {
    left: 10vw;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 2vh 5vw;
    gap: 1em;
  }
  .button_container > button {
    background-color: transparent;
    border: none;
    width: 15em;
    height: 10em;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0;
    padding: 0;
  }
  .color-preview {
    width: 4rem;
    height: 4rem;
    font-weight: bold;
    border-radius: 50%;
  }
  .color-preview svg {
    display: inline-block;
    height: 4rem;
    width: 4rem;
    font-size: 4rem;
  }
  .color-name,
  .color-price {
    font-size: 1.5em;
  }
  .description {
    font-size: 1em;
  }
}
@media (max-width: 670px) {
  .button_container {
    left: 10vw;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 2vh 2vw;
    gap: 0.5em;
  }
  .button_container > button {
    background-color: transparent;
    background: none;
    border: none;
    outline: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    width: 8em;
    height: 6em;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0;
    padding: 0;
  }
  .color-preview {
    width: 2rem;
    height: 2rem;
    font-weight: bold;
    border-radius: 50%;
  }
  .color-preview svg {
    display: inline-block;
    height: 2rem;
    width: 2rem;
    font-size: 2rem;
  }
  .color-name,
  .color-price {
    font-size: 0.8em;
  }
  .description {
    font-size: 0.5em;
  }
}
</style>
