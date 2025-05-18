import { Token } from "../../../lexical/tokenizer/token/Token";
import { TreeNode } from "../../../structures/tree/TreeNode";
import { ParsedInstruction } from "./ParsedInstruction";
import { ParsedInstructionOperation } from "./ParsedInstructionOperation";

/**
 * Tree node in a parse tree.
 */
export class ParseTreeNode extends TreeNode<ParsedInstruction> {
  constructor(operation: ParsedInstructionOperation, token?: Token) {
    super({
      operation: operation,
      token: token ? token : null
    });
  }
}