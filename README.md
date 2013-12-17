# nodeploy [![Build Status](https://travis-ci.org/nosco/nodeploy.png)](https://travis-ci.org/nosco/nodeploy)

Automatic deployment script to facilitate deployment of a Node application to a
production server after a successful build.

First it pulls in the successful build from git, and installs dependencies. Then
it takes a copy to the ``releaseDir`` (defaults to ``$HOME/relases``), copies
the diff to the ``deployDir`` and finally restarts the app as specified in
``restartService`` run-script in ``package.json``.

## Required options

The following options are required - also, every directory must exist! (this
should probably be changed, so the directory simply is created if it doesn't
exist).

### ``branch``

Which branch to deploy. Should probably always be the branch containing the
successful build - e.g. ``$TRAVIS_BRANCH``.

### ``commit``

Which commit to deploy. To deploy the successfully build commit from Travis,
use ``$TRAVIS_COMMIT``.

### ``repoDir``

Directory containing the git repository.

### ``deployDir``

Directory containing the app. Files in this directory will be changed to match
the new release.

## Note
  * Remember to create a deploy key and add to github.
  * ```--releaseDir``` defaults to ```$HOME/releases```
  * All directories must exist.

## Usage example 

Using ssh with an ``authorized_keys`` entry like(``travis pubkey`` gives you
the repository's public key):

```bash
command="deploy $SSH_ORIGINAL_COMMAND",no-port-forwarding,no-X11-forwarding,\
no-agent-forwarding,no-pty ssh-rsa AAAA...==
```

Put the following in your ``.travis.yml`` file - this should work for private
repository's build by [travis-ci.com](https://travis-ci.com).

```yaml
after_success:
  - ssh -o StrictHostKeyChecking=no [user@]hostname "deploy -b $TRAVIS_BRANCH -c $TRAVIS_COMMIT --repoDir <path> --deployDir <path>"
```
