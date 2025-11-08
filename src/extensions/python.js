(function(Scratch) {
    const variables = {};
    let pyodide = null;

    if (!Scratch.extensions.unsandboxed) {
        throw new Error("this extension must be run unsandboxed");
    }

    class Extension {
        constructor() {
            this.loadPyodideOnce();
        }

        async loadPyodideOnce() {
            const script = document.createElement("script");
            script.src = "https://cdn.jsdelivr.net/pyodide/v0.23.2/full/pyodide.js";

            script.onload = async () => {
                console.log("Pyodide script loaded!");
                pyodide = await loadPyodide();
                console.log("Pyodide is ready!");
            };

            document.head.appendChild(script);
        }
        getInfo() {
            return {
              id: "PYTHON",
              name: "Python (Pyodide)",
              blocks: [
                {
                  blockType: "label",
                  text: "This doesn't work offline!",
                },
                {
                  opcode: 'PYTHON_runPython',
                  text: 'run python [CODE]',
                  blockType: Scratch.BlockType.COMMAND,
                  arguments: {
                    CODE: {
                      type: Scratch.ArgumentType.STRING,
                      defaultValue: `import js\njs.alert("Hello World!")`
                    }
                  }
                },
                {
                  opcode: 'PYTHON_runPython_Reporter',
                  text: 'run python [CODE]',
                  blockType: Scratch.BlockType.REPORTER,
                  arguments: {
                    CODE: {
                      type: Scratch.ArgumentType.STRING,
                      defaultValue: `def square(n):\n\treturn n * n\nsquare(7)`
                    }
                  }
                },
                {
                  opcode: 'PYTHON_runPython_Boolean',
                  text: 'run python [CODE]',
                  blockType: Scratch.BlockType.BOOLEAN,
                  arguments: {
                    CODE: {
                      type: Scratch.ArgumentType.STRING,
                      defaultValue: `def is_even(n):\n\treturn n % 2 == 0\nis_even(10)`
                    }
                  }
                },
              ]
            }
        }
        async PYTHON_runPython(args) {
            if (!pyodide) {
                console.log("Pyodide isn't ready yet!");
                return;
            }
        
            try {
                const cleanCode = args.CODE
                    .replace(/\\n/g, '\n')
                    .replace(/\\t/g, '\t');
                await pyodide.runPythonAsync(cleanCode);
            } catch (e) {
                console.error("Python error:", e);
                throw new Error(e);
            }
        }
        async PYTHON_runPython_Reporter(args) {
            if (!pyodide) {
                console.log("Pyodide isn't ready yet!");
                return;
            }
        
            try {
                const cleanCode = args.CODE
                    .replace(/\\n/g, '\n')
                    .replace(/\\t/g, '\t');
        
                const result = await pyodide.runPythonAsync(cleanCode);
                console.log("Python returned:", result);
                return result
            } catch (e) {
                console.error("Python error:", e);
                throw new Error(e);
            }
        }
        async PYTHON_runPython_Boolean(args) {
            if (!pyodide) {
                console.log("Pyodide isn't ready yet!");
                return;
            }
        
            try {
                const cleanCode = args.CODE
                    .replace(/\\n/g, '\n')
                    .replace(/\\t/g, '\t');
        
                const result = await pyodide.runPythonAsync(cleanCode);
                console.log("Python returned:", result);
                return Boolean(result)
            } catch (e) {
                console.error("Python error:", e);
                throw new Error(e);
            }
        }
    }

    Scratch.extensions.register(new Extension());
})(Scratch);