<template>
  <t-icon class="checkbox" :class="oClass" :name="oName" @click.native.stop.prevent="change" v-if="clickable"></t-icon>
  <t-icon class="checkbox" :class="oClass" :name="oName" v-else></t-icon>
</template>

<script>
export default {
  name: 'check',
  props: {
    'value': {
      type: Boolean
    },
    'clickable': {
      type: Boolean,
      default: true,
    }
  },
  computed:{
    oName(){
      return this.value ? 'circle-check-f' : 'circle';
    },
    oClass(){
      return {
        'uncheck': !this.value,
        'checked': this.value,
      };
    }
  },
  methods:{
    change(){
      this.$emit('input', !this.value);
    },
  }
}
</script>

<style lang="less" scoped>
i.checkbox{
  &:before{
    font-size:0.18rem;
  }
  &.uncheck{
    &:before{
      color:#c6c6c6;
      font-weight:bold;
    }
  }
  &.checked{
    &:before{
      color:#FF2266;
    }
  }
}
</style>
