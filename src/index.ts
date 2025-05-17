import { FileReader } from "./input/FileReader";
import { LexicalAnalyzer } from "./lexical/analyzer/LexicalAnalyzer";
import { Token } from "./lexical/tokenizer/Token";
import { ParseTreeNode } from "./syntax/parser/ParseTreeNode";
import { Parser } from "./syntax/parser/Parser";

(() => {
  const fileReader: FileReader = new FileReader('.b');

  const input: string = fileReader.read(process.argv[2]);

  const analyzer: LexicalAnalyzer = new LexicalAnalyzer();

  const tokens: Token[] = analyzer.analyze(input);

  const cst: ParseTreeNode = (new Parser()).parse(tokens);

  cst.traverse((node: ParseTreeNode) => {
    console.log('---------------------------------------------');
    if(node.data.token) {
      console.log(`${node.data.token?.toString()}`);
    }
    console.log(`DEPTH: ${node.getDepth()}`);
    console.log(`LEFT SIBLING: ${node.getLeftSibling()?.data?.token?.symbol}`);
    console.log(`RIGHT SIBLING: ${node.getRightSibling()?.data?.token?.symbol}`);
    console.log('---------------------------------------------');
  });
})();