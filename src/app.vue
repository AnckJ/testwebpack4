<template>
  <div id="app">
    <div :style="`width: 200px; height: 200px; background: url(${img})`"></div>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
import img from '@/assets/images/2.jpg'

export default {
  name: '',

  components: {},

  mixins: [],

  props: {},

  data() {
    return {
      img,
      test: 'abcdefg'
    }
  },

  methods: {
  }
}
</script>

<style scoped lang="styl">
.test
  font-size: 30px
  color: skyblue

</style>
