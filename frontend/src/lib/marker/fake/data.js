export const testresult = {
    "tests": [
        {
            "description": "2 values",
            "output": "Closest pair not correct\n",
            "exit_code": 1,
            "passed": false,
            "timed_out": false,
            "mark": 0
        },
        {
            "description": "3 values",
            "output": "Closest pair not correct\n",
            "exit_code": 1,
            "passed": false,
            "timed_out": false,
            "mark": 0
        },
        {
            "description": "8 values",
            "output": "",
            "exit_code": 0,
            "passed": true,
            "timed_out": false,
            "mark": 1
        },
        {
            "description": "Closest pair in right subtree",
            "output": "",
            "exit_code": 0,
            "passed": true,
            "timed_out": false,
            "mark": 1
        },
        {
            "description": "Takes too long to run",
            "output": "",
            "exit_code": null,
            "passed": false,
            "timed_out": true,
            "mark": 0
        },
        {
            "description": "Closest pair root and max of left",
            "output": "",
            "exit_code": 0,
            "passed": true,
            "timed_out": false,
            "mark": 1
        },
        {
            "description": "Running another test...",
            "output": "Sleeping...\nSleeping...\nSleeping...\nSleeping...\nSleeping...\n",
            "exit_code": null,
            "passed": false,
            "timed_out": true,
            "mark": 0
        },
        {
            "description": "100 (random) values",
            "output": "Closest pair not correct\n",
            "exit_code": 1,
            "passed": false,
            "timed_out": false,
            "mark": 0
        }
    ],
    "marks": [
        0,
        0,
        1,
        1,
        1,
        0
    ],
    "compile_log": "closest.c:143:1: warning: non-void function does not return a value in all control paths [-Wreturn-type]\n}\n^\nclosest.c:292:1: warning: non-void function does not return a value in all control paths [-Wreturn-type]\n}\n^\nclosest.c:342:1: warning: non-void function does not return a value [-Wreturn-type]\n}\n^\nclosest.c:393:1: warning: non-void function does not return a value [-Wreturn-type]\n}\n^\n4 warnings generated.\n",
    "compiled": true,
    "total": 3,
}

export const config = {
    "assgn_dir": "A1/",
    "course": null,
    "assignment": "A1",
    "base_url": "https://markus.utsc.utoronto.ca/cscb63w21",
    "compile": "rm -f tests\ngcc testing/tests.c closest.c -o tests\n",
    "compile_check": "ls ./tests",
    "compile_log": "compile.log",
    "config": "testing//config.yml",
    "default_criteria": "tests",
    "file_names": [
      "closest.c"
    ],
    "imports": [
      "testing"
    ],
    "include_compile_log": true,
    "lms": "markus",
    "marksheet": "marksheet.yml",
    "report": "report.txt",
    "report_header": "********************************************************************************\n                            A1 Automarker Report\n********************************************************************************",
    "src_dir": "A1/",
    "tests": [
      {
        "after": null,
        "before": null,
        "command": "./tests two_values",
        "criteria": "tests",
        "description": "2 values",
        "exit_code": 0,
        "mark": 1,
        "output": true,
        "timeout": 1
      },
      {
        "after": null,
        "before": null,
        "command": "./tests three_values",
        "criteria": "tests",
        "description": "3 values",
        "exit_code": 0,
        "mark": 1,
        "output": true,
        "timeout": 1
      },
      {
        "after": null,
        "before": null,
        "command": "./tests eight_values",
        "criteria": "tests",
        "description": "8 values",
        "exit_code": 0,
        "mark": 1,
        "output": true,
        "timeout": 1
      },
      {
        "after": null,
        "before": null,
        "command": "./tests closest_in_right_subtree",
        "criteria": "tests",
        "description": "Closest pair in right subtree",
        "exit_code": 0,
        "mark": 1,
        "output": true,
        "timeout": 1
      },
      {
        "after": null,
        "before": null,
        "command": "./tests closest_in_root_and_left",
        "criteria": "tests",
        "description": "Closest pair root and max of left",
        "exit_code": 0,
        "mark": 1,
        "output": true,
        "timeout": 1
      },
      {
        "after": null,
        "before": null,
        "command": "./tests one_hundred_values",
        "criteria": "tests",
        "description": "100 (random) values",
        "exit_code": 0,
        "mark": 1,
        "output": true,
        "timeout": 1
      }
    ]
  }