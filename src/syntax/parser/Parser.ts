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

    let currentNode = root;

    tokens.forEach((token: Token) => {
      if(token.type === TokenType.MOVE_FORWARD_INSTRUCTION_POINTER) {
        let operation: ParseTreeNode = this.getOperationNode();
        operation.addChild(this.getOperatorNode(token));
        currentNode = operation;
      } else if(token.type === TokenType.MOVE_BACKWARD_INSTRUCTION_POINTER) {
        currentNode.addChild(this.getOperatorNode(token));
        // if(currentNode.getParent().getParent()) {  }
      } else {
        currentNode.addChild(this.getOperatorNode(token));
      }
    });
    
    return root;
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