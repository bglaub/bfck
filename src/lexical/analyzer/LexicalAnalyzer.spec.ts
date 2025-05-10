import { TEST_DATA } from "../test-data/TestData";
import { expectTokensToMatch } from "../tokenizer/Tokenizer.spec";
import { LexicalAnalyzer } from './LexicalAnalyzer';

describe('Analyzer', () => {
  
  /**
   * Analyzer used for tests.
   */
  const analyzer: LexicalAnalyzer = new LexicalAnalyzer();

  describe('analyze()', () => {
    it('should return token for each input', () => {
      expectTokensToMatch(
        analyzer.analyze(TEST_DATA.ALL_ALLOWED_SYMBOLS.STRING),
        TEST_DATA.ALL_ALLOWED_SYMBOLS.TOKENS
      );
    });

    it('should account for lines in input', () => {
      expectTokensToMatch(
        analyzer.analyze(TEST_DATA.NEW_LINE.STRING),
        TEST_DATA.NEW_LINE.TOKENS
      );
    });

    it('should return 0 tokens when no input', () => {
      expectTokensToMatch(
        analyzer.analyze(TEST_DATA.NO_DATA.STRING),
        TEST_DATA.NO_DATA.TOKENS
      );
    });
  })
});