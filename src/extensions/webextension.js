/*
    name: Site Runtime
    description: A Combined version of 2 Extensions: Packager Applications & AdaBrowser
*/

(function(Scratch) {
    const variables = {};
    let vm = Scratch.vm

    if (!Scratch.extensions.unsandboxed) {
      throw new Error('This extension must run unsandboxed');
    }

    let FULLSCREENMENU = [
      'enable',
      'disable'
    ]

    const isSafariNavigator = !navigator.userAgent.includes('Chrome') && navigator.userAgent.includes('Safari');

    /** @type {WakeLockSentinel} */
    let wakeLock = null;
    let latestEnabled = false;
    let promise = Promise.resolve();

    const disable = function(e){e.preventDefault(); return false}, enable = function(e){return true};
    const fakeEvent = {preventDefault: function(){}};
    document.oncontextmenu = enable;
    let isDisabled = false;

    const videoElement = document.createElement('video');
    videoElement.style.display = 'none';
    document.body.appendChild(videoElement);

    let mediaStream = null;

    let ABCTenabled = false;

    window.addEventListener("beforeunload", (e) => {
      if (ABCTenabled) {
        e.preventDefault();
      }
    });

    const IsFireFox = (navigator.userAgent.includes('Firefox')) ? true : null
    const IsSafari = (navigator.userAgent.includes('Safari')) ? true : null

    class Extension {
      constructor(runtime) {
        this.runtime = runtime
        this.runtime.on("PROJECT_STOP_ALL", this.stopAll.bind(this));
        this.thing = 0
      }
        getInfo() {
            return {
                blockIconURI: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAQXQAAEF0BLpgRKgAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAACAASURBVHic7N15eF1V1fjx7zo3SYcknce0aZKWAlpmiqA4AIKvIjO+KDKqDCrIpKg/B6y+6osgqODEICiDKCqICAgyiAqIMmOZOiedp3Ru0+Se9fsjrS9ioUl71z7T+jxPHp8HZK29zz333HX23mcfcM4555xzzjnnnHPOOeecc84555xzzjnnnHPOOeecc84555xzzjnnnHPOOeecc84555xzzjnnnHPOOeecc84555xzzjnnnHPOOeecc84555xzzjnnnHPOOeecc84555xzzjnnnHPOOeecc84555xzzjnnnHPOOeecc84555xzzjnnnHPOOeecc84555xzzjnnnHPOOeecc84555xzzjnnnHPOOeecc84555xzzjnnnHPOOeecc84555xzzjnnnHPOOeecc84555xzzjnnnHPOOeecc84555xzzjnnnHPOOeecc84555xzzjnnnHPOOeecc84555xzzjnnnHPOOeecc8654pKkG+Cc2046tQaieigNBBkEDPi/P+kPWtX97zeL+wN9Xh0BohWb/t1GkLWb/vE6oGPT/2clsASiZbBhOTJpjW2nnHPWvABwLq102gDQ8SCNIKNARgMjQMd0/y+jgNFAvwRa1wEs2/S3fNP/LgVdANEc0E1/G9uQSRsTaJ9zbiu8AHAuSTp9BDAJdAJE47t/8BkPtADDkm1cRcTAfGA2yGzQ2d2FAdOg7/NI4/IkG+dckXkB4FwIOmsQlCfQ/WP/5u7/lb3pvoMvsnbgBeBJYCrIC9DvKaRhXcLtci73vABwrtJ02oBNP+77gL4FZB9gXNLNypAyMB3kedB/QPQYVD+BNK5PumHO5YkXAM5tL532ZojeBbofsA+wExAl3Kq86QR9GuQx4DHQR5CJc5NulHNZ5gWAc72hKjBjEnAAKu8EfRfdC/JceHNRHiWSRyH+IzLxhaQb5FyWeAHg3Nboy2Mgeh/Ke0HeRT4W5+VRGyr3EcX3Qs39SFN70g1yLs28AHDutVRLMGMPYj0ckcOAvfDvStaUgWdQvZ8ouh/aH0Ymdybd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SNlTJMlTpNNPca69Fjs5kdFKBYBIvZriHfSzNamBMST295htCT4G2BrjPbhvBrYpqwqFGLcX/gi+DGwZsAx4FbfnSfnzuL+At77AAP9fV/Mi9UkFgEgzmOQbk2EzqGyO2SZUbSNStOBsiFkrzgZAGpI3/10DTxUwihivg1eA5TgFUl6k6q+TSr+BsYzNWUbeklDNExERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERlJ/wvsA+lFbrLysQAAAABJRU5ErkJggg==",
                id: "WebExtension",
                name: "Site Runtime",
                color1: "#8361ff",
                color2: "#6944c1",
                blocks: [
                  {
                    func: 'WebExt_Notify',
                    text: 'note to some blocks',
                    blockType: Scratch.BlockType.BUTTON,
                  },
                  {
                    opcode: 'WebExt_CurrentUrl',
                    text: 'current url',
                    blockType: Scratch.BlockType.REPORTER,
                    arguments: {}
                  },
                  {
                    opcode: 'WebExt_Browser',
                    text: 'browser',
                    blockType: Scratch.BlockType.REPORTER,
                    arguments: {}
                  },
                  {
                    opcode: 'WebExt_System',
                    text: 'operating system',
                    blockType: Scratch.BlockType.REPORTER,
                    arguments: {}
                  },
                  "---",
                  {
                    opcode: 'WebExt_CurrentIP',
                    text: 'current ip',
                    blockType: Scratch.BlockType.REPORTER,
                    arguments: {}
                  },
                  {
                    blockType: "label",
                    text: "Other Current _ Blocks",
                  },
                  {
                    opcode: 'WebExt_CurrentDomain',
                    text: 'current domain name',
                    blockType: Scratch.BlockType.REPORTER,
                    arguments: {}
                  },
                  {
                    opcode: 'WebExt_CurrentPath',
                    text: 'current path name',
                    blockType: Scratch.BlockType.REPORTER,
                    arguments: {}
                  },
                  {
                    opcode: 'WebExt_CurrentProtocol',
                    text: 'current protocol',
                    blockType: Scratch.BlockType.REPORTER,
                    arguments: {}
                  },
                  {
                    blockType: "label",
                    text: "Open Other Sites",
                  },
                  {
                    opcode: 'WebExt_OpenWeb',
                    text: 'open website [URL] in new [TARGET]',
                    blockType: Scratch.BlockType.COMMAND,
                    arguments: {
                        URL: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'https://example.com'
                        },
                        TARGET: {
                          type: Scratch.ArgumentType.STRING,
                          menu: 'TARGET_MENU'
                        },
                    }
                  },
                  {
                    opcode: 'WebExt_RedirectWeb',
                    text: 'redirect to site [URL]',
                    blockType: Scratch.BlockType.COMMAND,
                    arguments: {
                        URL: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'https://example.com'
                        }
                    }
                  },
                  {
                    blockType: "label",
                    text: "Fullscreen",
                  },
                  {
                    opcode: 'WebExt_Fullscreen',
                    text: '[FULLSCREEN_MENU] fullscreen mode',
                    blockType: Scratch.BlockType.COMMAND,
                    arguments: {
                      FULLSCREEN_MENU: {
                        type: Scratch.ArgumentType.STRING,
                        menu: 'FULLSCREEN_MENU'
                      }
                    }
                  },
                  {
                    opcode: 'WebExt_isFullscreen',
                    text: 'is fullscreen on?',
                    blockType: Scratch.BlockType.BOOLEAN,
                    arguments: {}
                  },
                  {
                    blockType: "label",
                    text: "Field in URL",
                  },
                  {
                    opcode: 'WebExt_QueryStringField',
                    blockType: Scratch.BlockType.BOOLEAN,
                    text: 'field [FIELD] exists in current url',
                    arguments: {
                        FIELD: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'search'
                        }
                    }
                  },
                  {
                    opcode: 'WebExt_URLQueryStringField',
                    blockType: Scratch.BlockType.BOOLEAN,
                    text: 'field [FIELD] exists in url [URL]',
                    arguments: {
                        FIELD: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'search'
                        },
                        URL: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'https://example.com'
                        }
                    }
                  },
                  {
                    opcode: 'WebExt_setQueryStringFieldValue',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'set field [FIELD] value from value [VALUE]',
                    arguments: {
                        FIELD: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'search'
                        },
                        VALUE: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'value'
                        }
                    }
                  },
                  {
                    blockType: "label",
                    text: "Primary Screen Size",
                  },
                  {
                    opcode: 'WebExt_getWidth',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'primary screen width',
                    arguments: {}
                  },
                  {
                    opcode: 'WebExt_getHeight',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'primary screen height',
                    arguments: {}
                  },
                  {
                    blockType: "label",
                    text: "Web Title",
                  },
                  {
                    opcode: 'WebExt_SiteTitle',
                    text: 'current web title',
                    blockType: Scratch.BlockType.REPORTER,
                    arguments: {}
                  },
                  {
                    opcode: 'WebExt_ChangeWebTitle',
                    text: 'change web title to [TITLE]',
                    blockType: Scratch.BlockType.COMMAND,
                    arguments: {
                        TITLE: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'my cool project!'
                        }
                    }
                  },
                  {
                    blockType: "label",
                    text: "Favicon",
                  },
                  {
                    opcode: 'WebExt_Favicon',
                    text: 'use [URL] as favicon',
                    blockType: Scratch.BlockType.COMMAND,
                    hideFromPalette: IsSafari,
                    arguments: {
                        URL: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'https://example.com/favicon.ico'
                        }
                    }
                  },
                  {
                    opcode: 'WebExt_URLFavicon',
                    text: '[URL] \/ favicon\.ico',
                    blockType: Scratch.BlockType.REPORTER,
                    arguments: {
                      URL: {
                        type: Scratch.ArgumentType.STRING,
                        defaultValue: 'URL'
                      },
                    }
                  },
                  {
                    blockType: "label",
                    text: "Test Blocks",
                  },
                  {
                    opcode: 'WebExt_Date',
                    text: 'date since 1970',
                    blockType: Scratch.BlockType.REPORTER,
                    arguments: {}
                  },
                  {
                    opcode: 'WebExt_Reset',
                    text: 'refresh workspace',
                    blockType: Scratch.BlockType.COMMAND,
                    arguments: {}
                  },
                  {
                    blockType: "label",
                    text: "Memory"
                  },
                  {
                    opcode: 'WebExt_GetMemory',
                    text: 'device memory in GB',
                    blockType: Scratch.BlockType.REPORTER,
                    arguments: {}
                  },
                  {
                    blockType: "label",
                    text: "Window Stuff",
                  },
                  {
                    opcode: "WebExt_windowX",
                    blockType: Scratch.BlockType.REPORTER,
                    text: "window x",
                  },
                  {
                    opcode: "WebExt_windowY",
                    blockType: Scratch.BlockType.REPORTER,
                    text: "window y",
                  },
                  {
                    opcode: "WebExt_setX",
                    blockType: Scratch.BlockType.COMMAND,
                    text: "set window x to [X]",
                    arguments: {
                        X: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: 0
                           }
                        }
                  },
                  {
                    opcode: "WebExt_changeX",
                    blockType: Scratch.BlockType.COMMAND,
                    text: "change window x by [X]",
                    arguments: {
                        X: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: 10
                        }
                    }
                  },
                  {
                    opcode: "WebExt_setY",
                    blockType: Scratch.BlockType.COMMAND,
                    text: "set window y to [Y]",
                    arguments: {
                        Y: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: 0
                        }
                    }
                  },
                  {
                    opcode: "WebExt_changeY",
                    blockType: Scratch.BlockType.COMMAND,
                    text: "change window y by [Y]",
                    arguments: {
                        Y: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: 10
                        }
                    }
                  },
                  "---",
                  {
                    opcode: "WebExt_windowW",
                    blockType: Scratch.BlockType.REPORTER,
                    text: "window width",
                  },
                  {
                    opcode: "WebExt_windowH",
                    blockType: Scratch.BlockType.REPORTER,
                    text: "window height",
                  },
                  {
                    opcode: "WebExt_resizeWindow",
                    blockType: Scratch.BlockType.COMMAND,
                    text: "set window size to width: [WIDTH] height: [HEIGHT]",
                    arguments: {
                        WIDTH: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '640'
                        },
                        HEIGHT: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '360'
                        }
                    }
                  },
                  "---",
                  {
                    opcode: 'WebExt_TouchingEdge',
                    text: 'is window touching edge of screen',
                    blockType: Scratch.BlockType.BOOLEAN,
                    arguments: {}
                  },
                  {
                    blockType: "label",
                    text: "Screen Sharing (Credits to pooiod7)",
                  },
                  {
                    opcode: 'WebExt_startScreenSharing',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'Start Screen Sharing',
                  },
                  {
                    opcode: 'WebExt_stopScreenSharing',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'Stop Screen Sharing',
                  },
                  "---",
                  {
                    opcode: 'WebExt_getVideoImage',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'Get Video Image as Hex Colors with Resolution [REZ]',
                    arguments: {
                      REZ: {
                        type: Scratch.ArgumentType.NUMBER,
                        defaultValue: 0.1,
                      },
                    },
                  },
                  {
                    opcode: 'WebExt_getFrameDataURI',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'Get Frame as Data URI with Resolution [REZ]',
                    arguments: {
                      REZ: {
                        type: Scratch.ArgumentType.NUMBER,
                        defaultValue: 0.5,
                      },
                    },
                  },
                  {
                    opcode: 'WebExt_getInWebpFormat',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'Get WEBP: rez [REZ] Quality [QUALITY]',
                    arguments: {
                      REZ: {
                        type: Scratch.ArgumentType.NUMBER,
                        defaultValue: 0.5,
                      },
                      QUALITY: {
                        type: Scratch.ArgumentType.NUMBER,
                        defaultValue: 0.7, 
                      },
                    },
                  },
                  {
                    opcode: 'WebExt_getInJpegFormat',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'Get JPEG: rez [REZ] Quality [QUALITY]',
                    arguments: {
                      REZ: {
                        type: Scratch.ArgumentType.NUMBER,
                        defaultValue: 0.5,
                      },
                      QUALITY: {
                        type: Scratch.ArgumentType.NUMBER,
                        defaultValue: 0.7, 
                      },
                    },
                  },
                  "---",
                  {
                    opcode: 'WebExt_isSharing',
                    blockType: Scratch.BlockType.BOOLEAN,
                    text: 'Is Sharing?',
                  },
                  {
                    opcode: 'WebExt_getAspectRatio',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'Stream Size',
                  },
                  {
                    blockType: "label",
                    text: "Right Click Menu",
                  },
                  {
                    opcode: 'WebExt_RightClick',
                    text: '[RIGHTCLICK_MENU] right-click menu',
                    blockType: Scratch.BlockType.COMMAND,
                    arguments: {
                      RIGHTCLICK_MENU: {
                        type: Scratch.ArgumentType.STRING,
                        menu: 'FULLSCREEN_MENU'
                      }
                    }
                  },
                  {
                    opcode: 'WebExt_isRightClick',
                    text: 'is right-click menu disabled?',
                    blockType: Scratch.BlockType.BOOLEAN,
                    arguments: {}
                  },
                  {
                    blockType: "label",
                    text: "Wake Lock",
                  },
                  {
                    opcode: 'WebExt_WakeLock',
                    text: '[WAKELOCK_MENU] wake lock',
                    blockType: Scratch.BlockType.COMMAND,
                    arguments: {
                      WAKELOCK_MENU: {
                        type: Scratch.ArgumentType.STRING,
                        menu: 'WAKELOCK_MENU'
                      }
                    },
                    hideFromPalette: IsFireFox || false
                  },
                  {
                    opcode: 'WebExt_isWakeLock',
                    text: 'is wake lock enabled?',
                    hideFromPalette: IsFireFox || false,
                    blockType: Scratch.BlockType.BOOLEAN,
                    arguments: {}
                  },
                  {
                    blockType: "label",
                    text: "Share URL",
                  },
                  {
                    opcode: 'WebExt_shareURL',
                    blockType: Scratch.BlockType.COMMAND,
                    hideFromPalette: IsFireFox || IsSafari || false,
                    text: 'share URL [URL] with [TITLE] and message [MESSAGE]',
                    arguments: {
                      URL: {
                        type: Scratch.ArgumentType.STRING,
                        default: 'URL'
                      },
                      TITLE: {
                        type: Scratch.ArgumentType.STRING,
                        defaultValue: 'Title'
                      },
                      MESSAGE: {
                        type: Scratch.ArgumentType.STRING,
                        defaultValue: 'Message'
                      },
                    }
                  },
                  {
                    opcode: 'WebExt_canShareURL',
                    text: 'can share URL?',
                    blockType: Scratch.BlockType.BOOLEAN,
                    hideFromPalette: IsFireFox || IsSafari || false,
                    arguments: {}
                  },
                  {
                    blockType: "label",
                    text: "Notifications",
                  },
                  {
                    opcode: 'WebExt_DisplayNotification',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'display notification with title: [TITLE] and message: [MESSAGE] during [DURATION] seconds',
                    func: 'WebExt_DisplayNotification',
                    arguments: {
                      TITLE: {
                        type: Scratch.ArgumentType.STRING,
                        defaultValue: 'title'
                      },
                      MESSAGE: {
                        type: Scratch.ArgumentType.STRING,
                        defaultValue: 'message'
                      },
                      DURATION: {
                        type: Scratch.ArgumentType.NUMBER,
                        defaultValue: 3
                      }
                     }
                  },
                  {
                    opcode: 'WebExt_DisplayNotificationWithIcon',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'display notification with title: [TITLE] and message: [MESSAGE] during [DURATION] seconds and [URL] as icon',
                    func: 'WebExt_DisplayNotification',
                    arguments: {
                      TITLE: {
                        type: Scratch.ArgumentType.STRING,
                        defaultValue: 'title'
                      },
                      MESSAGE: {
                        type: Scratch.ArgumentType.STRING,
                        defaultValue: 'message'
                      },
                      DURATION: {
                        type: Scratch.ArgumentType.NUMBER,
                        defaultValue: 3
                      },
                      URL: {
                        type: Scratch.ArgumentType.STRING,
                        defaultValue: 'URL'
                      }
                     }
                  },
                  {
                    opcode: 'WebExt_canDisplayNotification',
                    blockType: Scratch.BlockType.BOOLEAN,
                    text: 'can display notifications?',
                    arguments: {}
                  },
                  {
                    blockType: "label",
                    text: "Dialog",
                  },
                  {
                    opcode: 'WebExt_windowAlert',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'alert [MESSAGE]',
                    arguments: {
                        MESSAGE: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'information'
                        }
                     }
                  },
                  {
                    opcode: 'WebExt_windowPromptdefault',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'prompt [QUESTION] default [DEFAULT]',
                    arguments: {
                        QUESTION: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'question'
                        },
                        DEFAULT: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: ''
                        }
                     }
                  },
                  {
                    opcode: 'WebExt_CommandwindowPromptdefault',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'prompt [QUESTION] default [DEFAULT]',
                    arguments: {
                        QUESTION: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'question'
                        },
                        DEFAULT: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: ''
                        }
                     }
                  },
                  {
                    opcode: 'WebExt_windowConfirmation',
                    blockType: Scratch.BlockType.BOOLEAN,
                    text: 'confirm [QUESTION]',
                    arguments: {
                        QUESTION: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: 'question'
                        }
                     }
                  },
                  {
                    blockType: "label",
                    text: "User",
                  },
                  {
                    opcode: 'WebExt_isFocused',
                    blockType: Scratch.BlockType.BOOLEAN,
                    text: 'is user using this window?',
                    arguments: {}
                  },
                  {
                    blockType: "label",
                    text: "Ask Before Closing Tab\n(Credits to CubesterYT)",
                  },
                  {
                    opcode: "WebExt_setControl",
                    blockType: Scratch.BlockType.COMMAND,
                    text: "set ask before closing tab to [OPTION]",
                    arguments: {
                      OPTION: {
                        type: Scratch.ArgumentType.STRING,
                        menu: "ABCT_OPTION",
                      },
                    },
                  },
                  {
                    opcode: "WebExt_getControl",
                    blockType: Scratch.BlockType.BOOLEAN,
                    text: "ask before closing tab enabled?",
                  },
                  {
                    blockType: "label",
                    text: "Cookies",
                  },
                  {
                    opcode: "WebExt_cookiesEnabled",
                    blockType: Scratch.BlockType.REPORTER,
                    text: "are cookies enabled?",
                  },
                  {
                    blockType: "label",
                    text: "Other",
                  },
                  {
                    opcode: 'WebExt_reloadpage',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'reload page',
                    arguments: {}
                  },
                  {
                    blockType: "label",
                    text: "Dangerous!",
                  },
                  {
                    blockType: "label",
                    text: "History",
                  },
                  {
                    opcode: 'WebExt_goforward',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'go to next url in history',
                    isTerminal: true,
                    arguments: {}
                  },
                  {
                    opcode: 'WebExt_goback',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'go to previous url in history',
                    isTerminal: true,
                    arguments: {}
                  },
                  "---",
                  {
                    opcode: 'WebExt_closetab',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'close this tab',
                    isTerminal: true,
                    arguments: {}
                  },
                ],
                menus: {
                  FULLSCREEN_MENU: {
                    acceptReporters: true,
                    items: FULLSCREENMENU
                  },
                  WAKELOCK_MENU: {
                    acceptReporters: false,
                    items: [
                      { text: "enable", value: "true" },
                      { text: "disable", value: "false" },
                    ]
                  },
                  TARGET_MENU: {
                    acceptReporters: false,
                    items: [
                      { text: "tab", value: "tab" },
                      { text: "window", value: "window" },
                    ]
                  },
                  ABCT_OPTION: {
                    acceptReporters: true,
                    items: [
                      {
                        text: "enabled",
                        value: "true",
                      },
                      {
                        text: "disabled",
                        value: "false",
                      },
                    ],
                  },
                }
            };
        }
        WebExt_Notify() {
          alert(
            `
            The wake lock block takes a moment to finish 
            running as it activates wake lock, so if you put 
            it in a script with other blocks, it will yield 
            briefly, so try keeping it separate from your 
            other scripts. The "is wake lock active?" 
            boolean reporter, however, does not have a delay.`
/*
            These Specific Blocks don't work in the browsers:
            The Set Favicon Block does not work in Safari.
            Firefox does not have the "Sharing URL" feature.
            The "Sharing URL" Block breaks Safari Navigator.
            Firefox does not support the "Wake Lock" feature.*/
          )
        }
        WebExt_CurrentUrl(args, util) {
            return window.location.href;
        }
        WebExt_Browser(args, util) {
          if (!('userAgent' in navigator)) return 'Unknown';
          const agent = navigator.userAgent;
          if ('userAgentData' in navigator) {
              const agentData = JSON.stringify(navigator.userAgentData.brands);
              if (agentData.includes('Google Chrome')) {
                  return 'Chrome';
              }
              if (agentData.includes('Opera')) {
                  return 'Opera';
              }
              if (agentData.includes('Microsoft Edge')) {
                  return 'Edge';
              }
          }
          if (agent.includes('Chrome')) {
              return 'Chrome';
          }
          if (agent.includes('Firefox')) {
              return 'Firefox';
          }
          // Apparently Dinosaurmod cannot be loaded in IE 11 (the last supported version)
          // if (agent.includes('MSIE') || agent.includes('rv:')) {
          //     return 'Internet Explorer';
          // }
          if (agent.includes('Safari')) {
              return 'Safari';
          }
          return 'Unknown';
        }
        WebExt_System(args, util) {
          if (!('userAgent' in navigator)) return 'Unknown';
          const agent = navigator.userAgent;
          if (agent.includes('Mac OS')) {
              return 'MacOS';
          }
          if (agent.includes('CrOS')) {
              return 'ChromeOS';
          }
          if (agent.includes('Linux')) {
              return 'Linux';
          }
          if (agent.includes('Windows')) {
              return 'Windows';
          }
          if (agent.includes('iPad') || agent.includes('iPod') || agent.includes('iPhone')) {
              return 'iOS';
          }
          if (agent.includes('Android')) {
              return 'Android';
          }
          return 'Unknown';
        }
        WebExt_CurrentIP(_, util) {
          return Scratch.fetch("https://api.ipify.org/")
          .then((r) => r.text())
          .catch(() => "");
        }
        WebExt_CurrentDomain(args, util) {
          return window.location.hostname;
        }
        WebExt_CurrentPath(args, util) {
          return window.location.pathname;
        }
        WebExt_CurrentProtocol(args, util) {
          return window.location.protocol;
        }
        WebExt_OpenWeb(args, util) {
            switch (args.TARGET) {
              case 'tab':
                window.open(args.URL, '_blank');
                break;
              case 'window':
                window.open(args.URL, '_blank', 'width=480,height=360');
                break;
            }
        }
        WebExt_RedirectWeb(args, util) {
            Scratch.redirect(args.URL);
        }
        WebExt_Fullscreen(args, util) {
          if ((args.FULLSCREEN_MENU) === 'enable') {
            document.documentElement.requestFullscreen();
          } else if ((args.FULLSCREEN_MENU) === 'disable') {
            document.exitFullscreen();
          }
        }
        WebExt_isFullscreen(args, util) {
            if (document.fullscreenElement) {
                return true;
            }
            return false;
        }
        WebExt_QueryStringField(args) {
            const field = args.FIELD
            let parameters = (new URL(window.location)).searchParams
            return parameters.has(field)
        }
        WebExt_URLQueryStringField(args) {
            const field = args.FIELD
            const linkURL = args.URL
            let parameters = (new URL(linkURL)).searchParams
            return parameters.has(field)
        }
        WebExt_setQueryStringFieldValue(args) {
          const url = new URL(window.location.href);
          const parameters = new URLSearchParams(url.search);
          parameters.set(args.FIELD, args.VALUE);
          url.search = parameters.toString();
          const newCurrentUrl = url.search;
          history.pushState(
            history.state,
            document.title,
            newCurrentUrl
          );
        }
        WebExt_getWidth() {
            return window.screen.width;
        }
        WebExt_getHeight() {
            return window.screen.height;
        }
        WebExt_SiteTitle(args, util) {
            return document.title;
        }
        WebExt_ChangeWebTitle(args, util) {
            document.title = args.TITLE;
        }
        WebExt_Favicon(args, util) {
          let link = document.querySelector("link[rel~='icon']");
          if (!link) {
            link = document.createElement('link');
            link.rel = 'icon';
            document.getElementsByTagName('head')[0].appendChild(link);
          }
          link.href = args.URL;
        }
        WebExt_Date(args, util) {
            return Date.now()
        }
        WebExt_Reset(args, util) {
            return vm.refreshWorkspace();
        }
        WebExt_URLFavicon(args, util) {
          return this._appendFaviconPath(args.URL)
        }
        WebExt_GetMemory(_, util) {
            // @ts-expect-error
            if (navigator.deviceMemory == undefined) {
              return "Unsupported";
            } else {
              // @ts-expect-error
              return navigator.deviceMemory;
            }
        }
        WebExt_windowX() {
            return window.screenLeft;
        }
        WebExt_windowY() {
            return window.screenTop;
        }
        WebExt_setX(args) {
            const y = window.screenY;
            window.moveTo(args.X, y);
        }
        WebExt_changeX(args) {
            window.moveBy(args.X, 0);
        }
        WebExt_setY(args) {
            const x = window.screenX;
            window.moveTo(x, args.Y);
        }
        WebExt_changeY(args) {
            window.moveBy(0, args.Y);
        }
        WebExt_windowW() {
            return window.outerWidth;
        }
        WebExt_windowH() {
            return window.outerHeight;
        }
        WebExt_resizeWindow(args) {
            window.resizeTo(args.WIDTH, args.HEIGHT);
        }
        WebExt_TouchingEdge(args, util) {
            const edgeX = screen.width - window.outerWidth;
        	const edgeY = screen.height - window.outerHeight;
            return (
                window.screenLeft <= 0 ||
                window.screenTop <= 0 ||
                window.screenLeft >= edgeX ||
                window.screenTop >= edgeY
            );
        }
        WebExt_startScreenSharing() {
          navigator.mediaDevices
            .getDisplayMedia({ video: true })
            .then((stream) => {
              mediaStream = stream; 
              videoElement.srcObject = stream;
              videoElement.play();
              stream.getVideoTracks()[0].onended = function () {
                mediaStream = null;
              };
            })
            .catch((error) => {
              console.error('Error starting screen sharing:', error);
            });
        }
        
        WebExt_isSharing() {
          return !!mediaStream && !!videoElement.srcObject;
        }
    
        WebExt_stopScreenSharing() {
          if (mediaStream) {
            mediaStream.getTracks().forEach((track) => {
              track.stop();
            });
            videoElement.srcObject = null;
          }
        }
    
        WebExt_getVideoImage(args) {
          var rez = args.REZ;
          if (rez > 1) {
            rez = 1;
          }
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          const width = videoElement.videoWidth * rez;
          const height = videoElement.videoHeight * rez;
          canvas.width = width;
          canvas.height = height;
    
          context.drawImage(videoElement, 0, 0, width, height);
    
          const imageData = context.getImageData(0, 0, width, height).data;
    
          const hexColors = [];
          for (let i = 0; i < imageData.length; i += 4) {
            const r = imageData[i].toString(16).padStart(2, '0');
            const g = imageData[i + 1].toString(16).padStart(2, '0');
            const b = imageData[i + 2].toString(16).padStart(2, '0');
            hexColors.push(`#${r}${g}${b}`);
          }
    
          return hexColors;
        }
    
        WebExt_getFrameDataURI(args) {
          var rez = args.REZ;
          if (rez > 1) {
            rez = 1;
          }
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          const width = videoElement.videoWidth * rez;
          const height = videoElement.videoHeight * rez;
          canvas.width = width;
          canvas.height = height;
    
          context.drawImage(videoElement, 0, 0, width, height);
    
          const dataURI = canvas.toDataURL('image/png');
    
          return dataURI;
        }
    
        WebExt_getInJpegFormat(args) {
          let rez = args.REZ;
          if (rez > 1) {
            rez = 1;
          }
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          const width = videoElement.videoWidth * rez;
          const height = videoElement.videoHeight * rez;
          canvas.width = width;
          canvas.height = height;
    
          context.drawImage(videoElement, 0, 0, width, height);
    
          const quality = args.QUALITY;
          const dataURI = canvas.toDataURL('image/jpeg', quality);
    
          return dataURI;
        }
        
        WebExt_getInWebpFormat(args) {
          let rez = args.REZ;
          if (rez > 1) {
            rez = 1;
          }
        
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          const width = videoElement.videoWidth * rez;
          const height = videoElement.videoHeight * rez;
          canvas.width = width;
          canvas.height = height;
        
          context.drawImage(videoElement, 0, 0, width, height);
        
          const quality = args.QUALITY;
        
          const dataURI = canvas.toDataURL('image/webp', quality);
        
          return dataURI;
        }
    
        WebExt_getAspectRatio() {
          const width = videoElement.videoWidth;
          const height = videoElement.videoHeight;
          return "["+width+", "+height+"]";
        }
        WebExt_RightClick(args, util) {
            if (args.RIGHTCLICK_MENU === 'enable') {
              document.oncontextmenu = enable;
            } else if (args.RIGHTCLICK_MENU === 'disable') {
              document.oncontextmenu = disable;
            }
        }
        WebExt_isRightClick(_, util) {
            return (!document.oncontextmenu(fakeEvent))
        }
        stopAll() {
          this.WebExt_WakeLock({
            enabled: false,
          });
        }
        WebExt_WakeLock(args, util) {
          if (!navigator.wakeLock) {
            // Not supported in this browser.
            return;
          }
    
          const previousEnabled = latestEnabled;
          latestEnabled = Scratch.Cast.toBoolean(args.WAKELOCK_MENU);
          if (latestEnabled && !previousEnabled) {
            promise = promise
              .then(() => navigator.wakeLock.request("screen"))
              .then((sentinel) => {
                wakeLock = sentinel;
              })
              .catch((error) => {
                console.error(error);
                // Allow to retry
                latestEnabled = false;
              });
            return promise;
          } else if (!latestEnabled && previousEnabled) {
            promise = promise
              .then(() => {
                if (wakeLock) {
                  return wakeLock.release();
                } else {
                  // Attempt to enable in the first place didn't work
                }
              })
              .then(() => {
                wakeLock = null;
              })
              .catch((error) => {
                console.error(error);
                wakeLock = null;
              });
            return promise;
          }
        }
        WebExt_isWakeLock(_, util) {
          return !!wakeLock;
        }
        WebExt_canShareURL () {
          // eslint-disable-next-line no-negated-condition
          if (!navigator.canShare) {
              return false;
          // eslint-disable-next-line no-else-return
          // As the share URL method makes the Safari navigator bug, we return false here
          // althougth if navigator.canShare() is supported
          } else if (isSafariNavigator) {
              return false;
          // eslint-disable-next-line no-else-return
          } else {
              return true;
          }
        }
  
        WebExt_shareURL (args) {
          // As this block makes the Safari navigator bug, we disable this
          // method when the navigator is Safari by returning false
          if (isSafariNavigator) {
              return;
          // eslint-disable-next-line no-else-return
          } else {
              navigator.share({
                  url: args.URL,
                  title: args.TITLE,
                  text: args.MESSAGE
              });
          }
        }
        WebExt_canDisplayNotification () {
          if ('Notification' in window && Notification.requestPermission) {
              return true;
          }
          return false;
        }
        WebExt_DisplayNotification(args, util) {
          // Create notification
          const doNotify = () => {
          const title = args.TITLE;
          const options = {
              body: args.MESSAGE,
              icon: args.URL
          };
          const duration = args.DURATION * 1000;
          const n = new Notification(title, options);
          setTimeout(n.close.bind(n), duration); // close notification after duration seconds
          };

          // Display notification
          if (this.WebExt_canDisplayNotification() === true) {
            Notification.requestPermission()
              .then(() => {
                  if (Notification.permission === 'granted') {
                      doNotify();
                  }
              })
              .catch(err => {
                  // eslint-disable-next-line no-console
                  console.log(err);
              });
          } else {
            return false;
          }
        }
        WebExt_windowAlert(args, util) {
            window.alert(args.MESSAGE);
        }
        WebExt_windowPromptdefault(args, util) {
            return window.prompt(args.QUESTION, args.DEFAULT);
        }
        WebExt_CommandwindowPromptdefault(args, util) {
            window.prompt(args.QUESTION, args.DEFAULT);
        }
        WebExt_windowConfirmation(args, util) {
            return window.confirm(args.QUESTION);
        }
        WebExt_isFocused(args, util) {
            return document.hasFocus();
        }
        WebExt_cookiesEnabled(_, util) {
            return navigator.cookieEnabled;
        }
        WebExt_setControl({ OPTION }) {
            ABCTenabled = Scratch.Cast.toBoolean(OPTION);
        }
        WebExt_getControl() {
            return ABCTenabled;
        }
        WebExt_reloadpage(args, util) {
            window.location.reload();
        }
        WebExt_goforward(args, util) {
            window.history.forward();
        }
        WebExt_goback(args, util) {
            window.history.back();
        }
        WebExt_closetab(args, util) {
            window.close();
        }
        _appendFaviconPath(inputString) {
          // Check if the input string ends with "/"
          if (inputString.slice(-1) === '/') {
            // If it does, remove the last character
            inputString = inputString.slice(0, -1);
          }

          // Append "/favicon.ico" to the string
          const resultString = inputString + "/favicon.ico";

          return resultString;
        }
    }
    Scratch.extensions.register(new Extension(Scratch.vm.runtime));
})(Scratch);