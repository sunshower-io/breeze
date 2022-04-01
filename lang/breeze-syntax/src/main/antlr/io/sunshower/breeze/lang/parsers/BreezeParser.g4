parser grammar BreezeParser;

@header {
  package io.sunshower.breeze.lang.parsers;
}

options {
  tokenVocab = BreezeLexer;
}
/**

*/
compilationUnit:
  moduleDefinition*
  ;


moduleDefinition:
  MODULE
    identifier
    requires?
  WHERE
    declarations
    ;



declarations:
  declaration+;


declaration:
  EXPORT?
    DECLARE
    objectDefinition
    SEMI_COLON;
//      identifier OF TYPE
//      identifier



objectDefinition:
  identifier
    OF TYPE
  identifier
    HAVING
    configurationDefinitions;


configurationDefinitions:
  configurationDefinition+;



configurationDefinition:
  HAVING (
    OPTIONAL | REQUIRED
    )? configuration;



configuration:
  stringConfiguration
  referenceConfiguration
  functionConfiguration
  ;


referenceConfiguration:
  REFERENCES
    identifier
  configurationDefinition?
  ;

/**
  name as "value"
*/
stringConfiguration:
  identifier AS StringLiteral
  ;


functionConfiguration:
  identifier
  AS
  functionDeclaration
;

/**
  identifier (argList)
*/
functionDeclaration:
  identifier
    OPEN_PAREN
    argument (COMMA argument)*
    CLOSE_PAREN
;

argument:
  StringLiteral
  | NumericLiteral
  ;





/**
  list of requirements for the module
  these declarations import exported symbols into the
  module scope
*/
requires:
  require+
  ;



/**
  requires {name as alias} from module;
*/
require:
  REQUIRES
    OPEN_BRACE
      requirement (COMMA requirement)*
    CLOSE_BRACE
    FROM
    identifier
    ;


/**
  name (as alias)
*/
requirement:
  identifier (AS identifier)?
  ;

/**
  an enclosed identifier can be basically anything enclosed in double-quotes
  whereas an unenclosed identifier can be a sequence of
  UnenclosedIdentifier characters

  transformed to non-left-recursive rule
*/
identifier:
  unenclosedIdentifier
  | enclosedIdentifier
  | ((
    enclosedIdentifier
    | unenclosedIdentifier
    ) PERIOD identifier)*;

/**
  snake-case,
  camel-case
  or kebab-case
*/
unenclosedIdentifier:
  UnenclosedIdentifierCharacters*;

/**
  handle anything in double-quotes
  identifier is now positional
*/
enclosedIdentifier:
  StringLiteral
  ;


