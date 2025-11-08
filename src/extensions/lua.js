(function(Scratch) {
    const variables = {};
    let fengari = null;
    let lua = null;
    let lauxlib = null;
    let lualib = null;
    let L = null;

    if (!Scratch.extensions.unsandboxed) {
        throw new Error("This extension must be run unsandboxed.");
    }

    class Extension {
        constructor() {
            this.ready = this.loadFengari();
        }

        async loadFengari() {
            return new Promise((resolve) => {
                const script = document.createElement("script");
                script.src = "https://cdn.jsdelivr.net/npm/fengari-web@0.1.4/dist/fengari-web.js";
                script.onload = () => {
                    fengari = window.fengari;
                    lua = fengari.lua;
                    lauxlib = fengari.lauxlib;
                    lualib = fengari.lualib;
                    L = fengari.L; // use the default Lua state
                    resolve();
                };
                document.head.appendChild(script);
            });
        }

        getInfo() {
            return {
                id: "LUA",
                name: "Lua (Fengari)",
                blocks: [
                    {
                        blockType: "label",
                        text: "This doesn't work offline!",
                    },
                    {
                        opcode: "runLua",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "run lua code [CODE]",
                        arguments: {
                            CODE: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: `print("Hello World!")`,
                            },
                        },
                    },
                    {
                        opcode: "runLua_Reporter",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "run lua code [CODE]",
                        arguments: {
                            CODE: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: `return (2 + 2)`,
                            },
                        },
                    },
                    {
                        opcode: "runLua_Boolean",
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: "run lua code [CODE]",
                        arguments: {
                            CODE: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: `return (3 > 2)`,
                            },
                        },
                    },
                ],
            };
        }

        async runLua(args) {
            await this.ready;
            try {
                const code = args.CODE.replace(/\\n/g, "\n").replace(/\\t/g, "\t");
                const status = lauxlib.luaL_loadstring(L, fengari.to_luastring(code));
                if (status !== lua.LUA_OK) {
                    throw new Error(fengari.to_jsstring(lua.lua_tostring(L, -1)));
                }
                lua.lua_pcall(L, 0, 0, 0);
            } catch (e) {
                console.error("Lua Error:", e);
            }
        }

        async runLua_Reporter(args) {
            await this.ready;
            try {
                const code = `
                    function __scratch_return()
                        ${args.CODE}
                    end
                `;
                lauxlib.luaL_loadstring(L, fengari.to_luastring(code));
                lua.lua_pcall(L, 0, 0, 0);
                lua.lua_getglobal(L, fengari.to_luastring("__scratch_return"));
                lua.lua_pcall(L, 0, 1, 0);

                const val = lua.lua_type(L, -1);
                let retVal = "";

                if (val === lua.LUA_TSTRING) {
                    retVal = fengari.to_jsstring(lua.lua_tostring(L, -1));
                } else if (val === lua.LUA_TNUMBER) {
                    retVal = lua.lua_tonumber(L, -1);
                } else if (val === lua.LUA_TBOOLEAN) {
                    retVal = lua.lua_toboolean(L, -1);
                }

                lua.lua_pop(L, 1);
                return retVal;
            } catch (e) {
                console.error("Lua Error:", e);
                return "";
            }
        }

        async runLua_Boolean(args) {
            await this.ready;
            try {
                const code = `
                    function __scratch_return()
                        ${args.CODE}
                    end
                `;
                lauxlib.luaL_loadstring(L, fengari.to_luastring(code));
                lua.lua_pcall(L, 0, 0, 0);
                lua.lua_getglobal(L, fengari.to_luastring("__scratch_return"));
                lua.lua_pcall(L, 0, 1, 0);
                const result = lua.lua_toboolean(L, -1);
                lua.lua_pop(L, 1);
                return result;
            } catch (e) {
                console.error("Lua Error:", e);
                return false;
            }
        }
    }

    Scratch.extensions.register(new Extension());
})(Scratch);
