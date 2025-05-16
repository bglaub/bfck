import { Token } from "../../lexical/tokenizer/Token";
import { ParsedInstructionType } from "./ParsedInstructionType";

/**
 * A parsed instruction is the instruction found when parsing the tokens.
 */
export interface ParsedInstruction {
  instruction: ParsedInstructionType,
  token: Token | null
}