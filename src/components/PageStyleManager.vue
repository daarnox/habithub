<template></template>

<script>
import { store } from "@/store/store";

export default {
  name: "PageStyleManager",
  components: {},
  data() {
    return {
      store,
      styles: {
        vscode: {
          "--mainColor": "#529955",
          "--mainDarkColor": "#182e19",
          "--mainTextColor": "#fff",
          "--treeColor": "#29522b",
          "--treeDarkColor": "#529955",
          "--dirtColor": "#427e42",
          "--dirtDarkColor": "#396839",
          "--treeBottomColor": "#442404",
          "--treeBottomDarkColor": "#1f1206",
          "--dirtBottomColor": "#442404",
          "--dirtBottomDarkColor": "#1f1206",
          "--treeBorderColor": "none",
          "--background1": "#1e1e1e",
          "--background2": "#202020",
          "--background3": "#252525",
          "--background4": "#2b2b2b",
          "--background5": "#1e1e1e",
          "--timerCounter": "#529955",
          "--timerBackground": "#202020",
          "--checkBox" : "#919191",
          "--buttonBorder" : "#202020",
          "--buttonBorderHover" : "#202020",
          "--taskCompletion" : "#2b2b2b",
          "--pastDayBackground" : "#2b2b2b",
        },
        cyber: {
          "--mainColor": "#f34554",
          "--mainDarkColor": "#0a1a1f",
          "--mainTextColor": "#fff",
          "--treeColor": "#11dcfe",
          "--treeDarkColor": "#f34554",
          "--dirtColor": "#0a8f9b",
          "--dirtDarkColor": "#212121",
          "--dirtBottomColor": "#8a262e",
          "--dirtBottomDarkColor": "#212121",
          "--treeBottomColor": "#8a262e",
          "--treeBottomDarkColor": "#212121",
          "--treeBorderColor": "none",
          "--background1": "#1e1e1e",
          "--background2": "#202020",
          "--background3": "#112c33",
          "--background4": "#8a272f",
          "--background5": "#1e1e1e",
          "--timerCounter": "#23e3feaa",
          "--timerBackground": "#0a1a1f",
          "--checkBox" : "#919191",
          "--buttonBorder" : "#202020",
          "--buttonBorderHover" : "#202020",
          "--taskCompletion" : "#2b2b2b",
          "--pastDayBackground" : "#52171c",
        },
        matrix: {
          "--mainColor": "#0f0",
          "--mainDarkColor": "#000",
          "--mainTextColor": "#0f0",
          "--treeColor": "#0f0",
          "--treeDarkColor": "#000",
          "--dirtColor": "#000",
          "--dirtDarkColor": "#000",
          "--treeBottomColor": "#0f0",
          "--treeBottomDarkColor": "#000",
          "--dirtBottomColor": "#000",
          "--dirtBottomDarkColor": "#000",
          "--treeBorderColor": "3px solid #0f0",
          "--background1": "#020",
          "--background2": "#000",
          "--background3": "#000",
          "--background4": "#070",
          "--background5": "#090909",
          "--timerCounter": "#0f0",
          "--timerBackground": "#000",
          "--checkBox" : "#0f0",
          "--buttonBorder" : "#040",
          "--buttonBorderHover" : "#0f0",
          "--taskCompletion" : "#0f0",
          "--pastDayBackground" : "#020",
        },
      },
    };
  },
  computed: {
    changeClass() {
      if (store.chosenStyle != null) {
        return store.chosenStyle;
      } else return "none";
    },
  },
  watch: {
    changeClass(newChangeClass, oldChangeClass) {
      if (!(newChangeClass in this.styles)) newChangeClass = "cyber";

      for (let key in this.styles[newChangeClass]) {
        document.body.style.setProperty(key, this.styles[newChangeClass][key]);
      }
    },
  },
  created() {
    const chosenStyle = localStorage.getItem('chosenStyle');
    store.chosenStyle = (chosenStyle != null) ? chosenStyle : "cyber";
  },
};
</script>

<style scoped></style>