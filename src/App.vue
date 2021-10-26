<template>
  <div>
    <h3>Payment</h3>
    <form novalidate @submit.prevent="onSave">
      <div class="row">
        <div class="col-md-6">
          <div><strong>Shipping information</strong></div>
          <div class="form-group">
            <label for="name">Name</label>
            <input
              type="text"
              class="form-control"
              id="name"
              placeholder="Your name"
              v-model="payment.fullName"
            />
          </div>
          <div class="form-group">
            <label for="company">Company name</label>
            <input
              type="text"
              class="form-control"
              id="company"
              placeholder="Your company"
              v-model="payment.company"
            />
          </div>
          <div class="form-group">
            <label for="address1">Address</label>
            <input
              type="text"
              class="form-control"
              id="address1"
              placeholder="Address"
              v-model="payment.address1"
            />
          </div>
          <div class="form-group">
            <label for="address2">Suite/apartment</label>
            <input
              type="text"
              class="form-control"
              id="address2"
              placeholder="Suite/apartment"
              v-model="payment.address2"
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
                v-model="payment.city"
              />
            </div>
            <div class="form-group col-md-4">
              <label for="stateProvince">State</label>
              <select
                id="stateProvince"
                class="form-control"
                v-model="payment.state"
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
              />
            </div>
            <div class="form-group">
              <input type="submit" value="Next" class="btn btn-success" />
            </div>
          </div>
        </div>

        <div class="col-md-6">
          <div><strong>Billing information</strong></div>
        </div>
      </div>
    </form>

    <div class="col-md-6">
      <pre>
        {{ payment }}
      </pre>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import states from "@/lookup/states";
import formatters from "@/formatters";

export default {
  setup() {
    const payment = ref({
      postalCode: "",
    });

    function onSave() {
      alert("We can't save yet");
    }

    const zipCode = computed({
      get: () => payment.value.postalCode,
      set: (val) => {
        console.log(val);
        if (val && typeof val === "string") {
          if (val.length <= 5 || val.indexOf("-") > -1) {
            payment.value.postalCode = val;
          }else {
            payment.value.postalCode = `${val.substring(0, 5)}-${val.substring(5)}`;
          }
        }
      },
    });

    return {
      payment,
      states,
      onSave,
      ...formatters,
      zipCode
    };
  },
};
</script>
