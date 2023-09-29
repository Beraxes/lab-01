<template>
  <ion-page>
    <ion-content class="ion-padding">
      <div class="login-container">
        <ion-card class="login-card">
          <ion-card-header class="login-header">
            <ion-card-title>Iniciar sesión</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-item>
              <ion-label position="floating">Correo electrónico</ion-label>
              <ion-input type="text" v-model="email"></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="floating">Contraseña</ion-label>
              <ion-input type="password" v-model="password"></ion-input>
            </ion-item>
            <ion-button href="/tabs" expand="full" shape="round" @click="login" color="primary">Iniciar sesión</ion-button>
            <ion-label class="forgot-password" @click="forgotPassword">¿Olvidaste tu contraseña?</ion-label>
            
            <div class="sociales">
            
              <ion-button class="circular-button" @click="onButtonClick" color="primary">
              <ion-icon src="/resources/logo-facebook.svg" ></ion-icon>
              </ion-button>
              <ion-button class="circular-button" @click="onButtonClick" color="danger">
              <ion-icon src="/resources/logo-google.svg" ></ion-icon>
              </ion-button>

            </div>
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  </ion-page>
</template>




<script>
import { IonButton } from "@ionic/vue";

export default {
  components: {
    IonButton,
  },
  data() {
    return {
      email: '',
      password: '',
    };
  },
  
  methods: {
    login() {
      // Aquí puedes agregar la lógica de inicio de sesión
      // Por ejemplo, enviar los datos de inicio de sesión a un servidor
      // y manejar la respuesta.
    },
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-card {
  max-width: 400px;
  width: 90%;
}

.login-header {
  text-align: center;
}

ion-button {
  margin-top: 20px;
}

ion-input {
  --ion-input-background: white;
}

ion-card {
  --ion-card-background: white;
  --ion-card-border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* iconos y inicio social */
.circular-button {
  width: 40px; /* Ancho del botón circular */
  height: 40px; /* Alto del botón circular */
  --border-radius: 50%;
  --display: flex;
  padding: 0; /* Elimina el relleno del botón */
  font-size: 80%; /* Tamaño del ícono dentro del botón */
}

</style>