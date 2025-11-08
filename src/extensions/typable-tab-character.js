(function(Scratch) {
    const variables = {};

    variables["isTabPressed?"] = false
    variables["isTabPressed_TEMP?"] = false
    variables["isTabPressed_TEMP_WaitUntil?"] = false

    let listenerAdded = false

    function handleKeyDown(event) {
      if (event.key === 'Tab') {
        event.preventDefault();
        Scratch.vm.runtime.startHats(`${Extension.prototype.getInfo().id}_tab_whentabKeypressed`)

        variables["isTabPressed?"] = true
        if (variables["isTabPressed_TEMP_WaitUntil?"] !== true) {
          runKeyPressedTemp()
        }
  
        const textarea = document.activeElement;
        if (textarea && (textarea.tagName === 'TEXTAREA' || textarea.tagName === 'INPUT')) {
          const cursorPos = textarea.selectionStart;
          const textBefore = textarea.value.substring(0, cursorPos);
          const textAfter = textarea.value.substring(cursorPos);
          textarea.value = textBefore + '\t' + textAfter;
    
          textarea.selectionStart = textarea.selectionEnd = cursorPos + 1;
        }
      }
    }

    function handleKeyUp(event) {
      if (event.key === 'Tab') {
        variables["isTabPressed?"] = false
        variables["isTabPressed_TEMP_WaitUntil?"] = false
      }
    }

    function addEventForKeydown() {
      if (!listenerAdded) {
        document.addEventListener('keydown', handleKeyDown, true);
        document.addEventListener('keyup', handleKeyUp, true);
        listenerAdded = true
      }
    }

    function removeEventForKeydown() {
      if (listenerAdded) {
        document.removeEventListener('keydown', handleKeyDown, true);
        document.removeEventListener('keyup', handleKeyUp, true);
        listenerAdded = false
      }
    }

    async function runKeyPressedTemp() {
      variables["isTabPressed_TEMP_WaitUntil?"] = true
      variables["isTabPressed_TEMP?"] = true
      await new Promise(resolve => setTimeout(resolve, 100));
      variables["isTabPressed_TEMP?"] = false
    }

    class Extension {
        getInfo() {
            return {
              id: "TAB",
              name: "Typable Tab Character",
              blocks: [
                {
                  opcode: 'tab_enabletyping',
                  text: '[ENABLE_MENU] typing for tab character',
                  blockType: Scratch.BlockType.COMMAND,
                  arguments: {
                    ENABLE_MENU: {
                      type: Scratch.ArgumentType.STRING,
                      menu: 'ENABLE_MENU'
                    }
                  }
                },
                {
                  opcode: 'tab_whentabKeypressed',
                  text: 'when tab key pressed',
                  blockType: Scratch.BlockType.HAT,
                  arguments: {}
                },
                {
                  opcode: 'tab_whentabKeyhit',
                  text: 'when tab key hit',
                  blockType: Scratch.BlockType.HAT,
                  arguments: {}
                },
                {
                  opcode: 'tab_tabKeypressed',
                  text: 'tab key pressed?',
                  blockType: Scratch.BlockType.BOOLEAN,
                  arguments: {}
                },
                {
                  opcode: 'tab_tabKeyhit',
                  text: 'tab key hit?',
                  blockType: Scratch.BlockType.BOOLEAN,
                  arguments: {}
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
                }
              }
            }
        }
        tab_enabletyping(args, util) {
            //variables["isTabTypable"] = args.ENABLE_MENU
            if (args.ENABLE_MENU == "true") {
              addEventForKeydown()
            } else {
              removeEventForKeydown()
            }
        }
        tab_whentabKeypressed(_, util) {
          return variables["isTabPressed?"]
        }
        tab_whentabKeyhit(_, util) {
          return variables["isTabPressed?"]
        }
        tab_tabKeypressed(_, util) {
          return variables["isTabPressed?"]
        }
        tab_tabKeyhit(_, util) {
          return variables["isTabPressed_TEMP?"]
        }
    }

    Scratch.extensions.register(new Extension());
})(Scratch);