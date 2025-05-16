import { Token } from "../../../lexical/tokenizer/token/Token";
import { ParsedInstructionOperation } from "./ParsedInstructionOperation";

/**
 * A parsed instruction is the instruction found when parsing the tokens.
 */
export interface ParsedInstruction {
  operation: ParsedInstructionOperation,
  token: Token | null
}