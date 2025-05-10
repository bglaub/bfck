import { Token } from "./Token";
import { TokenType } from "./TokenType";

describe('Token', () => {
  it('should create with correct values', () => {
    const token = new Token(',', TokenType.INPUT_BYTE, {line: 1, column: 120});
    expect(token.symbol).toEqual(',');
    expect(token.type).toEqual(TokenType.INPUT_BYTE);
    expect(token.position.line).toEqual(1);
    expect(token.position.column).toEqual(120);
  });

  describe('toString()', () => {
    it('should return correct string representation', () => {
      const token = new Token(',', TokenType.INPUT_BYTE, {line: 1, column: 120});
      expect(token.toString()).toEqual('TOKEN_SYMBOL: ,\nTOKEN_TYPE: 6\nPOSITION: Ln 1, Col 120');
    });
  });
});