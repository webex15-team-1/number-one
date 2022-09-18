<template>
  <div class="tweet-container">
    <h3>みんなのつぶやき</h3>
    <div class="tweets">
      <div v-for="(tweet, index) in tweets" :key="index" class="tweet">
        <img class="color-icon" :src="iconList[tweet.iconNumber].path" />
        <div class="tweet-text-area">
          <div class="nickname">
            {{ tweet.nickname }}
          </div>
          <div class="tweet-text">{{ tweet.text }}</div>
        </div>
      </div>
    </div>
    <div class="post-area">
      <textarea
        v-model="message"
        @keydown="postTweet"
        :disabled="!sendReady"
      ></textarea>
      <button class="tweet-button" @click="postTweet" v-show="sendReady">
        <Icon icon="akar-icons:send" color="white"></Icon>
      </button>
    </div>
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
import { Icon } from "@iconify/vue"

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
      unsubscribeTweet: null,
      unsubscribeUser: null,
    }
  },
  methods: {
    postTweet(e) {
      if (
        e.keyCode === 13 ||
        e.target.nodeName === "svg" ||
        e.target.nodeName === "BUTTON"
      ) {
        const tweet = {
          text: this.message,
          createdAt: serverTimestamp(),
          nickname: this.nickname,
          color: this.color,
          iconNumber: this.iconNumber,
        }
        addDoc(collection(db, "tweets"), tweet).then(() => {
          this.message = ""
        })
      }
    },
  },
  mounted() {
    const ref = query(
      collection(db, "tweets"),
      orderBy("createdAt"),
      limitToLast(5)
    )
    this.unsubscribeTweet = onSnapshot(ref, (snapshot) => {
      let tweets = []
      snapshot.forEach((doc) => {
        tweets.push({
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
    this.unsubscribeTweet()
    this.unsubscribeUser()
    this.unsubscribeTweet = null
    this.unsubscribeUser = null
  },
  watch: {
    uid: async function () {
      // nickname, color, iconNumberが必要なのでuserのデータをとってくる
      const docRef = doc(collection(db, "users"), this.uid)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        // userが存在するときユーザーデータの更新に追随するためonSnapshotを設定する
        this.unsubscribeUser = onSnapshot(docRef, (doc) => {
          const data = doc.data()
          this.color = data.color ? data.color : "#F2C48D"
          this.nickname = data.nickname
          this.iconNumber = data.iconNumber || 0
        })
        // ユーザーデータを受信できたのでツイートを可能にする
        this.sendReady = true
      } else {
        console.error(this.uid + "does not exist on firestore!")
      }
    },
  },
  components: {
    Icon,
  },
}
</script>
<style scoped>
h3 {
  font-size: 1.5em;
}
.tweet-container {
  background-color: #d8eefe;
  display: inline-block;
  width: 100%;
}
.tweets {
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  align-items: center;
}
.tweet {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.color-icon {
  display: inline-block;
  border-radius: 50%;
  background-color: white;
  border: 1px solid #048abf;
  width: 15%;
  height: 15%;
}
.tweet-text-area {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 80%;
  left: 20%;
  font-size: 1em;
}
.nickname {
  font-weight: bold;
}
.tweet-text {
  width: fit-content;
  left: 20%;
}
.post-area {
  display: flex;
  flex-direction: row;
  margin: 1em 0;
  justify-content: center;
  align-items: center;
}
textarea {
  resize: none;
  height: 4em;
  width: 70%;
  font-size: 0.8em;
}
.tweet-button {
  background: #048abf;
  vertical-align: middle;
  text-align: inherit;
  -webkit-appearance: none;
  appearance: none;
  width: 2em;
  height: 2em;
  text-align: center;
  border: none;
  border-radius: 50%;
  margin: 0.5em;
}
</style>
