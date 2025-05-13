import { IDGenerator } from './IDGenerator';

describe('IDGenerator', () => {
  describe('get', () => {
    it('should generate ID', () => {
      const id: string = IDGenerator.get();
      expect(id).toBeDefined();
    });

    it('should generate unique IDs (100 IDs)', () => {
      const ids: string[] = [];

      for(let i = 0; i < 100; i++) {
        ids.push(IDGenerator.get());
      }

      for(let i = 0; i < ids.length; i++) {
        for(let j = 0; j < ids.length; j++) {
          if(i != j) {
            expect(ids[i]).not.toEqual(ids[j]);
          }
        }
      }
    });
  });
});