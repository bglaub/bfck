import { Parser } from './Parser';
import { TokenType } from '../../lexical/tokenizer/token/TokenType';
import { Position } from '../../utilities/input/Position';
import { InstructionOperation } from './Instruction/InstructionOperation';
describe('Parser', () => {
  
  /**
   * Parser used for tests.
   */
  const parser: Parser = new Parser();

  describe('parse', () => {
    it('should parse a simple token list into an instruction tree', () => {
      const tokens = [
        { type: TokenType.INCREMENT_DATA_POINTER, symbol: '>', position: { line: 1, column: 1 } },
        { type: TokenType.INCREMENT_BYTE, symbol: '+', position: { line: 1, column: 2 } },
        { type: TokenType.MOVE_FORWARD_INSTRUCTION_POINTER, symbol: '[', position: { line: 1, column: 3 } },
        { type: TokenType.DECREMENT_BYTE, symbol: '-', position: { line: 1, column: 4 } },
        { type: TokenType.MOVE_BACKWARD_INSTRUCTION_POINTER, symbol: ']', position: { line: 1, column: 5 } },
        { type: TokenType.OUTPUT_BYTE, symbol: '.', position: { line: 1, column: 6 } }
      ];

      const instructionTree = parser.parse(tokens);

      // Validate the structure of the instruction tree
      const firstNode = instructionTree.getFirstChild();
      expect(firstNode).toBeDefined();
      expect(firstNode?.data.operation).toBe(InstructionOperation.INCREMENT_DATA_POINTER);

      const secondNode = firstNode?.getRightSibling();
      expect(secondNode).toBeDefined();
      expect(secondNode?.data.operation).toBe(InstructionOperation.INCREMENT_BYTE);

      const loopNode = secondNode?.getRightSibling();
      expect(loopNode).toBeDefined();
      expect(loopNode?.data.operation).toBe(InstructionOperation.LOOP);

      const loopChild = loopNode?.getFirstChild();
      expect(loopChild).toBeDefined();
      expect(loopChild?.data.operation).toBe(InstructionOperation.DECREMENT_BYTE);

      const outputNode = loopNode?.getRightSibling();
      expect(outputNode).toBeDefined();
      expect(outputNode?.data.operation).toBe(InstructionOperation.OUTPUT_BYTE);
    });
  });
});