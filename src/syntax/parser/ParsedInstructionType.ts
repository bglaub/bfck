/**
 * The type of instructions found when parsing.
 */
export enum ParsedInstructionType {
  
  /**
   * The start of instructions.
   */
  START,

  /**
   * The operation to carry out. Could be 1 or more operators to carry out.
   */
  OPERATION,

  /**
   * The operator to carry out.
   */
  OPERATOR
}