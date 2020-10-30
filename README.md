# Financial Goal App

Simple app created to inform that gathers a month and a goal amount to display how much time and money a person got to invest monthly to reach her objetive.

To run the project, first you got to get it's dependencies running the following command:

```
yarn install
```

Since this was not meant for build, it uses `VUE_CLI` compiler, to run it locally run:

```
yarn serve -        Local Server
yarn test:unit -    Unit Tests
```

Since "v-model" is not working correctly on mobile devices ( check this thread for further information: https://github.com/vuejs/vue/issues/8231 ), this
project uses " :value | v-on:input " to sync data with inputs, which is not a good pattern but works correctly on any device.

This project used BEM CSS Pattern ( http://getbem.com/naming/ ).

Extensions:
V-money
vue-class-components
Vue-property-decorator
