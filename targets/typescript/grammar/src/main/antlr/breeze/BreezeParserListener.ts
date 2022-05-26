// Generated from ../../grammar/src/main/antlr/breeze/BreezeParser.g4 by ANTLR 4.9.0-SNAPSHOT


import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";

import { CompilationUnitContext } from "./BreezeParser";


/**
 * This interface defines a complete listener for a parse tree produced by
 * `BreezeParser`.
 */
export interface BreezeParserListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by `BreezeParser.compilationUnit`.
	 * @param ctx the parse tree
	 */
	enterCompilationUnit?: (ctx: CompilationUnitContext) => void;
	/**
	 * Exit a parse tree produced by `BreezeParser.compilationUnit`.
	 * @param ctx the parse tree
	 */
	exitCompilationUnit?: (ctx: CompilationUnitContext) => void;
}

