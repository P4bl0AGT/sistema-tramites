import { beforeEach, describe, expect, it } from 'vitest';
import { storageService } from './storage.service';

describe('storageService', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('stores and reads strings', () => {
    storageService.set('sample', 'value');

    expect(storageService.get('sample')).toBe('value');
  });

  it('stores and reads JSON safely', () => {
    storageService.setJson('user', { id: 1, name: 'Test' });

    expect(storageService.getJson<{ id: number; name: string }>('user')).toEqual({
      id: 1,
      name: 'Test',
    });
  });

  it('removes invalid JSON', () => {
    storageService.set('broken', '{');

    expect(storageService.getJson('broken')).toBeNull();
    expect(storageService.get('broken')).toBeNull();
  });
});
