<template>
  <Layout>
    <ClientOnly>
      <FizzBuzz />
    </ClientOnly>
  </Layout>
</template>

<script>
import { debounce } from "../functions";

import FizzBuzz from "../components/FizzBuzz";

export default {
  components: {
    FizzBuzz
  },
  metaInfo: {
    title: "FizzBuzz scrollable!"
  }
};
</script>
