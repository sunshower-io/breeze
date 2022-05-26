// Generated from ../../grammar/src/main/antlr/breeze/BreezeParser.g4 by ANTLR 4.9.0-SNAPSHOT


import { ATN } from "antlr4ts/atn/ATN";
import { ATNDeserializer } from "antlr4ts/atn/ATNDeserializer";
import { FailedPredicateException } from "antlr4ts/FailedPredicateException";
import { NotNull } from "antlr4ts/Decorators";
import { NoViableAltException } from "antlr4ts/NoViableAltException";
import { Override } from "antlr4ts/Decorators";
import { Parser } from "antlr4ts/Parser";
import { ParserRuleContext } from "antlr4ts/ParserRuleContext";
import { ParserATNSimulator } from "antlr4ts/atn/ParserATNSimulator";
import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";
import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";
import { RecognitionException } from "antlr4ts/RecognitionException";
import { RuleContext } from "antlr4ts/RuleContext";
//import { RuleVersion } from "antlr4ts/RuleVersion";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { Token } from "antlr4ts/Token";
import { TokenStream } from "antlr4ts/TokenStream";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { VocabularyImpl } from "antlr4ts/VocabularyImpl";

import * as Utils from "antlr4ts/misc/Utils";

import { BreezeParserListener } from "./BreezeParserListener";

export class BreezeParser extends Parser {
	public static readonly MODULE = 1;
	public static readonly RULE_compilationUnit = 0;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"compilationUnit",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, "'module'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, "MODULE",
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(BreezeParser._LITERAL_NAMES, BreezeParser._SYMBOLIC_NAMES, []);

	// @Override
	// @NotNull
	public get vocabulary(): Vocabulary {
		return BreezeParser.VOCABULARY;
	}
	// tslint:enable:no-trailing-whitespace

	// @Override
	public get grammarFileName(): string { return "BreezeParser.g4"; }

	// @Override
	public get ruleNames(): string[] { return BreezeParser.ruleNames; }

	// @Override
	public get serializedATN(): string { return BreezeParser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(BreezeParser._ATN, this);
	}
	// @RuleVersion(0)
	public compilationUnit(): CompilationUnitContext {
		let _localctx: CompilationUnitContext = new CompilationUnitContext(this._ctx, this.state);
		this.enterRule(_localctx, 0, BreezeParser.RULE_compilationUnit);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 5;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === BreezeParser.MODULE) {
				{
				{
				this.state = 2;
				this.match(BreezeParser.MODULE);
				}
				}
				this.state = 7;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public static readonly _serializedATN: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03\x03\v\x04\x02" +
		"\t\x02\x03\x02\x07\x02\x06\n\x02\f\x02\x0E\x02\t\v\x02\x03\x02\x02\x02" +
		"\x02\x03\x02\x02\x02\x02\x02\n\x02\x07\x03\x02\x02\x02\x04\x06\x07\x03" +
		"\x02\x02\x05\x04\x03\x02\x02\x02\x06\t\x03\x02\x02\x02\x07\x05\x03\x02" +
		"\x02\x02\x07\b\x03\x02\x02\x02\b\x03\x03\x02\x02\x02\t\x07\x03\x02\x02" +
		"\x02\x03\x07";
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!BreezeParser.__ATN) {
			BreezeParser.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(BreezeParser._serializedATN));
		}

		return BreezeParser.__ATN;
	}

}

export class CompilationUnitContext extends ParserRuleContext {
	public MODULE(): TerminalNode[];
	public MODULE(i: number): TerminalNode;
	public MODULE(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(BreezeParser.MODULE);
		} else {
			return this.getToken(BreezeParser.MODULE, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return BreezeParser.RULE_compilationUnit; }
	// @Override
	public enterRule(listener: BreezeParserListener): void {
		if (listener.enterCompilationUnit) {
			listener.enterCompilationUnit(this);
		}
	}
	// @Override
	public exitRule(listener: BreezeParserListener): void {
		if (listener.exitCompilationUnit) {
			listener.exitCompilationUnit(this);
		}
	}
}


