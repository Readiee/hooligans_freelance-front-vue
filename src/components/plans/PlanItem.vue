<template>
  <div class="plan-row">
    <div class="plan-row__left">
      <div v-if="number + 1" class="plan-row__number">
        <p>{{ number + 1 }}</p>
      </div>
      <div class="plan-row__date">
        <p>
          {{ plan.datetime }}
        </p>
      </div>
    </div>

    <div class="plan-row__right">
      <div class="plan-row__client" v-if="plan.clientId">
        {{ client }}
        <div class="user-group">
          <div class="user-group__avatar">
            <img :src="clientImageUrl" alt="User Avatar">
          </div>
          <div class="user-group__username">{{ plan.client.name }}</div>
        </div>
      </div>
      <div class="plan-row__icons">
        <i class="icon pi pi-trash"
           @click="$emit('remove', plan)"
           v-if="canBeDeleted"></i>
        <i class="icon pi pi-pencil"
           @click="$emit('update', plan)"
           style="margin-left: 20px;"></i>
      </div>
    </div>

  </div>
</template>

<script>
import { getImageUrl } from '@/hooks/imageUrl'

export default {
  props: {
    number: {
      type: Number,
      default: null
    },
    plan: {
      id: Number,
      clientId: Number,
      datetime: String,
      idProduct: Number,
      client: {
        avatar: String,
        name: String
      }
      // year: Number,
      // month: Number,
      // day: Number,
      // hours: Number,
      // minutes: Number,
      // required: true
    },
    client: {},
    canBeDeleted: Boolean
  },
  setup (props) {
    let clientImageUrl = ''
    if (props.plan.client) {
      clientImageUrl = getImageUrl(props.plan.client.avatar)
    }
    return {
      clientImageUrl
    }
  }
}
</script>

<style lang="less" scoped>
.plan-row {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .plan-row__left, .plan-row__right {
    width: 100%;
    display: flex;
    align-items: center;

    .plan-row__number {
      height: 30px;
      width: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 15px;

      p {
        color: @non-active-color
      }

    }

    .plan-row__date {
      display: flex;
      gap: 5px;

      p {
        //font-size: 18px;
      }
    }
  }

  .plan-row__icons {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: auto;
  }
}

i {
  font-size: 20px;
}

.pi-pencil {
  color: @secondary-color
}

.pi-trash {
  color: @red
}
</style>
