import { Token } from "../tokenizer/token/Token";
import { TokenType } from "../tokenizer/token/TokenType";

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
  ALL_IGNORED_SYMBOLS: {
    STRING: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`1234567890=~!@#$%^&*()_{}\\|\'"/?;:',
    LEXEMES: [
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
    ],
    TOKENS: []
  },
  MIXED_SYMBOLS: {
    STRING: 'abcd-efghijklmnopqrstuvwxyzAB+CDEFGHIJKLM].NOPQRSTUVWXYZ`12345678,90[=~!@#$%^&*()_<{}\\|>\'"/?;:',
    LEXEMES: [
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
    ],
    TOKENS: [
      new Token('-', TokenType.DECREMENT_BYTE, {line: 1, column: 5}),
      new Token('+', TokenType.INCREMENT_BYTE, {line: 1, column: 30}),
      new Token(']', TokenType.MOVE_BACKWARD_INSTRUCTION_POINTER, {line: 1, column: 42}),
      new Token('.', TokenType.OUTPUT_BYTE, {line: 1, column: 43}),
      new Token(',', TokenType.INPUT_BYTE, {line: 1, column: 66}),
      new Token('[', TokenType.MOVE_FORWARD_INSTRUCTION_POINTER, {line: 1, column: 69}),
      new Token('<', TokenType.DECREMENT_DATA_POINTER, {line: 1, column: 83}),
      new Token('>', TokenType.INCREMENT_DATA_POINTER, {line: 1, column: 88})
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