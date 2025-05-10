import { Lexeme } from "../scanner/Lexeme";
import { Token } from "./Token";
import { TokenType } from "./TokenType";

/**
 * The tokenizer is meant for generating tokens from input.
 */
export class Tokenizer {

  /**
   * Mapping of token symbols to token type.
   */
  private static readonly TOKEN_MAP: Map<string, TokenType> = new Map([
    ['>', TokenType.INCREMENT_DATA_POINTER],
    ['<', TokenType.DECREMENT_DATA_POINTER],
    ['+', TokenType.INCREMENT_BYTE],
    ['-', TokenType.DECREMENT_BYTE],
    ['.', TokenType.OUTPUT_BYTE],
    [',', TokenType.INPUT_BYTE],
    ['[', TokenType.MOVE_FORWARD_INSTRUCTION_POINTER],
    [']', TokenType.MOVE_BACKWARD_INSTRUCTION_POINTER]
  ]);

  /**
   * Symbol indicating a new line in input.
   */
  private static readonly NEW_LINE_SYMBOL: string = '\n';

  constructor() {
  }

  /**
   * Extracts tokens from a give input.
   * 
   * @param input input to tokenize
   * @returns generated tokens
   */
  public tokenize(lexemes: Lexeme[]): Token[] {
    
    const tokens: Token[] = [];
    let line: number = 1;
    let column: number = 1;

    lexemes.forEach((lexeme: string) => {
      
      const tokenType: TokenType | undefined = Tokenizer.TOKEN_MAP.get(lexeme);

      if (tokenType) {
        tokens.push(
          new Token(
            lexeme,
            tokenType,
            {
              line: line,
              column: column
            }
          )
        );
      }

      if (lexeme === Tokenizer.NEW_LINE_SYMBOL) {
        line++;
        column = 1;
      } else {
        column++;
      }
    });

    return tokens;
  }
}