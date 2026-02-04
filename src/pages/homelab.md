---
title: Homelab
---

Inspiration for this page came from Mike Sass at [Shellsharks](https://shellsharks.com/uses). If you want to feel inspired (or depressed) don't forget to check out [r/homelab](https://www.reddit.com/r/homelab/).

# Desk setup

![Desk setup red](/assets/img/office_2024_red.png)

- IKEA Trotten sit/stand desk
- Monitor Dell U3818DW > USB-C power delivery with a modern Macbook (M1) is broken, don't buy this
- Ergotron HX monitor arm
- HumanCentric vertical laptop stands
- Kantu YU4 speakers
- Scyrox v8
- KeyChron Q1 Max
- [PinePower 120W](https://pine64.com/product/pinepower-120w-desktop-power-supply-us-version/)
- ~~Logitech G305 mouse~~ > best mouse for the money
- ~~GMMK Pro keyboard~~ > switches and board stopped working

---

# Primary Workstation

I've consolidated my old servers into a single more powerful workstation. It has enough resources to run all of my VMs, including [Game of Active Directory](https://github.com/Orange-Cyberdefense/GOAD).

![A3 build on DEFCON flag](/assets/img/ares_defcon.png)

I also host my [Podman](https://podman.io/) containers on this machine. With NixOS and Podman I can easily containerize things like Ollama, Open WebUI, and n8n with Nvidia GPU pass-through. I have some simple Podman templates on [GitHub Hacklab](https://github.com/t3rp/hacklab) if you would like to replicate the setup. If you converted my 401k to RAM it would look like this:

![A3 build RAM](/assets/img/ares_ram_cpu.png)

- AMD Ryzen 9 7950x
- Nvidia RTX 3090
- 128GB DDR5 (before the price hike!)
- Lian Li A3 Case
- IceGiant ProSiphon Elite cooler
- Seasonic Prime Ultra Platinum 850W PSU

# Laptops, XPS and MBP

![Rack with laptops](/assets/img/rack_laptops.png)

I snagged an XPS 13 Plus (the smaller laptop above) refurbished from Micro Center in preparation for the [SANS SEC617](https://www.sans.org/cyber-security-courses/wireless-penetration-testing-ethical-hacking/) offensive wireless course. I replaced the hard drive with a Samsung 980 professional, re-pasted with [Thermal Grizzly Kryonaut](https://www.thermal-grizzly.com/en/kryonaut/s-tg-k-001-rs), and added a cheap matte screen protector. Currently running Ubuntu.

![Wireless gear](/assets/img/wifi_gear.png)

This is the second 'Linux Certified' Dell that I've purchased and my overall experience is positive. Everything works out of the box on Ubuntu, e.g. sound, wifi, touch, haptic row, and fingerprint).

![Macbook Pro with SANS coins](/assets/img/macbook_sanscoins.png)

I also use a MacBook Pro M1 Pro (wow that's a name). It is easily the best laptop I've ever owned. I'm not a fan of MacOS but the new Apple silicon hardware is killer. It has all of the things a good laptop needs: a solid keyboard, track-pad, battery life, build quality, and screen.

---

# Software

- Linux
- Git
- Libvirt, kvm, qemu
- Obsidian
- SwayWM
- TMUX
- VIM Motions + VSCode

---

# Lab Setup

Checkout past homelabs on [[homelab-history|homelab history]].