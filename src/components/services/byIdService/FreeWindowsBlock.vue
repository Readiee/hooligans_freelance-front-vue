<template>
  <div class="tab-content__free-windows">
    <PlanList
        class="free-windows__list"
        :plans="freeWindows"
        @editPlan="openEditWindowDialog"
        @removePlan="removePlan"
    ></PlanList>
    <p v-if="freeWindows.length === 0" style="text-align: center">Нет сеансов.</p>
    <div class="tab-content__footer">
      <h4 @click="openCreateWindowDialog">+ Добавить окно</h4>
    </div>
  </div>
</template>

<script>
import store from '@/store'
import PlanList from '@/components/plans/Planslist.vue'

export default {
  components: { PlanList },
  computed: {
    store () {
      return store
    }
  },
  props: {
    freeWindows: {
      type: Array,
      required: true
    }
  },
  data () {
    return {}
  },
  methods: {
    openCreateWindowDialog () {
      this.$emit('openCreateWindowDialog')
    },
    openEditWindowDialog (plan) {
      this.$emit('openEditWindowDialog', plan)
    },
    removePlan (plan) {
      this.$emit('removePlan', plan) // Передаем объект с информацией о записи для удаления
    }
  }
}
</script>

<style>
.tab-content__free-windows {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > * {
    width: 100%;
  }

  p {
    margin-top: 20px;
  }
}
.free-windows__list{
  margin-top: 30px;
}
.tab-content__footer {
  margin-top: auto;
  align-self: flex-end;
  width: 100%;
  * {
    color: #8554D8;
    cursor: pointer;
    &:hover {
      filter: brightness(0.9);
    }
  }
}
</style>
