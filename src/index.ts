import { FileReader } from "./input/FileReader";
import { Token } from "./lexer/Token";
import { Tokenizer } from "./lexer/Tokenizer";

(() => {
  const fileReader: FileReader = new FileReader('.b');

  const input: string = fileReader.read(process.argv[2]);

  const tokenizer: Tokenizer = new Tokenizer();

  const tokens: Token[] = tokenizer.tokenize(input);

  tokens.forEach((token: Token) => {
    console.log('---------------------------------------------');
    console.log(token.toString());
    console.log('---------------------------------------------');
    console.log('');
  });
})();