import { Position } from "../../../utilities/input/Position";

/**
 * Instruction metadata maintains information about the original input.
 */
export interface InstructionMetadata {
  /**
   * Symbol that corresponds to an instruction as represented in the input.
   */
  symbol: string;

  /**
   * The position of the symbol within the input.
   */
  position: Position;
}