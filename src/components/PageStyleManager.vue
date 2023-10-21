<template></template>

<script>
import { store } from '@/store/store'

export default {
    name: "PageStyleManager",
    components: {

    },
    data() {
        return {
            store,
            colorNames: ["--mainColor", "--mainDarkColor", "--treeColor", "--treeDarkColor", "--dirtColor", "--dirtDarkColor", "--dirtBottomColor", "--dirtBottomDarkColor"],
            styles: {
                "vscode": ["#529955", "#182e19", "#29522b", "#529955", "#427e42", "#396839", "#442404", "#1f1206"],
                "vscode": ["#0f0", "#0f0", "#0f0", "#0f0", "#0f0", "#0f0", "#0f0", "#0f0"],
                "cyberpunk": ["#f34554", "#112c33", "#11dcfe", "#f34554", "#0a8f9b", "#212121", "#8a262e", "#212121"],
            },

        };
    },
    computed: {
        changeClass() {
            if (store.userData != null) {
                return store.userData.chosen_style;
            } else return false;
        }
    },
    watch: {
        changeClass(newChangeClass, oldChangeClass) {
            if (newChangeClass) {
                for (let i = 0; i < this.colorNames.length; i++) {
                    document.body.style.setProperty(this.colorNames[i], this.styles["cyberpunk"][i]);
                }
            } else {
                for (let i = 0; i < this.colorNames.length; i++) {
                    document.body.style.setProperty(this.colorNames[i], this.styles["vscode"][i]);
                }
            }
        },
    },
    created() {



    }
};
</script>

<style scoped></style>