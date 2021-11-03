import { ref } from "vue";

export default class AddressModel {
  address1 = ref('')
  address2 = ref('')
  cityTown = ref('')
  stateProvince = ref('')
  postalCode = ref('')

  clear(){
    this.address1.value = ''
    this.address2.value = ''
    this.state.value = ''
    this.zipCode.value = ''
    this.city.value = ''
  }
}