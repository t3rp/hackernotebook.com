---
title: Homelab
---

Inspiration for this page came from Mike Sass at [Shellsharks](https://shellsharks.com/uses).

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

# Workstation

![A3 build on DEFCON flag](/assets/img/ares_defcon.png)
![A3 build on DEFCON flag](/assets/img/ares_neofetch.png)

I do most of my work on this machine in addition to hosting several [Podman](https://podman.io/) containers. With NixOS and Podman I can create containers for things like Ollama and Open WebUI and pass the Nvidia GPU to the container. I have some templates on [GitHub Hacklab](https://github.com/t3rp/hacklab). 

---

# Laptops

![Rack with laptops](/assets/img/rack_laptops.png)

I snagged an XPS 13 Plus refurbished from Micro Center in preparation for [SANS SEC617](https://www.sans.org/cyber-security-courses/wireless-penetration-testing-ethical-hacking/). I've since replaced the hard drive with a Samsung 980 professional, re-pasted with [Thermal Grizzly Kryonaut](https://www.thermal-grizzly.com/en/kryonaut/s-tg-k-001-rs), and added a cheap matte screen protector. Currently running Ubuntu.

This is the second 'Linux Certified' Dell that I've purchased and my overall experience is positive. Everything works out of the box on Ubuntu, e.g. sound, wifi, touch, haptic row, and fingerprint).

![Macbook Pro with SANS coins](/assets/img/macbook_sanscoins.png)

I also use a MacBook Pro M1 Pro (wow that's a name). It is easily the best laptop I've ever owned. I'm not a fan of MacOS but the new Apple silicon hardware is killer.

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

![Rack circa 2023](/assets/img/lab_rack.png)

My homelab contains two consumer desktops. The Fractal Meshify-C (top) runs [Proxmox](https://www.proxmox.com/en/) and the Rosewill 4U (bottom) runs [TrueNAS SCALE](https://www.truenas.com/truenas-scale/). A Cisco SG350 and [pfSense](https://www.pfsense.org/) are the network's backbone. Lab networking goes through a virtualized [OPNsense](https://opnsense.org/). [PiKVM](https://pikvm.org/) for IPMI. Hardware details:

* Proxmox: 12600K, 32GB, 1TB+2TB NVME, 1080TI
* TrueNAS: 8700K, 64GB, 1TB+500GB NVME, 4x2TB RAIDZ1
* Wireless by TPLINK EAP660
* Cisco SG350 switch