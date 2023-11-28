<template>
  <ion-page>
    <ion-content class="ion-padding">
      <div class="login-container">
        <ion-card class="login-card">
          <div class="salesIcon">
            <input type="image" class="salesI" src="/resources/icon salestop.png">
          </div>
          <ion-card-header class="login-header">
            <ion-card-title>WELCOME BACK!</ion-card-title>
            <ion-card-subtitle>Sign in to continue</ion-card-subtitle>
          </ion-card-header>
          <ion-card-content>
            <ion-item>
              <ion-label position="floating" >Username</ion-label>
              <ion-input type="text" v-model="userName" ></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="floating">Password</ion-label>
              <ion-input type="password" v-model="userPassword" ></ion-input>
            </ion-item>
            <ion-button expand="full" shape="round" @click="login" color="primary">Log in</ion-button>
            <div class="forgot-password">
              <ion-label href="/tabs" @click="forgotPassword"> <a href="/tabs">Forgot Password?</a> </ion-label>
            </div>
            
            <div class="sociales">
            
              <ion-button class="circular-button" @click="onButtonClick" color="primary">
              <ion-icon src="/resources/logo-facebook.svg" ></ion-icon>
              </ion-button>

              <ion-button class="circular-button" @click="onButtonClick" color="danger">
              <ion-icon src="/resources/logo-google.svg" ></ion-icon>
              </ion-button>

              <ion-button class="circular-button" @click="onButtonClick" color="primary">
              <ion-icon src="/resources/logo-linkedin.svg" ></ion-icon>
              </ion-button>
              <ion-card-subtitle>Don't have an account? <a href="/tabs">Sign up</a></ion-card-subtitle>

            </div>
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  </ion-page>
</template>




<script>
import { IonInput, IonButton } from "@ionic/vue";
import axios from 'axios';

export default {
  components: {
    IonInput,
    IonButton,
  },
  data() {
    return {
      userName: '',
      userPassword: '',
      apiResponse: null, // La respuesta de la API se almacenará aquí
    };
  },
  
  methods: {
  async login() {
    try {
      // Realiza la solicitud a la API y almacena la respuesta en apiResponse
      const response = await axios.get('http://127.0.0.1:3658/m1/403744-0-default/users'); // Reemplaza 'URL_DE_TU_API' con la URL real de tu API
      this.apiResponse = response.data;
      let userExists = false;
      
      // Recorre los datos en la respuesta de la API
      for (let i = 0; i < this.apiResponse.length; i++) {
        const userData = this.apiResponse[i];
        
        console.log(userData.password);
        
        //console.log(userData.user == "jshouttrr");
        //console.log(userData.password == "gN5\"K3U4U8QrNs.");
        if (userData.user == this.userName && userData.password === this.userPassword) {
          // El email del usuario existe y la contraseña
          //alert("holaaaa"); //esto es solo para probar
          
            // Las credenciales son correctas, redirige al usuario a /tabs
            this.$router.push('/tabs');
            userExists = true;
            break; // Termina el bucle, ya que hemos encontrado al usuario
          
        }
      }

      if (!userExists) {
        // El email o la contraseña son incorrectas, muestra una alerta de error
        alert('Credenciales incorrectas');
      }
    } catch (error) {
      // Maneja errores de la solicitud a la API
      console.error('Error al realizar la solicitud a la API', error);
    }
  },
},
};
</script>

<style scoped>
ion-card-title {
    --color: black;
    text-align: left;
  }
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-card {
  max-width: 400px;
  width: 90%;
  border-radius: 15px;
}

.login-header {
  text-align: left;
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
.sociales{
  text-align: center;
  }
.circular-button {
  width: 40px; /* Ancho del botón circular */
  height: 40px; /* Alto del botón circular */
  --border-radius: 50%;
  --display: flex;
  padding: 0; /* Elimina el relleno del botón */
  font-size: 80%; /* Tamaño del ícono dentro del botón */
}
.forgot-password{
  margin-top: 10%;
  text-align: center;
}

.salesI{
  width: 30%;
  height: 10%;
  margin-bottom: 10%;
}

</style>