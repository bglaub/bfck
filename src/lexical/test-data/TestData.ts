import { Token } from "../tokenizer/Token";
import { TokenType } from "../tokenizer/TokenType";

/**
 * Data that holds all the lexical representations:
 *   string, lexemes, and tokens
 *
 * for testing purposes.
 */
export const TEST_DATA = {
  NO_DATA: {
    STRING: '',
    LEXEMES: [],
    TOKENS: []
  },
  ALL_ALLOWED_SYMBOLS: {
    STRING: '><+-.,[]',
    LEXEMES: [
      '>', '<', '+', '-',
      '.', ',', '[', ']'
    ],
    TOKENS: [
      new Token('>', TokenType.INCREMENT_DATA_POINTER, {line: 1, column: 1}),
      new Token('<', TokenType.DECREMENT_DATA_POINTER, {line: 1, column: 2}),
      new Token('+', TokenType.INCREMENT_BYTE, {line: 1, column: 3}),
      new Token('-', TokenType.DECREMENT_BYTE, {line: 1, column: 4}),
      new Token('.', TokenType.OUTPUT_BYTE, {line: 1, column: 5}),
      new Token(',', TokenType.INPUT_BYTE, {line: 1, column: 6}),
      new Token('[', TokenType.MOVE_FORWARD_INSTRUCTION_POINTER, {line: 1, column: 7}),
      new Token(']', TokenType.MOVE_BACKWARD_INSTRUCTION_POINTER, {line: 1, column: 8})
    ]
  },
  NEW_LINE: {
    STRING: '>\n<+\n-.,[\n]',
    LEXEMES: [
      '>', '\n',
      '<', '+', '\n',
      '-', '.', ',', '[', '\n',
      ']'
    ],
    TOKENS: [
      new Token('>', TokenType.INCREMENT_DATA_POINTER, {line: 1, column: 1}),
      new Token('<', TokenType.DECREMENT_DATA_POINTER, {line: 2, column: 1}),
      new Token('+', TokenType.INCREMENT_BYTE, {line: 2, column: 2}),
      new Token('-', TokenType.DECREMENT_BYTE, {line: 3, column: 1}),
      new Token('.', TokenType.OUTPUT_BYTE, {line: 3, column: 2}),
      new Token(',', TokenType.INPUT_BYTE, {line: 3, column: 3}),
      new Token('[', TokenType.MOVE_FORWARD_INSTRUCTION_POINTER, {line: 3, column: 4}),
      new Token(']', TokenType.MOVE_BACKWARD_INSTRUCTION_POINTER, {line: 4, column: 1})
    ]
  }
}