import TokenSchema, { IToken } from "../schemas/token";
import CreateModel from "./model";

const Token = new CreateModel<IToken>('tokens', TokenSchema).create();

export default Token;
