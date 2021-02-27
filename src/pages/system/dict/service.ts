import { request } from 'umi';
import { TableListParams, TableListItem } from './data.d';

export async function queryDict(params?: TableListParams) {
  return request('/api/sys/dict/list', {
    params,
  });
}

export async function removeDictOne(params: { id: number }) {
  return request('/api/sys/dict/delete', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function removeDict(params: { key: number[] }) {
  return request('/api/sys/dict/delete', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addDict(params: TableListItem) {
  return request('/api/sys/dict/add', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params: TableListParams) {
  return request('/api/sys/dict/update', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}
