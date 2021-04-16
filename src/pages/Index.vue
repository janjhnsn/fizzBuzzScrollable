<template>
  <Layout>
    <div class="counter">
      <p>{{ centerItemFizzBuzz }}/{{ numberOfItems }}</p>
      <input v-model="centerItem" />
    </div>
    <ol>
      <li :id="'item-' + index" v-for="(item, index) in numberOfItems"></li>
    </ol>
  </Layout>
</template>

<script>
import { debounce } from "../functions";

export default {
  name: "FizzBuzz",
  metaInfo: {
    title: "FizzBuzz scrollable!"
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
        this.numberOfItems = +newValue + this.numberOfAdditionalItems;
        // go to center of newValue

        this.$nextTick(() => {
          document.documentElement.scrollTop =
            newValue * this.heightOfEachItem -
            this.numberOfVisibleItemsHalfed * this.heightOfEachItem;
        });
      }, 750)
    },
    centerItemFizzBuzz() {
      const value = this.centerItem;

      return value % 15 == 0
        ? "FizzBuzz"
        : value % 3 == 0
        ? "Fizz"
        : value % 5 == 0
        ? "Buzz"
        : value;
    },
    numberOfVisibleItemsHalfed() {
      return Math.round(
        document.documentElement.clientHeight / this.heightOfEachItem / 2
      );
    }
  },
  data() {
    return {
      numberOfItems: 150,
      heightOfEachItem: 24,
      totalScrolled: 0,
      offsetHeight: document.documentElement.offsetHeight,
      numberOfAdditionalItems: 50
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

      if (this.totalScrolled > this.offsetHeight - 300) {
        this.numberOfItems += this.numberOfAdditionalItems;
      }
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

ol {
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
