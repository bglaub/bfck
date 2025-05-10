import { Tokenizer } from "./Tokenizer";
import { Token } from "./Token";
import { TokenType } from "./TokenType";
import { TEST_DATA } from "../test-data/TestData";

/**
 * Compares generated tokens to expected tokens and evaluates that they equal.
 * 
 * @param generatedTokens the tokens generated
 * @param expectedTokens the tokens expected
 */
export const expectTokensToMatch: (generatedTokens: Token[], expectedTokens: Token[]) => void = (generatedTokens: Token[], expectedTokens: Token[]): void => {
  expect(generatedTokens.length).toEqual(expectedTokens.length);
  expectedTokens.forEach((expectedToken: Token, index: number) => {
    expect(generatedTokens[index].symbol).toEqual(expectedToken.symbol);
    expect(generatedTokens[index].type).toEqual(expectedToken.type);
    expect(generatedTokens[index].position.line).toEqual(expectedToken.position.line);
    expect(generatedTokens[index].position.column).toEqual(expectedToken.position.column);
  });
};

describe('Tokenizer', () => {
  
  /**
   * Tokenizer used by tests.
   */
  let tokenizer: Tokenizer;

  beforeEach(() => {
    tokenizer = new Tokenizer();
  });

  describe('tokenize()', () => {
    it('should return token for each lexeme', () => {
      expectTokensToMatch(
        tokenizer.tokenize(TEST_DATA.ALL_ALLOWED_SYMBOLS.LEXEMES),
        TEST_DATA.ALL_ALLOWED_SYMBOLS.TOKENS
      );
    });

    it('should ignore unknown lexemes', () => {
      expectTokensToMatch(
        tokenizer.tokenize([
          'a', 'b', 'c', 'd',
          'e', 'f', 'g', 'h',
          'i', 'j', 'k', 'l',
          'm', 'n', 'o', 'p',
          'q', 'r', 's', 't',
          'u', 'v', 'w', 'x',
          'y', 'z', 'A', 'B',
          'C', 'D', 'E', 'F',
          'G', 'H', 'I', 'J',
          'K', 'L', 'M', 'N',
          'O', 'P', 'Q', 'R',
          'S', 'T', 'U', 'V',
          'W', 'X', 'Y', 'Z',
          '`', '1', '2', '3',
          '4', '5', '6', '7',
          '8', '9', '0', '=',
          '~', '!', '@', '#',
          '$', '%', '^', '&',
          '*', '(', ')', '_',
          '{', '}', '\\', '|',
          '\'', '"', '/', '?',
          ';', ':'
        ]),
        []
      );
    });

    it('should return tokens for mixed lexemes', () => {
      expectTokensToMatch(
        tokenizer.tokenize([
          'a', 'b', 'c', 'd',
          '-', 'e', 'f', 'g',
          'h', 'i', 'j', 'k',
          'l', 'm', 'n', 'o',
          'p', 'q', 'r', 's',
          't', 'u', 'v', 'w',
          'x', 'y', 'z', 'A',
          'B', '+', 'C', 'D',
          'E', 'F', 'G', 'H',
          'I', 'J', 'K', 'L',
          'M', ']', '.', 'N',
          'O', 'P', 'Q', 'R',
          'S', 'T', 'U', 'V',
          'W', 'X', 'Y', 'Z',
          '`', '1', '2', '3',
          '4', '5', '6', '7',
          '8', ',', '9', '0',
          '[', '=', '~', '!',
          '@', '#', '$', '%',
          '^', '&', '*', '(',
          ')', '_', '<', '{',
          '}', '\\', '|', '>',
          '\'', '"', '/', '?',
          ';', ':'
        ]),
        [
          new Token('-', TokenType.DECREMENT_BYTE, {line: 1, column: 5}),
          new Token('+', TokenType.INCREMENT_BYTE, {line: 1, column: 30}),
          new Token(']', TokenType.MOVE_BACKWARD_INSTRUCTION_POINTER, {line: 1, column: 42}),
          new Token('.', TokenType.OUTPUT_BYTE, {line: 1, column: 43}),
          new Token(',', TokenType.INPUT_BYTE, {line: 1, column: 66}),
          new Token('[', TokenType.MOVE_FORWARD_INSTRUCTION_POINTER, {line: 1, column: 69}),
          new Token('<', TokenType.DECREMENT_DATA_POINTER, {line: 1, column: 83}),
          new Token('>', TokenType.INCREMENT_DATA_POINTER, {line: 1, column: 88})
        ]
      );
    });

    it('should account for lines in lexemes', () => {
      expectTokensToMatch(
        tokenizer.tokenize(TEST_DATA.NEW_LINE.LEXEMES),
        TEST_DATA.NEW_LINE.TOKENS
      );
    });

    it('should return 0 tokens when no lexemes', () => {
      expectTokensToMatch(
        tokenizer.tokenize(TEST_DATA.NO_DATA.LEXEMES),
        TEST_DATA.NO_DATA.TOKENS
      );
    });
  });
});