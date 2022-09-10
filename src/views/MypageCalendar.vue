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
        <tr
          v-for="(rowNumber, rowNumberIndex) in calendar"
          :key="rowNumberIndex"
        >
          <td
            v-for="(columnNumber, columnNumberIndex) in rowNumber"
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
    }
  },
  created() {
    this.month = this.now.getMonth() + 1
    this.year = this.now.getFullYear()
    this.kisyoAsakatsuTimes()
  },
  methods: {
    kisyoAsakatsuTimes() {
      try {
        onAuthStateChanged(this.auth, async (user) => {
          const uid = user.uid
          const docRef = doc(db, "users", uid)
          const userDoc = await getDoc(docRef)
          this.kisyo = userDoc.data().kisyo
          this.asakatsu = userDoc.data().asakatsu
        })
      } catch (error) {
        console.error(error)
      }
    },
    prev() {
      this.month -= 1
      if (this.month < 1) {
        this.month = 12
        this.year -= 1
      }
    },
    next() {
      this.month += 1
      if (this.month > 12) {
        this.month = 1
        this.year += 1
      }
    },
  },
  computed: {
    calendar: function () {
      let calendar = []
      //月初めの曜日
      let firstWeekDay = new Date(this.year, this.month - 1, 1).getDay()
      //月終わりの日付
      let lastDay = new Date(this.year, this.month, 0).getDate()
      let dayNumber = 1
      while (dayNumber <= lastDay) {
        let weekData = []
        for (let i = 0; i <= 6; i++) {
          let day = dayNumber
          let kisyoTime = ""
          let asakatsuTime = ""
          if (calendar.length == 0 && i < firstWeekDay) {
            day = ""
          } else if (lastDay < dayNumber) {
            day = ""
          } else {
            let day = this.year + "/" + this.month + "/" + dayNumber
            for (let j = 0; j < this.kisyo.length; j++) {
              if (this.kisyo[j].date === day) {
                let kisyoTimeFirebase = this.kisyo[j].getupCurrentTime
                kisyoTime = kisyoTimeFirebase
              }
            }
            for (let k = 0; k < this.asakatsu.length; k++) {
              if (this.asakatsu[k].date === day) {
                let asakatsuTimeFirebase = this.asakatsu[k].time
                asakatsuTime += asakatsuTimeFirebase
              }
            }
            dayNumber++
          }
          if (asakatsuTime) {
            asakatsuTime += "min"
          }
          weekData[i] = {
            day: day,
            kisyo: kisyoTime,
            asakatsu: asakatsuTime,
          }
        }
        calendar.push(weekData)
      }
      return calendar
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
