# Marker-Web

This is a Flask-backend and Vue.js frontend for the [*marker* library](https://github.com/mustafaquraish/marker). The

[Try it out with dummy data!](https://mustafaquraish.github.io/marker-web/#/) (Mobile friendly too)

---

Running `marker-web` spins up a local server and hosts the frontend so you can use the marking utilities with a GUI. The layout makes it trivial to package this as a standalone app if needed.

*Disclaimer: This is still in development. There most definitely are UI quirks and missing features. If you find any, please open an Issue on GitHub and let me know!*

---

## How to install

There are 2 ways to install this marker. 

### Using PIP
This is by far the recommended way of installing this utility. Simply run:
```bash
pip install marker-web
```

### Build from source

Alternatively, if you want to develop, you will need to build from source:
```bash
git clone https://github.com/mustafaquraish/marker-web
cd marker-web
python setup.py install
```

---

## How to use

### Locally

In it's simplest form, you can start up the server with:
```bash
$ marker-web
```
You can also pass in the [same arguments as `marker` CLI](https://marker-docs.readthedocs.io/en/latest/getting_started/system_overview.html#using-the-cli). 

Currently, if either:

1. Your configuration file is not is not `assgn_dir/config.yml`, or 
2. Your `src_dir` is not the same as `assgn_dir`

Then you **must** pass in the correct arguments when running `marker-web`. Otherwise, the interface provides a little file explorer which lets you pick `assgn_dir` (and can infer the other two arguments)

By default, anyone else logged in on the machine can access the endpoints. To prevent this, you can run in *authenticated mode* with:

```bash
$ marker-web --auth
```
This will print out a random token which needs to be entered in the frontend to be able to access any information. A link is also print out with the token embedded in it, so you can just open that URL in your browser.

By default, the server runs on port `6275`. You can specify an alternate port using:

```bash
$ marker-web --port PORT
```

### Remote (Experimental)
***Note: This requires the remote machine to have `marker-web` installed, and for you to have SSH access to it***.

If you want to run the marker on a remote machine, but show the frontend on your local browser, this can be done via port-forwarding over SSH. For full flexibility, you want to [do this manually](https://www.ssh.com/academy/ssh/tunneling/example). However, if you are fine with some defaults, you can run:

```bash
$ marker-web --remote HOST
```
which is approximately the same as running:
```bash
$ ssh -L PORT:localhost:PORT HOST marker-web --auth
```

---

For the features available to you in the GUI, you should read through the [documentation for the marker CLI](https://marker-docs.readthedocs.io/en/latest/). Most things should be self-explanatory. 

---

## Development notes:

- The `frontend` directory contains the Vue frontend
- The `marker_web` directory contains the marker_server
- The `extra` directory contains some files to build a standalone app (on MacOS at least)
