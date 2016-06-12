# vscode-nomnoml
> A tool for rendering UML diagrams based on the nomnoml library.

[![](https://vsmarketplacebadge.apphb.com/version/doctorrustynelson.vscode-nomnoml.svg)](https://marketplace.visualstudio.com/items?itemName=doctorrustynelson.vscode-nomnoml)
[![](https://vsmarketplacebadge.apphb.com/installs/doctorrustynelson.vscode-nomnoml.svg)](https://marketplace.visualstudio.com/items?itemName=doctorrustynelson.vscode-nomnoml)

## Usage

Open a `.nomnoml` file filled with nomnoml syntax.  To open the previewer open the command window and run the below command.  The previewer will update as you edit the file.

```
> View: nomnoml
```

![usage](https://raw.github.com/doctorrustynelson/vscode-nomnoml/master/images/screenshot.png)

## Additional Resources

[nomnoml home page](http://www.nomnoml.com/)

## Change Log
*v0.3.0* : 
 * **[FEATURE]** Added support for background colors via `#bgColor: ${color}` such as `#bgColor: red` or `#bgColor: #ff0000`.

*v0.2.1* :
 * Cleaned up extension code.

*v0.2.0* :
 * **[FEATURE]** Added scrollbars to the diagram when it extends beyond the frame

*v0.1.0* :
 * Initial implementation