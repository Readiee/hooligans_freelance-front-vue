<template>
  <div class="plan-row">
    <div class="plan-row__left">
      <div v-if="number + 1" class="plan-row__number">
        <p>{{ number + 1 }}</p>
      </div>
      <div class="plan-row__date">
        <p>
          {{ plan.day }} {{ monthName }} {{ plan.hours }}:{{ plan.minutes }}
        </p>
      </div>
    </div>

    <div class="plan-row__right">
      <div class="plan-row__icons">
        <i class="icon pi pi-trash"></i>
        <i class="icon pi pi-pencil" style="margin-left: 20px;"></i>
      </div>
    </div>

  </div>
</template>

<script>
import { getMonthName } from '@/hooks/getMonthName'

export default {
  props: {
    number: {
      type: Number,
      default: null
    },
    plan: {
      record: {
        id: Number,
        clientId: Number,
        dayTime: String,
        idProduct: Number
      },
      year: Number,
      month: Number,
      day: Number,
      hours: Number,
      minutes: Number,
      required: true
    },
    client: {

    }
  },
  setup (props) {
    const monthName = getMonthName(props.plan.month)
    return {
      monthName
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
