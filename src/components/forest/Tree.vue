<template>
  <!-- <div class="tree" style="--x:{{xPosition}} --y:2"> -->
  <div class="tree" :style="cssProps">
    <div v-if="displayTree" class="top" style="--j: 0">
      <span style="--i: 0" :style="colors.treeTop"></span>
      <span style="--i: 1" :style="colors.treeTop"></span>
      <span style="--i: 2" :style="colors.treeTop"></span>
      <span style="--i: 3" :style="colors.treeTop"></span>
    </div>
    <div v-if="displayTree" class="top" style="--j: 1">
      <span style="--i: 0" :style="colors.treeTop"></span>
      <span style="--i: 1" :style="colors.treeTop"></span>
      <span style="--i: 2" :style="colors.treeTop"></span>
      <span style="--i: 3" :style="colors.treeTop"></span>
    </div>
    <div v-if="displayTree" class="top" style="--j: 2">
      <span style="--i: 0" :style="colors.treeTop"></span>
      <span style="--i: 1" :style="colors.treeTop"></span>
      <span style="--i: 2" :style="colors.treeTop"></span>
      <span style="--i: 3" :style="colors.treeTop"></span>
    </div>
    <div v-if="displayTree" class="bottom" style="--j: 3">
      <span style="--i: 0" :style="colors.treeBottom"></span>
      <span style="--i: 1" :style="colors.treeBottom"></span>
      <span style="--i: 2" :style="colors.treeBottom"></span>
      <span style="--i: 3" :style="colors.treeBottom"></span>
    </div>

    <div class="dirt">
      <div class="grass">
        <!-- <span style="overflow-wrap: break-word; font-size:8px; color:#1f1206; font-weight: bold;">Lorem ipsum dolor situm amet etsum, consectetur adipiscing</span> -->
        <span :style="colors.dirtGrass"></span>
      </div>
      <div class="middle">
        <span style="--i: 0" :style="colors.dirtMiddle"></span>
        <span style="--i: 1" :style="colors.dirtMiddle"></span>
        <span style="--i: 2" :style="colors.dirtMiddle"></span>
        <span style="--i: 3" :style="colors.dirtMiddle"></span>
        <!-- <span style="--i:0; color:#529955">//////</span>
                <span style="--i:1; color:#529955">//////</span>
                <span style="--i:2; color:#529955">//////</span>
                <span style="--i:3; color:#529955">//////</span> -->
      </div>
      <span class="shadow" :style="colors.shadow"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tree",
  // props: ['displayTree','xPosition','yPosition'],
  props: {
    displayTree: Boolean,
    xPosition: Number,
    yPosition: Number,
    displayStyle: String,
  },
  computed: {
    cssProps() {
      return "--x:" + this.xPosition + ";--y:" + this.yPosition;
    },
    colors() {
      // its used only when we need a separate static styled looking tree

      // treeTop     background: linear-gradient(90deg, var(--treeColor), var(--treeDarkColor));
      // treeBottom     background: linear-gradient(90deg, var(--dirtBottomColor), var(--dirtBottomDarkColor));
      // shadow     background: var(--mainDarkColor);
      //dirtMiddle     background: linear-gradient(90deg, var(--dirtBottomColor), var(--dirtBottomDarkColor));    border-top: 15px solid var(--dirtDarkColor);
      //background: linear-gradient(90deg, var(--dirtColor), var(--dirtDarkColor));

      if (this.displayStyle === "cyber") {
        return {
          treeTop: "background: linear-gradient(90deg, #11dcfe, #f34554);",
          treeBottom: "background: linear-gradient(90deg, #8a262e, #212121);",
          shadow: " background: #112c33;",
          dirtMiddle:
            "background: linear-gradient(90deg, #8a262e, #212121); border: none; border-top: 15px solid #212121;",
          dirtGrass: "background: linear-gradient(90deg, #0a8f9b, #212121); border: none;",
        };
      } else if (this.displayStyle === "vscode") {
        return {
          treeTop: "background: linear-gradient(90deg, #29522b, #529955);",
          treeBottom: "background: linear-gradient(90deg, #442404, #1f1206);",
          shadow: " background: #182e19;",
          dirtMiddle:
            "background: linear-gradient(90deg, #442404, #1f1206); border: none; border-top: 15px solid #396839;",
          dirtGrass: "background: linear-gradient(90deg, #427e42, #396839); border: none;",
        };
      } else if (this.displayStyle === "matrix") {
        return {
          treeTop: "background: linear-gradient(90deg, #0f0, #000);",
          treeBottom: "background: linear-gradient(90deg, #0f0, #000);",
          shadow: " background: #000;",
          dirtMiddle:
            "background: linear-gradient(90deg, #000, #000); border-top: 15px solid #000; border: 3px solid #0f0",
          dirtGrass: "background: linear-gradient(90deg, #000, #000); border: 3px solid #0f0",
        };
      } else
        return {
          treeTop: "",
          treeBottom: "",
          shadow: "",
          dirtMiddle: "",
          background: "",
        };
    },
  },
};
</script>


<style scoped>
.tree {
  position: absolute;
  top: 15px;
  left: 15px;
  width: 50px;
  /* main size determinant */
  height: 50px;
  /* main size determinant */
  transform-style: preserve-3d;
  transform: rotateX(-20deg) rotateY(30deg) translateX(calc(var(--x) * 50px))
    translateZ(calc(var(--y) * 50px));
}

/* refers to all divs that are tree children */
.tree div {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transform: translateY(calc(25px * var(--j)));
  /* 50% height width */
}

.tree div.top span {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* background: linear-gradient(90deg, #529955, #182e19); */
  background: linear-gradient(90deg, var(--treeColor), var(--treeDarkColor));
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  transform-origin: bottom;
  border-bottom: 10px solid #00000019;
  /* border-left: 10px solid red;
    border-right: 10px solid red; */
  transform: rotateY(calc(90deg * var(--i))) rotateX(30deg) translateZ(28px);
  /* change Z*/
}

.tree div.bottom {
  transform: translateX(20px) translateY(70px);
}

.tree div.bottom span {
  position: absolute;
  top: 0px;
  /* some value */
  left: 0px;
  /* -10%*/
  /* -10%*/
  width: 20%;
  /* 20% */
  height: 100%;
  background: linear-gradient(
    90deg,
    var(--treeBottomColor),
    var(--treeBottomDarkColor)
  );
  clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
  transform-origin: bottom;
  border-bottom: 10px solid #00000055;
  /* 1/5 main size */
  transform: rotateY(calc(90deg * var(--i))) translateZ(5px);
  /* Z 10% */
}

.shadow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* background: #0002; */
  background: var(--mainDarkColor);
  transform-style: preserve-3d;
  transform: translateY(180px);
  filter: blur(20px);
}

.dirt {
  position: relative;
  top: 0;
  width: 50px;
  /*width */
  height: 50px;
  /* height */
  transform-style: preserve-3d;
  transform: rotateX(-20deg) rotateY(30deg) translateX(calc(var(--x) * 100px))
    translateZ(calc(var(--y) * 100px));
}

.dirt div {
  position: absolute;
  top: 120px;
  left: 0px;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  /* transform: translateY(calc(40px * var(--j))); */
  /* transform: translateY(calc(20px * 0.5)); */
}

.dirt div.middle span {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    var(--dirtBottomColor),
    var(--dirtBottomDarkColor)
  );
  /* //clip-path: polygon(50% 0%, 0% 100%, 100% 100%); */
  transform-origin: bottom;
  border: var(--treeBorderColor);
  border-top: 15px solid var(--dirtDarkColor);
  /* 1/5 height*/
  transform: rotateY(calc(90deg * var(--i))) translateZ(25px);
  /* 1/2 height */
  /* transform: rotatex(90deg) translateZ(50px) ; */
}

.dirt div.grass span {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, var(--dirtColor), var(--dirtDarkColor));
  /* //clip-path: polygon(50% 0%, 0% 100%, 100% 100%); */
  transform-origin: bottom;
  transform: rotatex(90deg) translateY(25px) translateZ(50px);
  /*1/2, 1 height */
  border: var(--treeBorderColor);
}
</style>