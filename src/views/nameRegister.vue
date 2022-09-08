<template>
  <h3>ようこそ。表示名を登録してください。</h3>
  <div>
    <input type="text" v-model="name" />
  </div>
  <h3>都道府県を選択してください。天気をお伝えします。</h3>

  <div class="prefectureChoices">
    <select v-on:change="weatherRegister">
      <option v-bind:disabled="!disabled">選択してください</option>
      <option value="016000">北海道</option>
      <option value="020000">青森</option>
      <option value="030000">岩手</option>
      <option value="040000">宮城</option>
      <option value="050000">秋田</option>
      <option value="060000">山形</option>
      <option value="070000">福島</option>
      <option value="080000">茨城</option>
      <option value="090000">栃木</option>
      <option value="100000">群馬</option>
      <option value="110000">埼玉</option>
      <option value="120000">千葉</option>
      <option value="130000">東京</option>
      <option value="140000">神奈川</option>
      <option value="150000">新潟</option>
      <option value="160000">富山</option>
      <option value="170000">石川</option>
      <option value="180000">福井</option>
      <option value="190000">山梨</option>
      <option value="200000">長野</option>
      <option value="210000">岐阜</option>
      <option value="220000">静岡</option>
      <option value="230000">愛知</option>
      <option value="240000">三重</option>
      <option value="250000">滋賀</option>
      <option value="260000">京都</option>
      <option value="270000">大阪</option>
      <option value="280000">兵庫</option>
      <option value="290000">奈良</option>
      <option value="300000">和歌山</option>
      <option value="310000">鳥取</option>
      <option value="320000">島根</option>
      <option value="330000">岡山</option>
      <option value="340000">広島</option>
      <option value="350000">山口</option>
      <option value="360000">徳島</option>
      <option value="370000">香川</option>
      <option value="380000">愛媛</option>
      <option value="390000">高知</option>
      <option value="400000">福岡</option>
      <option value="410000">佐賀</option>
      <option value="420000">長崎</option>
      <option value="430000">熊本</option>
      <option value="440000">大分</option>
      <option value="450000">宮崎</option>
      <option value="460100">鹿児島</option>
      <option value="471000">沖縄</option>
    </select>
  </div>
  <br />
  <div>
    <button v-on:click="two">登録</button>
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { doc, setDoc, getDoc } from "firebase/firestore"
import { db } from "@/firebase"

export default {
  data() {
    return {
      disabled: true,
      name: "",
      prefecture: "",
      prefectureCode: "",
    }
  },
  methods: {
    two() {
      this.createFirestore()
      this.jumpToMyPage()
    },
    jumpToMyPage() {
      this.$router.push("/")
    },
    createFirestore() {
      const auth = getAuth()
      onAuthStateChanged(auth, async (user) => {
        // 未ログイン時
        if (!user) {
          // topに飛ばしてログインさせる
          this.$router.push("/top")
        }
        // ログイン時
        else {
          const uid = user.uid
          // ログイン済みのユーザー情報があるかをチェック
          //usersコレクションで確認している
          const docRef = doc(db, "users", uid)
          const userDoc = await getDoc(docRef)
          if (!userDoc.exists()) {
            // Firestore にユーザー用のドキュメントが作られていなければ作る
            await setDoc(docRef, {
              //usersコレクションにユーザーID名のドキュメントを作る
              userId: uid,
              nickname: this.name,
              prefecture: this.prefecture,
              prefectureCode: this.prefectureCode,
            })
          }
        }
      })
    },
    weatherRegister(e) {
      this.disabled = false
      this.prefecture = e.target[e.target.selectedIndex].innerHTML
      this.prefectureCode = e.target.value
    },
  },
}
</script>
