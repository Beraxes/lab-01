import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import { IonicVue } from "@ionic/vue";

/* Core CSS required for Ionic components to work properly */
import "@ionic/vue/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/vue/css/normalize.css";
import "@ionic/vue/css/structure.css";
import "@ionic/vue/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/vue/css/padding.css";
import "@ionic/vue/css/float-elements.css";
import "@ionic/vue/css/text-alignment.css";
import "@ionic/vue/css/text-transformation.css";
import "@ionic/vue/css/flex-utils.css";
import "@ionic/vue/css/display.css";

/* Theme variables */
import "./theme/variables.css";

//cambios desde aqui
import { Capacitor } from "@capacitor/core";
import {
  CapacitorSQLite,
  SQLiteConnection,
  SQLiteDBConnection,
} from "@capacitor-community/sqlite";
import { JeepSqlite } from "jeep-sqlite/dist/components/jeep-sqlite";

customElements.define("jeep-sqlite", JeepSqlite);
console.log(`after customElements.define`);

window.addEventListener("DOMContentLoaded", async () => {
  try {
    const platform = Capacitor.getPlatform();
    const sqlite = new SQLiteConnection(CapacitorSQLite);
    //funcion de web
    if (platform === "web") {
      // Create the 'jeep-sqlite' Stencil component
      const jeepSqliteEl = document.createElement("jeep-sqlite");
      document.body.appendChild(jeepSqliteEl);
      await customElements.whenDefined("jeep-sqlite");
      console.log(`after customElements.whenDefined`);

      // Initialize the Web store
      await sqlite.initWebStore();
      console.log(`after initWebStore`);
    }
    // example: database creation with standard SQLite statements
    const ret = await sqlite.checkConnectionsConsistency();
    const isConn = (await sqlite.isConnection("db_vite", false)).result;
    let db = null;
    if (ret.result && isConn) {
      db = await sqlite.retrieveConnection("db_vite", false);
    } else {
      db = await sqlite.createConnection(
        "db_vite",
        false,
        "no-encryption",
        1,
        false
      );
    }
    //manipulacion de la bd
    await db.open();
    console.log(`db: db_vite opened`);
    const queryCreateTable = `
          CREATE TABLE IF NOT EXISTS test (
          id INTEGER PRIMARY KEY NOT NULL,
          name TEXT NOT NULL
          );
          `;
    const respCT = await db.execute(queryCreateTable);
    console.log(`res: ${JSON.stringify(respCT)}`);
    //tabla software
    const queryCreateTableSoftware = `
          CREATE TABLE IF NOT EXISTS software (
          id INTEGER PRIMARY KEY NOT NULL,
          name TEXT NOT NULL
          );
          `;
    const respCTSoftware = await db.execute(queryCreateTableSoftware);
    console.log(`res: ${JSON.stringify(respCTSoftware)}`);
    //tabla hardware
    const queryCreateTablehardware = `
          CREATE TABLE IF NOT EXISTS hardware (
          id INTEGER PRIMARY KEY NOT NULL,
          name TEXT NOT NULL
          );
          `;
    const respCTHardware = await db.execute(queryCreateTablehardware);
    console.log(`res: ${JSON.stringify(respCTHardware)}`);
    //insertar datos
    const respIT = await db.query(`INSERT INTO test (id, name) values (?,?)`,
    [Date.now(),'NAME '+Date.now()]
    );
    
    console.log(`res: ${JSON.stringify(respIT)}`);
    //Select datos
    const respSelecT = await db.query(`SELECT * FROM test`);
    
    console.log(`res: ${JSON.stringify(respSelecT)}`);
    
    await sqlite.closeConnection("db_vite", false);

    //inicializacion de ionic
    const app = createApp(App).use(IonicVue).use(router);
    router.isReady().then(() => {
      app.mount("#app");
    });
  } catch (error) {
    console.log(error);
  }
});
