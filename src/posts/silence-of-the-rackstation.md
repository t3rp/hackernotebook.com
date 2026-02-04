---
title: Silencing the Synology Rackstation RS1221+
date: 2026-01-22
tags: 
    - quick
    - homelab
    - guide
---

I purchased a [Synology Rackstation RS1221+](https://www.synology.com/en-us/products/RS1221+) shortly after starting a business because I wanted low/no maintenance network attached storage. I've been happy with TrueNAS in my [[homelab]] for years, but for business critical functions like backups I don't have the time or desire to tinker. The Synology has been a great answer to my low maintenance requirement. My minor complaint after a year with the Rackstation is the noise of the stock fans. I recently had the top off to upgrade RAM/Networking and took the opportunity to slap in a set of Noctuas (Noctua NF-A8 PWM 80mm). Below are a few photos of the fan connections and headers along with Synology DSM settings.

![Rackstation with original fans](/assets/img/rackstation_original_fans.png)

Noctuas and additional stick of RAM:

![Rackstation with Noctuas](/assets/img/rackstation_without_nic.png)

Dual SFP+ 10GB networking card:

![Rackstation with 10g](/assets/img/rackstation_with_nic.png)

Synology DSM did not complain about the fan swap. I modified the fan profile in `Hardware & Power > Fan Speed Mode` to *cool*. The settings are outlined below in the control panel:

![Rackstation with original fans](/assets/img/rackstation_settings.png)

This is the menu where you can modify the Synology fan settings:

![Rackstation fan speeds](/assets/img/rackstation_fan_speeds.png)

The fan swap resulted in less overall noise and only slightly higher drive/cpu temps. My six Ironwolf Pro drives (16TB) range between 32-39C and the CPU sits around 50-55C. Ambient temperature in the office is usually 67F with humidity regulated to ~50%.