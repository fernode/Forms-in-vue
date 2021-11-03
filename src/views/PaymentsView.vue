<template>
  <div>
    <h3>Payment</h3>
    <form novalidate @submit.prevent="onSave">
      <div class="row">
        <div class="col-md-6">
          <AddressView :address="payment.shipping">
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
          </AddressView>
        </div>

        <div class="col-md-6">
          <div><strong>Billing information</strong></div>

          <AddressView
            :address="payment.billing"
            :isDisabled="payment.billing.sameAsShipping"
          >
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
          </AddressView>

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

          <div class="form-group">
            <input type="submit" value="Next" class="btn btn-success" />
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
import { computed, watch, reactive } from 'vue'
import states from '@/lookup/states'
import months from '@/lookup/months'
import formatters from '@/formatters'
import AddressView from './AddressView'
import state from '@/state'

export default {
  components: { AddressView },
  emits: ['onError'],
  setup() {
    const payment = reactive(state)

    function onSave() {
      state.errorMessage.value ="We can't save yet, we have a error with a api"
    }

    const zipCode = computed({
      get: () => payment.postalCode,
      set: val => {
        if (val && typeof val === 'string') {
          if (val.length <= 5 || val.indexOf('-') > -1) {
            payment.postalCode = val
          } else {
            payment.postalCode = `${val.substring(0, 5)}-${val.substring(
              5
            )}`
          }
        }
      },
    })

    watch(
      () => payment.billing.sameAsShipping.value,
      val => {
        if (val === true) {
          payment.clear()
        }
      }
    )

    const years = Array.from(
      { length: 10 },
      (_, i) => new Date().getFullYear() + i
    )

    return {
      payment,
      states,
      onSave,
      ...formatters,
      zipCode,
      months,
      years,
    }
  },
}
</script>
