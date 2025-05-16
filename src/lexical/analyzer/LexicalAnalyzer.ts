import { Scanner } from "../scanner/Scanner";
import { Token } from "../tokenizer/token/Token";
import { Tokenizer } from "../tokenizer/Tokenizer";

/**
 * Lexical analyzer is responsible for turning input into tokens and performing
 * a lexical analysis in the process.
 */
export class LexicalAnalyzer {
  /**
   * Analyzes input into tokens.
   * 
   * @param input input to turn into tokens
   * @returns tokens that represent the input
   */
  public analyze(input: string): Token[] {
      return (new Tokenizer()).tokenize(
        (new Scanner()).scan(input)
      );
    
  }
}