export default {
  data () {
    return {
      seconds: 10
    }
  },

  computed: {
    aaa () {
      return this.$store.getters.aaa
    }
  },

  render () {
  return (<div>{this.seconds}<div>{this.aaa}</div></div>)
  },

  created () {
    const timer = setInterval(() => {
      this.seconds--
      if (this.seconds === 0) {
        clearInterval(timer)
      }
    }, 1000)
  }
}
