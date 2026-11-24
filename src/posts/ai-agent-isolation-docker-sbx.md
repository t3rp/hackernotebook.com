---
title: Agent Isolation With Docker Sandboxes (SBX)
date: 2026-11-23
tags: 
    - quick
    - guide
    - ai
---

I'm asked surprisingly often, even for a nerd, how I've chosen to deploy my AI (SI?!) agents. For the quickest and easiest solution I'm often recommending Docker Sandboxes (SBX). SBX solves many of the major risks associated with running a local development agent with what I would consider minimal headache. I currently use it on NixOS, Linux, and macOS systems (Windows is also supported). The biggest downside in my mind is that the product is closed source and requires registering an account with Docker. If you're okay with that in addition to copy/pasting commands from a stranger online you're in the right place.

The easiest way to install SBX is with Homebrew, a package manager for macOS. Once we have SBX installed setting up credentials and running your first agent requires only a few more commands. Here are the pastables:

```bash
# Install Brew, https://brew.sh/
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install SBX
brew install docker/tap/sbx

# Register/login Docker
sbx login

# Authenticate your provider, e.g. OpenAI, Grok
sbx secret set openai --oauth
sbx secret set xai

# Run Codex or Grok in your curent folder
sbx run codex .
sbx run --kit docker.io/sbx/grok:latest . 
```

Here is Grok running on a NixOS system with SBX:

![Grok running on NixOS with SBX](/assets/img/sbx_hacker.png)

It looks like your agent normally would, but running in its own VM:

![Agent running in its own VM](/assets/img/sbx_hostname.png)

The agent behaves like Grok on your host would, with all of the nice quality of life improvements like sub-agents and the agent dashboard as shown below:

![Grok sub-agents and dashboard](/assets/img/sbx_agents.png)

In this example the agent only has access to files within the `development` and `hackernotebook.com` folders. The following screenshot shows the text user interface (tui) for SBX. The tui has information about your running sandboxes, network traffic logs, network rules, and file system access. As seen below the agent really wants to talk to `api.mixpanel.com` but SBX says not today:

![SBX network log blocking api.mixpanel.com](/assets/img/sbx_network.png)

So now you have a working agent in a VM, but why? SBX reduces several important attack surfaces when compared to running agents on your host system. Most frontier agents allow you to set restrictions or guardrails. I don't trust those. This leads to the first major advantage of SBX in that it provides a more robust guarantee of isolation. SBX utilizes the operating system's native hypervisor to create per-agent VMs. This is superior to running the agents naked on your host. 

Second, credential theft. I'm always concerned with what credentials my agent has access to, e.g. can it read browser sessions, SSH keys, or its own inference credentials? SBX handles this with a credential proxy, the agent sees 'sk-ant-fake-key' and SBX handles the magic of proxying that fake credential to your inference provider of choice. This protects against things like out-of-band direct/indirect prompt injection, where an attacker attempts to exfiltrate your credentials to steal your sweet, sweet tokens. With SBX the agent doesn't have access to the real credentials and as such can't leak them.

Third, network access. SBX has three default modes: open, closed, partial. You can easily modify network rules from within SBX to allow sites that were previosly blocked. I typically opt for closed and allow traffic as needed. Each agent package within SBX allows network access to its provider, e.g. if you're using Claude the default SBX network policy will allow access to the Anthropic inference API.

Fourth, file access. SBX limits the folder or folders that your agent can access. I typically use one agent per folder and do not share skills between the VMs. Each agent lives in isolation and only sees what you want it to see. This reduces the risk of your agent taking actions on files unintentionally. By default (and the way I typically deploy agents) SBX mounts directory of your choice as with read/write permissions. This means that the agent can modify files within the directory. You can take the isolation a step further and mount the directory as read-only with `--clone`. This is useful for development as you can commit changes that must later be fetched from the host system before they're written to your host's file system.

P.S. I mentioned NixOS a few times in the article but only gave steps for installing on macOS (because many of my university colleagues are using MacBooks). If you're on NixOS here is a clanked-out version of the implementation I'm currently using:

```nix
{
  description = "NixOS module for the Docker Sandboxes CLI (sbx)";

  inputs.nixpkgs.url = "github:nixos/nixpkgs/nixos-26.05";

  outputs = { self, nixpkgs }: {
    nixosModules.default = { pkgs, lib, ... }:
    let
      version = "0.54.0";
      # GitHub release asset digest, checked against the downloaded file.
      srcHash = "sha256-7e0pAXEhqFfJjUqRytWT9qngD0AQ6DBnm9OF9KXtuk0=";

      # Not Docker Engine. sbx looks for its helpers at ../libexec relative
      # to the binary, so they are installed beside bin/ rather than into it.
      # The GPU shim is left non-suid; do not run the upstream installer.
      sbx = pkgs.stdenv.mkDerivation {
        pname = "sbx";
        inherit version;

        src = pkgs.fetchurl {
          url = "https://github.com/docker/sbx-releases/releases/download/v${version}/DockerSandboxes-linux-amd64.tar.gz";
          hash = srcHash;
        };

        sourceRoot = "docker-sbx";

        nativeBuildInputs = [ pkgs.autoPatchelfHook ];
        buildInputs = [ pkgs.glibc pkgs.stdenv.cc.cc.lib ];

        dontConfigure = true;
        dontBuild = true;
        dontStrip = true;

        installPhase = ''
          runHook preInstall
          mkdir -p "$out/bin" "$out/libexec/lib"
          install -m 755 sbx "$out/bin/sbx"
          for f in docker-docklet containerd-shim-nerdbox-v1 containerd-shim-nerdbox-gpu-v1 mkfs.erofs mkfs.ext4; do
            install -m 755 "$f" "$out/libexec/$f"
          done
          install -m 644 nerdbox-kernel-* nerdbox-rootfs-*.erofs sailor-rootfs-*.erofs "$out/libexec/"
          install -m 755 libsailor.so "$out/libexec/lib/libsailor.so"
          runHook postInstall
        '';

        meta = {
          description = "Docker Sandboxes CLI";
          homepage = "https://docs.docker.com/ai/sandboxes/";
          license = lib.licenses.unfree;
          platforms = [ "x86_64-linux" ];
          sourceProvenance = [ lib.sourceTypes.binaryNativeCode ];
        };
      };
    in
    {
      # The upstream binary is unfree. Limited to this package so importing
      # the module does not allow every unfree package on the system.
      nixpkgs.config.allowUnfreePredicate = pkg:
        lib.getName pkg == "sbx";

      environment.systemPackages = [ sbx ];

      # Sandboxes need /dev/kvm. Add the account that will run sbx:
      # users.users.<name>.extraGroups = [ "kvm" ];
    };
  };
}
```

P.S.S. Don't get hung up on the word local here. The only thing local is the agent. If you're using a local agent but API inference from OpenAI, etc. the API calls still contain your prompts and those are sent to a computer that is not yours. In the future I may write an article on how I'm using local inference in my [[homelab|homelab]] for things I don't want shipped to the cloud. The stack uses NixOS, Langfuse, Llama-cpp, Caddy, Qwen (Qwen3.6-27B-MTP-pi-reasoning-Q4_K_M.gguf) and my favorite agent Pi.

# Resources

- [Docker Sandboxes](https://docs.docker.com/ai/sandboxes/)
- [docker-sbx: init at 0.34.0](https://github.com/NixOS/nixpkgs/pull/524195)
- [Pi](https://pi.dev/)
