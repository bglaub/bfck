import { IDGenerator } from './IDGenerator';

describe('IDGenerator', () => {
  describe('get', () => {
    it('should generate ID', () => {
      const id: string = IDGenerator.get();
      expect(id).toBeDefined();
    });

    it('should generate unique IDs (10000 IDs)', () => {
      const ids = new Set();

      for(let i = 0; i < 10000; i++) {
        const id: string = IDGenerator.get();
        expect(ids.has(id)).toEqual(false);
        ids.add(id);
      }
    });
  });
});