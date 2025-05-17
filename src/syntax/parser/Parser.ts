import { Token } from "../../lexical/tokenizer/Token";
import { TokenType } from "../../lexical/tokenizer/TokenType";
import { ParsedInstructionType } from "./ParsedInstructionType";
import { ParseTreeNode } from "./ParseTreeNode";

/**
 * Parser is responsible for taking tokens and turning them into a parse tree.
 */
export class Parser {
  
  public parse(tokens: Token[]): ParseTreeNode {
    const root: ParseTreeNode = this.getStartNode();
    this.buildParseTree(root, tokens.toReversed());
    return root;
  }

  private buildParseTree(currentNode: ParseTreeNode, remainingTokens: Token[]) {
    if(!remainingTokens.length) {
      return;
    }

    let nextNode: ParseTreeNode = currentNode;
    const currentToken: Token = remainingTokens.pop() as Token;

    if(currentToken.type === TokenType.MOVE_FORWARD_INSTRUCTION_POINTER) {
      let operation: ParseTreeNode = this.getOperationNode();
      operation.addChild(this.getOperatorNode(currentToken));
      currentNode.addChild(operation);
      nextNode = operation;
    } else if(currentToken.type === TokenType.MOVE_BACKWARD_INSTRUCTION_POINTER) {
      let operator: ParseTreeNode = this.getOperatorNode(currentToken);
      currentNode.addChild(operator);
      if (!operator?.getParent()?.getParent()) {
        throw new Error('There is a ] without a starting [');
      }
      nextNode = operator?.getParent()?.getParent() as ParseTreeNode;
    } else {
      currentNode.addChild(this.getOperatorNode(currentToken));
    }

    this.buildParseTree(nextNode, remainingTokens);
  }

  private getStartNode(): ParseTreeNode {
    return new ParseTreeNode(ParsedInstructionType.START);
  }
  
  private getOperationNode(): ParseTreeNode {
    return new ParseTreeNode(ParsedInstructionType.OPERATION);
  }

  private getOperatorNode(token: Token): ParseTreeNode {
    return new ParseTreeNode(ParsedInstructionType.OPERATOR, token);
  }
}