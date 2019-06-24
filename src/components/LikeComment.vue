<template lang="pug">
  .like-comment(:class="{active, fill}")
    simple-svg(:filepath="`/static/img/${currentIcon}.svg`" :width="width" :height="height")
    span(v-if="quantity > 1" :style="{'font-size': fontSize}") {{quantity}}
</template>

<script>
export default {
  name: 'Like',
  props: {
    quantity: Number,
    active: Boolean,
    fill: Boolean,
    width: {
      type: String,
      default: '12px'
    },
    height: {
      type: String,
      default: '12px'
    },
    fontSize: {
      type: String,
      default: '12px'
    },
    comment: Boolean
  },
  computed: {
    currentIcon() {
      return this.comment ? 'comment' : 'like'
    }
  }
}
</script>

<style lang="stylus">
@import '../assets/stylus/base/vars.styl';

.like-comment {
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    .simple-svg {
      fill: wild-watermelon;

      path {
        stroke: wild-watermelon;
      }
    }
  }

  &.fill {
    &:hover {
      .simple-svg {
        fill: wild-watermelon;

        path {
          stroke: wild-watermelon;
        }
      }
    }

    .simple-svg {
      fill: silver-sand;

      path {
        stroke: silver-sand;
      }
    }
  }

  &.active {
    &:hover {
      .simple-svg {
        fill: transparent;
      }
    }

    .simple-svg {
      fill: wild-watermelon;

      path {
        stroke: wild-watermelon;
      }
    }

    span {
      color: wild-watermelon;
    }
  }

  span {
    font-weight: 600;
    color: #AEAEBD;
    margin-left: 5px;
  }
}
</style>
