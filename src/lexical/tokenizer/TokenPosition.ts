/**
 * Position of a token in original source input.
 */
export interface TokenPosition {
  /**
   * The line that a token appears at.
   */
  line: number;

  /**
   * The column that a token appears at.
   */
  column: number;
}