<template>
  <div class="loading">
    <Loading />
  </div>
  <div class="main">
    <div class="video-area">
      <video
        playsinline
        autoplay
        loop
        muted
        class="video"
        src="@/views/images/morning.mp4"
      ></video>
    </div>
    <h1 class="titleTop">朝活を<br />始めよう。</h1>
  </div>
  <div class="container">
    <div class="whatIs">
      <h2>What is Morening?</h2>
      <div class="text about text-pc">
        朝の時間、無駄にしていませんか？<br />Moreningは朝活を頑張る人を応援するサイト。<br />ランニング、筋トレ、朝食作り、勉強...<br />Moreningを使って素敵な朝活ライフを過ごしませんか？
      </div>
      <div class="text about text-mobile">
        朝の時間、無駄にしていませんか？<br />Moreningは朝活を頑張る人を<br />応援するサイト。
        <br />ランニング、筋トレ、<br />朝食作り、勉強...<br />
        Moreningを使って素敵な朝活ライフを<br />過ごしませんか？
      </div>
      <h2 class="text-pc">Moreningでできること</h2>
      <h2 class="text-mobile">Moreningで<br />できること</h2>
      <ul class="text list text-pc">
        <li>・起床時間の記録</li>
        <li>・朝活タイマー</li>
        <li>・ポイントを貯める</li>
      </ul>
      <ul class="text list text-mobile">
        <li>・起床時間の記録</li>
        <li>・朝活タイマー</li>
        <li>・ポイントを貯める</li>
      </ul>
    </div>
    <div class="login">
      <h2>Welcome</h2>
      <div>
        <input class="input" type="email" v-model="email" placeholder="email" />
      </div>

      <div>
        <input
          class="input"
          type="password"
          v-model="password"
          placeholder="password"
        />
      </div>
      <div>
        <button class="googleButton" v-on:click="googleLogin">
          Googleでログイン
        </button>
      </div>
      <div>
        <button class="loginButton" v-on:click="login">Login</button>
      </div>
    </div>
    <div class="first">
      初めての方はこちらへ
      <Icon
        icon="bi:arrow-down-circle-fill"
        :rotate="4"
        v-on:click="register"
      />
    </div>
    <div class="login" v-if="registerAccount">
      <h2>Register</h2>
      <div>
        <input class="input" type="email" v-model="email" placeholder="email" />
      </div>

      <div>
        <input
          class="input"
          type="password"
          v-model="password"
          placeholder="password"
        />
      </div>
      <div>
        <button class="googleButton" v-on:click="googleSignUp">
          Googleで登録
        </button>
      </div>
      <div>
        <button class="loginButton" v-on:click="signUp">Register</button>
      </div>
    </div>
  </div>
</template>

<script>
import { doc, getDoc } from "firebase/firestore"
import { db } from "@/firebase"
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  getAdditionalUserInfo,
} from "firebase/auth"
import Loading from "@/components/LoadingPage.vue"
import { Icon } from "@iconify/vue"
export default {
  components: {
    Icon,
    Loading,
  },
  data() {
    return {
      email: "",
      password: "",
      auth: getAuth(),
      registerAccount: false,
    }
  },
  mounted: function () {
    const auth = getAuth()
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        this.$router.push("/")
      }
    })
  },
  methods: {
    login() {
      signInWithEmailAndPassword(this.auth, this.email, this.password)
        .then(() => {
          this.loadColorSet(this.auth.currentUser.uid)
          this.$router.push("/mypage")
        })
        .catch(() => {
          //エラー時処理
          alert("Error!")
        })
    },
    googleLogin() {
      const provider = new GoogleAuthProvider()
      signInWithPopup(this.auth, provider)
        .then((result) => {
          //成功時の処理
          const isNewUser = getAdditionalUserInfo(result).isNewUser
          if (isNewUser) {
            this.$router.push("/name-register")
          } else {
            this.loadColorSet(this.auth.currentUser.uid)
            this.$router.push("/mypage")
          }
        })
        .catch(() => {
          //エラー時処理
          alert("Error!")
        })
    },
    register() {
      this.registerAccount = true
    },
    signUp() {
      createUserWithEmailAndPassword(this.auth, this.email, this.password)
        .then(() => {
          //成功時の処理
          alert("登録成功しました")
          this.email = ""
          this.password = ""
          this.$router.push("/name-register")
        })
        .catch(() => {
          //エラー時処理
          alert("Error!")
        })
    },
    googleSignUp() {
      const provider = new GoogleAuthProvider()
      signInWithPopup(this.auth, provider)
        .then(() => {
          //成功時の処理
          alert("登録成功しました")
          this.$router.push("/name-register")
        })
        .catch(() => {
          //エラー時処理
          alert("Error!")
        })
    },
    async loadColorSet(uid) {
      const docRef = doc(db, "users", uid)
      const userDoc = await getDoc(docRef)
      if (userDoc.exists()) {
        const colorIndex = userDoc.get("activeColorSet")
        this.$store.commit("updateColorSet", {
          colorIndex: colorIndex || 0,
        })
      }
    },
  },
}
</script>
<style>
.text {
  word-break: keep-all;
  line-break: strict;
  word-wrap: break-word;
  overflow-wrap: break-word;
}
.list {
  padding-bottom: 5%;
  list-style: none;
}
@media (min-width: 1001px) {
  .loading {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99999;
    animation: loading 1s ease-out 2s forwards;
  }
  @keyframes loading {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
      visibility: hidden;
    }
  }
  .main {
    height: 100vh;
    width: 100%;
    position: relative;
  }
  .video-area {
    position: fixed;
    z-index: -1;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    overflow: hidden;
  }
  .video {
    position: absolute;
    z-index: -1;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .titleTop {
    position: absolute;
    color: white;
    text-align: left;
    font-size: 10em;
  }
  .container {
    letter-spacing: 0.2em;
    background-color: white;
    opacity: 90%;
    width: 100%;
  }
  .whatIs {
    text-align: left;
    line-height: 5em;
  }
  h2 {
    padding: 3% 5% 0 5%;
    font-size: 3em;
  }
  .text-mobile {
    display: none;
  }
  .text-pc {
    display: block;
  }
  .text {
    padding-left: 10%;
    font-size: 1.5em;
  }
  .login {
    background: #d8eefe;
    width: 50%;
    border-radius: 42px;
    margin: 0 auto;
  }
  .input {
    background: #048abf;
    color: white;
    margin: 2% 0;
    width: 50%;
    font-size: 1.5em;
    height: fit-content;
  }
  ::placeholder {
    color: white;
  }
  .googleButton {
    color: #048abf;
    background-color: transparent;
    border: none;
    font-size: 1.5em;
    margin: 1%;
    text-decoration: underline;
  }
  .loginButton {
    margin: 3%;
    width: 20%;
    height: 2em;
    text-align: center;
    font-size: 1.5em;
    color: white;
    background-color: #048abf;
    border-radius: 60px;
    border-bottom: 5px solid #022340;
  }
  .loginButton:hover {
    padding-top: 3px;
    border-bottom: 2px solid #022340;
    transition: 0.3s;
    color: white;
  }
  .first {
    padding: 2%;
    font-size: 1.5em;
  }
}
@media (max-width: 1000px) {
  .loading {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99999;
    animation: loading 1s ease-out 2s forwards;
  }
  @keyframes loading {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
      visibility: hidden;
    }
  }
  .main {
    height: 100vh;
    width: 100%;
    position: relative;
  }
  .video-area {
    position: fixed;
    z-index: -1;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    overflow: hidden;
  }
  .video {
    position: absolute;
    z-index: -1;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .titleTop {
    position: absolute;
    color: white;
    text-align: left;
    font-size: 7em;
    top: 40vh;
    transform: translate(0%, -50%);
  }
  .container {
    letter-spacing: 0.2em;
    background-color: white;
    opacity: 90%;
    width: 100%;
  }
  .whatIs {
    text-align: left;
    line-height: 5em;
  }
  h2 {
    padding: 3% 2.5% 0 2.5%;
    font-size: 3em;
  }
  .text-mobile {
    display: none;
  }
  .text-pc {
    display: block;
  }
  .text {
    padding-left: 2.5%;
    font-size: 1.5em;
  }
  .login {
    background: #d8eefe;
    width: 75%;
    border-radius: 42px;
    margin: 0 auto;
  }
  .input {
    background: #048abf;
    color: white;
    margin: 2% 0;
    width: 75%;
    font-size: 1.5em;
    height: fit-content;
  }
  ::placeholder {
    color: white;
  }
  .googleButton {
    color: #048abf;
    background-color: transparent;
    border: none;
    font-size: 1.5em;
    margin: 1%;
    text-decoration: underline;
  }
  .loginButton {
    margin: 3%;
    width: 5em;
    height: 2em;
    text-align: center;
    font-size: 1.5em;
    color: white;
    background-color: #048abf;
    border-radius: 60px;
    border-bottom: 5px solid #022340;
  }
  .loginButton:hover {
    padding-top: 3px;
    border-bottom: 2px solid #022340;
    transition: 0.3s;
    color: white;
  }
  .first {
    padding: 2%;
    font-size: 1.5em;
  }
}
@media (max-width: 670px) {
  .loading {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99999;
    animation: loading 1s ease-out 2s forwards;
  }
  @keyframes loading {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
      visibility: hidden;
    }
  }
  .main {
    height: 100vh;
    width: 100%;
    position: relative;
  }
  .video-area {
    position: fixed;
    z-index: -1;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    overflow: hidden;
  }
  .video {
    position: absolute;
    z-index: -1;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .titleTop {
    /* position: absolute; */
    color: white;
    text-align: left;
    font-size: 3em;
    margin: 0;
    top: 40vh;
    transform: translate(0%, -50%);
  }
  .container {
    letter-spacing: 0.2em;
    background-color: white;
    opacity: 90%;
    width: 100%;
    padding-bottom: 0.5em;
  }
  .whatIs {
    text-align: left;
    line-height: 4em;
  }
  h2 {
    padding: 3% 5% 0 2.5%;
    font-size: 2.5em;
  }
  .text-pc {
    display: none;
  }
  .text-mobile {
    display: block;
  }
  ul.text-mobile,
  div.text-mobile {
    padding-left: 2.5%;
    font-size: 0.95em;
    line-height: 2em;
  }

  .list {
    padding-bottom: 5%;
  }
  .login {
    background: #d8eefe;
    width: 90%;
    border-radius: 42px;
    margin: 0 auto;
  }
  .input {
    background: #048abf;
    color: white;
    margin: 2% 0;
    width: 75%;
    font-size: 1.5em;
    height: fit-content;
  }
  ::placeholder {
    color: white;
  }
  .googleButton {
    color: #048abf;
    background-color: transparent;
    border: none;
    font-size: 1.5em;
    margin: 1%;
    text-decoration: underline;
  }
  .loginButton {
    margin: 3%;
    width: 5em;
    height: 2em;
    text-align: center;
    font-size: 1.5em;
    color: white;
    background-color: #048abf;
    border-radius: 60px;
    border-bottom: 5px solid #022340;
  }
  .loginButton:hover {
    padding-top: 3px;
    border-bottom: 2px solid #022340;
    transition: 0.3s;
    color: white;
  }
  .first {
    padding: 2%;
    font-size: 1.5em;
  }
}
</style>
