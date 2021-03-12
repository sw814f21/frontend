import * as SQLite from 'expo-sqlite';
import { Restaurant } from '../types';

const DBNAME: string = "findsmiley.db";
const conn = SQLite.openDatabase(DBNAME);
conn.transaction((tx) => {
  tx.executeSql(`CREATE TABLE IF NOT EXISTS restaurant(
    id INTEGER NOT NULL PRIMARY KEY,
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    zip_code NUMERIC NOT NULL,
    city TEXT NOT NULL,
    cur_smiley INTEGER NOT NULL,
    geo_lat TEXT NOT NULL,
    geo_long TEXT NOT NULL,
    favorite INTEGER NOT NULL DEFAULT 0 CHECK(is_friend IN (0,1))
  );`);
});

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

export function getFavoriteStoredRestaurants(): Promise<unknown> {
  let queries: SQLite.Query[] = [
    {
      sql: "SELECT id, name, address, zip_code, city, cur_smiley, geo_lat, geo_long, favorite FROM restaurant WHERE favorite = 1",
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

export function toggleFavoriteStoredRestaurants(id: number): Promise<unknown> {
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
  let query = "INSERT INTO restaurant (id, name, address, zip_code, city, cur_smiley, geo_lat, geo_long) values (?, ?, ?, ?, ?, ?, ?, ?)";
  let args = [];
  conn.transaction((tx) => {
    for (const res of restaurants) {
      args = [
        res.id,
        res.name,
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