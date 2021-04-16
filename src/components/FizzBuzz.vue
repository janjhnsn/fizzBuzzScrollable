<template>
  <div>
    <div class="counter">
      <p>
        {{ centerItemFizzBuzz.toLocaleString() }}/{{
          lastItemInView.toLocaleString()
        }}
      </p>
      <input v-model="centerItem" />
    </div>
    <div :id="'item-' + number" v-for="number in currentRangeOfItems">
      {{ fizzBuzz(number) }}
    </div>
  </div>
</template>

<script>
import { debounce } from "../functions";

export default {
  name: "FizzBuzz",
  methods: {
    fizzBuzz(value) {
      return value % 15 == 0
        ? "FizzBuzz"
        : value % 3 == 0
        ? "Fizz"
        : value % 5 == 0
        ? "Buzz"
        : value.toLocaleString();
    }
  },
  computed: {
    centerItem: {
      get: function() {
        return Math.round(
          this.totalScrolled / this.heightOfEachItem -
            this.numberOfVisibleItemsHalfed
        );
      },
      // setter
      set: debounce(function(newValue) {
        this.totalScrolled =
          (+newValue + this.numberOfVisibleItemsHalfed) * this.heightOfEachItem;
      }, 750)
    },
    centerItemFizzBuzz() {
      return this.fizzBuzz(this.centerItem);
    },
    numberOfVisibleItems() {
      return Math.round(
        document.documentElement.clientHeight / this.heightOfEachItem
      );
    },
    numberOfVisibleItemsHalfed() {
      return Math.round(this.numberOfVisibleItems / 2);
    },
    currentOfVisibleItems() {
      return this.numberOfVisibleItems;
    },
    firstItemInView() {
      const calcValue = Math.round(
        this.lastItemInView + 1 - this.numberOfVisibleItems
      );
      return calcValue;
    },
    lastItemInView() {
      const calcValue = Math.round(this.totalScrolled / this.heightOfEachItem);
      return calcValue;
    },
    currentRangeOfItems() {
      return Array(this.lastItemInView - this.firstItemInView + 1)
        .fill()
        .map((_, idx) => this.firstItemInView + idx);
    }
  },
  data() {
    return {
      heightOfEachItem: 24,
      totalScrolled: 1048
    };
  },
  mounted() {
    window.scrollTo(0, 250);
  },
  created() {
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset - 250;

      this.totalScrolled = Math.round(scrolled + this.totalScrolled);

      window.scrollTo(0, 250);
    });
  }
};
</script>

<style>
:root {
  --bg-color: rgb(24, 22, 22);
}

body {
  background-color: var(--bg-color);
  color: hotpink;
}

p {
  margin: 0;
}

input {
  width: 70px;
}

.counter {
  position: fixed;
  top: 0;
  right: 0;
  padding: 4px;
  width: 30%;
  z-index: 1;
}
</style>
