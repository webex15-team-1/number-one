<template>
  <h1>Let's Login</h1>
  <MailLoginCom></MailLoginCom>
  <br />
  <GoogleLoginCom></GoogleLoginCom>
</template>

<script>
import MailLoginCom from "@/components/MailLoginCom.vue"
import GoogleLoginCom from "@/components/GoogleLoginCom.vue"

export default {
  data() {
    return {}
  },
  methods: {},
  components: {
    MailLoginCom,
    GoogleLoginCom,
  },
}
</script>
