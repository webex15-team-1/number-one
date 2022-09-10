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
            {{ columnNumber }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      weekDays: ["日", "月", "火", "水", "木", "金", "土"],
      now: new Date(),
      month: "",
      year: "",
    }
  },
  created() {
    this.month = this.now.getMonth() + 1
    this.year = this.now.getFullYear()
  },
  methods: {
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
          if (calendar.length == 0 && i < firstWeekDay) {
            weekData[i] = ""
          } else if (lastDay < dayNumber) {
            weekData[i] = ""
          } else {
            weekData[i] = dayNumber
            dayNumber++
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
  table-layout: fixed;
  width: 100%;
}
table tr {
  height: 10vh;
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
