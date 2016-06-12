'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
var nomnoml = require( 'nomnoml' );

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    let previewUri = vscode.Uri.parse('nomnoml-preview://nomnoml-preview');

    class TextDocumentContentProvider implements vscode.TextDocumentContentProvider {
        private _onDidChange = new vscode.EventEmitter<vscode.Uri>();
        
        public provideTextDocumentContent(uri: vscode.Uri): string {
            let editor = vscode.window.activeTextEditor;
            
            if (!(editor.document.languageId === 'nomnoml')) {
                return this.errorSnippet( new Error( `Active editor doesn't show a nomnoml document (languageId is ${editor.document.languageId}).` ) );
            }
            
            let text = editor.document.getText();
            
            return this.generateDiagram( text );
        }
        
        private errorSnippet(error: Error): string {
            return `<html><body>
                        <h1>Error: <span style="font-family: monospace;">${error.name}</span></h1>
                        <hr>
                        <h2>Message: <span style="font-family: monospace;">${error.message.replace( /\n/g, '<br>&nbsp&nbsp&nbsp&nbsp&nbsp' )}</span></h2>
                    </body></html>`;
        }
        
        private generateDiagram( text: string ): string {
            let svg : string;
            let backgroundColor : string = undefined;

            try {
                svg = nomnoml.renderSvg( text );
                let result = /\#bgColor\:\s?(\S*)/.exec( text );
                if( result && result[ 1 ] )
                    backgroundColor = result[ 1 ];
            } catch( exception ){
                return this.errorSnippet( exception );
            }
            
            return `<html><body style="margin: 0px; width: 100%; height: 100%; overflow:hidden;">
                <div style="width: 100%; height: 100%; overflow: scroll;">
                ${ svg }
                </div> 
                <script>
                    var svg = document.getElementsByTagName( 'svg' )[ 0 ];
                    var boundingBox = svg.getBBox( );
                    var width = boundingBox.width + 20;
                    var height = boundingBox.height + 20;
                    svg.style['min-width'] = width + 'px';
                    svg.style['min-height'] = height + 'px';
                    ${ backgroundColor != undefined ? `svg.style['background-color'] = '${backgroundColor}';` : '//no background color specified.' }
                </script>
            </body></html>`
        }
        
        get onDidChange(): vscode.Event<vscode.Uri> {
            return this._onDidChange.event;
        }

        public update(uri: vscode.Uri) {
            this._onDidChange.fire(uri);
        }
        
    };

    let provider = new TextDocumentContentProvider();
    let registration = vscode.workspace.registerTextDocumentContentProvider('nomnoml-preview', provider);

    vscode.workspace.onDidChangeTextDocument((e: vscode.TextDocumentChangeEvent) => {
        if (e.document === vscode.window.activeTextEditor.document) {
            provider.update(previewUri);
        }
    });

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.nomnoml', () => {
        // The code you place here will be executed every time your command is executed

        return vscode.commands.executeCommand('vscode.previewHtml', previewUri, vscode.ViewColumn.Two).then((success) => {
        }, (reason) => {
            vscode.window.showErrorMessage(reason);
        });
    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}