import { TEST_DATA } from '../test-data/TestData';
import { Lexeme } from './Lexeme';
import { Scanner } from './Scanner';

describe('Scanner', () => {

  /**
   * Compares generated lexemes to expected lexemes and evaluates that they
   * equal.
   * 
   * @param generatedLexemes the lexemes generated
   * @param expectedLexemes the lexemes expected
   */
  const expectLexemesToMatch: (generatedLexemes: Lexeme[], expectedLexemes: Lexeme[]) => void = (generatedLexemes: Lexeme[], expectedLexemes: Lexeme[]): void => {
    expect(generatedLexemes.length).toEqual(expectedLexemes.length);
    expectedLexemes.forEach((expectedLexeme: Lexeme, index: number) => {
      expect(generatedLexemes[index]).toEqual(expectedLexeme);
    });
  };

  /**
   * Scanner used by test.
   */
  const scanner = new Scanner();

  describe('scan()', () => {
    it('should scan given input into individual lexemes', () => {
      expectLexemesToMatch(
        scanner.scan(TEST_DATA.ALL_ALLOWED_SYMBOLS.STRING),
        TEST_DATA.ALL_ALLOWED_SYMBOLS.LEXEMES
      );
    });

    it('should handle newline', () => {
      expectLexemesToMatch(
        scanner.scan(TEST_DATA.NEW_LINE.STRING),
        TEST_DATA.NEW_LINE.LEXEMES
      );
    });

    it('should scan into 0 lexemes when no input', () => {
      expectLexemesToMatch(
        scanner.scan(TEST_DATA.NO_DATA.STRING),
        TEST_DATA.NO_DATA.LEXEMES
      );
    });
  });
});