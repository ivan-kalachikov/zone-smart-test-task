# zone-smart-test-task

## Project description

This repository contains an implementation of test assignment for _ZoneSmart_ company.
You can get acquaintance with the task specs [here](https://docs.google.com/document/d/1AjbNrSZ3-IFuRuH6KAJU9KQc306jbuvR5XXzib21xJI/edit?usp=sharing)

In a nutshell the task is to create two components:

-   Login Page
-   Products Table

The main stack is `Vue3`, `Vuex` for state managing, `Vue Router` for routes, `Pug` for templates, `SCSS` for styling, `axios` for requests.
By requirements no UI libraries must be used.

Table actions for delete and patch items (single and bulk) are not implemented, but have a mock async methods which received all needed data and emulate async request and print data to the console. The same approach is applied for sorting, since there is no parameters for sorting provided in the task description.

Axios interceptions used for catching 401 error (exception for the login page) and call refresh action from the auth store.
Refresh action in turn check if there is refresh token and send a request to refresh. After success refreshing it tries the previous request again. Otherwise it deletes all tokens from localStorage and redirect to the login page.

The table component is implemented to be universal and used for different kind of data, the structure is described by prop `columns` which is an object describing columns structure.

To solve ongoing CORS issue (arises on `/products` request), proxy added. It can be turned off or changed to another by environmental variables (see `.env.example`)

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run your unit tests

```
npm run test:unit
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
