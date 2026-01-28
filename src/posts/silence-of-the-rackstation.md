---
title: Silencing the Synology Rackstation RS1221+
date: 2026-01-22
tags: 
    - quick
    - lab
---

Storage, especially network attached storage, is always best when it just works. Prior to starting a business I ran a combination of TrueNAS and Proxmox for several years in my [[homelab]]. That setup worked great. But for work I wanted something that was low (NO) maintenance. I've been happy with my move to the [Synology Rackstation RS1221+](https://www.synology.com/en-us/products/RS1221+).

My only (minor) complaint would be the hum of the stock fans. When I had the top off to upgrade the RAM and networking I slapped in a set of Noctuas (Noctua NF-A8 PWM 80mm). I'm a big *fan* of Noctua and have used them in many of my previous systems. Below are a few photos of the fan connections and headers. Stock fans:

![Rackstation with original fans](/assets/img/rackstation_original_fans.png)

Noctuas and additional stick of RAM:

![Rackstation with Noctuas](/assets/img/rackstation_without_nic.png)

Dual SFP+ 10GB networking card:

![Rackstation with 10g](/assets/img/rackstation_with_nic.png)

In my experience Synology DSM did not complain about the fan swap. I modified the fan profile in `Hardware & Power > Fan Speed Mode` to *cool*. The settings are outlined below.

Synology control panel:

![Rackstation with original fans](/assets/img/rackstation_settings.png)

Synology fan curve:

![Rackstation fan speeds](/assets/img/rackstation_fan_speeds.png)

The fan swap resulted in less noise and only slightly higher drive/cpu temps. My six Ironwolf Pro drives (16TB) range between 32-39C and the CPU sits around 50-55C. Ambient temperature in the office is usually 67F with humidity regulated to ~50%.