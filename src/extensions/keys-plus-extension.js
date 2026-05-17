/*
    name: Keys+
    description: Detect more keys when they are pressed or hit and make certain keys typable.
    inspired by: the Typable Tab Character and the More Keys Events Extension
*/

(function (Scratch) {
    const variables = {};

    variables["keysList"] = {
        "CurrentKeyPressed": "",
        "Tab": {
            "enabled": true,
            "isPressed?": false,
            "isPressed_TEMP?": false,
            "isPressed_TEMP_WaitUntil?": false
            // "listenerAdded": false
        },
        "F1": {
            "enabled": true,
            "isPressed?": false,
            "isPressed_TEMP?": false,
            "isPressed_TEMP_WaitUntil?": false
            // "listenerAdded": false
        },
        "F2": {
            "enabled": true,
            "isPressed?": false,
            "isPressed_TEMP?": false,
            "isPressed_TEMP_WaitUntil?": false
            // "listenerAdded": false
        },
        "F3": {
            "enabled": true,
            "isPressed?": false,
            "isPressed_TEMP?": false,
            "isPressed_TEMP_WaitUntil?": false
            // "listenerAdded": false
        },
        "F4": {
            "enabled": true,
            "isPressed?": false,
            "isPressed_TEMP?": false,
            "isPressed_TEMP_WaitUntil?": false
            // "listenerAdded": false
        },
        "F5": {
            "enabled": true,
            "isPressed?": false,
            "isPressed_TEMP?": false,
            "isPressed_TEMP_WaitUntil?": false
            // "listenerAdded": false
        },
        "F6": {
            "enabled": true,
            "isPressed?": false,
            "isPressed_TEMP?": false,
            "isPressed_TEMP_WaitUntil?": false
            // "listenerAdded": false
        },
        "F7": {
            "enabled": true,
            "isPressed?": false,
            "isPressed_TEMP?": false,
            "isPressed_TEMP_WaitUntil?": false
            // "listenerAdded": false
        },
        "F8": {
            "enabled": true,
            "isPressed?": false,
            "isPressed_TEMP?": false,
            "isPressed_TEMP_WaitUntil?": false
            // "listenerAdded": false
        },
        "F9": {
            "enabled": true,
            "isPressed?": false,
            "isPressed_TEMP?": false,
            "isPressed_TEMP_WaitUntil?": false
            // "listenerAdded": false
        },
        "F10": {
            "enabled": true,
            "isPressed?": false,
            "isPressed_TEMP?": false,
            "isPressed_TEMP_WaitUntil?": false
            // "listenerAdded": false
        },
        "F11": {
            "enabled": true,
            "isPressed?": false,
            "isPressed_TEMP?": false,
            "isPressed_TEMP_WaitUntil?": false
            // "listenerAdded": false
        },
        "F12": {
            "enabled": true,
            "isPressed?": false,
            "isPressed_TEMP?": false,
            "isPressed_TEMP_WaitUntil?": false
            // "listenerAdded": false
        },
        "Alt": {
            "enabled": true,
            "isPressed?": false,
            "isPressed_TEMP?": false,
            "isPressed_TEMP_WaitUntil?": false
            // "listenerAdded": false
        },
        "AltGraph": {
            "altname": "alt gr / altgraph",
            "enabled": true,
            "isPressed?": false,
            "isPressed_TEMP?": false,
            "isPressed_TEMP_WaitUntil?": false
            // "listenerAdded": false
        },
        /*"Meta": {
            "altname": "windows / meta",
            "enabled": true,
            "isPressed?": false,
            "isPressed_TEMP?": false,
            "isPressed_TEMP_WaitUntil?": false
            // "listenerAdded": false
        }*/
        "PrintScreen": {
            "altname": "prtsc / printscreen",
            "enabled": true,
            "isPressed?": false,
            "isPressed_TEMP?": false,
            "isPressed_TEMP_WaitUntil?": false
            // "listenerAdded": false
        },
        "Pause": {
            "altname": "pause / break",
            "enabled": true,
            "isPressed?": false,
            "isPressed_TEMP?": false,
            "isPressed_TEMP_WaitUntil?": false
            // "listenerAdded": false
        },
        "BrowserBack": {
            "altname": "browserback (chromebook)",
            "enabled": true,
            "isPressed?": false,
            "isPressed_TEMP?": false,
            "isPressed_TEMP_WaitUntil?": false
            // "listenerAdded": false
        },
        "Dead": {
            "altname": "(any) dead",
            "enabled": true,
            "isPressed?": false,
            "isPressed_TEMP?": false,
            "isPressed_TEMP_WaitUntil?": false
            // "listenerAdded": false
        },
        "°": {
            "altname": "°",
            "enabled": true,
            "isPressed?": false,
            "isPressed_TEMP?": false,
            "isPressed_TEMP_WaitUntil?": false
            // "listenerAdded": false
        },
        "µ": {
            "enabled": true,
            "isPressed?": false,
            "isPressed_TEMP?": false,
            "isPressed_TEMP_WaitUntil?": false
            // "listenerAdded": false
        },
        "²": {
            "altname": "² (alt gr + 2)",
            "enabled": true,
            "isPressed?": false,
            "isPressed_TEMP?": false,
            "isPressed_TEMP_WaitUntil?": false
            // "listenerAdded": false
        },
        "³": {
            "altname": "³ (alt gr + 3)",
            "enabled": true,
            "isPressed?": false,
            "isPressed_TEMP?": false,
            "isPressed_TEMP_WaitUntil?": false
            // "listenerAdded": false
        },
    }

    variables["typingKeysList"] = {
        "Tab": {
            "typing": '\t',
            "enabled": false,
        }
    }

    let isSetup = false
    let listenerAdded = false

    const blockIconURI = 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI5MC42NjY2NyIgaGVpZ2h0PSI5MC42NjY2NyIgdmlld0JveD0iMCwwLDkwLjY2NjY3LDkwLjY2NjY3Ij48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTk0LjY2NjY2LC0xMzQuNjY2NjYpIj48ZyBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiPjxwYXRoIGQ9Ik0xOTQuNjY2NjcsMjI1LjMzMzM0di05MC42NjY2N2g5MC42NjY2N3Y5MC42NjY2N3oiIGZpbGwtb3BhY2l0eT0iMC4wMDM5MiIgZmlsbD0iIzAwMDAwMCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjAiLz48ZyBzdHJva2U9Im5vbmUiPjxwYXRoIGQ9Ik0yMTIuNDUxOTgsMTQzLjUyMTY5aDI3LjQ3MjUyYzMwLjY0Njc3LC0wLjAxNjExIDI4LjIxMzc0LC0wLjExMjc4IDMwLjc3NTY5LDEuMTQ0MDJjMS45MTc0NSwwLjkzNDU2IDMuNzA1OTcsMi43MjMwOSA0LjY0MDU0LDQuNjQwNTRjMS4yNTY4LDIuNTYxOTYgMS4xNzYyNCwwLjExMjc5IDEuMTI3OTIsMzEuMDMzNDhsLTAuMDQ4MzYsMjcuNjk4MTJsLTAuMzU0NDgsMS4wNDczNWMtMS4wNzk1NiwzLjE3NDI1IC0zLjcyMjA4LDUuODE2NzcgLTYuODY0MTEsNi44ODAyMmwtMS4zMjEyNiwwLjQ1MTE2bC0yNy4zOTE5NywwLjA0ODM1Yy0zMC4zNDA2NCwwLjA0ODM1IC0yOC41MDM3NiwwLjExMjc5IC0zMC43OTE4LC0wLjk5ODk5Yy0yLjk5NzAxLC0xLjQzNDA0IC01LjA1OTQ1LC0zLjk2Mzc4IC01Ljg4MTIzLC03LjE1NDEzYy0wLjI5MDAzLC0xLjE3NjIzIC0wLjMwNjEzLC0yLjA2MjQ0IC0wLjMwNjEzLC0yOC4zMTA0MWMwLC0yNi41ODYzMiAwLC0yNy4xMTgwNSAwLjMyMjI3LC0yOC4zNzQ4NWMwLjk2Njc4LC0zLjgwMjY1IDMuNjczNzYsLTYuNjM4NTIgNy40MTE5NSwtNy43NTAzMnpNMjM5LjkyNDUxLDE0Ny43MTEwNGMtMjAuMDkyODMsMCAtMjYuNTM3OTksMC4wNjQ0NiAtMjcuMTUwMjYsMC4yMDk0NWMtMS44NjkwOSwwLjQ1MTE2IC0zLjQ5NjUxLDEuNzg4NTMgLTQuMzgyNzIsMy42MDkzbC0wLjQ1MTE1LDAuOTE4NDN2MjcuNTUzMDl2MjcuNTUzMDlsMC40ODMzNywwLjk1MDY3YzAuNjI4NCwxLjI1NjggMS43MjQwOSwyLjM1MjUgMi45OTcsMy4wMjkyMmwxLjAzMTI0LDAuNTMxNzJsMjcuMjMwODIsMC4wNDgzNWMyNi41MjE4NiwwLjAzMjIyIDI3LjI0Njk2LDAuMDMyMjEgMjguMTQ5MjgsLTAuMjczOTJjMS44MjA3NywtMC42MTIyOSAzLjI4NzA0LC0yLjAxNDEyIDQuMDI4MjQsLTMuODM0ODZsMC4zNzA1OSwtMC45MzQ1NmwwLjA0ODM1LC0yNi41ODYzMmMwLjAzMjIyLC0xOC42MTA0MyAtMC4wMTYxMSwtMjYuODQ0MTMgLTAuMTI4ODksLTI3LjQyNDJjLTAuNDAyODMsLTEuODg1MiAtMS43NTYzMSwtMy43MzgxOSAtMy4zNTE0OSwtNC41NDM4M2MtMC4zNzA1OSwtMC4xOTMzNSAtMS4wNzk1NiwtMC40NTExNiAtMS41OTUxOCwtMC41ODAwOGMtMC44MDU2NCwtMC4yMDk0NSAtNC4zODI3MiwtMC4yNDE3IC0yNy4yNzkxOCwtMC4yMjU1OXoiIGZpbGw9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMSIvPjxwYXRoIGQ9Ik0yNjcuMjk5MzgsMTQ3LjgyMzY3YzAuNTE1NjIsMC4xMjg4OSAxLjIyODczLDAuMzkwMzcgMS41OTkzNSwwLjU4MzcyYzEuNTk1MTgsMC44MDU2NCAyLjk2MjI3LDIuNjcyODEgMy4zNjUwOCw0LjU1ODA0YzAuMTEyNzgsMC41ODAwOCAwLjE5NTY5LDguOTExNDggMC4xNjM0NywyNy41MjE5MmwtMC4wODMzMiwyNi42NzkyOWwtMC4zNzI3OSwwLjkzNzA4Yy0wLjc0MTE4LDEuODIwNzcgLTIuMjIxMywzLjIzNjI3IC00LjA0MjA0LDMuODQ4NTdjLTAuOTAyMzEsMC4zMDYxMyAtMS43MjY0NiwwLjM0MjQgLTI4LjI0ODMyLDAuMzEwMTZsLTI3LjMyNTQyLC0wLjA4NDE1bC0xLjAzNDE3LC0wLjUzNDMzYy0xLjI3MjkxLC0wLjY3Njc2IC0yLjM3OTAzLC0xLjc4MjkgLTMuMDA3NDMsLTMuMDM5N2wtMC40ODU3NywtMC45NTMzN2wtMC4wMzU3NCwtMjcuNjQ5MTdsMC4wMzU0NCwtMjcuNjQ5NjNsMC40NTM0NCwtMC45MjEwM2MwLjg4NjIxLC0xLjgyMDc3IDIuNTI3NzUsLTMuMTcxOTYgNC4zOTY4OCwtMy42MjMxMmMwLjYxMjI5LC0wLjE0NTAzIDcuMTUyNzUsLTAuMjQ0OTYgMjcuMjQ1NTgsLTAuMjQ0OTZjMjIuODk2NDUsLTAuMDE2MTEgMjYuNTcwMDksMC4wNTEyIDI3LjM3NTczLDAuMjYwNjZ6IiBmaWxsPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjAuNSIvPjwvZz48dGV4dCB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMTAuNjA2MzYsMTY3LjkxMDczKSBzY2FsZSgwLjUsMC41KSIgZm9udC1zaXplPSI0MCIgZm9udC1zdHlsZT0ibm9ybWFsIiB4bWw6c3BhY2U9InByZXNlcnZlIiBmaWxsPSIjMDAwMDAwIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZm9udC1mYW1pbHk9IlNhbnMgU2VyaWYiIGZvbnQtd2VpZ2h0PSJub3JtYWwiIHRleHQtYW5jaG9yPSJzdGFydCIgdGV4dC1kZWNvcmF0aW9uPSJub25lIj48dHNwYW4geD0iMCIgZHk9IjAiPkFsdDwvdHNwYW4+PC90ZXh0PjxnIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIyIj48cGF0aCBkPSJNMjQwLjgzOTA3LDE5OC40ODYyMmMwLjI5MjgxLDAuMjUwMDkgMC42MTc3NCwwLjUyMzc5IDAuOTc2NDIsMC44MjcwOWMyLjY5NjMsMi4yODYwNiA0LjY5NDQ5LDEuNzgxNDYgNS41ODQ2OCwxLjU2ODAyYzAuMDM2MDgsLTAuMDA5NjkgMC4wNjYxNCwtMC4wMTc3NiAwLjEwMDYsLTAuMDMzNDdjMC4wMDYwMSwtMC4wMDE2MSAwLjAwNjAxLC0wLjAwMTYyIDAuMDEyMDMsLTAuMDAzMjNjMC4yOTUyNiwtMC4xMjQ0NSAwLjQ1NDMyLC0wLjQ0NDM3IDAuMzcwMzMsLTAuNzU3MDFsLTcuMDM4NjEsLTI2LjI0Njc2Yy0wLjc1NzA0LC0yLjc5NDExIDMuNzE5NzEsLTQuMzkwMDQgNC43ODIzMywtMS42NTg2OWMwLjAxMjQxLDAuMDIyNDYgNS45NDY3MSwxNS41MzY0MSA2LjA1NTkyLDE1LjgyMjk0YzAuMDAxNjEsMC4wMDYwMSAwLjAwMTYyLDAuMDA2MDEgMC4wMDE2MiwwLjAwNjAxbDAuMDA2MDEsLTAuMDAxNjJjMC40ODcxNCwtMC43MzAzOCAxLjYxODkyLC0xLjI5MjI4IDIuOTY3MzcsLTEuMzgzODJjMS41NjQyNCwtMC4xMDQzOCAyLjkxNzksMC40NDczMSAzLjM1MjU4LDEuMjk3NDZjMC41MjA1NSwtMC42Mjk3NiAxLjUyMjYzLC0xLjA5ODgxIDIuNjk0NjcsLTEuMTc1MThjMS42MzM0OSwtMC4xMTAxIDMuMDI3MDgsMC41NjYyNCAzLjMwODQsMS41NDEzOWMwLjQ2MTQsLTAuNzI5OTcgMS41NDE5MiwtMS4yOTA5NCAyLjgzOTA0LC0xLjM4MTU3YzEuNjMxOTksLTAuMTE2MTQgMy4wMzE1NCwwLjU1ODU5IDMuMzEyODYsMS41MzM3NWwzLjAzMTgzLDExLjI4NTAyYzAuNDExODksMS41MzMxMyAwLjQwMjUzLDMuMTUzNjUgLTAuMDMxNCw0LjY4MTk1bC0xLjIwNzExLDQuMjg4NzJsMC4wMDQ4NCwwLjAxODA0bDAuODg4MzksMy4zMDY3NGwtMjEuNzg4NTUsNS44NTM3bC0wLjg5MzI0LC0zLjMyNDc5Yy03LjcxNTU3LC00LjUwODc5IC0xMi41NDM2LC0xMC4yMTg2OCAtMTMuNzY2ODgsLTEyLjkwMDQxYy0xLjMxNzUsLTIuODg4NDkgMS44ODM3LC01LjMyMTQ3IDQuNDM1ODYsLTMuMTY0Mjh6Ii8+PHBhdGggZD0iTTI1MS41OTM4MywyMTkuODAyMzRsMjEuNzk0NSwtNS44NTUyOWwwLjgyNTQxLDMuMDcyMzNjMC4xNzc2OCwwLjY2MTM1IC0wLjIxODA1LDEuMzQ3ODMgLTAuODc5NCwxLjUyNTUxbC0xOS4zODk1OSw1LjIwOTE5Yy0wLjY2MTM1LDAuMTc3NjcgLTEuMzQ3ODMsLTAuMjE4MDUgLTEuNTI1NTEsLTAuODc5NHoiLz48L2c+PC9nPjwvZz48L3N2Zz48IS0tcm90YXRpb25DZW50ZXI6NDUuMzMzMzM1MDAwMDAwMDA1OjQ1LjMzMzMzNTAwMDAwMDAwNS0tPg=='
    const menuIconURI = blockIconURI

    function removeItemFromArray(arr, item) {
        const index = arr.indexOf(item);
        if (index > -1) {
            arr.splice(index, 1);
        }
        return arr;
    }

    function handleKeyDown(event) {
        let pressedKey = variables["keysList"][event.key]
        let typingKey = variables["typingKeysList"][event.key]
        if (!!pressedKey && !!pressedKey["enabled"]) {
            event.preventDefault();

            variables["keysList"]["CurrentKeyPressed"] = event.key
            Scratch.vm.runtime.startHats(`${Extension.prototype.getInfo().id}_whenkeypressed`)

            pressedKey["isPressed?"] = true;
            if (pressedKey["isPressed_TEMP_WaitUntil?"] !== true) {
                runKeyPressedTemp(event.key)
            }

            if (!!typingKey && !!typingKey["enabled"]) {
                const textarea = document.activeElement;
                if (textarea && (textarea.tagName === 'TEXTAREA' || textarea.tagName === 'INPUT')) {
                    const cursorPos = textarea.selectionStart;
                    const textBefore = textarea.value.substring(0, cursorPos);
                    const textAfter = textarea.value.substring(cursorPos);
                    textarea.value = textBefore + typingKey["typing"] + textAfter;
                
                    textarea.selectionStart = textarea.selectionEnd = cursorPos + 1;
                }
            }
        }
    }

    function handleKeyUp(event) {
        let eventKey = variables["keysList"][event.key];

        eventKey["isPressed?"] = false;
        eventKey["isPressed_TEMP_WaitUntil?"] = false;

        variables["keysList"]["CurrentKeyPressed"] = "";
    }

    function addEventForKeydown() {
        if (!listenerAdded) {
            document.addEventListener('keydown', handleKeyDown, true);
            document.addEventListener('keyup', handleKeyUp, true);
            listenerAdded = true;
        }
    }

    function removeEventForKeydown() {
        if (listenerAdded) {
            document.removeEventListener('keydown', handleKeyDown, true);
            document.removeEventListener('keyup', handleKeyUp, true);
            listenerAdded = false;
        }
    }

    async function runKeyPressedTemp(key) {
        let eventKey = variables["keysList"][key];

        eventKey["isPressed_TEMP_WaitUntil?"] = true;
        eventKey["isPressed_TEMP?"] = true;
        await new Promise(resolve => setTimeout(resolve, 100));
        eventKey["isPressed_TEMP?"] = false;
    }
    
    class Extension {
        constructor(Sc) {
            this.Scratch = Sc
            this.VM = this.Scratch.vm
            this.Runtime = this.VM.runtime

            addEventForKeydown()
        }
        getInfo() {
            return {
                id: "KEYSPLUS",
                name: "Keys+",
                color1: "#3b3b3b",
                blockIconURI: blockIconURI,
                menuIconURI: menuIconURI,
                blocks: [
                    {
                        blockType: "label",
                        text: "Setup",
                    },
                    {
                        opcode: 'enable',
                        text: '[ENABLE_MENU] key detection',
                        blockType: Scratch.BlockType.COMMAND,
                        arguments: {
                            ENABLE_MENU: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'ENABLE_MENU'
                            }
                        }
                    },
                    {
                        opcode: 'enabled',
                        text: 'key detection is enabled?',
                        blockType: Scratch.BlockType.BOOLEAN,
                        arguments: {}
                    },
                    {
                        blockType: "label",
                        text: "Main Blocks",
                        //hideFromPalette: !isSetup
                    },
                    {
                        opcode: 'enablekey',
                        text: '[ENABLE_MENU] [KEYS_MENU] key detection',
                        blockType: Scratch.BlockType.COMMAND,
                        arguments: {
                            ENABLE_MENU: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'ENABLE_MENU'
                            },
                            KEYS_MENU: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'KEYS_MENU'
                            }
                        }
                    },
                    {
                        opcode: 'enabledkey',
                        text: '[KEYS_MENU] key detection is enabled?',
                        blockType: Scratch.BlockType.BOOLEAN,
                        disableMonitor: true,
                        arguments: {
                            KEYS_MENU: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'KEYS_MENU'
                            }
                        }
                    },
                    "---",
                    {
                        opcode: 'whenkeypressed',
                        text: 'when [KEYS_MENU] key pressed',
                        blockType: Scratch.BlockType.HAT,
                        arguments: {
                            KEYS_MENU: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'KEYS_MENU'
                            }
                        },
                        //hideFromPalette: !isSetup
                    },
                    {
                        opcode: 'whenkeyhit',
                        text: 'when [KEYS_MENU] key hit',
                        blockType: Scratch.BlockType.HAT,
                        arguments: {
                            KEYS_MENU: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'KEYS_MENU'
                            }
                        },
                        //hideFromPalette: !isSetup
                    },
                    {
                        opcode: 'keypressed',
                        text: 'key [KEYS_MENU] pressed?',
                        blockType: Scratch.BlockType.BOOLEAN,
                        disableMonitor: true,
                        arguments: {
                            KEYS_MENU: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'KEYS_MENU'
                            }
                        },
                        //hideFromPalette: !isSetup
                    },
                    {
                        opcode: 'keyhit',
                        text: 'key [KEYS_MENU] hit?',
                        blockType: Scratch.BlockType.BOOLEAN,
                        disableMonitor: true,
                        arguments: {
                            KEYS_MENU: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'KEYS_MENU'
                            }
                        },
                        //hideFromPalette: !isSetup
                    },
                    {
                        blockType: "label",
                        text: "Typing",
                        //hideFromPalette: !isSetup
                    },
                    {
                        opcode: 'enablekeytyping',
                        text: '[ENABLE_MENU] typing for [TYPING_KEYS_MENU] key',
                        blockType: Scratch.BlockType.COMMAND,
                        arguments: {
                            ENABLE_MENU: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'ENABLE_MENU'
                            },
                            TYPING_KEYS_MENU: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'TYPING_KEYS_MENU'
                            }
                        },
                        //hideFromPalette: !isSetup
                    },
                    {
                        opcode: 'enabledkeytyping',
                        text: '[TYPING_KEYS_MENU] key typing is enabled?',
                        blockType: Scratch.BlockType.BOOLEAN,
                        disableMonitor: true,
                        arguments: {
                            TYPING_KEYS_MENU: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'TYPING_KEYS_MENU'
                            }
                        },
                        //hideFromPalette: !isSetup
                    },
                ],
                menus: {
                    ENABLE_MENU: {
                        acceptReporters: true,
                        items: [
                            {
                                text: "enable",
                                value: "true"
                            },
                            {
                                text: "disable",
                                value: "false"
                            }
                        ]
                    },
                    KEYS_MENU: {
                        acceptReporters: false,
                        items: (() => {
                            const arr = removeItemFromArray(Object.getOwnPropertyNames(variables["keysList"]), "CurrentKeyPressed")
                            const newArr = []

                            arr.forEach((item, idx) => {
                                let keyData = variables["keysList"][item]
                                newArr.push({
                                    text: !!keyData["altname"] ? keyData["altname"] : String(item).toLowerCase(),
                                    value: item
                                })
                            });

                            return newArr;
                        })()
                    },
                    TYPING_KEYS_MENU: {
                        acceptReporters: false,
                        items: (() => {
                            const arr = Object.getOwnPropertyNames(variables["typingKeysList"])
                            const newArr = []

                            arr.forEach((item, idx) => {
                                newArr.push({
                                    text: String(item).toLowerCase(),
                                    value: item
                                })
                            });

                            return newArr;
                        })()
                    }
                }
            }
        }
        /*_refreshToolbox() {
            if (window.Blockly) {
                const Blockly = window.Blockly;
                const workspace = Blockly.getMainWorkspace();
                const toolboxXml = workspace.options.languageTree.cloneNode(true);
                workspace.updateToolbox(toolboxXml);
            }
        }*/

        enable(args, util) {
            isSetup = (args.ENABLE_MENU === "true")

            if (args.ENABLE_MENU == "true") {
                addEventForKeydown()
            } else {
                removeEventForKeydown()
            }

            //this._refreshToolbox()
        }
        enabled(_, util) {
            return isSetup
        }
        enablekey(args, util) {
            const key = args.KEYS_MENU
            let eventKey = variables["keysList"][key];

            eventKey["enabled"] = (args.ENABLE_MENU === "true")
        }
        enabledkey(args, util) {
            const key = args.KEYS_MENU
            let eventKey = variables["keysList"][key];

            return isSetup && eventKey["enabled"]
        }
        whenkeypressed(args, util) {
            const key = args.KEYS_MENU
            let eventKey = variables["keysList"][key];

            return eventKey["isPressed?"]
        }
        whenkeyhit(args, util) {
            const key = args.KEYS_MENU
            let eventKey = variables["keysList"][key];

            return eventKey["isPressed?"]
        }
        keypressed(args, util) {
            const key = args.KEYS_MENU
            let eventKey = variables["keysList"][key];

            return eventKey["isPressed?"]
        }
        keyhit(args, util) {
            const key = args.KEYS_MENU
            let eventKey = variables["keysList"][key];

            return eventKey["isPressed_TEMP?"]
        }
        enablekeytyping(args, util) {
            let typingKey = variables["typingKeysList"][args.TYPING_KEYS_MENU]

            typingKey["enabled"] = (args.ENABLE_MENU === "true")
        }
        enabledkeytyping(args, util) {
            let typingKey = variables["typingKeysList"][args.TYPING_KEYS_MENU]

            return isSetup && typingKey["enabled"]
        }
    }
    Scratch.extensions.register(new Extension(Scratch));
})(Scratch)