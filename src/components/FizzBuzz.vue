<template>
  <div>
    <div class="counter">
      <p>{{ centerItemFizzBuzz }}/{{ lastItemInView }}</p>
      <input v-model="centerItem" />
    </div>
    <div
      :style="{
        marginTop: firstItemInView * heightOfEachItem - heightOfEachItem + 'px'
      }"
    >
      <div :id="'item-' + number" v-for="number in currentRangeOfItems">
        {{ fizzBuzz(number) }}
      </div>
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
        : value;
    }
  },
  computed: {
    centerItem: {
      get: function() {
        if (this.totalScrolled < this.numberOfVisibleItemsHalfed)
          return this.numberOfVisibleItemsHalfed;

        return Math.round(
          this.totalScrolled / this.heightOfEachItem -
            this.numberOfVisibleItemsHalfed
        );
      },
      // setter
      set: debounce(function(newValue) {
        this.totalScrolled = +newValue * this.heightOfEachItem;
        window.scrollTo(0, this.totalScrolled);
        // go to center of newValue

        this.$nextTick(() => {
          document.documentElement.scrollTop =
            newValue * this.heightOfEachItem -
            this.numberOfVisibleItemsHalfed * this.heightOfEachItem;
        });
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
      return this.numberOfVisibleItems * 2;
    },
    firstItemInView() {
      const calcValue = Math.round(
        this.lastItemInView + 1 - this.numberOfVisibleItems
      );
      return calcValue > 0 ? calcValue : 0;
    },
    lastItemInView() {
      const calcValue = Math.round(this.totalScrolled / this.heightOfEachItem);
      return calcValue > this.numberOfVisibleItems
        ? calcValue
        : this.numberOfVisibleItems;
    },
    lastItemInViewDouble() {
      return this.lastItemInView * 2;
    },
    currentRangeOfItems() {
      return Array(this.lastItemInView + 1024 - this.firstItemInView + 1)
        .fill()
        .map((_, idx) => this.firstItemInView + idx);
    }
  },
  data() {
    return {
      heightOfEachItem: 24,
      totalScrolled: 0,
      offsetHeight: document.documentElement.offsetHeight
      //numberOfAdditionalItems: 3000
    };
  },
  created() {
    window.addEventListener("scroll", () => {
      // >> This value is how far we have scrolled
      // Math.round(document.documentElement.scrollTop + document.documentElement.clientHeight)
      this.totalScrolled = Math.round(
        document.documentElement.scrollTop +
          document.documentElement.clientHeight
      );

      // >> This value is max we can scroll
      // document.documentElement.offsetHeight
      this.offsetHeight = document.documentElement.offsetHeight;

      // if (this.totalScrolled > this.offsetHeight - 300) {
      //   this.numberOfItems += this.numberOfAdditionalItems;
      // }
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

/* ol {
  margin: 0;
}
li {
  list-style: decimal inside;
  line-height: 1.5em;
  margin: 0;
  padding: 0;
  position: relative;
}

li::before {
  background: var(--bg-color);
  height: 1.5em;
  display: inline-block;
  position: absolute;
  left: 0;
  width: 100%;
}

li:nth-child(3n):before {
  content: "Fizz";
}

li:nth-child(5n):before {
  content: "Buzz";
}

li:nth-child(15n):before {
  content: "FizzBuzz";
} */

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
