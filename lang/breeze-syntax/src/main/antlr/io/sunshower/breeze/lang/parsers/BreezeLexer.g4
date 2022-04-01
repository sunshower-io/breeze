lexer grammar BreezeLexer;

@header {
  package io.sunshower.breeze.lang.parsers;
}

/**
tokens
*/

DoubleQuote
  : '"';

/**
  keywords:  breeze is case-sensitive
*/

MODULE
  : 'module';

WHERE
  : 'where';

REQUIRES:
  'requires';

OPEN_BRACE:
  '{';

CLOSE_BRACE:
  '}';

EXPORT:
  'export';

DECLARE:
  'declare';

/**
  keyword: as
*/
AS: 'as'
  ;

/**
  keyword: of
*/
OF:
  'of'
  ;

/**
  keyword: type
*/
TYPE:
  'type';

/**
  keyword: having
*/
HAVING:
    'having';

/**
  keyword: references
*/
REFERENCES:
  'references';

/**
  keyword: optional
*/
OPTIONAL:
  'optional';

EXTENSION:
  'extension';

POINT:
  'point';

OPEN_BRACKET:
  '[';

CLOSE_BRACKET:
  ']';


/**
  keyword: required
*/
REQUIRED:
  'required';

/**
  keyword: configuration
*/
CONFIGURATION:
  'configuration';


SEMI_COLON:
';'
;

PERIOD: '.';

OPEN_PAREN:
  '(';

CLOSE_PAREN:
  ')';
/**
  separator ,
*/
COMMA: ',';

/**
  keyword: from
*/
FROM:
  'from';


/**
  an unenclosed identifier is one that is not enclosed by an open-doublequote
  or a closed double-quote, e.g.:

 this-is-valid
 this_is_Also-valid
 SoIsThis
*/
UnenclosedIdentifierCharacters:
  [a-zA-Z0-9_\-]+;

StringLiteral
  : UnterminatedStringLiteral '"'
  ;

UnterminatedStringLiteral
  : '"' (~["\\\r\n] | '\\' (. | EOF))*
  ;



NumericLiteral :
  IntegerLiteral |
  FloatingPointLiteral
  ;



IntegerLiteral
	:	DecimalIntegerLiteral
	|	HexIntegerLiteral
	|	OctalIntegerLiteral
	|	BinaryIntegerLiteral
	;

fragment DecimalIntegerLiteral
	:	DecimalNumeral IntegerTypeSuffix?
	;

fragment HexIntegerLiteral
	:	HexNumeral IntegerTypeSuffix?
	;

fragment OctalIntegerLiteral
	:	OctalNumeral IntegerTypeSuffix?
	;

fragment BinaryIntegerLiteral
	:	BinaryNumeral IntegerTypeSuffix?
	;

fragment IntegerTypeSuffix
	:	[lL]
	;


fragment DecimalNumeral
	:	'0'
	|	NonZeroDigit (Digits? | Underscores Digits)
	;

fragment
Digits
	:	Digit (DigitsAndUnderscores? Digit)?
	;

fragment
Digit
	:	'0'
	|	NonZeroDigit
	;

fragment
NonZeroDigit
	:	[1-9]
	;

fragment
DigitsAndUnderscores
	:	DigitOrUnderscore+
	;

fragment
DigitOrUnderscore
	:	Digit
	|	'_'
	;

fragment
Underscores
	:	'_'+
	;

fragment
HexNumeral
	:	'0' [xX] HexDigits
	;

fragment
HexDigits
	:	HexDigit (HexDigitsAndUnderscores? HexDigit)?
	;

fragment
HexDigit
	:	[0-9a-fA-F]
	;

fragment
HexDigitsAndUnderscores
	:	HexDigitOrUnderscore+
	;

fragment
HexDigitOrUnderscore
	:	HexDigit
	|	'_'
	;

fragment
OctalNumeral
	:	'0' Underscores? OctalDigits
	;

fragment
OctalDigits
	:	OctalDigit (OctalDigitsAndUnderscores? OctalDigit)?
	;

fragment
OctalDigit
	:	[0-7]
	;

fragment
OctalDigitsAndUnderscores
	:	OctalDigitOrUnderscore+
	;

fragment
OctalDigitOrUnderscore
	:	OctalDigit
	|	'_'
	;

fragment
BinaryNumeral
	:	'0' [bB] BinaryDigits
	;

fragment
BinaryDigits
	:	BinaryDigit (BinaryDigitsAndUnderscores? BinaryDigit)?
	;

fragment
BinaryDigit
	:	[01]
	;

fragment
BinaryDigitsAndUnderscores
	:	BinaryDigitOrUnderscore+
	;

fragment
BinaryDigitOrUnderscore
	:	BinaryDigit
	|	'_'
	;


FloatingPointLiteral
	:	DecimalFloatingPointLiteral
	|	HexadecimalFloatingPointLiteral
	;

fragment
DecimalFloatingPointLiteral
	:	Digits '.' Digits? ExponentPart? FloatTypeSuffix?
	|	'.' Digits ExponentPart? FloatTypeSuffix?
	|	Digits ExponentPart FloatTypeSuffix?
	|	Digits FloatTypeSuffix
	;

fragment
ExponentPart
	:	ExponentIndicator SignedInteger
	;

fragment
ExponentIndicator
	:	[eE]
	;

fragment
SignedInteger
	:	Sign? Digits
	;

fragment
Sign
	:	[+\-]
	;

fragment
FloatTypeSuffix
	:	[fFdD]
	;

fragment
HexadecimalFloatingPointLiteral
	:	HexSignificand BinaryExponent FloatTypeSuffix?
	;

fragment
HexSignificand
	:	HexNumeral '.'?
	|	'0' [xX] HexDigits? '.' HexDigits
	;

fragment
BinaryExponent
	:	BinaryExponentIndicator SignedInteger
	;

fragment
BinaryExponentIndicator
	:	[pP]
	;


BooleanLiteral
	:	'true'
	|	'false'
	;


/**
  whitespace is ignored
*/
Whitespace
  : [ \r\n\t] -> channel(HIDDEN);

/**
  support line comments
  // this is an example comment
*/
LineComment
   : '//' ~ [\r\n]* -> channel (HIDDEN)
   ;

/**
  block comments--standard c/java/etc. style comments
*/
BlockComment
   : ('/*'
      ('/'*
        BlockComment
        | ~ [/*]
        | '/'+ ~ [/*]
        | '*'+ ~ [/*])* '*'* '*/'
        ) -> channel (HIDDEN)
   ;


