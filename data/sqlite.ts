import * as SQLite from 'expo-sqlite';
import { Restaurant } from '../types';

const DBNAME: string = "findsmiley.db";
const conn = SQLite.openDatabase(DBNAME);

function createTables() {
  conn.transaction((tx) => {
    tx.executeSql(`CREATE TABLE IF NOT EXISTS restaurant(
      id INTEGER NOT NULL PRIMARY KEY,
      name TEXT NOT NULL,
      favorite INTEGER NOT NULL DEFAULT 0 CHECK(favorite IN (0,1)),
      address TEXT NOT NULL,
      zip_code NUMERIC NOT NULL,
      city TEXT NOT NULL,
      cur_smiley INTEGER NOT NULL,
      geo_lat TEXT NOT NULL,
      geo_long TEXT NOT NULL
      );`);
    tx.executeSql(`CREATE TABLE IF NOT EXISTS notification(
      id INTEGER NOT NULL PRIMARY KEY,
      type INTEGER NOT NULL,
      date TEXT NOT NULL
      
    );`)
  });
}

export function recreateTables() {
  conn.transaction((tx) => {
    tx.executeSql(`DROP TABLE restaurant;`)
    tx.executeSql(`DROP TABLE favorite;`)
    tx.executeSql(`DROP TABLE notification;`)
  });
  createTables();
}

export function getAllStoredRestaurants(): Promise<unknown> {
  let queries: SQLite.Query[] = [
    {
      sql: "SELECT id, name, address, zip_code, city, cur_smiley, geo_lat, geo_long, favorite FROM restaurant",
      args: []
    },
  ]
  return new Promise((resolve, reject) => {
    conn.exec(queries, true, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
}

export function getFavoriteStoredRestaurants(): Promise<Restaurant[]> {
  let queries: SQLite.Query[] = [
    {
      sql: "SELECT id, name, address, zip_code, city, cur_smiley, geo_lat, geo_long, favorite FROM restaurant WHERE favorite = 1",
      args: []
    },
  ]
  return new Promise((resolve, reject) => {
    conn.exec(queries, true, (err, result) => {
      if (err) return reject(err);
      resolve((result as SQLite.ResultSet[])[0].rows as Restaurant[]);
    });
  });
}

export function getSingleFavoriteRestaurant(id: number): Promise<Restaurant> {
  let queries: SQLite.Query[] = [
    {
      sql: "SELECT id, name, address, zip_code, city, cur_smiley, geo_lat, geo_long, favorite" +
          " FROM restaurant WHERE favorite = 1 AND id = ?",
      args: [id]
    }
  ]

  return new Promise((resolve, reject) => {
    conn.exec(queries, true, (err, result) => {
      if (err) return reject(err);
      let res = (result as SQLite.ResultSet[])[0].rows[0] as Restaurant
      resolve(res)
    })
  })
}

export function toggleFavoriteStoredRestaurant(id: number): Promise<unknown> {
  let queries: SQLite.Query[] = [
    {
      sql: "UPDATE restaurant SET favorite = ((favorite | 1) - (favorite & 1)) WHERE id = ?",
      args: [id]
    },
  ]
  return new Promise((resolve, reject) => {
    conn.exec(queries, true, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
}

export function deleteStoredRestaurants(): Promise<unknown> {
  let queries: SQLite.Query[] = [
    {
      sql: "DELETE FROM restaurant",
      args: []
    },
  ]
  return new Promise((resolve, reject) => {
    conn.exec(queries, false, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
}

export function insertRestaurants(restaurants: Restaurant[]) {
  let query = "INSERT INTO restaurant (id, name, favorite, address, zip_code, city, cur_smiley," +
      " geo_lat, geo_long) values (?, ?, ?, ?, ?, ?, ?, ?, ?)";
  let args = [];
  conn.transaction((tx) => {
    for (const res of restaurants) {
      let fave;

      if (typeof res.favorite === 'undefined') fave = 0;
      else fave = res.favorite ? 1 : 0;

      args = [
        res.id,
        res.name,
        fave,
        res.address,
        res.zip_code,
        res.city,
        res.cur_smiley,
        res.geo_lat,
        res.geo_long
      ]
      tx.executeSql(query, args);
    }
  });
}

createTables();