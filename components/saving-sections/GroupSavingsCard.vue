<template>
  <div class="grid grid-cols-4 gap-4 mb-5">
    <div class="col-span-2 sm:col-span-2 md:col-span-2">
      <div class="card">
        <div class="card-header">
          <h5 class="group-name">{{ groupName }}</h5>
          <h3 class="group-savings-amount">
            {{ groupTotalAmountSaved }}
          </h3>
          <span class="card-members">{{ memberCount }} member(s)</span>
        </div>
        <div class="card-body">
          <div class="card-saving-details">
            <div class="progress-label">{{ progressLabel }}</div>
            <div class="progress-label">{{ progressDetails }}</div>
          </div>
          <div class="card-progress">
            <div
              class="progress-bar"
              :style="{
                width: progressBarWidth,
                backgroundColor: 'lightgreen',
              }"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { numberFormat } from "~~/utils/filters/numbers";

export default {
  props: {
    groupName: {
      type: String,
      required: true,
    },
    memberCount: {
      type: Number,
      required: true,
    },
    totalAmountSaved: {
      type: Number,
      required: true,
    },
    targetAmount: {
      type: Number,
      required: true,
    },
  },
  computed: {
    progressLabel() {
      const percentage = Math.floor(
        (this.totalAmountSaved / this.targetAmount) * 100
      );
      return `Saved ${percentage}%`;
    },
    progressBarWidth() {
      const percentage = (this.totalAmountSaved / this.targetAmount) * 100;
      return `${percentage}%`;
    },
    groupTotalAmountSaved() {
      return numberFormat(this.totalAmountSaved, "currency");
    },
    progressDetails() {
      return `${numberFormat(this.totalAmountSaved, "currency")}/${numberFormat(
        this.targetAmount,
        "currency"
      )}`;
    },
  },
};
</script>

<style scoped>
.card {
  background-color: #000;
  color: #fff;
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
}

.card-header {
  font-size: 0.8em;

  margin-bottom: 1.5rem;
}
.card-saving-details {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.group-name {
  color: #fff;
  font-size: 1rem;
  font-weight: light;
  margin-bottom: 3px;
}
.group-savings-amount {
  color: #fff;
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 3px;
}

.card-members {
  font-size: 0.875rem;
  color: #fff;
}

.card-progress {
  background-color: #fff;
  border-radius: 2px;
  height: 8px;
  margin-top: 0;
  margin-bottom: 0.5rem;
  overflow: hidden;
}

.progress-bar {
  background-color: #3b82f6;
  height: 100%;
  transition: width 0.3s ease-in-out;
}

.progress-label {
  font-size: 0.875rem;
  color: #fff;
  margin-bottom: 0.5rem;
}

.card-amount {
  font-size: 1.25rem;
  font-weight: bold;
}
</style>
