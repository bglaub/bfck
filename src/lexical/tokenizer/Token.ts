import { TokenPosition } from "./TokenPosition";
import { TokenSymbol } from "./TokenSymbol";
import { TokenType } from "./TokenType";

/**
 * A token which represents a piece of input.
 */
export class Token {
  /**
   * Symbol of the token.
   */
  public readonly symbol: TokenSymbol;

  /**
   * Type of the token.
   */
  public readonly type: TokenType;

  /**
   * Position of the token.
   */
  public readonly position: TokenPosition;

  constructor(symbol: TokenSymbol, type: TokenType, position: TokenPosition) {
    this.symbol = symbol;
    this.type = type;
    this.position = position;
  }

  /**
   * Converts token to string representation.
   * 
   * @returns token as string
   */
  public toString(): string {
    return `TOKEN_SYMBOL: ${this.symbol}\nTOKEN_TYPE: ${this.type}\nPOSITION: Ln ${this.position.line}, Col ${this.position.column}`;
  }
}