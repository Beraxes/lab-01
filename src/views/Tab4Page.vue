<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Software</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Software</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-item>
        <ion-input type="text" v-model="inputName"></ion-input>
        <ion-button @click="addItem">Guardar</ion-button>
      </ion-item>

      <ion-item v-for="item in items" :key="item?.id">
        <ion-label>
          {{ item.name }}
        </ion-label>
        <!-- <ion-button @click="addItem">Editar</ion-button>
        <ion-button @click="deleteItem(item.id)">Eliminar</ion-button> -->
      </ion-item>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from "@capacitor-community/sqlite";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, onIonViewDidEnter, onIonViewDidLeave, IonItem, IonLabel, IonInput } from "@ionic/vue";


const items = ref<any>();
const db = ref<SQLiteDBConnection>();
const sqlite = ref<SQLiteConnection>();
const inputName = ref<string>("");


onIonViewDidEnter(async () => {

  sqlite.value = new SQLiteConnection(CapacitorSQLite);
  const ret = await sqlite.value.checkConnectionsConsistency();
  const isConn = (await sqlite.value.isConnection("db_vite", false)).result;
  if (ret.result && isConn) {
    db.value = await sqlite.value.retrieveConnection("db_vite", false);
  } else {
    db.value = await sqlite.value.createConnection(
      "db_vite",
      false,
      "no-encryption",
      1,
      false
    );
    await loadData();
  }
});
onIonViewDidLeave(async () => {
  await sqlite.value?.closeConnection("db_vite", false);
});

//insertar dato
const addItem = async () => {
  try {
    await db.value?.open();
    const respSelecT = await db.value?.query(`INSERT INTO software (id, name) values (?,?)`,
    [Date.now(),inputName.value]);

    console.log(`res: ${JSON.stringify(respSelecT)}`);
    
    await db.value?.close();
    items.value = respSelecT?.values;
    await loadData();
    
  } catch (error) {
    console.log(error);
  } finally {
    inputName.value = "";
    await db.value?.close();
  }
}

//seleccion de la bd
const loadData = async () => {
  try {
    await db.value?.open();
    const respSelecT = await db.value?.query(`SELECT * FROM software`);

    console.log(`res: ${JSON.stringify(respSelecT)}`);
    await db.value?.close();
    items.value = respSelecT?.values;
  } catch (error) {
    console.log(error);
  }finally {
    inputName.value = "";
    await db.value?.close();
  }
/* 
  const deleteItem = async (id: number) => {
  try {
    await db.value?.open();
    const respSelecT = await db.value?.query(`DELETE FROM software WHERE id=?`,
    [id]);

    console.log(`res: ${JSON.stringify(respSelecT)}`);
    
    await db.value?.close();
    items.value = respSelecT?.values;
    await loadData();
  } catch (error) {
    console.log(error);
  } finally {
    inputName.value = "";
    await db.value?.close();
  }
} */

}
</script>
