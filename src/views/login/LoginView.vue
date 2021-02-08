<template>
  <div class="login">
    <p class="login__title">{{ languageModule.getStrings["home-title"] }}</p>
    <form @submit.prevent="userLogin" class="login__content">
      <label>Email</label>
      <input
        :value="userInfo.email"
        @input="setFormData('email', $event.target.value)"
        v-on:blur="checkFieldError('email')"
      />
      <span class="login__error-message" v-if="errors['email']">{{
        errors["email"][0]
      }}</span>

      <label>Password</label>
      <input
        type="password"
        :value="userInfo.password"
        @input="setFormData('password', $event.target.value)"
        v-on:blur="checkFieldError('password')"
      />
      <span class="login__error-message" v-if="errors['password']">{{
        errors["password"][0]
      }}</span>

      <button
        :disabled="!isFormValid || loadingLogin"
        class="login__submit"
        type="submit"
      >
        <div v-if="loadingLogin" class="spin">
          <simple-svg :src="iconLoading"></simple-svg>
        </div>
        <p v-else>
          Entrar
        </p>
      </button>
      <p @click="goToRegister" class="login__register">Register</p>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import SavingInfoCard from "@/components/display/SavingInfoCard.vue";
import { LanguageModule } from "@/store/language/LanguageModule";

import validator from "./validate";
import { ILoginRequest } from "@/models/user";
import userAPI from "@/services/user";

const iconLoading = require("@/assets/icons/ic_loading.svg");

@Component({
  components: {
    SavingInfoCard,
  },
})
export default class LoginView extends Vue {
  private languageModule = LanguageModule;
  private userAPI = userAPI;
  private validation = validator;
  private errors: any = {};

  private iconLoading = iconLoading;
  private loadingLogin = false;

  private userInfo: ILoginRequest = {
    email: "",
    password: "",
  };

  private created() {
    this.checkFormValidation();
  }

  private async setFormData(fieldName: string, value: string) {
    this.userInfo = {
      ...this.userInfo,
      [fieldName]: value,
    };

    this.checkFormValidation(fieldName);
  }

  private async checkFieldError(fieldName: string) {
    try {
      await this.validation.validate(this.userInfo, false);

      this.errors = {};
    } catch (errors) {
      const currentFieldHasError = errors[fieldName];

      this.errors[fieldName] = currentFieldHasError ? errors[fieldName] : null;
      this.$forceUpdate();
    }
  }

  private async checkFormValidation(removeErrorFromSpecificField?: string) {
    try {
      await this.validation.validate(this.userInfo, false);

      this.errors = {};
    } catch (errors) {
      const specificFieldHasNoError =
        removeErrorFromSpecificField && !errors[removeErrorFromSpecificField];
      if (specificFieldHasNoError) {
        this.errors[removeErrorFromSpecificField!] = null;
      }
      this.$forceUpdate();
    }
  }

  private async userLogin() {
    this.loadingLogin = true;

    setTimeout(async () => {
      try {
        const response = await this.userAPI.userLogin({
          email: this.userInfo.email,
          password: this.userInfo.password,
        });
      } catch (error) {
        const loginError = error.error;

        if (loginError) {
          switch (loginError) {
            case "no_user":
              this.errors["email"] = ["Não existe usuário com este e-mail"];
              break;
            case "wrong_password":
              this.errors["password"] = ["Senha incorreta"];
              break;
          }
        }
      }

      this.loadingLogin = false;
    }, 1000);
  }

  private goToRegister() {
    this.$router.push({ path: "/register" });
  }

  private get isFormValid() {
    return this.validation.isValid();
  }
}
</script>

<style scoped lang="less">
@mobile: ~"only screen and (max-width: 560px)";
@tablet: ~"only screen and (max-width: 1135px)";

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.spin {
  display: flex;
  align-items: center;
  justify-content: center;
  animation: spin 1.2s infinite linear;
}

.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: calc(100vh - 79px);
  max-width: 1135px;
  margin: 0 auto;

  &__title {
    width: 100%;
    margin-bottom: var(--spacing-l);
    text-align: center;
    font-size: 32px;
    line-height: 40px;
    font-weight: 600;
  }

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: var(--spacing-xs) var(--spacing-n) var(--spacing-l);
    width: 320px;
    box-sizing: border-box;
    background: var(--theme-element-background);
    border: 1px solid var(--theme-element-border);
    border-radius: 12px;

    label {
      width: 100%;
      text-align: left;
      font-size: 16px;
      line-height: 24px;
      font-weight: 600;
      margin-top: 8px;
    }

    input {
      width: calc(100% - 10px);
      padding: 5px;
      border: 1px solid var(--theme-text-description);
      border-radius: 4px;
    }

    @media @tablet {
      width: 100%;
    }
  }

  &__submit {
    width: 100%;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border: none;
    align-self: center;
    border-radius: 32px;
    font-weight: bold;
    font-size: 18px;
    padding: var(--spacing-s);
    background: var(--theme-main-color);
    color: var(--theme-text-overMain);
    margin-top: var(--spacing-n);
    transition: 0.2s ease-in background;

    &:disabled {
      background: var(--theme-element-border);
    }

    p {
      width: 100%;
    }
  }

  &__error-message {
    color: var(--theme-feedback-negative);
    margin-top: 6px;
    font-size: 13px;
  }

  &__register {
    margin-top: var(--spacing-s);
    font-weight: bold;
    text-decoration: underline;
    cursor: pointer;
  }
}
</style>
