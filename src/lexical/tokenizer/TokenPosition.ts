/**
 * Position of a token.
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