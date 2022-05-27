// Generated from ../../grammar/src/main/antlr/breeze/BreezeLexer.g4 by ANTLR 4.9.0-SNAPSHOT


  package io.sunshower.breeze.lang.parsers;


import { ATN } from "antlr4ts/atn/ATN";
import { ATNDeserializer } from "antlr4ts/atn/ATNDeserializer";
import { CharStream } from "antlr4ts/CharStream";
import { Lexer } from "antlr4ts/Lexer";
import { LexerATNSimulator } from "antlr4ts/atn/LexerATNSimulator";
import { NotNull } from "antlr4ts/Decorators";
import { Override } from "antlr4ts/Decorators";
import { RuleContext } from "antlr4ts/RuleContext";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { VocabularyImpl } from "antlr4ts/VocabularyImpl";

import * as Utils from "antlr4ts/misc/Utils";


export class BreezeLexer extends Lexer {
	public static readonly MODULE = 1;

	// tslint:disable:no-trailing-whitespace
	public static readonly channelNames: string[] = [
		"DEFAULT_TOKEN_CHANNEL", "HIDDEN",
	];

	// tslint:disable:no-trailing-whitespace
	public static readonly modeNames: string[] = [
		"DEFAULT_MODE",
	];

	public static readonly ruleNames: string[] = [
		"MODULE",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, "'module'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, "MODULE",
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(BreezeLexer._LITERAL_NAMES, BreezeLexer._SYMBOLIC_NAMES, []);

	// @Override
	// @NotNull
	public get vocabulary(): Vocabulary {
		return BreezeLexer.VOCABULARY;
	}
	// tslint:enable:no-trailing-whitespace


	constructor(input: CharStream) {
		super(input);
		this._interp = new LexerATNSimulator(BreezeLexer._ATN, this);
	}

	// @Override
	public get grammarFileName(): string { return "BreezeLexer.g4"; }

	// @Override
	public get ruleNames(): string[] { return BreezeLexer.ruleNames; }

	// @Override
	public get serializedATN(): string { return BreezeLexer._serializedATN; }

	// @Override
	public get channelNames(): string[] { return BreezeLexer.channelNames; }

	// @Override
	public get modeNames(): string[] { return BreezeLexer.modeNames; }

	public static readonly _serializedATN: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x02\x03\f\b\x01\x04" +
		"\x02\t\x02\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02\x03\x02\x02" +
		"\x02\x02\x03\x03\x02\x03\x03\x02\x02\x02\v\x02\x03\x03\x02\x02\x02\x03" +
		"\x05\x03\x02\x02\x02\x05\x06\x07o\x02\x02\x06\x07\x07q\x02\x02\x07\b\x07" +
		"f\x02\x02\b\t\x07w\x02\x02\t\n\x07n\x02\x02\n\v\x07g\x02\x02\v\x04\x03" +
		"\x02\x02\x02\x03\x02\x02";
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!BreezeLexer.__ATN) {
			BreezeLexer.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(BreezeLexer._serializedATN));
		}

		return BreezeLexer.__ATN;
	}

}

