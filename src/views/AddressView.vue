<template>
  <div class="border rounded p-2">
    <slot />
    <div class="form-group">
      <label for="address1">Address</label>
      <input
        type="text"
        class="form-control"
        id="address1"
        placeholder="Address"
        v-model="address.address1"
        :disabled="isDisabled"
      />
    </div>
    <div class="form-group">
      <label for="address2">Suite/apartment</label>
      <input
        type="text"
        class="form-control"
        id="address2"
        placeholder="Suite/apartment"
        v-model="address.address2"
        :disabled="isDisabled"
      />
    </div>

    <div class="form-row">
      <div class="form-group col-md-6">
        <label for="city">City</label>
        <input
          type="text"
          class="form-control"
          id="city"
          placeholder="eg New York"
          v-model="address.city"
          :disabled="isDisabled"
        />
      </div>
      <div class="form-group col-md-4">
        <label for="stateProvince">State</label>
        <select
          id="stateProvince"
          class="form-control"
          v-model="address.state"
          :disabled="isDisabled"
        >
          <option
            v-for="s in states"
            :key="s.abbreviation"
            :value="s.abbreviation"
          >
            {{ stateFormat(s) }}
          </option>
        </select>
      </div>
      <div class="form-group col-md-2">
        <label for="zip">Zip</label>
        <input
          type="text"
          class="form-control"
          id="zip"
          placeholder="Zip"
          v-model="zipCode"
          :disabled="isDisabled"
        />
      </div>
    </div>
  </div>
</template>

<script>
import state from '@/lookup/states'
import formatters from '@/formatters'

export default {
  props: {
    address: {
      type: Object,
      required: true,
    },
    isDisabled: {
      type: Boolean,
    },
  },
  setup() {
    return {
      states: state,
      ...formatters,
    }
  },
}
</script>
