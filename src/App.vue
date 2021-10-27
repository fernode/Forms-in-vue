<template>
  <Error :error="errorMessage" />
  <payments-view @onError="reportError"/>
</template>

<script>
import { ref } from 'vue'
import PaymentsView from '@/views/PaymentsView'
import Error from '@/components/Error'

export default {
  components: {
    PaymentsView,
    Error,
  },
  setup() {
    const errorMessage = ref('')
    function reportError(msg) {
      errorMessage.value = msg
    }
    return {
      errorMessage,
      reportError
    }
  },
}
</script>
