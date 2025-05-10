import { Tokenizer } from "./Tokenizer";
import { Token } from "./Token";
import { TokenType } from "./TokenType";

describe('Tokenizer', () => {
  
  /**
   * Compares generated tokens to expected tokens and evaluates that they equal.
   * 
   * @param generatedTokens the tokens generated
   * @param expectedTokens the tokens expected
   */
  const expectTokensToMatch: (generatedTokens: Token[], expectedTokens: Token[]) => void = (generatedTokens: Token[], expectedTokens: Token[]): void => {
    expect(generatedTokens.length).toEqual(expectedTokens.length);
    expectedTokens.forEach((expectedToken, index) => {
      expect(generatedTokens[index].symbol).toEqual(expectedToken.symbol);
      expect(generatedTokens[index].type).toEqual(expectedToken.type);
      expect(generatedTokens[index].position.line).toEqual(expectedToken.position.line);
      expect(generatedTokens[index].position.column).toEqual(expectedToken.position.column);
    });
  };

  /**
   * Tokenizer used by tests.
   */
  let tokenizer: Tokenizer;

  beforeEach(() => {
    tokenizer = new Tokenizer();
  });

  describe('tokenize()', () => {
    it('should return token for each input', () => {
      expectTokensToMatch(
        tokenizer.tokenize('><+-.,[]'), 
        [
          new Token('>', TokenType.INCREMENT_DATA_POINTER, {line: 1, column: 1}),
          new Token('<', TokenType.DECREMENT_DATA_POINTER, {line: 1, column: 2}),
          new Token('+', TokenType.INCREMENT_BYTE, {line: 1, column: 3}),
          new Token('-', TokenType.DECREMENT_BYTE, {line: 1, column: 4}),
          new Token('.', TokenType.OUTPUT_BYTE, {line: 1, column: 5}),
          new Token(',', TokenType.INPUT_BYTE, {line: 1, column: 6}),
          new Token('[', TokenType.MOVE_FORWARD_INSTRUCTION_POINTER, {line: 1, column: 7}),
          new Token(']', TokenType.MOVE_BACKWARD_INSTRUCTION_POINTER, {line: 1, column: 8})
        ]
      );
    });

    it('should ignore unknown input', () => {
      expectTokensToMatch(
        tokenizer.tokenize(
          'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`1234567890=~!@#$%^&*()_{}\\|\'"/?;:'
        ),
        []
      );
    });

    it('should return tokens for mixed input', () => {
      expectTokensToMatch(
        tokenizer.tokenize(
          'abcd-efghijklmnopqrstuvwxyzAB+CDEFGHIJKLM].NOPQRSTUVWXYZ`12345678,90[=~!@#$%^&*()_<{}\\|>\'"/?;:'
        ),
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

    it('should account for lines in input', () => {
      expectTokensToMatch(
        tokenizer.tokenize('>\n<+\n-.,[\n]'),
        [
          new Token('>', TokenType.INCREMENT_DATA_POINTER, {line: 1, column: 1}),
          new Token('<', TokenType.DECREMENT_DATA_POINTER, {line: 2, column: 1}),
          new Token('+', TokenType.INCREMENT_BYTE, {line: 2, column: 2}),
          new Token('-', TokenType.DECREMENT_BYTE, {line: 3, column: 1}),
          new Token('.', TokenType.OUTPUT_BYTE, {line: 3, column: 2}),
          new Token(',', TokenType.INPUT_BYTE, {line: 3, column: 3}),
          new Token('[', TokenType.MOVE_FORWARD_INSTRUCTION_POINTER, {line: 3, column: 4}),
          new Token(']', TokenType.MOVE_BACKWARD_INSTRUCTION_POINTER, {line: 4, column: 1})
        ]
      );
    });
  });
});