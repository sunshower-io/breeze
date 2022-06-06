import {parser} from "@breeze/parser/breeze-parser";
import {
  foldInside,
  foldNodeProp,
  HighlightStyle,
  indentNodeProp,
  LanguageSupport,
  LRLanguage
} from "@codemirror/language"
import {EditorView, lineNumbers} from "@codemirror/view";
import {styleTags, tags as t} from "@lezer/highlight"
import {EditorState} from "@codemirror/state";
import {basicSetup} from "@codemirror/basic-setup";
import {completeFromList} from '@codemirror/autocomplete'

export const parserWithMetadata = parser.configure({
  props: [
    styleTags({
      Identifier: t.variableName,
      Boolean: t.bool,
      String: t.string,
      LineComment: t.lineComment,
      Number: t.number,
      "{ }": t.paren
    }),
    indentNodeProp.add({
      Block: context => {
        // context.node.
        let count = 0;
        for (let node = context.node; !!node; node = node.parent) {
          count++;
        }
        return 2 * count;
      }
    }),
    foldNodeProp.add({
      // block: foldInside
      Block: foldInside,
      Function: foldInside
    })
  ]
});


const highlightStyle = HighlightStyle.define([
  {tag: t.keyword, color: "orange", fontStyle: 'bold'},
  {tag: t.definitionKeyword, color: "green", fontStyle: 'bold'},
  {tag: t.string, color: "blue", fontStyle: 'italic'},
  {tag: t.definitionKeyword, color: "green"},

  {tag: t.bool, color: "red", fontStyle: 'bold'},
  {tag: t.comment, color: "#f5d", fontStyle: "italic"}
])


export const terraformLanguage = LRLanguage.define({
  parser: parserWithMetadata,
  languageData: {
    commentTokens: {line: "//"}
  }
});
export const terraformCompletion = terraformLanguage.data.of({
  autocomplete: completeFromList([
    {label: "resource", type: "definition"},
    {label: "provider", type: "keyword"},
    {label: "module", type: "keyword"},
    {label: "variable", type: "keyword"},
    {label: "output", type: "keyword"},
    {label: "average", type: "function"},
    {label: "var", type: "keyword"},
    {label: "max", type: "function"},
    {label: "min", type: "function"}
  ])
});

export function terraformLanguageSupport(): LanguageSupport {
  return new LanguageSupport(terraformLanguage, [terraformCompletion]);
}

export function terraform(root: ShadowRoot): EditorView {
  const state = EditorState.create({
    extensions: [basicSetup, lineNumbers(), terraformLanguageSupport()]
  });
  return new EditorView({
    state: state,
    parent: root
  });
}






