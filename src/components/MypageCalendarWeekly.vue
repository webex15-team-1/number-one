<template>
  <div class="header-cal">
    <div class="header-cal-control">
      <button>
        <Icon icon="ooui:next-rtl" width="2em" height="2em" @click="prev" />
      </button>
      <button>
        <Icon icon="ooui:next-ltr" width="2em" height="2em" @click="next" />
      </button>
    </div>
    <span>{{ year }}年{{ month }}月</span>
  </div>
  <div class="calendar">
    <table class="main-cal" border="1">
      <thead>
        <th v-for="(weekDay, weekDayIndex) in weekDays" :key="weekDayIndex">
          {{ weekDay }}
        </th>
      </thead>
      <tbody>
        <tr>
          <td
            v-for="(columnNumber, columnNumberIndex) in this.calendar[i]"
            :key="columnNumberIndex"
          >
            <div class="day">
              {{ columnNumber.day }}
            </div>
            <div class="kisyo">
              {{ columnNumber.kisyo }}
            </div>
            <div class="asakatsu">{{ columnNumber.asakatsu }}</div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { db } from "@/firebase"
import { Icon } from "@iconify/vue"
export default {
  data() {
    return {
      auth: getAuth(),
      weekDays: ["日", "月", "火", "水", "木", "金", "土"],
      now: new Date(),
      month: "",
      year: "",
      kisyo: [],
      asakatsu: [],
      i: 0,
      calendar: [],
      a: 0,
      first: 0,
    }
  },
  created() {
    window.addEventListener("resize", this.isMobile)
  },
  mounted() {
    try {
      // マウントのタイミングでauthのイベントリスナを設定する.
      // authの情報が届き次第カレンダーを初期化したいので
      // 読み込み時に走るべき処理をイベントリスナ内に入れる.
      onAuthStateChanged(this.auth, async (user) => {
        const uid = user.uid
        const docRef = doc(db, "users", uid)
        const userDoc = await getDoc(docRef)
        if (userDoc.data().kisyo) {
          this.kisyo = userDoc.data().kisyo
        }
        if (userDoc.data().asakatsu) {
          this.asakatsu = userDoc.data().asakatsu
        }
        // 読み込み時に走るべき処理
        this.month = this.now.getMonth() + 1
        this.year = this.now.getFullYear()
        this.cal()
        this.i = this.first
      })
    } catch (error) {
      console.error(error)
    }
    this.month = this.now.getMonth() + 1
    this.year = this.now.getFullYear()
    this.cal()
    this.i = this.first
  },
  methods: {
    async prev() {
      this.i -= 1
      if (this.i < 0) {
        this.month -= 1
        await this.cal()
        this.i = this.calendar.length - 1
        if (this.month < 1) {
          this.month = 12
          this.year -= 1
        }
      }
    },
    next() {
      this.i += 1
      if (this.i === this.calendar.length) {
        this.month += 1
        this.i = 0
        this.cal()
        if (this.month > 12) {
          this.month = 1
          this.year += 1
          this.cal()
        }
      }
    },
    isMobile() {
      return window.innerWidth < 1000
    },
    cal() {
      this.calendar = []
      this.a = 0
      //月初めの曜日
      let firstWeekDay = new Date(this.year, this.month - 1, 1).getDay()
      //月終わりの日付
      let lastDay = new Date(this.year, this.month, 0).getDate()
      //月終わりの曜日
      let lastWeekDay = new Date(this.year, this.month, 0).getDay()
      let dayNumber = 1
      let nextMonthDay = 1
      let prevMonthDay =
        new Date(this.year, this.month - 1, 0).getDate() - firstWeekDay + 1
      while (
        (dayNumber <= lastDay - lastWeekDay - 2 && lastWeekDay !== 6) ||
        (dayNumber <= lastDay && lastWeekDay === 6)
      ) {
        let weekData = []
        for (let i = 0; i <= 6; i++) {
          let day = dayNumber
          let kisyoTime = ""
          let asakatsuTime = 0
          if (this.calendar.length == 0 && i < firstWeekDay) {
            day = prevMonthDay
            let dayFirebase = this.year + "/" + (this.month - 1) + "/" + day
            for (let j = 0; j < this.kisyo.length; j++) {
              if (this.kisyo[j].date === dayFirebase) {
                let kisyoTimeFirebase = this.kisyo[j].getupCurrentTime
                kisyoTime = kisyoTimeFirebase
              }
            }
            for (let k = 0; k < this.asakatsu.length; k++) {
              if (this.asakatsu[k].date === dayFirebase) {
                let asakatsuTimeFirebase = Number(this.asakatsu[k].time)
                asakatsuTime += asakatsuTimeFirebase
              }
            }
            prevMonthDay += 1
          } else if (lastDay < dayNumber) {
            day = nextMonthDay
            let dayFirebase = this.year + "/" + (this.month + 1) + "/" + day
            for (let j = 0; j < this.kisyo.length; j++) {
              if (this.kisyo[j].date === dayFirebase) {
                let kisyoTimeFirebase = this.kisyo[j].getupCurrentTime
                kisyoTime = kisyoTimeFirebase
              }
            }
            for (let k = 0; k < this.asakatsu.length; k++) {
              if (this.asakatsu[k].date === dayFirebase) {
                let asakatsuTimeFirebase = Number(this.asakatsu[k].time)
                asakatsuTime += asakatsuTimeFirebase
              }
            }
            nextMonthDay += 1
          } else {
            if (day === this.now.getDate()) {
              this.first = this.a
            }
            let dayFirebase = this.year + "/" + this.month + "/" + day
            for (let j = 0; j < this.kisyo.length; j++) {
              if (this.kisyo[j].date === dayFirebase) {
                let kisyoTimeFirebase = this.kisyo[j].getupCurrentTime
                kisyoTime = kisyoTimeFirebase
              }
            }
            for (let k = 0; k < this.asakatsu.length; k++) {
              if (this.asakatsu[k].date === dayFirebase) {
                let asakatsuTimeFirebase = Number(this.asakatsu[k].time)
                asakatsuTime += asakatsuTimeFirebase
              }
            }
            dayNumber++
          }
          if (asakatsuTime) {
            asakatsuTime += "min"
          } else {
            asakatsuTime = ""
          }
          weekData[i] = {
            day: day,
            kisyo: kisyoTime,
            asakatsu: asakatsuTime,
          }
        }
        this.calendar.push(weekData)
        this.a += 1
      }
    },
  },
  components: {
    Icon,
  },
}
</script>
<style scoped>
.header-cal {
  font-size: 1.5em;
  display: flex;
  justify-content: flex-start;
  margin: 1em 0 0.25em 0;
  align-items: flex-start;
  width: 100%;
  margin: auto;
  gap: 2em;
}
.header-cal span {
  font-size: 1.5em;
  height: 1.5em;
  line-height: 1.5em;
  text-align: center;
}
.header-cal-control {
  height: 100%;
}
.header-cal-control button {
  background: transparent;
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
.main-cal {
  border-collapse: collapse;
  width: 100%;
  margin: auto;
}
.main-cal table,
.main-cal th,
.main-cal td {
  border: 1px solid #5f6c7b;
}
table {
  font-size: 1.5em;
  table-layout: fixed;
}
table td {
  position: relative;
}
table td div {
  font-size: 0.5em;
}
.day {
  position: absolute;
  top: 0.25em;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
}
.kisyo {
  position: absolute;
  top: 1.7em;
  left: 50%;
  transform: translateX(-50%);
}
.asakatsu {
  position: absolute;
  top: 3em;
  left: 50%;
  transform: translateX(-50%);
}
table tr {
  height: 2.5em;
  top: 0%;
}
table th:nth-of-type(1) {
  color: #f28b50;
}
table tr td:nth-of-type(1) {
  color: #f28b50;
}
table th:nth-of-type(7) {
  color: #048abf;
}
table tr td:nth-of-type(7) {
  color: #048abf;
}
</style>
