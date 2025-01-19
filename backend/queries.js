import pool from './db.js';
import { readFile } from 'fs/promises';
import path from 'path';

async function executeQuery(query, params = []) {
  try {
    const [result] = await pool.query(query, params);
    return result;
  } catch (error) {
    console.error(error);
    throw new Error('Не удалось отправить запрос к БД');
  }
}

function handleErrorResponse(error, customMessage = 'Неизвестная ошибка') {
  console.error(error);
  return {
    error: customMessage,
  };
}

export async function addRequest({ animal, coord_x, coord_y, photo_path }) {
  const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const author = 'Аноним';
  const status = 'in process';

  const query = `
    INSERT INTO requests (date, animal, author, coord_x, coord_y, photo_path, status)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  try {
    const result = await executeQuery(query, [
      date,
      animal,
      author,
      coord_x,
      coord_y,
      photo_path,
      status,
    ]);
    return {
      id: result.insertId,
      animal,
      coord_x,
      coord_y,
      photo_path,
      status,
    };
  } catch (error) {
    return handleErrorResponse(error, 'Ошибка при добавлении заявки с сайта');
  }
}

export async function updateAnimalName(id, newAnimalName) {
  const query = `UPDATE requests SET animal = ? WHERE id = ?`;
  const result = await executeQuery(query, [newAnimalName, id]);
  return result.affectedRows > 0;
}

export async function getRequestsCount() {
  const query = 'SELECT COUNT(*) AS count FROM requests';
  const result = await executeQuery(query);
  return result[0].count;
}

export async function getAllRequests() {
  const query = 'SELECT * FROM requests';
  return await executeQuery(query);
}

export async function getRequestById(id) {
  const query = 'SELECT * FROM requests WHERE id = ?';
  const result = await executeQuery(query, [id]);
  return result[0];
}

export async function getPaginatedRequests(limit, offset) {
  const query = 'SELECT * FROM requests LIMIT ? OFFSET ?';
  return await executeQuery(query, [limit, offset]);
}

export async function getRequestPhoto(id) {
  try {
    const filePath = path.join('requests', `${id}.jpg`);
    return await readFile(filePath);
  } catch (error) {
    return null;
  }
}

export async function getAllRecords() {
  const query = 'SELECT * FROM moskvoretsky_park';
  return await executeQuery(query);
}

export async function getRecordById(id) {
  const query = 'SELECT * FROM moskvoretsky_park WHERE id = ?';
  const result = await executeQuery(query, [id]);
  return result[0];
}

export async function getRecordsCount() {
  const query = 'SELECT COUNT(*) AS count FROM moskvoretsky_park';
  const result = await executeQuery(query);
  return result[0].count;
}

export async function getFilteredRecordsCount(limit, offset, section, distribution, search) {
  const conditions = [];
  const params = [];

  if (section) {
    conditions.push('section = ?');
    params.push(section);
  }

  if (distribution) {
    conditions.push('distribution LIKE ?');
    params.push(`%${distribution}%`);
  }

  if (search) {
    conditions.push('name_ru LIKE ?');
    params.push(`%${search}%`);
  }

  const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
  const query = `SELECT COUNT(*) AS count FROM moskvoretsky_park ${whereClause}`;
  const result = await executeQuery(query, params);
  return result[0].count;
}

export async function getRecordsBySection(section) {
  const query = 'SELECT * FROM moskvoretsky_park WHERE section = ?';
  return await executeQuery(query, [section]);
}

export async function getPaginatedRecords(limit, offset, section, distribution, search) {
  const conditions = [];
  const params = [];

  if (section) {
    conditions.push('section = ?');
    params.push(section);
  }

  if (distribution) {
    conditions.push('distribution LIKE ?');
    params.push(`%${distribution}%`);
  }

  if (search) {
    conditions.push('name_ru LIKE ?');
    params.push(`%${search}%`);
  }

  const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
  const query = `SELECT * FROM moskvoretsky_park ${whereClause} LIMIT ? OFFSET ?`;
  return await executeQuery(query, [...params, limit, offset]);
}

export async function addRecord(record) {
  const {
    x,
    y,
    image,
    name_ru,
    name_lat,
    section,
    order_name,
    family,
    status,
    distribution,
    population,
    habitat_features,
    limiting_factors,
    protection_measures,
    state_changes,
    conservation_measures,
  } = record;

  const query = `INSERT INTO moskvoretsky_park 
    (x, y, image, name_ru, name_lat, section, order_name, family, status, 
     distribution, population, habitat_features, limiting_factors, protection_measures, 
     state_changes, conservation_measures) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const result = await executeQuery(query, [
    x,
    y,
    image,
    name_ru,
    name_lat,
    section,
    order_name,
    family,
    status,
    distribution,
    population,
    habitat_features,
    limiting_factors,
    protection_measures,
    state_changes,
    conservation_measures,
  ]);

  return { id: result.insertId, ...record };
}

export async function deleteRecordById(id) {
  const query = 'DELETE FROM moskvoretsky_park WHERE id = ?';
  const result = await executeQuery(query, [id]);
  return result.affectedRows > 0;
}

export async function updateRecordById(id, updatedData) {
  const keys = Object.keys(updatedData);
  const values = Object.values(updatedData);
  const setClause = keys.map((key) => `${key} = ?`).join(', ');
  const query = `UPDATE moskvoretsky_park SET ${setClause} WHERE id = ?`;
  const result = await executeQuery(query, [...values, id]);
  return result.affectedRows > 0;
}
