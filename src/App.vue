<template>
  <Error :error="errorMessage" />
  <payments-view/>
</template>

<script>
import PaymentsView from '@/views/PaymentsView'
import Error from '@/components/Error'
import state from '@/state'

export default {
  components: {
    PaymentsView,
    Error,
  },
  setup() {
    return {
      errorMessage: state.errorMessage,
      reportError
    }
  },
}
</script>
