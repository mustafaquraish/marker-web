## Version 1.1.2

- Auth token now sent through cookies directly, no need to intercept requests.
- Made some UI adjustments to be mobile friendlier

## Version 1.1.1

- `Open in VSCode` button now opens remote directories correctly.

## Version 1.1.0

- Added support for authentication. Can now run with:
```sh
$ marker-web --auth
$ marker-web -a
```
- Changed default port to `6275`. This can be changed with:
```sh
$ marker-web --port PORT
$ marker-web -p PORT
```
- Added a `--remote` flag that SSHs to a remote machine with port forwarding and runs there:
```sh
$ marker-web --remote HOST
# Approximately quivalent to
$ ssh -L PORT:localhost:PORT HOST marker-web -a
```
