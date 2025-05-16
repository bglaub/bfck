import { Token } from "../../lexical/tokenizer/Token";
import { TreeNode } from "../../structures/tree/TreeNode";
import { ParsedInstruction } from "./ParsedInstruction";
import { ParsedInstructionType } from "./ParsedInstructionType";

/**
 * Tree node in a parse tree.
 */
export class ParseTreeNode extends TreeNode<ParsedInstruction> {
  constructor(instruction: ParsedInstructionType, token?: Token) {
    super({
      instruction: instruction,
      token: token ? token : null
    });
  }
}