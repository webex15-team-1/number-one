<template>
  <div id="mypage">
    <div id="left-pane">
      <div id="point">
        <div id="cum-point">
          <!-- 累計ポイントと平均時間の表示 -->
          <MypagePoint :uid="uid" />
        </div>
        <div id="ranking">
          <!-- ランキング -->
          <MypageRanking />
        </div>
      </div>
      <div id="calendar">
        <!-- カレンダー -->
        <MypageCalendarMonthly />
      </div>
    </div>
    <div id="right-pane">
      <div id="settings">
        <!-- プロフィールの更新 -->
        <MypageSettings :uid="uid" />
      </div>
      <div id="tweet">
        <!-- ツイートの表示と送信 -->
        <MypageTweet :uid="uid" />
      </div>
    </div>
  </div>
  <div
    id="return"
    :style="{ backgroundColor: currentSetting.hamburgerBackgroundColor }"
  >
    <a @click="scrollTop">
      <Icon
        icon="akar-icons:arrow-up"
        :style="{ color: currentSetting.generalTextColor }"
      />
    </a>
  </div>
</template>

<script>
import { doc, getDoc, onSnapshot } from "firebase/firestore"
import { db } from "@/firebase"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { Icon } from "@iconify/vue"
import MypagePoint from "@/components/MypagePoint.vue"
import MypageRanking from "@/components/MypageRanking.vue"
import MypageTweet from "@/components/MypageTweet.vue"
import MypageSettings from "@/components/MypageSettings.vue"
import MypageCalendarMonthly from "@/components/MypageCalendarMonthly.vue"

export default {
  data() {
    return {
      auth: getAuth(),
      nickname: "",
      uid: "",
      unsubscribeUser: null,
    }
  },
  methods: {
    scrollTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    },
  },
  computed: {
    currentSetting() {
      const colorIndex = this.$store.state.activeColorSet
      return this.$store.state.colors[colorIndex]
    },
  },
  mounted() {
    this.auth = getAuth()
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        // ログイン時, ニックネームをfirestoreから取り出す
        this.uid = this.auth.currentUser.uid
        const docRef = doc(db, "users", this.uid)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          this.unsubscribeUser = onSnapshot(docRef, (doc) => {
            this.nickname = doc.get("nickname")
          })
        }
      } else {
        this.$router.push("/top")
      }
    })
  },
  unmounted() {
    this.unsubscribeUser()
    this.unsubscribeUser = null
  },
  components: {
    MypagePoint,
    MypageRanking,
    MypageTweet,
    MypageSettings,
    MypageCalendarMonthly,
    Icon,
  },
}
</script>
<<<<<<< HEAD
<style>
* {
  font-family: "Zen Maru Gothic";
}
@media (min-width: 1001px) {
  #mypage {
    margin-top: 1em;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  #left-pane {
    display: flex;
    width: 74%;
    margin-left: 2%;
    margin-right: 2%;
    height: auto;
    left: 0%;
    flex-direction: column;
    align-items: center;
  }
  #point {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 22.5%;
    gap: 0 1em;
  }
  #cum-point {
    flex-grow: 3;
  }
  #ranking {
    flex-grow: 2;
  }
  #calendar {
    display: inline-block;
    width: 100%;
    margin: 2em 0 1em 0;
  }
  #right-pane {
    border-left: 1px solid #022340;
    width: 18%;
    left: 70%;
    flex-direction: column;
  }
  #return {
    display: none;
  }
}
@media (max-width: 1000px) {
  #mypage {
    margin-top: 1em;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  #left-pane {
    display: flex;
    width: 95%;
    margin-left: 2.5%;
    margin-right: 2.5%;
    height: auto;
    flex-direction: column;
    align-items: center;
  }
  #point {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 22.5%;
    gap: 0 1em;
  }
  #cum-point {
    flex-grow: 3;
  }
  #ranking {
    flex-grow: 2;
  }
  #calendar {
    display: inline-block;
    width: 100%;
    margin: 2em 0 1em 0;
  }
  #right-pane {
    display: flex;
    width: 95%;
    margin-left: 2.5%;
    margin-right: 2.5%;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 1em;
  }
  #tweet {
    width: 70%;
    margin-bottom: 1em;
  }
  #return {
    display: none;
  }
}
@media (max-width: 670px) {
  #mypage {
    display: flex;
    flex-direction: column;
    gap: 1em;
  }
  #left-pane {
    width: 95%;
    display: flex;
    flex-direction: column;
    gap: 1em;
    margin: 0 2.5%;
  }
  #point {
    display: flex;
    flex-direction: column;
    gap: 1em;
  }
  #right-pane {
    width: 95%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1em;
    margin: 0 2.5%;
  }
  #tweet {
    width: 100%;
    margin-bottom: 1em;
  }
  #return {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    width: 2em;
    height: 2em;
    bottom: 10%;
    right: 1%;
  }
}
</style>
=======
<style></style>
>>>>>>> origin/master
