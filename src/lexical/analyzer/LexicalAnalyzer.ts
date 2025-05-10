import { Scanner } from "../scanner/Scanner";
import { Token } from "../tokenizer/Token";
import { Tokenizer } from "../tokenizer/Tokenizer";

/**
 * Responsible for analyzing input into tokens
 */
export class LexicalAnalyzer {
  /**
   * Analyzes input into tokens.
   * 
   * @param input 
   * @returns 
   */
  public analyze(input: string): Token[] {
      return (new Tokenizer()).tokenize(
        (new Scanner()).scan(input)
      );
    
  }
}