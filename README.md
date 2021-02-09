# Financial Goal App

Simple app created with a basic login system that display saving goals where the user can set a month and a goal amount to display how much time and money he's got to invest monthly to reach his objetive.

Register a user and choose a saving goal to set it's information, you can reedit it in the future by clicking on it on the app root.

To run the project, first you got to get it's dependencies running the following command:

```
yarn install
```

Since this was not meant for build it uses `VUE_CLI` default compiler, which has the following commands:

```
yarn server     -   Run Local API
yarn app        -   Run App
yarn test:unit  -   Unit Tests

This project is meant to work running both `yarn server` and `yarn app` commands.

```

Users and their information are stored locally on `db.json`, that serves as a database for the API calls, you can see the changes live by simply opening the JSON file while using the application.

Registered users are stored on it, but saving goals and user session are stored on the app, so if you refresh the page or exit the application all this info is gone and has to be done again. This is simply a design choice to display all of the app's functionalities.

Since "v-model" is not working correctly on mobile devices ( check this thread for further information: https://github.com/vuejs/vue/issues/8231 ), this
project uses " :value | v-on:input " to sync data with inputs, which is not a good pattern but works correctly on any device.

This project used BEM CSS Pattern ( http://getbem.com/naming/ ).

Extensions:
json-server
V-money
vue-class-components
Vue-property-decorator
