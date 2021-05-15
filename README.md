# Marker-Web

This is a Flask-backend and Vue.js frontend for the [*marker* library](https://github.com/mustafaquraish/marker). The

[Try it out with dummy data!](https://mustafaquraish.github.io/marker-web/#/) (Mobile friendly too)

---

Running `marker-web` spins up a local server and hosts the frontend so you can use the marking utilities with a GUI. The layout makes it trivial to package this as a standalone app if needed.

*Disclaimer: This is still in development. There most definitely are UI quirks and missing features. If you find any, please open an Issue on GitHub and let me know!*

---

## How to install

There are 2 ways to install this marker. 

### (1) Using PIP
This is by far the recommended way of installing this utility. Simply run:
```bash
pip install marker-web
```

### (2) Build from source

Alternatively, if you want to develop, you will need to build from source. First, clone this repository to your machine:

```bash
git clone https://github.com/mustafaquraish/marker-web
```

Then, go into the cloned repo and and install using
```bash
cd marker
python3 setup.py install
```

---

## How to use

If you'd read through the [documentation for the marker CLI](https://marker-docs.readthedocs.io/en/latest/), most features here should be self-explanatory. There are no plans for dedicated documentation for this, but if you end up using it and need help you can reach out to me.

---

## Development notes:

- The `frontend` directory contains the Vue frontend
- The `marker_web` directory contains the marker_server
- The `extra` directory contains some files to build a standalone app (on MacOS at least)
