---
title: Red, Blue, or Purple Dot
---

The small red, blue, or purple dot (lambda) ajacent to the title is calculated by the following Python program. It counts the number of posts with red (offensive/attacker) and blue (defensive/defender) tags. The respective tag percentages are then used to calculate an RGB value for the dot. A higher number of offensive articles means more red while more defensive articles means more blue. It has no real purpose, I thought it was a cool idea.

```python
import pathlib
import yaml
import re

# Count the number of red and blue tags
def count_tags(file_path):
    red_count = 0
    blue_count = 0
    for file_path in file_path.glob('*.md'):
        # Read the file's content
        with open(file_path, 'r') as file:
            content = file.read()
        metadata = re.search(r'---(.*?)---', content, re.DOTALL).group(1)
        data = yaml.safe_load(metadata)
        tags = data.get('tags', [])
        red_count += tags.count('red')
        blue_count += tags.count('blue')
    return red_count, blue_count

# Calculate the percentage of red and blue in a color
# http://www.cknuckles.com/rgbsliders.html
def red_or_blue(red_val, blue_val):
    red_percentage = red_val / (red_val + blue_val)
    blue_percentage = blue_val / (red_val + blue_val)
    rgb_value = "(" + str(int(red_percentage * 255)) + ", 0, " + str(int(blue_percentage * 255)) + ")"
    hex_value = '#%02x%02x%02x' % (int(red_percentage * 255), 0, int(blue_percentage * 255))
    return "RGB: " + rgb_value + "\nHEX: " + hex_value

# Main
def main():
    local_path = "/home/terp/development/hackernotebook/src/posts/"
    red, blue = count_tags(pathlib.Path(local_path))
    print(red_or_blue(red, blue))

# Call the main function
if __name__ == "__main__":
    main()
```