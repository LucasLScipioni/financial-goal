<template>
  <div ref="container" /> 
</template>  
 
<script> 
  import { createElement } from "react"; 
  import { createRoot } from "react-dom/client";  
  import { HelloWorld } from "@/react-migration/HelloWorld";
  
  export default {
      inheritAttrs: false,
      props: {
        component: {
          type: Function,
          required: true,
        },
      },
      data() {
        return {
          reactRoot: null,
        };
      },
      methods: {
        updateReactComponent() {
          this.reactRoot.render(createElement(HelloWorld, this.$attrs));
        },
      },
      mounted() {
        this.reactRoot = createRoot(this.$refs.container);
        this.updateReactComponent();
      },
      destroyed() {
        this.reactRoot.unmount();
      },
      watch: {
        $attrs: {
          deep: true,
          handler() {
            this.updateReactComponent();
          },
        },
      },
    };
</script>