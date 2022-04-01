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
  moduleDefinition*;


moduleDefinition:
  MODULE;


/**
  an enclosed identifier can be basically anything enclosed in double-quotes
  whereas an unenclosed identifier can be a sequence of
  UnenclosedIdentifier characters
*/
identifier:
  unenclosedIdentifier
  | enclosedIdentifier;

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
  StringLiteral;


