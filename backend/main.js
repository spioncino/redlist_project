import { serve } from 'bun';
import { readFile } from 'fs/promises';
import {
  getAllRequests,
  getRequestById,
  getPaginatedRequests,
  getRequestPhoto,
  addRequest,
  updateRequestAnimal,
  updateAnimalName,
  updateRequestStatus,
  getAllRecords,
  getRecordsBySection,
  getPaginatedRecords,
  getRecordsCount,
  getRecordById,
  getFilteredRecordsCount,
  getRequestsCount,
} from './queries.js';

const setCorsHeaders = (headers = {}) => {
  return {
    ...headers,
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
    'Access-Control-Expose-Headers': 'x-total-count',
  };
};

const routes = {
  POST: {
    '/api/requ/add': async (req) => {
      const { animal, coord_x, coord_y, photo_path } = await req.json();

      if (!animal || !coord_x || !coord_y || !photo_path) {
        return new Response(JSON.stringify({ error: 'Все поляя обязательны' }), {
          status: 400,
          headers: setCorsHeaders({ 'Content-Type': 'application/json' }),
        });
      }

      const result = await addRequest({
        animal,
        coord_x,
        coord_y,
        photo_path,
        author: 'Аноним',
        date: new Date().toISOString(),
        status: 'in process',
      });

      return result
        ? new Response(JSON.stringify({ success: true, id: result.lastInsertId }), {
            status: 201,
            headers: setCorsHeaders({ 'Content-Type': 'application/json' }),
          })
        : new Response(JSON.stringify({ error: 'Не удалось добавить запись' }), { status: 500 });
    },
  },

  PUT: {
    '/api/changename/': async (req) => {
      const id = new URL(req.url).pathname.split('/').pop();
      const { animal } = await req.json();

      if (!animal)
        return new Response(JSON.stringify({ error: 'Название животного обязательно' }), {
          status: 400,
        });

      const updated = await updateAnimalName(id, animal);

      return updated
        ? new Response(JSON.stringify({ success: 'Название животного успешно обновлено' }), {
            status: 200,
          })
        : new Response(JSON.stringify({ error: 'Ошибка при измении названия животного' }), {
            status: 400,
          });
    },

    '/api/request/': async (req) => {
      const id = new URL(req.url).pathname.split('/').pop();
      const { status } = await req.json();

      try {
        const updated = await updateRequestStatus(id, status);
        return updated
          ? new Response(JSON.stringify({ message: 'Статус обновлен' }), { status: 200 })
          : new Response('Заявка не найдена', { status: 404 });
      } catch {
        return new Response('Ошибка с обновлением статуса', { status: 500 });
      }
    },
  },

  GET: {
    '/api/requests': async () => {
      const requests = await getAllRequests();

      return new Response(JSON.stringify(requests), {
        headers: setCorsHeaders({ 'Content-Type': 'application/json' }),
      });
    },

    '/api/request/': async (req) => {
      const id = new URL(req.url).pathname.split('/').pop();

      if (!id || isNaN(id))
        return new Response(JSON.stringify({ error: 'Ошибка с ID' }), { status: 400 });

      const request = await getRequestById(Number(id));

      return request
        ? new Response(JSON.stringify(request), {
            headers: setCorsHeaders({ 'Content-Type': 'application/json' }),
          })
        : new Response(JSON.stringify({ error: 'Заявка не найдена' }), { status: 404 });
    },

    '/api/requests/paginated': async (req) => {
      const limit = parseInt(req.url.searchParams.get('limit') || '10');
      const offset = parseInt(req.url.searchParams.get('offset') || '0');

      const [requests, count] = await Promise.all([
        getPaginatedRequests(limit, offset),
        getRequestsCount(),
      ]);

      return new Response(JSON.stringify({ count, requests }), {
        headers: setCorsHeaders({ 'Content-Type': 'application/json' }),
      });
    },

    '/api/req/photo/': async (req) => {
      const id = new URL(req.url).pathname.split('/').pop();
      const filePath = `./requests/${id}.png`;

      try {
        const file = await readFile(filePath);
        return new Response(file, { headers: setCorsHeaders({ 'Content-Type': 'image/png' }) });
      } catch {
        return new Response('Изображение не найдено', { status: 404 });
      }
    },

    '/api/records': async () => {
      const records = await getAllRecords();

      return new Response(JSON.stringify(records), {
        headers: setCorsHeaders({ 'Content-Type': 'application/json' }),
      });
    },

    '/api/records/section': async (req) => {
      const section = req.url.searchParams.get('section');

      // #FIXME | не забыть доработать
      if (!section) return new Response(JSON.stringify({ error: '-' }), { status: 400 });

      const records = await getRecordsBySection(section);
      return new Response(JSON.stringify(records), {
        headers: setCorsHeaders({ 'Content-Type': 'application/json' }),
      });
    },

    '/api/records/paginated': async (req) => {
      const limit = parseInt(req.url.searchParams.get('limit') || '10');
      const offset = parseInt(req.url.searchParams.get('offset') || '0');
      const section = req.url.searchParams.get('section');
      const distribution = req.url.searchParams.get('distribution');
      const search = req.url.searchParams.get('search');

      const [records, filteredCount] = await Promise.all([
        getPaginatedRecords(limit, offset, section, distribution, search),
        getFilteredRecordsCount(limit, offset, section, distribution, search),
      ]);

      return new Response(JSON.stringify({ totalCount: filteredCount, records }), {
        headers: setCorsHeaders({ 'Content-Type': 'application/json' }),
      });
    },
  },
};

serve({
  async fetch(req) {
    const url = new URL(req.url);
    const method = req.method;
    const path = url.pathname;

    if (method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: setCorsHeaders() });
    }

    for (const [httpMethod, routeMap] of Object.entries(routes)) {
      if (routeMap[path] && method === httpMethod) {
        return routeMap[path](req);
      }
    }

    return new Response('Здесь пусто', { status: 404, headers: setCorsHeaders() });
  },
  port: 3000,
});
