# nodeploy [![Build Status](https://travis-ci.org/nosco/nodeploy.png)](https://travis-ci.org/nosco/nodeploy)

Automatic deployment script to facilitate deployment of a Node application to a
production server after a successful build.

First it pull in the successful build from git, and installs dependencies. Then
it takes a copy to the ``releaseDir`` (defaults to ``$HOME/relases``), copies
the diff to the ``deployDir`` and finally restarts the app as specified in
``restartService`` run-script in ``package.json``.

## Note
  * Remember to create a deploy key and add to github.
  * ```--releaseDir``` defaults to ```$HOME/releases```
  * All directories must exist.

## Usage example 
Using ssh with an ```authorized_keys``` entry like:
```bash
command="deploy $SSH_ORIGINAL_COMMAND",no-port-forwarding,no-X11-forwarding,\
no-agent-forwarding,no-pty ssh-rsa AAAA...==
```
this should work for private repos build by [travis-ci.com](https://travis-ci.com)
```yaml
after_success:
  - ssh -o StrictHostKeyChecking=no [user@]hostname "deploy -b $TRAVIS_BRANCH -c $TRAVIS_COMMIT --repoDir <path> --deployDir <path>"
```
