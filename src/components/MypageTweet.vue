<template>
  <div class="tweet-container">
    <h3>みんなのつぶやき</h3>
    <div class="tweets">
      <div v-for="(tweet, index) in tweets" :key="index" class="tweet">
        <div class="nickname">
          <img class="color-icon" :src="iconList[tweet.iconNumber].path" />
          {{ tweet.nickname }}
        </div>
        <div class="tweet-text">{{ tweet.text }}</div>
      </div>
    </div>
    <input type="text" v-model="message" />
    <button @click="postTweet" v-show="sendReady">送信</button>
  </div>
</template>
<script>
import {
  collection,
  addDoc,
  query,
  orderBy,
  limitToLast,
  onSnapshot,
  serverTimestamp,
  doc,
  getDoc,
} from "firebase/firestore"
import { db } from "@/firebase"
import { iconList } from "@/store/iconList"
export default {
  props: {
    uid: String,
  },
  data() {
    return {
      tweets: [],
      message: "",
      color: "",
      nickname: "",
      iconNumber: 0,
      sendReady: false,
      iconList: iconList,
    }
  },
  methods: {
    postTweet() {
      const tweet = {
        text: this.message,
        createdAt: serverTimestamp(),
        nickname: this.nickname,
        color: this.color,
        iconNumber: this.iconNumber,
      }
      addDoc(collection(db, "tweets"), tweet).then((ref) => {
        console.log(ref.id)
      })
      this.message = ""
    },
  },
  mounted() {
    const ref = query(
      collection(db, "tweets"),
      orderBy("createdAt"),
      limitToLast(3)
    )
    this.unsubscribe = onSnapshot(ref, (snapshot) => {
      let tweets = []
      snapshot.forEach((doc) => {
        console.dir(doc.data())
        tweets.push({
          time: new Date(doc.get("createdAt").seconds * 1000),
          text: doc.get("text"),
          nickname: doc.get("nickname"),
          color: doc.get("color"),
          iconNumber: doc.get("iconNumber") || 0,
        })
      })
      this.tweets = tweets
    })
  },
  unmounted() {
    this.unsubscribe()
    this.unsubscribe = null
  },
  watch: {
    uid: async function () {
      // nicknameとcolorが必要なのでuserのデータをとってくる
      const docRef = doc(collection(db, "users"), this.uid)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        const data = docSnap.data()
        this.color = data.color ? data.color : "#F2C48D"
        this.nickname = data.nickname
        this.iconNumber = data.iconNumber
        this.sendReady = true
      } else {
        console.error(this.uid + "does not exist on firestore!")
      }
    },
  },
}
</script>
<style scoped>
.tweet-container {
  width: 25%;
  background: #d0ecf2;
}
.tweets {
  display: flex;
  flex-direction: column;
}
.tweet {
  display: flex;
  flex-direction: column;
  justify-content: left;
}
.color-icon {
  width: 36px;
  height: 36px;
  display: inline-block;
  border-radius: 50%;
  background-color: white;
  border: 1px solid #048abf;
}
.nickname {
  display: inline;
  /* width: fit-content; */
  font-size: 24px;
}
.tweet-text {
  display: inline;
  width: fit-content;
  font-size: 16px;
}
</style>
