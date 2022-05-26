parser grammar BreezeParser;

options {
  tokenVocab = BreezeLexer;
}

compilationUnit:
  MODULE*;
