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
        tokenizer.tokenize(TEST_DATA.ALL_IGNORED_SYBOLS.LEXEMES),
        TEST_DATA.ALL_IGNORED_SYBOLS.TOKENS
      );
    });

    it('should return tokens for mixed lexemes', () => {
      expectTokensToMatch(
        tokenizer.tokenize(TEST_DATA.MIXED_SYMBOLS.LEXEMES),
        TEST_DATA.MIXED_SYMBOLS.TOKENS
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