---
layout: page
permalink: /ziying/
title: 1314
description: A gift for you.
nav: false
nav_order: 6
---

Hello world!

This project was completed by myself.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/color1.png" title="example image" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>
<div class="caption">
    Figure 1. Final result of recolored images.
</div>

### Model

- Input: grayscale image with 3 channels

- Output: RGB image with 3 channels

> Note: The colorization task is expected to be completed by an autoencoder. Thus, U-Net is chosen as the architecture of the network.

This task is based on Autoencoder model. Which is consisted of an encoder and a decoder. The dataloader is self-defined in order to load the grayscale images and their original images. Each record is made up of a grayscale image and original image pair. The neural network takes in a grayscale image as input and then output a colorized one.

The input grayscale image also has 3 channels but with exactly the same value for each pixel. Actually, this is not so meaningful afterwards, it can still be modified to be a one-dimensional input.

#### U-Net

The network is based on the frame of U-Net. It is connected on the convolutional layers and deconvolutional layers. This ensures that the information will not miss too much after down-sampling and up-sampling.

There are a dropout layer and a batchnorm layer after each Maxpool and each ConvTranspose.

```[Conv->Conv->MaxPool]``` is performed two times instead of four to still have a reasonable resolution at the lowest part of the architecture.

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/color3.png" title="example image" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>
<div class="caption">
    Figure 2. The structure of U-Net.
</div>

### Training

The training process can be visualised as the figure shown below:

<div class="row">
    <div class="col-sm mt-3 mt-md-0">
        {% include figure.liquid loading="eager" path="assets/img/color2.png" title="example image" class="img-fluid rounded z-depth-1" zoomable=true %}
    </div>
</div>
<div class="caption">
    Figure 3. Training process.
</div>

For more information, see the work in my <a href='https://github.com/Leikrit/LMH_Summer_Programme/tree/main/Autoencoder'>github repository</a>!
