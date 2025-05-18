import { Instruction } from './Instruction';
import { InstructionMetadata } from './InstructionMetadata';
import { InstructionOperation } from './InstructionOperation';

describe('Instruction', () => {
  describe('constructor', () => {
    it('should create with correct values', () => {
      const instruction = new Instruction(
        InstructionOperation.INPUT_BYTE, 
        {
          symbol: ',',
          position: {
            line: 1, 
            column: 120
          }
        }
      );
      expect(instruction.operation).toEqual(InstructionOperation.INPUT_BYTE);
      expect((instruction.metadata as InstructionMetadata).symbol).toEqual(',');
      expect((instruction.metadata as InstructionMetadata).position.line).toEqual(1);
      expect((instruction.metadata as InstructionMetadata).position.column).toEqual(120);
    });
  });
});