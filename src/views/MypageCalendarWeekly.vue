<template>
  <div class="header-cal">
    <span class="prev" v-on:click="prev">＜</span>
    <span>{{ year }}年{{ month }}月</span>
    <span class="next" v-on:click="next">＞</span>
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
    }
  },
  created() {
    this.month = this.now.getMonth() + 1
    this.year = this.now.getFullYear()
    this.cal()
  },
  methods: {
    kisyoAsakatsuTimes() {
      try {
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
        })
      } catch (error) {
        console.error(error)
      }
    },
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
    cal() {
      this.kisyoAsakatsuTimes()
      this.calendar = []
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
      while (dayNumber <= lastDay - lastWeekDay - 2) {
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
      }
    },
  },
}
</script>
<style>
.header-cal {
  font-size: 3em;
  display: flex;
  justify-content: space-between;
}
.main-cal {
  border-collapse: collapse;
  width: 70%;
  margin: auto;
}
table {
  font-size: 1.5em;
}
table td {
  position: relative;
  width: 10%;
}
.day {
  position: absolute;
  top: 0%;
  left: 0%;
  padding-left: 1%;
}
table tr {
  height: 10vh;
  top: 0%;
}
table th:nth-of-type(1) {
  color: red;
}
table tr td:nth-of-type(1) {
  color: red;
}
table th:nth-of-type(7) {
  color: blue;
}
table tr td:nth-of-type(7) {
  color: blue;
}
</style>
