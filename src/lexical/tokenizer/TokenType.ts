/**
 * The type that tokens can be.
 */
export enum TokenType {
   // NOTE: start off at 1 and let auto-increment handle the rest so that any
   //       truthy checks on enum values will pass
  INCREMENT_DATA_POINTER = 1,
  DECREMENT_DATA_POINTER,
  INCREMENT_BYTE,
  DECREMENT_BYTE,
  OUTPUT_BYTE,
  INPUT_BYTE,
  MOVE_FORWARD_INSTRUCTION_POINTER,
  MOVE_BACKWARD_INSTRUCTION_POINTER
}