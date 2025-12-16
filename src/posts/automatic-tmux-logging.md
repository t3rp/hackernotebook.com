---
title: Automatic TMUX Logging for Penetration Testers
date: 2024-04-03
tags: 
    - quick
    - pentesting
    - red
---

When I first started pentesting professionally I used Aaron James' [Intro to Web App Security Testing: Logging](https://trustedsec.com/blog/intro-to-web-app-security-testing-logging) article to setup my terminal logging. I've used that same pipe-pane snippet on every penetration test since. Of course, sometimes I would forget to initiate logging with `PREFIX+h` before running commands. I settled on a more automated solution that uses `set-hook` to grab command output automatically for every new tmux session, window, and pane.

# Trigger Logging on New Session, Window, and Pane

Basic setup requires a few tmux plugins and setting a `set-hook` to a bash script.

```bash
# Reference auto logging sh script for pipe-pane
set-hook -g session-created 'run ~/.bin/tmux_logging.sh'
set-hook -g after-new-window 'run ~/.bin/tmux_logging.sh'
set-hook -g after-split-window 'run ~/.bin/tmux_logging.sh'

# Reload with 'PREFIX + I' update with 'PREFIX + U'
set -g @plugin 'tmux-plugins/tpm'
set -g @plugin 'tmux-plugins/tmux-logging'

# Automatic TPM install
if "test ! -d ~/.tmux/plugins/tpm" \
   "run 'git clone https://github.com/tmux-plugins/tpm ~/.tmux/plugins/tpm && ~/.tmux/plugins/tpm/bin/install_plugins'"

# Initialize TMUX plugin manager
run '~/.tmux/plugins/tpm/tpm'
```

If this is your first time running TMUX you will need to install the plugins, you can accomplish this with `PREFIX+I`, where the default prefix is `CTRL+B`. I'm currently running `tmux 3.3a`.

A few things are happening here. First, we're checking if TMUX Plugin Manager (TPM) is installed. If it isn't we clone the TPM repository. Second, we initialize TPM and install the tmux-logging plugin. The `set-hook` lines call a shell script. The `~/.bin/tmux_logging.sh` script above contains Aaron's snippet and saves logs files to the `~/Logs` directory:

```bash
#!/usr/bin/env bash
tmux pipe-pane -o 'exec bash -c "while IFS= read -r line; do printf \"%%(%%Y%%m%%dT%%H%%M%%S%%z)T: %%s\n\" -1 \"\$line\"; done"\; exec cat >> $HOME/Logs/#S-#W-#I-#P.log' \; display-message 'Started logging to #S-#W-#I-#P.log'
```

We're logging the files as follows:

- `#S` session_name
- `#W` window_name
- `#I` window_index
- `#P` pane_index

# Logging in Practice

Open a new TMUX session with `tmux new-session webapp01`. Below are the log files from that TMUX session with two windows, one with two panes and the other with three:

```text
terp in ~ 
λ ls -la ~/Logs
total 28
drwxr-xr-x   2 terp terp 4096 Apr  4 20:45 .
drwx--x---+ 36 terp terp 4096 Apr  4 20:46 ..
-rw-r--r--   1 terp terp 2119 Apr  4 20:46 webapp01-0-zsh-0-0.log
-rw-r--r--   1 terp terp 1615 Apr  4 20:46 webapp01-0-zsh-0-1.log
-rw-r--r--   1 terp terp 2119 Apr  4 20:46 webapp01-0-zsh-1-0.log
-rw-r--r--   1 terp terp 2117 Apr  4 20:46 webapp01-0-zsh-1-1.log
-rw-r--r--   1 terp terp 1481 Apr  4 20:46 webapp01-0-zsh-1-2.log
```

Below is the logfile output of an [ffuf](https://github.com/ffuf/ffuf) scan `ffuf -w wordlist.txt -u https://hackernotebook.com/pages/FUZZ -c -r`:

```text
terp in ~/Logs
λ ffuf -w wordlist.txt -u https://hackernotebook.com/pages/FUZZ -c -r
20240406T162215-0400:
20240406T162215-0400:         /'___\  /'___\           /'___\
20240406T162215-0400:        /\ \__/ /\ \__/  __  __  /\ \__/
20240406T162215-0400:        \ \ ,__\\ \ ,__\/\ \/\ \ \ \ ,__\
20240406T162215-0400:         \ \ \_/ \ \ \_/\ \ \_\ \ \ \ \_/
20240406T162215-0400:          \ \_\   \ \_\  \ \____/  \ \_\
20240406T162215-0400:           \/_/    \/_/   \/___/    \/_/
20240406T162215-0400:
20240406T162215-0400:        v1.1.0
20240406T162215-0400: ________________________________________________
20240406T162215-0400:
20240406T162215-0400:  :: Method           : GET
20240406T162215-0400:  :: URL              : https://hackernotebook.com/pages/FUZZ
20240406T162215-0400:  :: Wordlist         : FUZZ: wordlist.txt
20240406T162215-0400:  :: Follow redirects : true
20240406T162215-0400:  :: Calibration      : false
20240406T162215-0400:  :: Timeout          : 10
20240406T162215-0400:  :: Threads          : 40
20240406T162215-0400:  :: Matcher          : Response status: 200,204,301,302,307,401,403
20240406T162215-0400: ________________________________________________
20240406T162215-0400:
contact                 [Status: 200, Size: 7410, Words: 485, Lines: 86]
about                   [Status: 200, Size: 8912, Words: 674, Lines: 90]
posts                   [Status: 200, Size: 7022, Words: 465, Lines: 77]
:: Progress: [3/3] :: Job [1/1] :: 0 req/sec :: Duration: [0:00:00] :: Errors: 0 ::
```

Reminder these are log logs, not log logs. They are essentially automated journal notes that you can use as a reference. They do not prove you did or did not do something. The logs are local and you could do something nefarious like fudge timestamps or delete that one (read tenth) time you forgot the flag for `tar`.

# Resources

- [TMUX logging plugin](https://github.com/tmux-plugins/tmux-logging)
- [Intro to Web App Security Testing: Logging](https://trustedsec.com/blog/intro-to-web-app-security-testing-logging)