<template>
  <div class="settings-container">
    <h3>ユーザーデータの更新</h3>
    <div class="nickname">
      <h4>Nickname:</h4>
      <input type="text" v-model="nickname" :disabled="!editReady" />
    </div>
    <div class="icon">
      <h4>Icon:</h4>
      <div class="icon-field">
        <!-- iconNumberはユーザーデータが届き次第ユーザーの設定値に変わり、
        それに合わせてselectの初期値とプレビューimgが変化する -->
        <select v-model="iconNumber" :disabled="!editReady">
          <option v-for="(icon, index) in iconList" :key="index" :value="index">
            {{ icon.name }}
          </option>
        </select>
        <img :src="iconList[iconNumber].path" class="icon-preview" />
      </div>
    </div>
    <button @click="update" class="update-button">更新する</button>
  </div>
</template>
<script>
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore"
import { db } from "@/firebase"
import { iconList } from "@/store/iconList"
export default {
  props: {
    uid: String,
  },
  data() {
    return {
      nickname: "",
      iconNumber: 0,
      editReady: false,
      iconList: iconList,
      unsubscribeUser: null,
    }
  },
  methods: {
    /**
     * ニックネームとアイコンの更新
     */
    update() {
      const docRef = doc(collection(db, "users"), this.uid)
      updateDoc(docRef, {
        nickname: this.nickname,
        iconNumber: this.iconNumber,
      })
    },
  },
  watch: {
    uid: async function () {
      // userのデータをとってくる
      const docRef = doc(collection(db, "users"), this.uid)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        // userが存在するとき、userのデータの更新に追随するためonSnapshotを設定する
        this.unsubscribeUser = onSnapshot(docRef, (doc) => {
          const data = doc.data()
          this.nickname = data.nickname
          this.iconNumber = data.iconNumber || 0
        })
        // userの準備が整ったので更新可能にする
        this.editReady = true
      } else {
        console.error(this.uid + "does not exist on firestore!")
      }
    },
  },
  unmounted() {
    this.unsubscribeUser()
    this.unsubscribeUser = null
  },
}
</script>
<style scoped>
* {
  font-family: "Zen Maru Gothic";
}
.settings-container {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  margin: 1em;
}
.nickname {
  width: 100%;
}
.icon {
  width: 100%;
}
.icon-field {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 0.5em 0;
}
.icon-preview {
  width: 48px;
  height: 48px;
  display: inline-block;
  border-radius: 50%;
  background-color: white;
  border: 1px solid #048abf;
  margin: 0 0.5em;
}
.update-button {
  background: #048abf;
  color: inherit;
  vertical-align: middle;
  text-align: inherit;
  -webkit-appearance: none;
  appearance: none;
  width: 10em;
  height: 2em;
  color: white;
  text-align: center;
  border: none;
  border-radius: 9px;
}
input {
  border-top: none;
  border-right: none;
  border-bottom: 1px solid #048abf;
  border-left: none;
  display: inline-block;
}
h4 {
  text-align: left;
  margin: 0.5em 0 0 0;
}
select {
  height: 2em;
}
</style>
