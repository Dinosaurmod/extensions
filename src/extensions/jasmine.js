/*
This extension is inspired by the Javascript Framework Jasmine (https://jasmine.github.io/index.html)
*/
(function(Scratch) {
    class Extension {
        constructor(Scratch) {
            this.Scratch = Scratch;
            this.Functions = [];
            this.FunctionNames = [];
        }
        convertFromStringToBool(string) {
            if (string == "true") return true;
            if (string == "false") return false;
            return;
        }
        getExpectMatcherIndex(matcher, not) {
            let result = null;

            function negativeNumber(number, bool) {
                return bool ? number * -1 : number
            }
            
            switch (matcher) {
                case 'to be': {
                    result = negativeNumber(1, not);
                    break;
                }
                case 'to be defined': {
                    result = negativeNumber(2, not);
                    break;
                }
                case 'to be greater than': {
                    result = negativeNumber(3, not);
                    break;
                }
                case 'to be lesser than': {
                    result = negativeNumber(4, not);
                    break;
                }
            }

            return result;
        }
        doExpectMatcherFunctionWithIndex(matcher, args) {
            if (typeof matcher !== "number") return;

            let isNegative = false;
            let result = null;
            if (this.Scratch.Cast.toString(matcher).includes("-")) isNegative = true;

            switch(isNegative ? matcher * -1 : matcher) {
                case 1: {
                    if (isNegative) {
                        result = args[0] !== args[1];
                    } else {
                        result = args[0] === args[1];
                    };
                    break;
                }
                case 2: {
                    if (isNegative) {
                        result = !(args[0] !== "");
                    } else {
                        result = args[0] !== "";
                    };
                    break;
                }
                case 3: {
                    if (isNegative) {
                        result = !(args[0] > this.Scratch.Cast.toNumber(args[1]));
                    } else {
                        result = args[0] > this.Scratch.Cast.toNumber(args[1]);
                    };
                    break;
                }
                case 4: {
                    if (isNegative) {
                        result = !(args[0] < this.Scratch.Cast.toNumber(args[1]));
                    } else {
                        result = args[0] < this.Scratch.Cast.toNumber(args[1]);
                    };
                    break;
                }
            }

            return result;
        }
        getInfo() {
            return {
                id: "JASMINE",
                name: "Functions and Tests",
                color1: "#8A4182",
                blocks: [
                    "---",
                    {
                        blockType: "label",
                        text: "This extension is still in",
                    },
                    {
                        blockType: "label",
                        text: "development and barely works,",
                    },
                    {
                        blockType: "label",
                        text: "so expect lots of bugs.",
                    },
                    "---",
                    {
                        blockType: "label",
                        text: "Functions",
                    },
                    {
                        opcode: 'createFunction',
                        text: [
                            'create function',
                            'with id [ID]'
                        ],
                        branchCount: 1,
                        blockType: Scratch.BlockType.COMMAND,
                        arguments: {
                            ID: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "id",
                            },
                        }
                    },
                    {
                        opcode: 'deleteFunction',
                        text: 'delete function with id [ID]',
                        blockType: Scratch.BlockType.COMMAND,
                        arguments: {
                            ID: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "id",
                            },
                        }
                    },
                    {
                        opcode: 'existingFunctions',
                        text: 'existing functions',
                        disableMonitor: true,
                        blockType: Scratch.BlockType.REPORTER,
                        arguments: {
                            ID: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "id",
                            },
                        }
                    },
                    {
                        opcode: 'describeFunction',
                        text: [
                            'describe function',
                            'with id [ID]'
                        ],
                        branchCount: 1,
                        blockType: Scratch.BlockType.COMMAND,
                        arguments: {
                            ID: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "id",
                            },
                        }
                    },
                    {
                        blockType: "label",
                        text: "Tests",
                    },
                    {
                        opcode: 'expect_reporter',
                        text: 'expect [VALUE1] [MATCHER] [VALUE2], invert?: [INVERT]',
                        blockType: Scratch.BlockType.BOOLEAN,
                        arguments: {
                            VALUE1: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "Hello",
                            },
                            MATCHER: {
                                type: Scratch.ArgumentType.STRING,
                                menu: "MATCHERS_REPORTER"
                            },
                            VALUE2: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "Hello",
                            },
                            INVERT: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "false",
                                menu: "TRUEORFALSE"
                            },
                        }
                    }
                ],
                menus: {
                    MATCHERS_REPORTER: {
                        items: [
                            "to be",
                            {
                                text: "to be defined (2nd Value is not needed)",
                                value: "to be defined"
                            },
                            "to be greater than",
                            "to be lesser than",
                        ],
                        acceptReporters: false,
                    },
                    TRUEORFALSE: {
                        items: [
                            "true", "false"
                        ],
                        acceptReporters: false,
                    }
                }
            }
        }
        createFunction(args, util) {
            if (this.FunctionNames.includes(args.ID)) return;
            
            this.Functions.push([args.ID, null])
            this.FunctionNames.push(args.ID)
        }
        deleteFunction(args, util) {
            this.Functions = this.Functions.filter((func) => func[0] !== args.ID);
            this.FunctionNames = this.FunctionNames.filter((name) => name !== args.ID);
        }
        existingFunctions(args, util) {
            return this.FunctionNames.length == 0 ? "No existing functions" : this.FunctionNames;
        }
        expect_reporter(args, util) {
            return this.doExpectMatcherFunctionWithIndex(
                this.getExpectMatcherIndex(
                    args.MATCHER,
                    this.convertFromStringToBool(args.INVERT)
                ),
                [args.VALUE1, args.VALUE2]
            );
        }
    }

    Scratch.extensions.register(new Extension(Scratch));
})(Scratch);