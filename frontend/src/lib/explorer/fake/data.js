

export const filetree ={
  "name": "/",
  "path": "/",
  "dir": true,
  "entries": {
    ".hidden": {
      "name": ".hidden",
      "path": "/.hidden",
      "dir": false
    },
    "world.txt": {
      "name": "world.txt",
      "path": "/world.txt",
      "dir": false
    },
    "etc": {
      "name": "etc",
      "path": "/etc",
      "dir": true,
      "entries": {
        "shadow": {
          "name": "shadow",
          "path": "/etc/shadow",
          "dir": false
        },
        "defaults": {
          "name": "defaults",
          "path": "/etc/defaults",
          "dir": true,
          "entries": {}
        },
        "hello.txt": {
          "name": "hello.txt",
          "path": "/etc/hello.txt",
          "dir": false
        },
        "passwd": {
          "name": "passwd",
          "path": "/etc/passwd",
          "dir": false
        }
      }
    },
    "Users": {
      "name": "Users",
      "path": "/Users",
      "dir": true,
      "entries": {
        "user2": {
          "name": "user2",
          "path": "/Users/user2",
          "dir": true,
          "entries": {
            "file.txt": {
              "name": "file.txt",
              "path": "/Users/user2/file.txt",
              "dir": false
            }
          }
        },
        "user1": {
          "name": "user1",
          "path": "/Users/user1",
          "dir": true,
          "entries": {
            "stuff.py": {
              "name": "stuff.py",
              "path": "/Users/user1/stuff.py",
              "dir": false
            },
            ".bashrc": {
              "name": ".bashrc",
              "path": "/Users/user1/.bashrc",
              "dir": false
            },
            "Desktop": {
              "name": "Desktop",
              "path": "/Users/user1/Desktop",
              "dir": true,
              "entries": {}
            },
            ".vimrc": {
              "name": ".vimrc",
              "path": "/Users/user1/.vimrc",
              "dir": false
            },
            "Documents": {
              "name": "Documents",
              "path": "/Users/user1/Documents",
              "dir": true,
              "entries": {
                "A1": {
                  "name": "A1",
                  "path": "/Users/user1/Documents/A1",
                  "dir": true,
                  "entries": {
                    "Makefile": {
                      "name": "Makefile",
                      "path": "/Users/user1/Documents/A1/Makefile",
                      "dir": false
                    },
                    "tests.cpp": {
                      "name": "tests.cpp",
                      "path": "/Users/user1/Documents/A1/tests.cpp",
                      "dir": false
                    },
                    "config.yml": {
                      "name": "config.yml",
                      "path": "/Users/user1/Documents/A1/config.yml",
                      "dir": false
                    }
                  }
                }
              }
            },
            "Downloads": {
              "name": "Downloads",
              "path": "/Users/user1/Downloads",
              "dir": true,
              "entries": {}
            }
          }
        }
      }
    },
    "Applications": {
      "name": "Applications",
      "path": "/Applications",
      "dir": true,
      "entries": {
        "VSCode.app": {
          "name": "VSCode.app",
          "path": "/Applications/VSCode.app",
          "dir": false
        },
        "Brave.app": {
          "name": "Brave.app",
          "path": "/Applications/Brave.app",
          "dir": false
        },
        "Utilities": {
          "name": "Utilities",
          "path": "/Applications/Utilities",
          "dir": true,
          "entries": {
            "Calculator.app": {
              "name": "Calculator.app",
              "path": "/Applications/Utilities/Calculator.app",
              "dir": false
            }
          }
        }
      }
    },
    "hello.txt": {
      "name": "hello.txt",
      "path": "/hello.txt",
      "dir": false
    }
  }
}
