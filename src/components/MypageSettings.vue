<template>
  <div class="setting-container">
    <div class="nickname">
      <h3>username:</h3>
      <input type="text" v-model="nickname" />
    </div>
    <div class="icon">
      <h3>icon:</h3>
      <select @change="changeIcon" v-model="iconNumber">
        <option
          v-for="(icon, index) in iconList"
          :key="index"
          :value="index"
          :selected="index === iconNumber"
        >
          {{ icon.name }}
        </option>
      </select>
      <img :src="iconList[iconNumber].path" class="icon-preview" />
    </div>
    <button @click="update">編集する</button>
  </div>
</template>
<script>
import { collection, doc, getDoc, updateDoc } from "firebase/firestore"
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
    }
  },
  methods: {
    changeIcon(e) {
      this.iconNumber = e.target.value
    },
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
        const data = docSnap.data()
        this.nickname = data.nickname
        this.iconNumber = data.iconNumber || 0
        this.editReady = true
      } else {
        console.error(this.uid + "does not exist on firestore!")
      }
    },
  },
}
</script>
<style scoped>
.icon-preview {
  width: 48px;
  height: 48px;
  display: inline-block;
  border-radius: 50%;
  background-color: white;
  border: 1px solid #048abf;
}
</style>
