<template>
  <div>
    <h3>Payment</h3>
    <div v-if="error" class="alert alert-danger">{{ error }}</div>
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
              v-model="payment.shipping.fullName"
            />
          </div>
          <div class="form-group">
            <label for="company">Company name</label>
            <input
              type="text"
              class="form-control"
              id="company"
              placeholder="Your company"
              v-model="payment.shipping.company"
            />
          </div>
          <div class="form-group">
            <label for="address1">Address</label>
            <input
              type="text"
              class="form-control"
              id="address1"
              placeholder="Address"
              v-model="payment.shipping.address1"
            />
          </div>
          <div class="form-group">
            <label for="address2">Suite/apartment</label>
            <input
              type="text"
              class="form-control"
              id="address2"
              placeholder="Suite/apartment"
              v-model="payment.shipping.address2"
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
                v-model="payment.shipping.city"
              />
            </div>
            <div class="form-group col-md-4">
              <label for="stateProvince">State</label>
              <select
                id="stateProvince"
                class="form-control"
                v-model="payment.shipping.state"
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
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="sameAsShipping"
              v-model="payment.billing.sameAsShipping"
            />
            <label class="form-check-label" for="sameAsShipping">
              Same as shipping
            </label>
          </div>

          <div class="form-group">
            <label for="address1">Address</label>
            <input
              type="text"
              class="form-control"
              id="address1"
              placeholder="Address"
              v-model="payment.billing.address1"
              :disabled="payment.billing.sameAsShipping"
            />
          </div>
          <div class="form-group">
            <label for="address2">Suite/apartment</label>
            <input
              type="text"
              class="form-control"
              id="address2"
              placeholder="Suite/apartment"
              v-model="payment.billing.address2"
              :disabled="payment.billing.sameAsShipping"
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
                v-model="payment.billing.city"
                :disabled="payment.billing.sameAsShipping"
              />
            </div>
            <div class="form-group col-md-4">
              <label for="stateProvince">State</label>
              <select
                id="stateProvince"
                class="form-control"
                v-model="payment.billing.state"
                :disabled="payment.billing.sameAsShipping"
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
                :disabled="payment.billing.sameAsShipping"
              />
            </div>
          </div>
          <div><strong>Credit card</strong></div>
          <div class="form-group">
            <label for="ccnumber">Credit Card Number</label>
            <div class="input-group">
              <input
                class="form-control"
                type="text"
                placeholder="0000 0000 0000 0000"
                v-model="payment.creditCard.number"
              />
            </div>
          </div>
          <div class="form-group">
            <label for="nameOnCard">Name on Card</label>
            <div class="input-group">
              <input
                class="form-control"
                id="nameOnCard"
                type="text"
                placeholder="Name on the card"
                v-model="payment.creditCard.nameOnCard"
              />
            </div>
          </div>

          <div class="row">
            <div class="form-group col-md-4">
              <label for="expirationDate">Expiration Date</label>
              <select
                class="form-control"
                id="expirationDate"
                v-model="payment.creditCard.expirationDate"
              >
                <option v-for="m in months" :key="m.name" :value="m.number">
                  {{ m.name }}
                </option>
              </select>
            </div>
            <div class="form-group col-md-4">
              <label for="expirationDate">Expiration Year</label>
              <select
                class="form-control"
                id="expirationYear"
                v-model="payment.creditCard.expirationYear"
              >
                <option v-for="y in years" :key="y" :value="y">
                  {{ y }}
                </option>
              </select>
            </div>
            <div class="form-group col-md-4">
              <label for="cvv">CVV</label>
              <div class="input-group">
                <input
                  class="form-control"
                  id="cvv"
                  type="text"
                  placeholder="CVV"
                  v-model="payment.creditCard.cvv"
                />
              </div>
            </div>
          </div>
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
import { ref, computed, watch } from "vue";
import states from "@/lookup/states";
import months from "@/lookup/months";
import formatters from "@/formatters";

export default {
  setup() {
    const payment = ref({
      shipping: {},
      billing: {
        sameAsShipping: false,
      },
      creditCard: {},
    });

    const error = ref("");

    function onSave() {
      error.value = "We can't save yet, we have a error with a api";
    }

    const zipCode = computed({
      get: () => payment.value.postalCode,
      set: (val) => {
        if (val && typeof val === "string") {
          if (val.length <= 5 || val.indexOf("-") > -1) {
            payment.value.postalCode = val;
          } else {
            payment.value.postalCode = `${val.substring(0, 5)}-${val.substring(
              5
            )}`;
          }
        }
      },
    });

    watch(
      () => payment.value.billing.sameAsShipping,
      (val) => {
        if (val === true) {
          payment.value.billing.address1 = "";
          payment.value.billing.address2 = "";
          payment.value.billing.state = "";
          payment.value.billing.zipCode = "";
          payment.value.billing.city = "";
        }
      }
    );

    const years = Array.from(
      { length: 10 },
      (_, i) => new Date().getFullYear() + i
    );

    return {
      payment,
      states,
      onSave,
      ...formatters,
      zipCode,
      error,
      months,
      years,
    };
  },
};
</script>
