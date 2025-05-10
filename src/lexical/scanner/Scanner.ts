import { Lexeme } from "./Lexeme";

/**
 * Scanner is responsible for breaking down inputs into lexemes.
 */
export class Scanner {
  /**
   * Scans given input and breaks it down into its lexemes.
   * 
   * @param input input to break down
   * @returns lexemes of the given input
   */
  public scan(input: string): Lexeme[] {
    return input.split('');
  }
}