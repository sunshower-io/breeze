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