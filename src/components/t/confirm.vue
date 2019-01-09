<template>
  <div @click.stop.prevent="event">
    <button :class="oClass">
      <slot></slot>
    </button>
  </div>
</template>

<script>
export default {
  name: 'confirm',
  props: {
    'align': {
      type: String,
      default: 'right',
    }
  },
  computed:{
    oClass(){
      return {
        't-left': this.align === 'left',
        't-right': this.align === 'right',
      }
    }
  },
  methods:{
    event(){
      this.$emit('event');
    },
  }
}
</script>

<style lang="less" scoped>
div{
  display:inline-block;
  button{
    border:none;
    width:1.125rem;
    height:0.75rem;
    line-height:0.75rem;
    color:white;
    font-size:0.19rem;
    text-align:center;
    &.t-left{
      background-image: linear-gradient(90deg, #FF5533 0%, #FF2266 78%);
      border-radius:0.75rem 0 0 0;
    }
    &.t-right{
      background-image: linear-gradient(90deg, #FF5533 0%, #FF2266 78%);
      border-radius:0.75rem 0 0 0;
    }
  }
}
</style>
